import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Kisi from "kisi-client";

const kisiClient = new Kisi();

axios.interceptors.request.use(async (request) => {
  const response = await kisiClient.post("/logins", {
    login: { type: "device" },
    user: {
      domain: "test-task",
      email: "musavihussain@gmail.com",
      password: "Test@123456",
    },
  });

  request.headers["Access-Control-Allow-Origin"] = "*";
  request.headers["Accept"] = "*/*";
  request.headers["Content-Type"] = "application/json";
  request.headers["Authorization"] = `KISI-LOGIN ${response.secret}`;
  
  console.log(request)
  return request;
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
