import React, { ReactNode } from "react";

interface TableActionsProps {
  isVisible: boolean;
  children: ReactNode;
}

const TableActions: React.FC<TableActionsProps> = ({ isVisible, children }) => {
  return (
    <div
      className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-neutral-50 h-[38px] top-0 ml-7 transition-all z-20 flex items-center -mb-[38px] ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 ml-3.5">{children}</div>
    </div>
  );
};

export default TableActions;
