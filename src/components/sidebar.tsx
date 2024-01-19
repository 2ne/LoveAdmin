import React, { ReactNode, useEffect } from "react";
import { Button } from "antd";
import Sider from "antd/es/layout/Sider";
interface SidebarProps {
  children: ReactNode;
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenWhenCollapsed?: boolean;
  className?: string;
  hideButton?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  collapsed,
  setCollapsed,
  hiddenWhenCollapsed,
  className,
  hideButton,
}) => {
  const toggleCollapsed = () => {
    setCollapsed && setCollapsed(!collapsed);
  };

  if (setCollapsed)
    useEffect(() => {
      if (!collapsed && setCollapsed) {
        const handleResize = () => {
          if (window.innerWidth < 1400) {
            setCollapsed(true);
          } else {
            setCollapsed(false);
          }
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }, [setCollapsed]);

  return (
    <Sider
      width={280}
      trigger={null}
      collapsible
      collapsedWidth={hiddenWhenCollapsed ? 0 : 20}
      collapsed={collapsed}
      className={`max-sm:!w-0 transition-all border-0 border-r rounded-tl-lg bg-neutral-50 border-neutral-200/90 ${
        collapsed ? "" : "sidebar--active"
      } ${className}`}
    >
      <div
        className={`transition-opacity ${
          collapsed ? " opacity-0 pointer-events-none " : " contents "
        }`}
      >
        {children}
      </div>
      {!hiddenWhenCollapsed && !hideButton && (
        <Button
          shape="circle"
          onClick={toggleCollapsed}
          className={`fixed z-20 -translate-y-1/2 top-1/2 border-0 ring-1 ring-inset ring-primary-800/20 transition-all w-6 h-6 min-w-0 shadow shadow-primary-800/10 hover:ring-primary-500 ${
            collapsed ? "left-[7px]" : "left-[268px]"
          }`}
        >
          <svg
            width="200"
            height="200"
            viewBox="100 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3.5 h-3.5 ${
              collapsed
                ? "rotate-90 translate-x-0.5"
                : "-rotate-90 -translate-x-px"
            }`}
          >
            <path
              d="M135.040087,42.9038952 L126.916758,21.8263182 C126.72188,21.2929683 125.973139,21.2929683 125.768004,21.8160615 L117.460054,42.9141519 C117.213893,43.5295556 116.629259,43.929568 115.972829,43.929568 L111.531665,43.929568 C110.393169,43.929568 109.613657,42.760301 110.054696,41.703858 L121.911475,13.5491383 C122.311487,12.5952626 123.244849,11.9696021 124.291036,11.9696021 L128.250133,11.9696021 C129.296319,11.9696021 130.239938,12.6055193 130.63995,13.5799085 L142.076203,41.7243714 C142.506985,42.7808144 141.727474,43.929568 140.599234,43.929568 L136.527313,43.929568 C135.870882,43.929568 135.275992,43.5192989 135.040087,42.9038952 Z"
              fill="#29B8CC"
            ></path>
          </svg>
        </Button>
      )}
    </Sider>
  );
};

export default Sidebar;
