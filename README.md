# Resume Builder

A frontend-only resume builder built with React, Zustand, Material UI, and jsPDF. Enter your details, preview the result in a clean two-column layout, and download a PDF when you're ready.

<a href="https://kavitha-sugatha.github.io/resume-builder/" target="_blank"><strong>Open Live App ↗</strong></a>

![Resume Builder Screenshot](resume.png)

## Features

- Live resume editor for personal details, skills, work experience, and education
- Profile photo upload with immediate preview update
- Dark / light mode toggle
- Resume preview that mirrors the reference resume layout
- PDF export using jsPDF (supports JPEG and SVG profile images)
- Responsive interface that works on desktop and mobile

## Tech Stack

| Technology   | Purpose            |
| ------------ | ------------------ |
| React 18     | UI framework       |
| Zustand      | State management   |
| Material UI  | Component library  |
| jsPDF        | PDF generation     |
| Vite         | Dev server & build |

## Getting Started

**Prerequisites:** Node.js 18 or newer, npm

```bash
npm install
npm run dev
```

If Vite picks a different port, open the URL it prints in the terminal.

```bash
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
```

## How It Works

All resume data lives in a Zustand store. The editor updates the store in real time, and the preview reads from the same data so changes appear immediately. PDF export uses jsPDF and includes the profile photo when available.

## Project Structure

```
src/
├── App.tsx       Main editor and resume preview UI
├── store.ts      Zustand store and default resume data
├── pdf.ts        PDF export logic
├── types.ts      Shared TypeScript types
└── styles.css    Global and preview styling
```

## Deployment

The repo is configured for GitHub Pages via GitHub Actions. Push to `main` and the workflow in `.github/workflows/deploy.yml` builds and publishes the `dist` folder. The Vite base is set to `/resume-builder/` so asset paths resolve correctly.
