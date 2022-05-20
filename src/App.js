import { ThemeProvider } from "@mui/material/styles";
import { HashRouter } from "react-router-dom";
import Routes from "./Routes";
import theme from "./theme";

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
