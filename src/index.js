import ReactDOM from "react-dom";

import App from "./App";

import ContextAppProvider from "./ContextAPI";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <ContextAppProvider>
    <App />
  </ContextAppProvider>,
  rootElement
);
