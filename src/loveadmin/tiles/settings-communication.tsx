import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings", "Communication"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Communication";
const tiles = createTiles(navigation, parentLabel);

const SettingsCommunication = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Settings", path: "/Settings" },
        { text: "Communication" },
      ]}
    />
  );
};

export default SettingsCommunication;
