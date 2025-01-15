// src/theme.tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Override Accordion styles
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove boxShadow for the Accordion root
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove boxShadow for AccordionSummary
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Optionally, you can remove shadow from AccordionDetails too
        },
      },
    },
  },
});

export default theme;
