import { ThemeProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import Routes from "./Routes";
import theme from "./theme";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  return (
    <HashRouter>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ReduxProvider>
    </HashRouter>
  );
}

export default App;
