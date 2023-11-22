import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "regenerator-runtime/runtime";
import "./styles/App.css";
import App from "./App";
import { FavouritesProvider } from "./components/favourites-context";
import { NavigationProvider } from "./components/navigation-context";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <ConfigProvider
    theme={{
      token: {
        colorBgLayout: "#f8fafc", // tw slate 50
        colorTextBase: "#020617", // tw slate 950
        colorTextHeading: "#0f172a", // tw slate 900
        colorText: "#1e293b", // tw slate 800
        colorTextDescription: "#64748b", // tw slate 500
        colorTextPlaceholder: "#94a3b8", // tw slate 400
        colorLink: "#1f91a8", // primary 600
        colorInfo: "#29b8cc", // tw primary 500
        colorPrimary: "#29b8cc", // primary 500
        colorSuccess: "#10b981", // tw emerald 500
        colorWarning: "#f59e0b", // tw amber 500
        colorError: "#f43f5e", // tw rose 500
        colorBorder: "rgba(2, 6, 23, 0.125)", // tw slate 950/12.5
        colorBgMask: "rgba(2, 6, 23, 0.35)", // tw slate 950/0.35

        borderRadius: 4,
        wireframe: false,
        fontFamily: "'Barlow', sans-serif",

        motionDurationSlow: "0.2s",
      },
      components: {
        Button: {
          defaultShadow:
            "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(2, 6, 23, 0.05) 0px 1px 2px 0px",
        },
        Table: {
          headerBorderRadius: 6,
          borderColor: "#e9eef4", // tw slate 200/75
          headerBg: "#f5f7fa", // tw slate 100/75
          headerColor: "#0f172a", // tw slate 900
          headerSortHoverBg: "#e9eef4", // tw slate 200/75
          headerSortActiveBg: "#e9eef4", // tw slate 200/75
          bodySortBg: "#f8fafc", // tw slate 50
          footerBg: "#f5f7fa", // tw slate 100/75
          footerColor: "#0f172a", // tw slate 900
          rowHoverBg: "#f5f7fa", // tw slate 100/75
        },
      },
    }}
  >
    <NavigationProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </NavigationProvider>
  </ConfigProvider>
);
