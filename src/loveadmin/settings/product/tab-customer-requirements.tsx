import React, { useState } from "react";
import { Tabs, TabsProps } from "antd";
import RegistrationForms from "./tab-customer-requirements-form";

const TabCustomerRequirements: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("1");

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const items: TabsProps["items"] = [
    { label: "Forms", key: "1", children: <RegistrationForms /> },
    { label: "Consents", key: "2", children: <div>Consents Content</div> },
    {
      label: "Emergency contacts",
      key: "3",
      children: <div>Emergency Contacts Content</div>,
    },
    {
      label: "Required files",
      key: "4",
      children: <div>Required Files Content</div>,
    },
    {
      label: "Product fields",
      key: "5",
      children: <div>Product Fields Content</div>,
    },
    {
      label: "Product relationships",
      key: "6",
      children: <div>Product Relationships Content</div>,
    },
  ];

  return (
    <Tabs
      tabPosition="left"
      activeKey={activeTabKey}
      items={items}
      onChange={onTabChange}
      className="gap-8 lg:gap-10 ant-tabs-left-custom"
    />
  );
};

export default TabCustomerRequirements;
