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
const { Text, Title } = Typography;
const { Header, Content } = Layout;
const { Panel } = Collapse;

function Contact(): ReactElement {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-neutral-800 px-4 flex items-center border-none shadow-none">
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          ghost
          className="text-neutral-50 mr-3 hover:text-neutral-300"
        />
        <div>
          <div>
            <Title level={5} className="text-neutral-50 !m-0">
              Contacts
            </Title>
          </div>
          <div>
            <Breadcrumb className="[&_li]:text-neutral-400">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Contacts</Breadcrumb.Item>
              <Breadcrumb.Item className="text-neutral-50">
                James Toone
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </Header>
      <Layout hasSider={true}>
        <aside className="bg-white pl-2 p-2.5 w-1/4 max-w-[440px] min-w-[280px] overflow-hidden">
          <div className="flex items-center justify-between">
            <Button type="link" icon={<ArrowLeftOutlined />}>
              Contacts
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
          <div className="text-center py-10">
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
              className="rounded-none -mx-px border-neutral-200"
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
