import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles, findNavigationItem } from "./layout";

const path = ["Reports", "Invitations"];
const navigation = findNavigationItem(navigationLinks, path);
const parentLabel = "Invitations";
const tiles = createTiles(navigation, parentLabel);

const ReportsInvitations = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[
        { text: "Home", path: "/Home" },
        { text: "Reports", path: "/Reports" },
        { text: "Invitations" },
      ]}
    />
  );
};

export default ReportsInvitations;
