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
          colorTextHeading: "#262626", // tw zinc 900
          colorText: "#27272a", // tw zinc 800
          colorTextDescription: "#71717a", // tw zinc 500
          colorTextPlaceholder: "#a1a1aa", // tw zinc 400
          colorLink: "#0891b2", // tw cyan 600
          colorLinkHover: "#06b6d4", // tw cyan 500
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
