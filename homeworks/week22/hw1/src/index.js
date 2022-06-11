import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary_300: "#3333dd",
    primary_400: "#e33e3e",
    primary_500: "#af0505",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
