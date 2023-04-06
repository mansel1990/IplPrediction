import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./index.scss";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const THEME = createTheme({
  typography: {
    fontFamily: `"Cabin Sketch", cursive`,
  },
});

ReactDOM.render(
  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();
