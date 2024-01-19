import React, { CSSProperties, ReactNode } from "react";
import { RightOutlined } from "@ant-design/icons";

interface HomeWidgetProps {
  title: string;
  setActiveTab?: () => void;
  value: string | ReactNode;
  icon?: ReactNode;
  teamColour?: CSSProperties;
  className?: string;
  extra?: ReactNode;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({
  title,
  setActiveTab,
  value,
  icon,
  teamColour: teamColourClass,
  className,
  extra,
}) => {
  return (
    <button
      type="button"
      onClick={setActiveTab}
      className={`group text-left relative p-5 overflow-hidden bg-white rounded-lg shadow-sm text-neutral-800 ring-1 ring-black/5 hover:no-underline ${
        className ? className : "row-span-1 col-span-1"
      }`}
    >
      <div className="relative flex flex-col justify-between h-full">
        <div
          style={teamColourClass}
          className={`group-hover:underline flex items-center gap-1 -mt-1.5 text-xl font-medium ${
            !teamColourClass ? "text-primary-500" : ""
          }`}
        >
          <span>{title}</span>
          <RightOutlined className="mt-1 text-base opacity-50" />
          {extra && (
            <div className="relative flex ml-auto -space-x-1 top-1">
              {extra}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 -mb-1.5 text-2xl font-bold">
          <span className="flex-grow line-clamp-2">{value}</span>
          {icon && icon}
        </div>
      </div>
    </button>
  );
};

export default HomeWidget;
