import React, { ReactElement } from "react";
import { MenuOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  Breadcrumb,
  Statistic,
  Input,
  TabsProps,
  Tabs,
} from "antd";
const { Header, Content } = Layout;

function SMSSettings(): ReactElement {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Settings`,
      children: (
        <div className="py-4 sm:max-w-xs">
          <div className="mb-6">
            <div className="relative">
              <Statistic
                title="Credit balance"
                value={1000}
                precision={0}
                className="px-4 py-3.5 rounded border border-solid border-neutral-200"
              />
              <Button
                type="link"
                size="small"
                className="absolute !px-0 top-2.5 right-4 hover:!text-primary-500"
              >
                Top-up
              </Button>
            </div>
          </div>
          <div>
            <label className="block mb-1.5">
              <span>Sender Name</span>
              <span className="mx-1">·</span>
              <a
                className="inline-block mt-1"
                href="mailto:support@loveadmin.com"
              >
                Request change
              </a>
            </label>
            <Input disabled value="LoveAdmin"></Input>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `Templates`,
      children: `Content of Tab Pane 2`,
    },
  ];
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
}

export default SMSSettings;
