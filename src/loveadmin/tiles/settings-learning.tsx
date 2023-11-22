import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings", "Learning"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Learning";
const tiles = createTiles(navigation, parentLabel);

const SettingsLearning = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Settings", path: "/Settings" },
        { text: "Learning" },
      ]}
    />
  );
};

export default SettingsLearning;
