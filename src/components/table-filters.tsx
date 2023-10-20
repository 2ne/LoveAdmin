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
          <div className="flex items-center h-10 px-1 mb-4 overflow-x-auto bg-white rounded shadow-sm ring-inset ring-1 ring-neutral-900 ring-opacity-10">
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
      className={
        isActive ? "text-primary-600 border-primary-500  bg-primary-50/75" : ""
      }
      icon={<FilterOutlined className="mt-px -ml-px" />}
      onClick={toggleActive}
    >
      Filters
    </Button>
  );
};
