import React, { ReactElement } from "react";
import {
  MenuOutlined,
  ArrowLeftOutlined,
  DownOutlined,
  RightOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
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
  Tabs,
  TabsProps,
  Input,
} from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Header, Content } = Layout;
const { Panel } = Collapse;

function Contact(): ReactElement {
  const onChange = (key: string) => {
    console.log(key);
  };

  const activeProducts: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 [&>*:not(:last-child)]:pb-4 [&>*]:border-b [&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Parent and Child</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-neutral-500">
                  <CalendarOutlined className="" />
                  <span>
                    Fridays at 14:00 - 14:45
                    <span className="mx-1.5">·</span>
                    <span className="link">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519311726-5cced7383240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Bubble the Seahorse</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-neutral-500">
                  <CalendarOutlined className="" />
                  <span>
                    Tuesdays at 10:00 - 11:00
                    <span className="mx-1.5">·</span>
                    <span className="link">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Swimming Annual</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-neutral-500">
                  <CalendarOutlined className="" />
                  <span>
                    Membership
                    <span className="mx-1.5">·</span>
                    <span>May 2023 - May 2024</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Classes
          <span className="text-neutral-500">
            <span className="mx-1.5">·</span>2
          </span>
        </div>
      ),
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 [&>*:not(:last-child)]:pb-4 [&>*]:border-b [&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Parent and Child</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-neutral-500">
                  <CalendarOutlined className="" />
                  <span>
                    Fridays at 14:00 - 14:45
                    <span className="mx-1.5">·</span>
                    <span className="link">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519311726-5cced7383240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Bubble the Seahorse</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-neutral-500">
                  <CalendarOutlined className="" />
                  <span>
                    Tuesdays at 10:00 - 11:00
                    <span className="mx-1.5">·</span>
                    <span className="link">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          Memberships
          <span className="text-neutral-500">
            <span className="mx-1.5">·</span>1
          </span>
        </div>
      ),
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 [&>*:not(:last-child)]:pb-4 [&>*]:border-b [&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Swimming Annual</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-neutral-500">
                  <CalendarOutlined className="" />
                  <span>
                    Membership
                    <span className="mx-1.5">·</span>
                    <span>May 2023 - May 2024</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-neutral-500">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: `Events`,
      children: (
        <div className="p-4 pt-2 @2xl:p-6 text-neutral-500">
          No events purchased
        </div>
      ),
    },
  ];

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `Activity`,
      children: (
        <div className="py-6 pt-2 space-y-8">
          <section>
            <div>
              <Title level={5}>Finance</Title>
            </div>
            <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-2 @2xl:gap-4">
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Account balance
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none text-danger-600">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-danger-50 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">-100.00</div>
                </div>
              </div>
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Invoiced
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">520.00</div>
                </div>
              </div>
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Paid
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                  <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                    <span>£</span>
                  </div>
                  <div className="">400.00</div>
                </div>
              </div>
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Credit notes
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
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
            <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-2 @2xl:gap-4">
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Upcoming renewals
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                  <div className="">2</div>
                </div>
              </div>
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Awaiting approval
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                  <div className="">0</div>
                </div>
              </div>
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Scheduled orders
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                  <div className="">1</div>
                </div>
              </div>
              <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-4 transition-all bg-white shadow-sm cursor-pointer hover:shadow-md group">
                <div className="flex min-w-0 gap-2 font-medium transition-all text-neutral-500 group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                  <div className="truncate max-w-[calc(100%-1.25rem)]">
                    Completed
                  </div>
                  <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                    <RightOutlined className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                  <div className="">12</div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <Title level={5}>Active products</Title>
            </div>
            <div className="grid gap-4 transition-all bg-white shadow-sm">
              <Tabs
                defaultActiveKey="1"
                items={activeProducts}
                onChange={onChange}
              />
            </div>
          </section>
        </div>
      ),
    },
    {
      key: "2",
      label: `Finance`,
      children: <div>Finance</div>,
    },
    {
      key: "3",
      label: `Messaging`,
      children: <div>Messaging</div>,
    },
    {
      key: "4",
      label: `Attendance`,
      children: <div>Attendance</div>,
    },
    {
      key: "5",
      label: `Development programme`,
      children: <div>Development programme</div>,
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
              Contacts
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-neutral-50">
              James Toone
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Header>
      <Layout hasSider={true}>
        <aside className="bg-white pl-2 p-2.5 w-1/4 max-w-[320px] 2xl:max-w-[400px] min-w-[280px] shadow-sm shadow-neutral-300 overflow-hidden">
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
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 text-xs text-neutral-500">
                      First name
                    </div>
                    <Input value="James" />
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-neutral-500">
                      Last name
                    </div>
                    <div>Toone</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-neutral-500">
                      Date of birth
                    </div>
                    <div>14 April 1986 · 37 years old</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-neutral-500">Gender</div>
                    <div>Male</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-neutral-500">Email</div>
                    <div>jamestoone@me.com</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-neutral-500">
                      Contact number
                    </div>
                    <div>07994884991</div>
                  </div>
                </div>
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
        <Content className="px-6 @2xl:px-8 @container">
          <Tabs
            defaultActiveKey="1"
            items={tabs}
            onChange={onChange}
            rootClassName="custom-tab"
          />
        </Content>
        <aside className="bg-white p-2.5 w-1/4 max-w-[320px] 2xl:max-w-[400px] min-w-[280px] shadow-sm shadow-neutral-300">
          Sider
        </aside>
      </Layout>
    </Layout>
  );
}

export default Contact;
