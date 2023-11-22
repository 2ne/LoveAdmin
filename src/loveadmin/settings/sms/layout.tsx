import React from "react";
import { Layout, Button, Breadcrumb } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Settings from "./settings";
import Templates from "./templates";
import History from "./history";
import { Tabs } from "antd";
import LoveAdminHeader from "../../../components/header";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const SMS = () => {
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
    <Layout className="min-h-screen bg-neutral-900">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="settings">
            <Link to="/Settings">Settings</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="communication">
            <Link to="/Settings/Communication">Communication</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="sms-settings">SMS Settings</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Content className="p-6 pb-16">
          <div className="-mt-5">
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              className="select-none [&_.ant-tabs-nav]:mb-5 [&_.ant-tabs-nav-list]:gap-x-4 [&_.ant-tabs-nav-list]:lg:gap-x-6 [&_.ant-tabs-tab]:pb-4 [&_.ant-tabs-tab]:!mx-0 [&_.ant-tabs-tab:not(.ant-tabs-tab-active)_.ant-tabs-tab-btn]:text-neutral-600 [&_.ant-tabs-tab:not(.ant-tabs-tab-active)_.ant-tabs-tab-btn:hover]:text-neutral-900 [&_.ant-tabs-tab-btn]:rounded-sm"
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SMS;
