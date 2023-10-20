import { FC, ReactElement, useState } from "react";
import { Select, Input, Switch, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const SMSReportFilters: FC = (): ReactElement => {
  const [filterMessageTypeText, setFilterMessageTypeText] =
    useState<string>("");
  const [filterUserGroupText, setFilterUserGroupText] = useState<string>("");
  const [onSystemMessagesChecked, setOnSystemMessagesChecked] = useState(false);
  const [selectedMessageTypes, setSelectedScheduleItems] = useState<string[]>(
    []
  );
  const [selectedUserGroupItems, setSelectedUserGroupItems] = useState<
    string[]
  >([]);

  const messageTypeOptions = [
    {
      value: "messageType1",
      label: <>New event</>,
    },
    {
      value: "messageType2",
      label: <>Special offer</>,
    },
    {
      value: "messageType3",
      label: <>Payment due</>,
    },
  ];

  const UserGroupOptions = [
    {
      value: "UserGroup1",
      label: <>Admin staff</>,
    },
    {
      value: "UserGroup2",
      label: <>Coaches</>,
    },
    {
      value: "UserGroup3",
      label: <>All Parents</>,
    },
    {
      value: "UserGroup4",
      label: <>Swimming Event 2022 Participants</>,
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

  const filteredMessageTypeOptions = messageTypeOptions.filter((option) => {
    const textContent = extractTextFromLabel(option.label);
    return textContent.includes(filterMessageTypeText.toLowerCase());
  });

  const filteredUserGroupOptions = UserGroupOptions.filter((option) => {
    const textContent = extractTextFromLabel(option.label);
    return textContent.includes(filterUserGroupText.toLowerCase());
  });

  const onShowSystemMessagesChange = (checked: boolean) => {
    setOnSystemMessagesChecked(checked);
  };

  const toggleOnSystemMessages = () => {
    setOnSystemMessagesChecked(!onSystemMessagesChecked);
  };

  const handleMessageTypeChange = (value: string[]) => {
    setSelectedScheduleItems(value);
  };

  const handleUserGroupChange = (value: string[]) => {
    setSelectedUserGroupItems(value);
  };

  const clearFilters = () => {
    setOnSystemMessagesChecked(false);
    setSelectedScheduleItems([]);
    setSelectedUserGroupItems([]);
  };

  const selectCustomClasses =
    "max-w-[15rem] [&:hover_.ant-select-selector]:bg-neutral-100 [&.ant-select-open_.ant-select-selector]:bg-neutral-100 [&_.ant-select-selector]:flex-nowrap [&_.ant-select-selection-overflow]:pl-1.5 [&_.ant-select-selection-overflow]:pr-0.5 [&_.ant-select-selection-overflow]:pt-px [&_.ant-select-selection-overflow]:flex-nowrap [&_.ant-select-selection-item]:font-medium [&_.ant-select-selection-item]:cursor-pointer [&_.ant-select-selection-item]:bg-transparent [&_.ant-select-selection-item]:m-0 [&_.ant-select-selection-item]:p-0 [&_.ant-select-selection-placeholder]:text-title [&_.ant-select-selection-placeholder]:right-0 [&.ant-select-active_.ant-select-selection-overflow-item:first-child]:max-w-[calc(100%-1.5rem)] [&_.ant-select-selection-overflow-item-rest_.ant-select-selection-item-content]:max-w-[1.15rem] [&_.ant-select-selection-overflow-item-rest_.ant-select-selection-item-content]:text-clip";

  const clearFilterButtonClass =
    onSystemMessagesChecked ||
    selectedMessageTypes.length !== 0 ||
    selectedUserGroupItems.length !== 0
      ? "text-primary-600 hover:bg-primary-50"
      : "text-neutral-400 hover:bg-neutral-50";
  return (
    <>
      <Select
        bordered={false}
        className={selectCustomClasses + " min-w-[8.15rem] "}
        placeholder="Message types"
        onChange={handleMessageTypeChange}
        mode="multiple"
        filterOption={false}
        value={selectedMessageTypes}
        maxTagCount={1}
        removeIcon={null}
        showSearch={false}
        popupMatchSelectWidth={false}
        rootClassName={
          (selectedMessageTypes.length > 1 ? "ant-select-active" : "") +
          " ant-select-dropdown-custom "
        }
        options={filteredMessageTypeOptions}
        dropdownRender={(menu) => (
          <>
            <div className="w-56 p-2">
              <Input
                bordered={false}
                className="bg-neutral-100"
                placeholder="Search messages types..."
                prefix={<SearchOutlined className="mr-1" />}
                value={filterMessageTypeText}
                onChange={(e) => setFilterMessageTypeText(e.target.value)}
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
        className={selectCustomClasses + " min-w-[7.15rem]"}
        placeholder="User groups"
        onChange={handleUserGroupChange}
        mode="multiple"
        filterOption={false}
        value={selectedUserGroupItems}
        maxTagCount={1}
        removeIcon={null}
        showSearch={false}
        popupMatchSelectWidth={false}
        rootClassName={
          (selectedUserGroupItems.length > 1 ? "ant-select-active" : "") +
          " ant-select-dropdown-custom "
        }
        options={filteredUserGroupOptions}
        dropdownRender={(menu) => (
          <>
            <div className="p-2">
              <Input
                bordered={false}
                className="bg-neutral-100"
                placeholder="Search user groups..."
                prefix={<SearchOutlined className="mr-1" />}
                value={filterUserGroupText}
                onChange={(e) => setFilterUserGroupText(e.target.value)}
              />
            </div>
            <div className="[&_.rc-virtual-list-holder]:p-2 [&_.rc-virtual-list-holder]:pt-0">
              {menu}
            </div>
          </>
        )}
      />
      <div className="ml-auto">
        <div className="flex items-center text-sm">
          <Switch
            size="small"
            checked={onSystemMessagesChecked}
            onChange={onShowSystemMessagesChange}
          />
          <span
            onClick={toggleOnSystemMessages}
            className="pl-2 cursor-pointer select-none whitespace-nowrap"
          >
            Show system messages
          </span>
        </div>
      </div>
      <Button
        type="text"
        className={
          clearFilterButtonClass +
          " bg-white/95 min-w-[5.75rem] ml-2 sticky -right-2 !px-2 "
        }
        onClick={clearFilters}
      >
        Clear filters
      </Button>
    </>
  );
};

export default SMSReportFilters;
