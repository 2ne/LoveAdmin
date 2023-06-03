import { Tabs, TabsProps } from "antd";
import React, { ReactElement } from "react";

const Finance: React.FC = (): ReactElement => {
  const financeItems: TabsProps["items"] = [
    {
      key: "1",
      label: `Invoices`,
      children: <div>1</div>,
    },
    {
      key: "2",
      label: `Upcoming renewals`,
      children: <div>2</div>,
    },
    {
      key: "3",
      label: `Awaiting approval`,
      children: <div>3</div>,
    },
    {
      key: "4",
      label: `Scheduled orders`,
      children: <div>4</div>,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={financeItems}
        onChange={onChange}
        className="[&_.ant-tabs-tab]:!ml-0 [&_.ant-tabs-tab]:!mr-6"
      />
    </div>
  );
};

export default Finance;
