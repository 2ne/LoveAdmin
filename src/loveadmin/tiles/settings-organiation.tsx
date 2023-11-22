import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings", "Organisation"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Organisation";
const tiles = createTiles(navigation, parentLabel);

const SettingsOrganisation = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Settings", path: "/Settings" },
        { text: "Organisation" },
      ]}
    />
  );
};

export default SettingsOrganisation;
