import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography>Helo world</Typography>
    </ThemeProvider>
  );
}

export default App;
