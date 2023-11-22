import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Settings", "Organisation", "Payment Providers"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Payment Providers";
const tiles = createTiles(navigation, parentLabel);

const SettingsOrganisationProviders = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Settings", path: "/Settings" },
        { text: "Organisation", path: "/Settings/Organisation" },
        { text: "Payment Providers" },
      ]}
    />
  );
};

export default SettingsOrganisationProviders;
