import { useMemo, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { downloadResumePdf } from './pdf';
import { useResumeStore } from './store';
import type { ResumeData, ResumeEducation, ResumeExperience } from './types';

const appIconSrc = 'resume-icon.svg';
const dummyHeadshotSrc = 'dummy-headshot.svg';

const getSectionCardSx = (mode: 'light' | 'dark') => ({
  borderRadius: 1.5,
  border: '0.5px solid',
  borderColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.1)',
  backgroundColor: mode === 'dark' ? '#111827' : '#ffffff',
  boxShadow: mode === 'dark' ? '0 8px 18px rgba(0, 0, 0, 0.18)' : '0 5px 14px rgba(15, 23, 42, 0.04)',
});

const getInnerCardSx = (mode: 'light' | 'dark') => ({
  p: 2,
  borderRadius: 1.5,
  bgcolor: mode === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.015)',
  border: `0.5px solid ${mode === 'dark' ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.08)'}`,
});

const getFieldSx = (mode: 'light' | 'dark') => ({
  '& .MuiFilledInput-root': {
    backgroundColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.025)',
    borderRadius: 1,
    transition: 'background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
  },
  '& .MuiFilledInput-root:hover': {
    backgroundColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.11)' : 'rgba(15, 23, 42, 0.04)',
  },
  '& .MuiFilledInput-root.Mui-focused': {
    backgroundColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(15, 23, 42, 0.03)',
    boxShadow: mode === 'dark' ? '0 0 0 1px rgba(45, 212, 191, 0.34)' : '0 0 0 1px rgba(15, 118, 110, 0.22)',
  },
});

const previewFrameSx = {
  p: 0,
  overflow: 'hidden',
  borderRadius: 2,
  backgroundColor: '#ffffff',
  color: '#1d2329',
  border: '0.5px solid rgba(15, 23, 42, 0.1)',
  boxShadow: '0 5px 14px rgba(15, 23, 42, 0.04)',
};

const twoColumnGridSx = {
  display: 'grid',
  gap: 1.5,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
};

const Field = ({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  minRows = 1,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  minRows?: number;
}) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
    multiline={multiline}
    minRows={minRows}
    variant="filled"
    size="small"
    InputProps={{ disableUnderline: true }}
    sx={(theme) => ({
      '& .MuiFilledInput-root': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.025)',
        borderRadius: 1,
        transition: 'background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
      },
      '& .MuiFilledInput-root:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.11)' : 'rgba(15, 23, 42, 0.04)',
      },
      '& .MuiFilledInput-root.Mui-focused': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(15, 23, 42, 0.03)',
        boxShadow: theme.palette.mode === 'dark' ? '0 0 0 1px rgba(45, 212, 191, 0.34)' : '0 0 0 1px rgba(15, 118, 110, 0.22)',
      },
    })}
  />
);

const Section = ({
  title,
  action,
  children,
  mode,
  emphasizedBorder = false,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  mode: 'light' | 'dark';
  emphasizedBorder?: boolean;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2, md: 2.5 },
      borderRadius: 1.5,
      border: '0.5px solid',
      borderColor: emphasizedBorder ? (mode === 'dark' ? 'rgba(148, 163, 184, 0.24)' : 'rgba(15, 23, 42, 0.14)') : mode === 'dark' ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.1)',
      backgroundColor: mode === 'dark' ? '#111827' : '#ffffff',
      boxShadow: mode === 'dark' ? '0 16px 32px rgba(0, 0, 0, 0.32)' : '0 12px 34px rgba(15, 23, 42, 0.06)',
    }}
  >
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, fontSize: '1rem' }}>
          {title}
        </Typography>
        {action}
      </Stack>
      {children}
    </Stack>
  </Paper>
);

