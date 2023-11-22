import { Menu } from "antd";
import { motion } from "framer-motion";
import { defaultTransition } from "./framer-motion-custom";
import { useNavigationContext } from "./navigation-context";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { navigationLinks } from "../loveadmin/navigation-links";

const { SubMenu, Item } = Menu;

const renderMenuItems = (data: any[], toggleNav: () => void) =>
  data.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.name}>
          {renderMenuItems(item.children, toggleNav)}
        </SubMenu>
      );
    }
    return (
      <Item key={item.key} icon={item.icon} onClick={toggleNav}>
        <Link to={item.href}>{item.name}</Link>
      </Item>
    );
  });

const overlayVariants = {
  open: { opacity: 1, display: "block", transition: { ...defaultTransition } },
  closed: { opacity: 0, transition: { ...defaultTransition } },
};

const sidebarVariants = {
  open: { x: 0, transition: { ...defaultTransition } },
  closed: { x: "-100%", transition: { ...defaultTransition } },
};

export default function Navigation() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { isNavigationOpen, toggleNavigation } = useNavigationContext();
  const location = useLocation();

  const getSelectedKeysAndParents = (
    pathname: string
  ): { selectedKeys: string[]; openKeys: string[] } => {
    const foundSelectedKeys: string[] = [];
    let foundOpenKeys: string[] = [];

    const searchKeys = (items: any[], parents: string[]) => {
      items.forEach((item) => {
        if (item.href === pathname) {
          foundSelectedKeys.push(item.key);
          foundOpenKeys = parents;
        }
        if (item.children) {
          searchKeys(item.children, parents.concat(item.key));
        }
      });
    };

    searchKeys(navigationLinks, []);
    return { selectedKeys: foundSelectedKeys, openKeys: foundOpenKeys };
  };

  useEffect(() => {
    const { selectedKeys: newSelectedKeys, openKeys: newOpenKeys } =
      getSelectedKeysAndParents(location.pathname);
    setSelectedKeys(newSelectedKeys);
    setOpenKeys(newOpenKeys);
  }, [location.pathname]);

  return (
    <>
      {isNavigationOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 cursor-pointer"
          variants={overlayVariants}
          initial="closed"
          animate={isNavigationOpen ? "open" : "closed"}
          onClick={toggleNavigation}
        />
      )}
      <motion.div
        className="fixed inset-y-0 left-0 z-50 w-[17.75rem] shadow-xl overflow-hidden bg-white rounded-tr-lg"
        variants={sidebarVariants}
        initial="closed"
        animate={isNavigationOpen ? "open" : "closed"}
      >
        <div className="h-full overflow-y-auto select-none scrollbar-thin-y">
          <Link
            onClick={toggleNavigation}
            to="/Home"
            className="inline-flex px-[1.5rem] pt-5 pb-4"
          >
            <img
              src="https://pro.loveadmin.com/images/loveadminlogo-v2.png"
              className="object-contain h-[19px]"
            />
          </Link>
          <Menu
            mode="inline"
            className="text-brand-gray !border-r-0"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
          >
            {renderMenuItems(navigationLinks, toggleNavigation)}
          </Menu>
        </div>
      </motion.div>
    </>
  );
}
