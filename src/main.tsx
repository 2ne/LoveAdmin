import React from "react";
import ReactDOM from "react-dom";

import { ConfigProvider } from "antd";
import "./App.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#262626", // tw neutral 800
          colorText: "#262626", // tw neutral 800
          colorTextDescription: "#737373", // tw neutral 500
          colorInfo: "#06b6d4", // tw cyan 500
          colorPrimary: "#06b6d4", // tw cyan 500
          colorSuccess: "#10b981", // tw emerald 500
          colorWarning: "#f59e0b", // tw amber 500
          colorError: "#f43f5e", // tw rose 500
          borderRadius: 4,
          wireframe: false,
          fontFamily: "'Barlow', sans-serif",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