const ExperienceEditor = ({ item, mode }: { item: ResumeExperience; mode: 'light' | 'dark' }) => {
  const store = useResumeStore();

  return (
    <Paper elevation={0} sx={getInnerCardSx(mode)}>
      <Stack spacing={2}>
        <Box sx={twoColumnGridSx}>
          <Box>
            <Field label="Role" value={item.role} onChange={(value) => store.updateExperienceField(item.id, 'role', value)} />
          </Box>
          <Box>
            <Field label="Company" value={item.company} onChange={(value) => store.updateExperienceField(item.id, 'company', value)} />
          </Box>
          <Box>
            <Field label="Location" value={item.location} onChange={(value) => store.updateExperienceField(item.id, 'location', value)} />
          </Box>
          <Box>
            <Field label="Start" value={item.startDate} onChange={(value) => store.updateExperienceField(item.id, 'startDate', value)} />
          </Box>
          <Box>
            <Field label="End" value={item.endDate} onChange={(value) => store.updateExperienceField(item.id, 'endDate', value)} />
          </Box>
        </Box>

        <Field
          label="Summary"
          value={item.summary}
          onChange={(value) => store.updateExperienceField(item.id, 'summary', value)}
          multiline
          minRows={3}
        />

        <Stack spacing={1.25}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Highlights
            </Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={() => store.addExperienceBullet(item.id)}>
              Add bullet
            </Button>
          </Stack>

          <Stack spacing={1}>
            {item.bullets.map((bullet, index) => (
              <Stack key={`${item.id}-bullet-${index}`} direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  size="small"
                  value={bullet}
                  onChange={(event) => store.updateExperienceBullet(item.id, index, event.target.value)}
                  placeholder="Describe an achievement"
                />
                <IconButton color="error" onClick={() => store.removeExperienceBullet(item.id, index)} aria-label="Remove bullet">
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Box display="flex" justifyContent="flex-end">
          <Button color="error" variant="text" onClick={() => store.removeExperience(item.id)} startIcon={<DeleteOutlineIcon />}>
            Remove experience
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

const EducationEditor = ({ item, mode }: { item: ResumeEducation; mode: 'light' | 'dark' }) => {
  const store = useResumeStore();

  return (
    <Paper elevation={0} sx={getInnerCardSx(mode)}>
      <Stack spacing={2}>
        <Box sx={twoColumnGridSx}>
          <Box>
            <Field label="School" value={item.school} onChange={(value) => store.updateEducationField(item.id, 'school', value)} />
          </Box>
          <Box>
            <Field label="Degree" value={item.degree} onChange={(value) => store.updateEducationField(item.id, 'degree', value)} />
          </Box>
          <Box>
            <Field label="Location" value={item.location} onChange={(value) => store.updateEducationField(item.id, 'location', value)} />
          </Box>
          <Box>
            <Field label="Start" value={item.startDate} onChange={(value) => store.updateEducationField(item.id, 'startDate', value)} />
          </Box>
          <Box>
            <Field label="End" value={item.endDate} onChange={(value) => store.updateEducationField(item.id, 'endDate', value)} />
          </Box>
        </Box>

        <Field
          label="Details"
          value={item.details}
          onChange={(value) => store.updateEducationField(item.id, 'details', value)}
          multiline
          minRows={3}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button color="error" variant="text" onClick={() => store.removeEducation(item.id)} startIcon={<DeleteOutlineIcon />}>
            Remove education
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

const ResumePreview = ({ data }: { data: ResumeData }) => {
  const contactLine = `${data.contact.location} | ${data.contact.phone} | ${data.contact.email} | LinkedIn: ${data.contact.linkedin} | Medium: ${data.contact.website}`;

  const groupedSkills = [
    {
      title: 'Technical / App Development',
      items: data.skills.slice(0, 5),
    },
    {
      title: 'Education & Tutoring',
      items: data.skills.slice(5, 8),
    },
    {
      title: 'Operations & Customer Service',
      items: data.skills.slice(8, 9),
    },
    {
      title: 'Software Tools',
      items: ['MS Excel, MS Word, MS PowerPoint'],
    },
    {
      title: 'Languages',
      items: ['English, Malayalam, Hindi, Tamil'],
    },
  ];

  return (
    <Paper elevation={0} sx={previewFrameSx}>
      <Box className="resume-preview">
        <Box className="top-accent" />
        <Box className="content">
          <Box component="section">
            <Typography component="h1" className="name">
              {data.fullName}
            </Typography>
            <Typography component="p" className="title-line">
              {contactLine}
            </Typography>

            <Box className="section">
              <Typography component="h2">Summary</Typography>
              <Typography className="summary">{data.summary}</Typography>
            </Box>

            <Box className="section">
              <Typography component="h2">Experience</Typography>
              {data.experience.map((item) => (
                <Box component="article" className="job" key={item.id}>
                  <Box className="job-head">
                    <Typography component="p" className="role">
                      <Box component="span" className="role-title">
                        {item.role}
                      </Box>
                      <Box component="span" className="role-company">
                        {item.company}
                      </Box>
                    </Typography>
                    <Box component="span" className="dates">
                      {`${item.startDate} - ${item.endDate || 'Present'}`}
                    </Box>
                  </Box>
                  <Box component="p" className="location">
                    {item.location}
                  </Box>
                  {item.summary ? <Typography component="p" className="small-note">{item.summary}</Typography> : null}
                  <Box component="ul" className="bullets">
                    {item.bullets.filter(Boolean).map((bullet) => (
                      <Box component="li" key={bullet}>
                        {bullet}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box component="aside" className="sidebar">
            <Box className="photo-card">
              <Box component="img" alt="Professional headshot" src={data.profilePhotoUrl || '/dummy-headshot.svg'} />
            </Box>

            <Box className="sidebar-block">
              <Typography component="h3">Contact</Typography>
              <Box component="ul" className="contact-list">
                <Box component="li">
                  <Box component="span" className="label">
                    Address:
                  </Box>{' '}
                  {data.contact.location}
                </Box>
                <Box component="li">
                  <Box component="span" className="label">
                    Phone:
                  </Box>{' '}
                  <Box component="a" href={`tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`}>
                    {data.contact.phone}
                  </Box>
                </Box>
                <Box component="li">
                  <Box component="span" className="label">
                    Email:
                  </Box>{' '}
                  <Box component="a" href={`mailto:${data.contact.email}`}>
                    {data.contact.email}
                  </Box>
                </Box>
                <Box component="li">
                  <Box component="span" className="label">
                    LinkedIn:
                  </Box>{' '}
                  <Box component="a" href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer">
                    {data.contact.linkedin}
                  </Box>
                </Box>
                <Box component="li">
                  <Box component="span" className="label">
                    Medium:
                  </Box>{' '}
                  <Box component="a" href={`https://${data.contact.website}`} target="_blank" rel="noreferrer">
                    {data.contact.website}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="sidebar-block">
              <Typography component="h3">Skills</Typography>
              {groupedSkills.map((group) => (
                <Box className="skills-group" key={group.title}>
                  <Typography component="h4">{group.title}</Typography>
                  <Box component="ul" className="skill-list">
                    {group.items.map((skill) => (
                      <Box component="li" key={skill}>
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className="sidebar-block">
              <Typography component="h3">Education</Typography>
              {data.education.map((item) => (
                <Box className="education-item" key={item.id}>
                  <Box component="span" className="education-year">
                    {`${item.startDate} – ${item.endDate}`}
                  </Box>
                  <Typography component="p" className="education-title">
                    {item.degree}
                  </Typography>
                  <Typography component="p" className="education-school">
                    {item.school}
                  </Typography>
                  <Typography component="p" className="small-note">
                    {item.location}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default function App() {
  const data = useResumeStore((state) => state.data);
  const setField = useResumeStore((state) => state.setField);
  const setProfilePhoto = useResumeStore((state) => state.setProfilePhoto);
  const setContactField = useResumeStore((state) => state.setContactField);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const addExperience = useResumeStore((state) => state.addExperience);
  const addEducation = useResumeStore((state) => state.addEducation);
  const reset = useResumeStore((state) => state.reset);
  const [newSkill, setNewSkill] = useState('');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const hasContent = useMemo(() => data.fullName.trim().length > 0 && data.summary.trim().length > 0, [data]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#0f766e',
          },
          background: {
            default: mode === 'dark' ? '#0f172a' : '#ffffff',
            paper: mode === 'dark' ? '#111827' : '#ffffff',
          },
        },
        typography: {
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        shape: {
          borderRadius: 4,
        },
      }),
    [mode],
  );

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfilePhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        <Stack spacing={2.5}>
          <Paper elevation={0} sx={{ ...getSectionCardSx(mode), p: { xs: 2.25, md: 3 } }}>
            <Stack spacing={1.75}>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2} alignItems={{ xs: 'stretch', md: 'flex-start' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ minWidth: 0 }}>
                  <Box
                    component="img"
                    src={appIconSrc}
                    alt="Resume Builder icon"
                    sx={{ width: { xs: 44, sm: 56 }, height: { xs: 44, sm: 56 }, flexShrink: 0 }}
                  />
                  <Box sx={{ maxWidth: 760 }}>
                    <Typography variant="overline" color="primary" sx={{ letterSpacing: 1.2, fontWeight: 700 }}>
                      Resume Builder
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.06, fontSize: { xs: '1.9rem', md: '2.45rem' } }}>
                      Build your resume faster.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <Button
                    variant="outlined"
                    startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    onClick={() => setMode((current) => (current === 'light' ? 'dark' : 'light'))}
                    size="small"
                    sx={{ minHeight: 34, px: 1.5, py: 0.65 }}
                  >
                    {mode === 'dark' ? 'Light mode' : 'Dark mode'}
                  </Button>
                  <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={reset} size="small" sx={{ minHeight: 34, px: 1.5, py: 0.65 }}>
                    Reset
                  </Button>
                  <Button variant="contained" startIcon={<PictureAsPdfIcon />} onClick={() => downloadResumePdf(data)} disabled={!hasContent} size="small" sx={{ minHeight: 34, px: 1.5, py: 0.65 }}>
                    Download PDF
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.05fr) minmax(360px, 0.95fr)' },
              gap: 2.5,
              alignItems: 'start',
            }}
          >
            <Stack spacing={2.5} sx={{ minWidth: 0 }}>
              <Section title="Personal information" mode={mode} emphasizedBorder>
                <Box sx={twoColumnGridSx}>
                  <Box sx={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      variant="square"
                      src={data.profilePhotoUrl || dummyHeadshotSrc}
                      alt="Profile photo preview"
                      sx={{ width: 84, height: 84, borderRadius: 0, border: 'none' }}
                    />
                    <Stack spacing={1}>
                      <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />} onClick={() => photoInputRef.current?.click()}>
                        Select profile photo
                      </Button>
                      <Typography variant="caption" color="text.secondary">
                        JPG or PNG works best.
                      </Typography>
                      <input ref={photoInputRef} type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
                    </Stack>
                  </Box>
                  <Box>
                    <Field label="Full name" value={data.fullName} onChange={(value) => setField('fullName', value)} />
                  </Box>
                  <Box>
                    <Field label="Headline" value={data.headline} onChange={(value) => setField('headline', value)} />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Field
                      label="Professional summary"
                      value={data.summary}
                      onChange={(value) => setField('summary', value)}
                      multiline
                      minRows={4}
                    />
                  </Box>
                  <Box>
                    <Field label="Phone" value={data.contact.phone} onChange={(value) => setContactField('phone', value)} />
                  </Box>
                  <Box>
                    <Field label="Email" value={data.contact.email} onChange={(value) => setContactField('email', value)} />
                  </Box>
                  <Box>
                    <Field label="Location" value={data.contact.location} onChange={(value) => setContactField('location', value)} />
                  </Box>
                  <Box>
                    <Field label="LinkedIn" value={data.contact.linkedin} onChange={(value) => setContactField('linkedin', value)} />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Field label="Website" value={data.contact.website} onChange={(value) => setContactField('website', value)} />
                  </Box>
                </Box>
              </Section>

              <Section
                title="Skills"
                mode={mode}
                action={
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ width: '100%' }}>
                    <TextField size="small" value={newSkill} onChange={(event) => setNewSkill(event.target.value)} placeholder="Add a skill" sx={{ ...getFieldSx(mode), minWidth: { xs: '100%', sm: 180 } }} fullWidth />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        if (!newSkill.trim()) {
                          return;
                        }

                        addSkill(newSkill.trim());
                        setNewSkill('');
                      }}
                      size="small"
                      sx={{ minHeight: 36, px: 1.75, py: 0.75 }}
                    >
                      Add
                    </Button>
                  </Stack>
                }
              >
                <Stack spacing={1.25}>
                  {data.skills.map((skill, index) => (
                    <Stack key={`${skill}-${index}`} direction="row" spacing={1} alignItems="center">
                      <Field label={`Skill ${index + 1}`} value={skill} onChange={(value) => updateSkill(index, value)} />
                      <IconButton color="error" onClick={() => removeSkill(index)} aria-label={`Remove skill ${index + 1}`}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </Section>

              <Section
                title="Experience"
                mode={mode}
                action={
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={addExperience} size="small" sx={{ minHeight: 36, px: 1.75, py: 0.75 }}>
                    Add experience
                  </Button>
                }
              >
                <Stack spacing={2}>
                  {data.experience.map((item) => (
                    <ExperienceEditor key={item.id} item={item} mode={mode} />
                  ))}
                </Stack>
              </Section>

              <Section
                title="Education"
                mode={mode}
                action={
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={addEducation} size="small" sx={{ minHeight: 36, px: 1.75, py: 0.75 }}>
                    Add education
                  </Button>
                }
              >
                <Stack spacing={2}>
                  {data.education.map((item) => (
                    <EducationEditor key={item.id} item={item} mode={mode} />
                  ))}
                </Stack>
              </Section>
            </Stack>

            <Stack
              spacing={2.5}
              sx={{
                minWidth: 0,
                position: { xs: 'static', lg: 'sticky' },
                top: { lg: 24 },
                alignSelf: { lg: 'start' },
              }}
            >
              <Paper elevation={0} sx={previewFrameSx}>
                <ResumePreview data={data} />
              </Paper>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
