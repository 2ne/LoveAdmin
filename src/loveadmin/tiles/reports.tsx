import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Reports"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Reports";
const tiles = createTiles(navigation, parentLabel);

const Reports = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[{ text: "Home", path: "/Home" }, { text: "Reports" }]}
    />
  );
};

export default Reports;
