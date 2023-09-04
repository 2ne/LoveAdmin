import React from "react";
import { Layout, Button, Breadcrumb } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Settings from "./settings";
import Templates from "./templates";
import History from "./history";
import { Tabs } from "antd";
import LoveAdminHeader from "../../../components/header";

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
      <LoveAdminHeader
        breadcrumbChildren={
          <>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
            <Breadcrumb.Item>Communication</Breadcrumb.Item>
            <Breadcrumb.Item>SMS Messaging</Breadcrumb.Item>
          </>
        }
      ></LoveAdminHeader>
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
