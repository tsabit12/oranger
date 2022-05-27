/* eslint-disable no-undef */
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import api from "./api";
import rootReducer from "./rootReducer";
import Routes from "./Routes";
import theme from "./theme";
import { encode as base64Encode } from "base-64";
import axios from "axios";
import { Backdrop } from "@mui/material";
import { FacebookCircularProgress } from "./components";
import Cookies from "js-cookie";
import { setLoggedIn } from "./actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (Cookies.get(process.env.REACT_APP_COOKIES_NAME)) {
  const token = Cookies.get(process.env.REACT_APP_COOKIES_NAME);
  store.dispatch(setLoggedIn(token));
}

function App() {
  const [loading, setloading] = useState(true);

  //WE DONT SAVE KEY LOCALY
  //SO GET THE KEY FIRST FROM BACKEND
  useEffect(() => {
    (async () => {
      try {
        const keys = await api.key();
        const token = base64Encode(`${keys.username}:${keys.password}`);

        let customheaderkey = "";
        for (var property in keys) {
          if (property !== "username" && property !== "password") {
            customheaderkey = property;
          }
        }

        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = `Basic ${token}`;
          config.headers[customheaderkey] = keys["X-API-KEY"];
          return config;
        });
      } catch (error) {
        console.log({ error });
      }
      setloading(false);
    })();
  }, []);

  return (
    <HashRouter>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <FacebookCircularProgress />
            </Backdrop>
            {!loading && <Routes />}
          </React.Fragment>
        </ThemeProvider>
      </ReduxProvider>
    </HashRouter>
  );
}

export default App;
