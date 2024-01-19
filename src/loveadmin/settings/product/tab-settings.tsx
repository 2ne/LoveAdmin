import React, { useState } from "react";
import { Tabs } from "antd";

const TabSettings: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("Details");

  const navigation = [
    { name: "Details", key: "Details" },
    { name: "Pricing", key: "Pricing" },
    { name: "Billing", key: "Billing" },
    { name: "Renewal", key: "Renewal" },
    { name: "Discounts", key: "Discounts" },
    { name: "Age restrictions", key: "Age restrictions" },
    { name: "Capacity", key: "Capacity" },
    { name: "Waiting list", key: "Waiting list" },
    { name: "Trial", key: "Trial" },
  ];

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const tabItems = navigation.map((item) => ({
    label: item.name,
    key: item.key,
    children: <div>{item.name} content goes here</div>,
  }));

  return (
    <Tabs
      tabPosition="left"
      activeKey={activeTabKey}
      onChange={onTabChange}
      items={tabItems}
      className="gap-8 lg:gap-10 ant-tabs-left-custom"
    />
  );
};

export default TabSettings;
