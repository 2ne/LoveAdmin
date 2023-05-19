import React, { ReactElement } from "react";
import {
  MenuOutlined,
  ArrowLeftOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Layout,
  Typography,
  Button,
  Breadcrumb,
  Dropdown,
  Menu,
  Collapse,
} from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Header, Content } = Layout;
const { Panel } = Collapse;

function Contact(): ReactElement {
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
              Contacts
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-neutral-50">
              James Toone
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Header>
      <Layout hasSider={true}>
        <aside className="bg-white pl-2 p-2.5 w-1/4 max-w-[440px] min-w-[280px] overflow-hidden">
          <div className="flex items-center justify-between">
            <Button type="link" icon={<ArrowLeftOutlined />} className="-ml-1">
              <Link to="/Contacts" className="ml-2">
                Contacts
              </Link>
            </Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>Menu Item 1</Menu.Item>
                  <Menu.Item>Menu Item 2</Menu.Item>
                  <Menu.Item>Menu Item 3</Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button type="text" onClick={(e) => e.preventDefault()}>
                <span>Actions</span>
                <DownOutlined className="ml-1.5 [&>svg]:mt-px [&>svg]:w-3 [&>svg]:h-3" />
              </Button>
            </Dropdown>
          </div>
          <div className="pt-6 pb-10 text-center">
            <div className="mb-4">
              <Avatar size="large">JT</Avatar>
            </div>
            <div className="space-y-1">
              <div className="font-medium">James Toone</div>
              <div className="text-neutral-500">jamestoone@gmail.com</div>
            </div>
          </div>
          <div className="-mx-3">
            <Collapse
              defaultActiveKey={["1"]}
              size="small"
              className="-mx-px rounded-none border-neutral-200"
            >
              <Panel
                header="This is panel header 1"
                key="1"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="This is panel header 2"
                key="2"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="This is panel header 3"
                key="3"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
            </Collapse>
          </div>
        </aside>
        <Content className="p-4">Content</Content>
        <aside className="bg-white p-2.5 w-1/4 max-w-[440px] min-w-[280px]">
          Sider
        </aside>
      </Layout>
    </Layout>
  );
}

export default Contact;
