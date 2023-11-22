import { navigationLinks } from "../navigation-links";
import TileLayout, { createTiles } from "./layout";

const tiles = createTiles(navigationLinks);

const Home = () => {
  return (
    <TileLayout home={true} tiles={tiles} breadcrumb={[{ text: "Home" }]} />
  );
};

export default Home;
