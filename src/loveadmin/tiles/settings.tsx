import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Settings";
const tiles = createTiles(navigation, parentLabel);

const Settings = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[{ text: "Home", path: "/Home" }, { text: "Settings" }]}
    />
  );
};

export default Settings;
