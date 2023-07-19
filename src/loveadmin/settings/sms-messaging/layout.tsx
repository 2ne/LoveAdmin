import React from "react";
import { Layout, Button, Breadcrumb } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Settings from "./settings";
import Templates from "./templates";
import History from "./history";
import { Tabs } from "antd";

const { Header, Content } = Layout;

const SMSMessagingLayout = () => {
  const items = [
    {
      key: "1",
      label: `Settings`,
      children: <Settings />,
    },
    {
      key: "2",
      label: `Templates`,
      children: <Templates />,
    },
    {
      key: "3",
      label: `History`,
      children: <History />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center px-6 border-none shadow-none bg-neutral-800">
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          className="mr-3 -ml-3 hover:bg-neutral-700 text-neutral-50 hover:text-white"
        />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex">
            <img
              src="https://pro.loveadmin.com/images/loveadminlogo-reversed-v2.png"
              className="object-contain h-[14px] ml-px"
            />
          </div>
          <Breadcrumb className="[&_li]:text-neutral-400 leading-4">
            <Breadcrumb.Item className="cursor-pointer hover:underline">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer hover:underline">
              Settings
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer hover:underline">
              Communication
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-neutral-50">
              SMS Messaging
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Header>
      <Layout>
        <Content className="p-6 pb-16 bg-white">
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SMSMessagingLayout;
