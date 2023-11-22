import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Reports", "Financials", "Sales Reports"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Sales Reports";
const tiles = createTiles(navigation, parentLabel);

const ReportsFinancialsSales = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Reports", path: "/Reports" },
        { text: "Financials", path: "/Reports/Financials" },
        { text: "Sales Reports" },
      ]}
    />
  );
};

export default ReportsFinancialsSales;
