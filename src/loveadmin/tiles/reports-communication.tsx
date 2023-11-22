import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Reports", "Communication"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Communication";
const tiles = createTiles(navigation, parentLabel);

const ReportsCommunication = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Reports", path: "/Reports" },
        { text: "Communication" },
      ]}
    />
  );
};

export default ReportsCommunication;
