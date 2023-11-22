import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Reports", "Financials"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Financials";
const tiles = createTiles(navigation, parentLabel);

const ReportsFinancials = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Reports", path: "/Reports" },
        { text: "Financials" },
      ]}
    />
  );
};

export default ReportsFinancials;
