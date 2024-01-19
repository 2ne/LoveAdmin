import React, { useState } from "react";
import { Button, Dropdown, Menu, Checkbox, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type CapacityButtonProps = {
  isCapacityColours: boolean;
  onToggleCapacityColours: (isActive: boolean) => void;
  onCapacityLevelsChange: (selectedLevels: string[]) => void;
};

const CapacityButton: React.FC<CapacityButtonProps> = ({
  isCapacityColours,
  onToggleCapacityColours,
  onCapacityLevelsChange,
}) => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const capacityLevels = [
    {
      label: (
        <>
          <span>Green</span>
          <span className="mx-1 text-subtitle">·</span>
          <span className="text-subtitle">75%+</span>
        </>
      ),
      value: "green",
    },
    {
      label: (
        <>
          <span>Amber</span>
          <span className="mx-1 text-subtitle">·</span>
          <span className="text-subtitle">25% - 75%+</span>
        </>
      ),
      value: "amber",
    },
    {
      label: (
        <>
          <span>Red</span>
          <span className="mx-1 text-subtitle">·</span>
          <span className="text-subtitle">0% - 25%+</span>
        </>
      ),
      value: "red",
    },
    {
      label: (
        <>
          <span>Grey</span>
          <span className="mx-1 text-subtitle">·</span>
          <span className="text-subtitle">No maximum capacity</span>
        </>
      ),
      value: "grey",
    },
  ];

  const handleMenuClick = (e: {
    domEvent: { stopPropagation: () => void };
  }) => {
    e.domEvent.stopPropagation();
  };

  const toggleAllLevels = () => {
    // Check if all levels are currently selected
    const allLevelsSelected = selectedLevels.length === capacityLevels.length;

    let newLevels: string[] = [];

    // If all levels are selected, clear them, else select all levels
    if (allLevelsSelected) {
      newLevels = [];
    } else {
      // Check if the selected levels array is empty or not
      if (selectedLevels.length === 0) {
        // If it's empty, select all levels
        newLevels = capacityLevels.map((level) => level.value);
      }
    }

    setSelectedLevels(newLevels);
    onCapacityLevelsChange(newLevels);
    onToggleCapacityColours(newLevels.length > 0);
  };

  const handleCheckboxChange = (levelValue: string, e: CheckboxChangeEvent) => {
    const wasPreviouslyEmpty = selectedLevels.length === 0;
    const newLevels = e.target.checked
      ? [...selectedLevels, levelValue]
      : selectedLevels.filter((v) => v !== levelValue);
    const isNewlyEmpty = newLevels.length === 0;

    setSelectedLevels(newLevels);
    onCapacityLevelsChange(newLevels);

    // Call onToggleCapacityColours only if the state transitioned from empty to non-empty, or vice versa
    if (wasPreviouslyEmpty !== isNewlyEmpty) {
      onToggleCapacityColours(!isNewlyEmpty);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="pb-1.5 select-none">
      <div className="px-3 py-1 font-medium">Filter capacity levels</div>
      {capacityLevels.map((level) => (
        <Menu.Item key={level.value} className="py-0">
          <Checkbox
            checked={selectedLevels.includes(level.value)}
            onChange={(e) => handleCheckboxChange(level.value, e)}
            className="w-full py-[3px]"
          >
            {level.label}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Tooltip
      open={isHovering && !dropdownOpen}
      title={
        !isCapacityColours ? "Show capacity levels" : "Hide capacity levels"
      }
      placement="bottom"
      className="flex items-center group"
      trigger="hover"
    >
      <Button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`rounded-r-none hover:z-10 ${
          isCapacityColours
            ? "border-primary-500 z-10 text-primary-600 bg-primary-50/75"
            : ""
        }`}
        icon={
          <div className="relative mr-0.5 -top-px">
            <div
              className={`h-0.5 w-3 rounded-sm ${
                !isCapacityColours
                  ? "bg-neutral-200 group-hover:bg-primary-500/25"
                  : "bg-success-400"
              } ring-1 ring-white`}
            ></div>
            <div
              className={`h-0.5 w-3 rounded-sm ${
                !isCapacityColours
                  ? "bg-neutral-300 group-hover:bg-primary-500/50"
                  : "bg-warning-400"
              } my-[3px] ring-1 ring-white`}
            ></div>
            <div
              className={`h-0.5 w-3 rounded-sm ${
                !isCapacityColours
                  ? "bg-neutral-400 group-hover:bg-primary-500"
                  : "bg-danger-400"
              } ring-1 ring-white`}
            ></div>
          </div>
        }
        onClick={toggleAllLevels}
      >
        Capacity
      </Button>
      <Dropdown
        overlay={menu}
        onVisibleChange={(flag) => setDropdownOpen(flag)}
        visible={dropdownOpen}
        trigger={["click"]}
      >
        <Button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`-ml-px rounded-l-none group-hover:border-primary-500 group-hover:text-primary-600 ${
            isCapacityColours
              ? "border-primary-500 text-primary-600 bg-primary-50/75"
              : ""
          }`}
          icon={<DownOutlined />}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </Dropdown>
    </Tooltip>
  );
};

export default CapacityButton;
