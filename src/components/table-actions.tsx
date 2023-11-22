import { Button } from "antd";
import React, { ReactNode } from "react";

interface TableActionsProps {
  isVisible: boolean;
  collapsed?: boolean;
  children: ReactNode;
  hasSidebar?: boolean;
}

const TableActions: React.FC<TableActionsProps> = ({ isVisible, children }) => {
  return (
    <div
      className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-gradient-to-r from-[#f5f7fa] to-neutral-50/50 to-50% h-[38px] top-0 ml-7 rounded-tr-md transition-all z-20 flex items-center -mb-[38px] ${
        isVisible
          ? "sticky--active opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 pl-3.5 bg-[#f5f7fa] h-[38px] relative after:absolute after:inset-0 after:-right-12 after:left-auto after:w-12 after:bg-gradient-to-r after:rounded-tr-md after:from-[#f5f7fa] after:via-neutral-100/95 after:to-transparent">
        {children}
      </div>
    </div>
  );
};

/* const TableActions: React.FC<TableActionsProps> = ({
  isVisible,
  collapsed,
  children,
  hasSidebar,
}) => {
  return (
    <div
      className={`select-none border-l-4 border-primary-500 max-w-fit fixed bottom-[calc(4vh+3rem)] bg-white pl-5 pr-3 py-2 rounded-lg right-0 mx-auto overflow-x-auto overflow-y-hidden scrollbar-thin-x transition-all z-50 flex items-center ring-1 ring-inset shadow-md ring-primary-950/10 shadow-primary-800/10 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 pointer-events-none translate-y-4"
      } ${!collapsed && hasSidebar ? "left-[280px]" : "left-0"} `}
    >
      <div className="relative flex items-center gap-4">
        {children}
        <Button
          className="shadow-none -mr-0.5 border-0 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          icon={
            <svg
              fill-rule="evenodd"
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="close"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
            </svg>
          }
        ></Button>
      </div>
    </div>
  );
}; */

export default TableActions;
