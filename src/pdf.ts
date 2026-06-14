import { jsPDF } from 'jspdf';
import type { ResumeData } from './types';

const pageHeight = 280;
const margin = 14;
const contentWidth = 182;

const addWrappedLines = (doc: jsPDF, text: string, x: number, y: number, options?: { size?: number; bold?: boolean }) => {
  doc.setFont('helvetica', options?.bold ? 'bold' : 'normal');
  if (options?.size) {
    doc.setFontSize(options.size);
  }
  const lines = doc.splitTextToSize(text, contentWidth) as string[];
  lines.forEach((line) => {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, x, y);
    y += 6;
  });
  return y;
};

const ensureRoom = (doc: jsPDF, y: number, needed = 12) => {
  if (y + needed > pageHeight - margin) {
    doc.addPage();
    return margin;
  }
  return y;
};

export const downloadResumePdf = (data: ResumeData) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = margin;

  if (data.profilePhotoUrl.startsWith('data:image/')) {
    try {
      doc.addImage(data.profilePhotoUrl, 'JPEG', 150, margin - 2, 30, 30);
    } catch {
      // Ignore image export failures and continue with the text resume.
    }
  }

  doc.setTextColor(20, 32, 43);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(data.fullName, margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(data.headline, margin, y);
  y += 8;

  doc.setLineWidth(0.3);
  doc.line(margin, y, 196, y);
  y += 8;

  y = addWrappedLines(doc, `Summary: ${data.summary}`, margin, y, { size: 10 });
  y += 2;

  y = ensureRoom(doc, y, 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Contact', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  [
    `Phone: ${data.contact.phone}`,
    `Email: ${data.contact.email}`,
    `Location: ${data.contact.location}`,
    `LinkedIn: ${data.contact.linkedin}`,
    `Website: ${data.contact.website}`,
  ].forEach((line) => {
    y = addWrappedLines(doc, line, margin, y, { size: 10 });
  });

  y += 2;
  y = ensureRoom(doc, y, 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Skills', margin, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  y = addWrappedLines(doc, data.skills.map((skill) => `• ${skill}`).join('\n'), margin, y, { size: 10 });

  y += 2;
  y = ensureRoom(doc, y, 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Experience', margin, y);
  y += 7;

  data.experience.forEach((experience) => {
    y = ensureRoom(doc, y, 28);
    y = addWrappedLines(doc, `${experience.role} - ${experience.company}`, margin, y, { size: 10, bold: true });
    y = addWrappedLines(doc, `${experience.location} | ${experience.startDate} - ${experience.endDate}`, margin, y, { size: 9 });
    if (experience.summary) {
      y = addWrappedLines(doc, experience.summary, margin, y, { size: 10 });
    }
    experience.bullets.filter(Boolean).forEach((bullet) => {
      y = addWrappedLines(doc, `• ${bullet}`, margin + 2, y, { size: 10 });
    });
    y += 3;
  });

  y = ensureRoom(doc, y, 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Education', margin, y);
  y += 7;
  data.education.forEach((education) => {
    y = ensureRoom(doc, y, 18);
    y = addWrappedLines(doc, `${education.degree} - ${education.school}`, margin, y, { size: 10, bold: true });
    y = addWrappedLines(doc, `${education.location} | ${education.startDate} - ${education.endDate}`, margin, y, { size: 9 });
    if (education.details) {
      y = addWrappedLines(doc, education.details, margin, y, { size: 10 });
    }
    y += 2;
  });

  const fileName = `${data.fullName.replace(/\s+/g, '_').toLowerCase()}_resume.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
