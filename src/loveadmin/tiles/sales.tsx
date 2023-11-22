import TileLayout from "./layout";
import { TileProps } from "./tile";

const tiles: TileProps[] = [
  {
    title: "Orders",
    colour: "primary",
    link: "/",
    parentLabel: "Sales Admin",
  },
  {
    title: "Invoices",
    colour: "primary",
    link: "/",
    parentLabel: "Sales Admin",
  },
  {
    title: "Payments",
    colour: "primary",
    link: "/",
    parentLabel: "Sales Admin",
  },
  {
    title: "Abandoned checkout",
    colour: "primary",
    link: "/",
    parentLabel: "Sales Admin",
  },
];

const Sales = () => {
  return (
    <TileLayout
      tiles={tiles}
      breadcrumb={[{ text: "Home", path: "/Home" }, { text: "Sales Admin" }]}
    />
  );
};

export default Sales;
