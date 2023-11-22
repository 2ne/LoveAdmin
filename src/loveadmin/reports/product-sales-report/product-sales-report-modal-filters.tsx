import { FC, ReactElement, useState } from "react";
import { Select, Input, Switch, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const ProductSalesReportModalFilters: FC = (): ReactElement => {
  const [filterScheduleText, setFilterScheduleText] = useState<string>("");
  const [filterAddressText, setFilterAddressText] = useState<string>("");
  const [onCancelledChecked, setOnCancelledChecked] = useState(false);
  const [zeroValueChecked, setZeroValueChecked] = useState(false);
  const [selectedScheduleItems, setSelectedScheduleItems] = useState<string[]>(
    []
  );
  const [selectedAddressItems, setSelectedAddressItems] = useState<string[]>(
    []
  );
  const scheduleOptions = [
    {
      value: "schedule1",
      label: (
        <>
          Competitive Squad Squad - Rolling <br /> (every week on Sunday until
          November 2, 2023)
        </>
      ),
    },
    {
      value: "schedule2",
      label: (
        <>
          Mini Flippers 12 - 18 Months Mini Flipper Mondays
          <br />
          (every week on Monday until December 29, 2023)
        </>
      ),
    },
    {
      value: "schedule3",
      label: (
        <>
          Tiny Flipper 6 - 12 Months Tiny Flipper Thursdays
          <br />
          (every week on Thursday until December 29, 2023)
        </>
      ),
    },
    {
      value: "schedule4",
      label: (
        <>
          Tiny Flipper 6 - 12 Months Tiny Flipper Thursdays
          <br />
          (every week on Thursday until December 29, 2023)
        </>
      ),
    },
    {
      value: "schedule5",
      label: (
        <>
          Tiny Flipper 6 - 12 Months Tiny Flipper Thursdays
          <br />
          (every week on Thursday until December 29, 2023)
        </>
      ),
    },
    {
      value: "schedule6",
      label: (
        <>
          Tiny Flipper 6 - 12 Months Tiny Flipper Thursdays
          <br />
          (every week on Thursday until December 29, 2023)
        </>
      ),
    },
    {
      value: "schedule7",
      label: (
        <>
          Tiny Flipper 6 - 12 Months Tiny Flipper Thursdays
          <br />
          (every week on Thursday until December 29, 2023)
        </>
      ),
    },
    {
      value: "schedule8",
      label: (
        <>
          Tiny Flipper 6 - 12 Months Tiny Flipper Thursdays
          <br />
          (every week on Thursday until December 29, 2023)
        </>
      ),
    },
  ];
  const addressOptions = [
    {
      value: "address1",
      label: <>Brighton main office</>,
    },
    {
      value: "address2",
      label: <>Burgess Hill, Triangle</>,
    },
  ];

  const extractTextFromLabel = (label: React.ReactElement | string) => {
    if (typeof label === "string") {
      return label.toLowerCase();
    }
    const children = React.Children.toArray(
      label.props.children
    ) as React.ReactChild[];
    return children
      .filter(
        (child: React.ReactChild): child is string => typeof child === "string"
      )
      .join(" ")
      .toLowerCase();
  };

  const filteredScheduleOptions = scheduleOptions.filter((option) => {
    const textContent = extractTextFromLabel(option.label);
    return textContent.includes(filterScheduleText.toLowerCase());
  });

  const filteredAddressOptions = addressOptions.filter((option) => {
    const textContent = extractTextFromLabel(option.label);
    return textContent.includes(filterAddressText.toLowerCase());
  });

  const onShowCancelledChange = (checked: boolean) => {
    setOnCancelledChecked(checked);
  };

  const toggleOnCancelled = () => {
    setOnCancelledChecked(!onCancelledChecked);
  };

  const onToggleZeroValueChange = (checked: boolean) => {
    setZeroValueChecked(checked);
  };

  const toggleZeroValue = () => {
    setZeroValueChecked(!zeroValueChecked);
  };

  const handleScheduleChange = (value: string[]) => {
    setSelectedScheduleItems(value);
  };

  const handleAddressChange = (value: string[]) => {
    setSelectedAddressItems(value);
  };

  const clearFilters = () => {
    setZeroValueChecked(false);
    setOnCancelledChecked(false);
    setSelectedScheduleItems([]);
    setSelectedAddressItems([]);
  };

  const selectCustomClasses =
    "shadow-none max-w-[15rem] [&:hover_.ant-select-selector]:bg-neutral-100 [&.ant-select-open_.ant-select-selector]:bg-neutral-100 [&_.ant-select-selector]:flex-nowrap [&_.ant-select-selection-overflow]:pl-1.5 [&_.ant-select-selection-overflow]:pr-0.5 [&_.ant-select-selection-overflow]:pt-px [&_.ant-select-selection-overflow]:flex-nowrap [&_.ant-select-selection-item]:font-medium [&_.ant-select-selection-item]:cursor-pointer [&_.ant-select-selection-item]:bg-transparent [&_.ant-select-selection-item]:m-0 [&_.ant-select-selection-item]:p-0 [&_.ant-select-selection-placeholder]:text-title [&_.ant-select-selection-placeholder]:right-0 [&.ant-select-active_.ant-select-selection-overflow-item:first-child]:max-w-[calc(100%-1.5rem)] [&_.ant-select-selection-overflow-item-rest_.ant-select-selection-item-content]:max-w-[1.15rem] [&_.ant-select-selection-overflow-item-rest_.ant-select-selection-item-content]:text-clip";

  const clearFilterButtonClass =
    onCancelledChecked ||
    selectedScheduleItems.length !== 0 ||
    selectedAddressItems.length !== 0
      ? "text-primary-600 hover:bg-primary-50"
      : "text-neutral-400 hover:bg-neutral-50";
  return (
    <>
      <Select
        bordered={false}
        className={selectCustomClasses + " min-w-[7.5rem] "}
        placeholder="All schedules"
        onChange={handleScheduleChange}
        mode="multiple"
        filterOption={false}
        value={selectedScheduleItems}
        maxTagCount={1}
        removeIcon={null}
        showSearch={false}
        popupMatchSelectWidth={false}
        rootClassName={
          (selectedScheduleItems.length > 1 ? "ant-select-active" : "") +
          " ant-select-dropdown-custom "
        }
        options={filteredScheduleOptions}
        dropdownRender={(menu) => (
          <>
            <div className="p-2">
              <Input
                bordered={false}
                className="bg-neutral-100"
                placeholder="Search schedules..."
                prefix={<SearchOutlined className="mr-1" />}
                value={filterScheduleText}
                onChange={(e) => setFilterScheduleText(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    return event.stopPropagation();
                  }
                }}
              />
            </div>
            <div className="[&_.rc-virtual-list-holder]:p-2 [&_.rc-virtual-list-holder]:pt-0">
              {menu}
            </div>
          </>
        )}
      />
      <Select
        bordered={false}
        className={selectCustomClasses + " min-w-[8rem] "}
        placeholder="All addresses"
        onChange={handleAddressChange}
        mode="multiple"
        filterOption={false}
        value={selectedAddressItems}
        maxTagCount={1}
        removeIcon={null}
        showSearch={false}
        popupMatchSelectWidth={false}
        rootClassName={
          (selectedAddressItems.length > 1 ? "ant-select-active" : "") +
          " ant-select-dropdown-custom "
        }
        options={filteredAddressOptions}
        dropdownRender={(menu) => (
          <>
            <div className="p-2">
              <Input
                bordered={false}
                className="bg-neutral-100"
                placeholder="Search addresses..."
                prefix={<SearchOutlined className="mr-1" />}
                value={filterAddressText}
                onChange={(e) => setFilterAddressText(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    return event.stopPropagation();
                  }
                }}
              />
            </div>
            <div className="[&_.rc-virtual-list-holder]:p-2 [&_.rc-virtual-list-holder]:pt-0">
              {menu}
            </div>
          </>
        )}
      />
      <div className="ml-auto pl-2.5">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center">
            <Switch
              size="small"
              checked={zeroValueChecked}
              onChange={onToggleZeroValueChange}
              className="relative top-px"
            />
            <span
              onClick={toggleZeroValue}
              className="pl-2 cursor-pointer select-none whitespace-nowrap"
            >
              Hide zero value sales
            </span>
          </div>
          <div className="flex items-center">
            <Switch
              size="small"
              checked={onCancelledChecked}
              onChange={onShowCancelledChange}
              className="relative top-px"
            />
            <span
              onClick={toggleOnCancelled}
              className="pl-2 cursor-pointer select-none whitespace-nowrap"
            >
              Show cancelled
            </span>
          </div>
        </div>
      </div>
      <Button
        type="text"
        className={clearFilterButtonClass + " bg-white/95 ml-2 !px-2"}
        onClick={clearFilters}
      >
        Clear filters
      </Button>
    </>
  );
};

export default ProductSalesReportModalFilters;
