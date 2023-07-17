import React, { ReactElement, useEffect, useState } from "react";
import {
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  DownloadOutlined,
  LeftOutlined,
  MailOutlined,
  MenuOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Breadcrumb,
  Table,
  Dropdown,
  Space,
  Menu,
  Statistic,
  Input,
} from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";
const { Title } = Typography;
const { Header, Content } = Layout;

function SMSSettings(): ReactElement {
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
        <Content className="pb-16 bg-white">
          <div className="p-4 sm:max-w-xs">
            <div className="mb-6">
              <div className="relative">
                <Statistic
                  title="Credit balance"
                  value={1000}
                  precision={0}
                  className="px-4 py-3.5 rounded bg-neutral-100"
                />
                <Button
                  type="link"
                  size="small"
                  className="absolute !px-0 top-2.5 right-4"
                >
                  Top-up
                </Button>
              </div>
            </div>
            <div>
              <label className="block mb-1.5 font-medium">
                <span>Sender Name</span>
                <span className="mx-1.5">·</span>
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
        </Content>
      </Layout>
    </Layout>
  );
}

export default SMSSettings;
