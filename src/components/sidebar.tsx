import React, { useState, ReactNode, useEffect } from "react";
import { Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
interface SidebarProps {
  children: ReactNode;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  collapsed,
  setCollapsed,
}) => {
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setCollapsed]);

  return (
    <Sider
      width={280}
      trigger={null}
      collapsible
      collapsedWidth={20}
      collapsed={collapsed}
      className="transition-all border-l-0 border-r border-solid border-y-0 border-neutral-200 bg-neutral-50"
    >
      <div
        className={`transition-opacity ${
          collapsed ? " opacity-0 pointer-events-none " : " contents "
        }`}
      >
        {children}
      </div>
      <Button
        shape="circle"
        onClick={toggleCollapsed}
        className={`fixed -translate-y-1/2 top-1/2 transition-all w-6 h-6 min-w-0 shadow-md ${
          collapsed ? "left-[7px]" : "left-[268px]"
        }`}
      >
        {collapsed ? (
          <RightOutlined className="[&>svg]:w-3 [&>svg]:h-3" />
        ) : (
          <LeftOutlined className="[&>svg]:w-3 [&>svg]:h-3" />
        )}
      </Button>
    </Sider>
  );
};

export default Sidebar;
