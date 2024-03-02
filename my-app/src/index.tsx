import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./state/api/apiSlice";
import Notification from "./components/notification/Notification";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider api={apiSlice}>
          <Provider store={store}>
           
            <App key="app" />
            <Notification key="notification"  />
          </Provider>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
