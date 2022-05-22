import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          minHeight: "57px",
          // fontSize: "16px",
        },
      },
    },
  },
  palette: {
    teritary: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Andika New Basic","Aladin","DM Sans","Inter","Segoe UI"',
    h4: {
      fontFamily: "Aladin",
      color: "#424242",
    },
    button: {
      fontSize: "17px",
      fontWeight: "700",
    },
  },
});

export default theme;
