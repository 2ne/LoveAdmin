import React, { ReactElement } from "react";
import {
  MenuOutlined,
  ArrowLeftOutlined,
  DownOutlined,
  RightOutlined,
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
        <aside className="bg-white pl-2 p-2.5 w-1/4 max-w-[400px] min-w-[280px] shadow-sm overflow-hidden">
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
                header="Contact details"
                key="1"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Address"
                key="2"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Medical"
                key="3"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Emergency contacts"
                key="4"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Account owner"
                key="5"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Linked accounts"
                key="6"
                className="px-2.5 bg-white rounded-none border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-neural-200"
              >
                <p>1</p>
              </Panel>
            </Collapse>
          </div>
        </aside>
        <Content className="px-8 py-6 space-y-7">
          <section>
            <div>
              <Title level={5}>Finance</Title>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Account balance
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none text-danger-600">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-danger-50 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">-100.00</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Invoiced
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">520.00</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Paid
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">400.00</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="">Credit notes</div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">20.00</div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <Title level={5}>Orders</Title>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Upcoming renewals
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="">2</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Awaiting approval
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="">2</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Scheduled orders
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="">2</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 transition-all bg-white shadow-sm cursor-pointer h-[7.25rem] hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-600 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Completed
                  </div>
                  <div className="mt-px transition-all text-neutral-400 group-hover:text-neutral-800 group-hover:ml-0.5">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-xl font-medium leading-none">
                  <div className="">2</div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <Title level={5}>Active products</Title>
            </div>
          </section>
        </Content>
        <aside className="bg-white p-2.5 w-1/4 max-w-[400px] min-w-[280px] shadow-sm">
          Sider
        </aside>
      </Layout>
    </Layout>
  );
}

export default Contact;
