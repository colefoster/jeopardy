import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../src/redux/store";

const lastRoute = localStorage.getItem('lastRoute') || '/';

if (window.location.pathname !== lastRoute) {
  window.location.href = lastRoute;
} else {

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={Store}>
        <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}