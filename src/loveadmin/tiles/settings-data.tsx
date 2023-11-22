import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings", "Data"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Data";
const tiles = createTiles(navigation, parentLabel);

const SettingsData = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Settings", path: "/Settings" },
        { text: "Data" },
      ]}
    />
  );
};

export default SettingsData;
