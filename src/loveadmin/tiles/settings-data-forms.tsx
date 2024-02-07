import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings", "Data", "Forms"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Forms";
const tiles = createTiles(navigation, parentLabel);

const SettingsDataForms = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Settings", path: "/Settings" },
        { text: "Data", path: "/Settings/Data" },
        { text: "Forms" },
      ]}
    />
  );
};

export default SettingsDataForms;
