import { Layout } from "antd";
import LoveAdminHeader from "../../components/header";
import Tile, { TileProps } from "./tile";
import LatestNews from "../../components/latest-news";
import { useFavourites } from "../../components/favourites-context";
import { AnimatePresence, motion } from "framer-motion";
import {
  Motion,
  defaultTransition,
} from "../../components/framer-motion-custom";
import React from "react";
import { Link } from "react-router-dom";
const { Content } = Layout;

interface BreadcrumbItem {
  text: string;
  path?: string;
}

interface TileLayoutProps {
  home?: boolean;
  tiles: TileProps[];
  breadcrumb?: BreadcrumbItem[];
}

export const findNavigationItem = (links: any[], path: string[]) => {
  let children = links;

  for (const itemName of path) {
    const itemLink = children.find((link) => link.name === itemName);
    if (!itemLink) {
      return [];
    }
    children = itemLink.children || [];
  }

  return children;
};

export const createTiles = (data: any[], parentLabel?: string): TileProps[] =>
  data.map((item) => ({
    title: item.tileTitle ? item.tileTitle : item.name,
    icon: item.tileIcon ? item.tileIcon : item.icon,
    colour: item.colour ? item.colour : "primary",
    link: item.tileLink ? item.tileLink : item.href,
    tileIconClassName: item.tileIconClassName,
    stack: item.href ? false : true,
    parentLabel: parentLabel,
  }));

const TileLayout: React.FC<TileLayoutProps> = ({
  home = false,
  tiles,
  breadcrumb,
}) => {
  const { favouritedTiles } = useFavourites();

  const renderBreadcrumb = (items: BreadcrumbItem[]) => (
    <div className="flex items-center gap-2 mb-3.5 -mt-1 text-lg font-display text-title">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.path ? (
            <Link to={item.path} className="underline-offset-4 decoration-2">
              {item.text}
            </Link>
          ) : (
            <span>{item.text}</span>
          )}
          {index < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );

  const customTileVariants = {
    initial: {
      opacity: 0,
      transition: { ...defaultTransition },
      className: "pb-1 pointer-events-none",
    },
    animate: {
      opacity: 1,
      transition: { ...defaultTransition },
      className: "pb-1",
    },
    exit: {
      opacity: 0,
      transition: { ...defaultTransition },
      className: "pb-1 pointer-events-none",
    },
  };

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader compact={true} />
      <Layout className="bg-white rounded-t-lg">
        <Content className="flex items-start w-full pt-6 pl-6 mx-auto max-xl:pr-6 2xl:pt-8 gap-9 max-w-screen-2xl">
          <div className="flex-grow">
            <AnimatePresence initial={false}>
              {favouritedTiles.length > 0 && (
                <Motion animation="heightInOut" overflowHidden={true}>
                  <section className="mb-10">
                    <div className="flex items-center gap-2 mb-3.5 -mt-1 text-lg font-display text-title">
                      Favourites
                    </div>
                    <div className="grid items-start gap-4 grid-cols-[repeat(auto-fill,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
                      <AnimatePresence initial={false}>
                        {favouritedTiles.map((tile) => (
                          <motion.div
                            key={tile.title}
                            variants={customTileVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            layout
                          >
                            <Tile {...tile} showParentLabel={true} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                </Motion>
              )}
            </AnimatePresence>
            <section className="mb-10">
              {home ? (
                <AnimatePresence initial={false}>
                  {favouritedTiles.length > 0 && (
                    <Motion animation="heightInOut" overflowHidden={true}>
                      <div className="flex items-center gap-2 mb-3.5 -mt-1 text-lg font-display text-title">
                        <span>Home</span>
                      </div>
                    </Motion>
                  )}
                </AnimatePresence>
              ) : (
                <>{breadcrumb && renderBreadcrumb(breadcrumb)}</>
              )}
              <div className="grid items-start gap-4 grid-cols-[repeat(auto-fill,minmax(155px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
                {tiles.map((tile) => (
                  <Tile key={tile.title} {...tile} />
                ))}
              </div>
            </section>
          </div>
          <aside className="hidden xl:block h-[calc(100svh-4rem)] -mt-6 2xl:-mt-8 py-8 pr-6 pl-9 pb-10 w-[22.75rem] from-primary-50 to-transparent bg-gradient-to-r overflow-y-auto scrollbar-thin-y sticky top-0">
            <LatestNews />
          </aside>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TileLayout;
