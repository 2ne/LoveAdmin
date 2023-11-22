import { ReactElement, FC, ReactNode } from "react";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { AnimatePresence } from "framer-motion";
import { Motion } from "./framer-motion-custom";

interface TableFilterBarProps {
  isActive: boolean;
  children: ReactNode;
}

interface TableFilterButtonProps {
  toggleActive: () => void;
  isActive: boolean;
}

export const TableFilterBar: FC<TableFilterBarProps> = ({
  isActive,
  children,
}): ReactElement => {
  return (
    <AnimatePresence>
      {isActive && (
        <Motion animation="heightInOut">
          <div className="flex items-center h-10 px-1 mt-3 overflow-x-auto overflow-y-hidden text-sm font-normal border rounded border-neutral-950/10 scrollbar-thin-x">
            {children}
          </div>
        </Motion>
      )}
    </AnimatePresence>
  );
};

export const TableFilterButton: FC<TableFilterButtonProps> = ({
  toggleActive,
  isActive,
}): ReactElement => {
  return (
    <Button
      className={`max-sm:w-9 max-sm:[&_.ant-btn-icon]:m-0
        ${
          isActive
            ? "text-primary-600 border-primary-500  bg-primary-50/75"
            : ""
        }
      `}
      icon={<FilterOutlined className="mt-px -ml-px" />}
      onClick={toggleActive}
    >
      <div className="hidden sm:contents">Filters</div>
    </Button>
  );
};
