import React, { ReactElement, useEffect, useState } from "react";
import {
  MenuOutlined,
  ArrowLeftOutlined,
  DownOutlined,
  RightOutlined,
  PlusOutlined,
  LeftOutlined,
  DeleteOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Layout,
  Button,
  Breadcrumb,
  Dropdown,
  Menu,
  Tabs,
  TabsProps,
} from "antd";
import { Link } from "react-router-dom";
import ContactDashboard from "./dashboard";
import ContactDetails from "./contact-details";
import ContactSidebar from "./contact-sidebar";
const { Header, Sider, Content } = Layout;

function Contact(): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: `Dashboard`,
      children: <ContactDashboard />,
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
        <aside className="bg-white pl-2 p-2.5 w-1/4 max-w-[340px] min-w-[280px] shadow-sm shadow-neutral-300 overflow-hidden">
          <div className="flex items-center justify-between">
            <Button type="link" icon={<ArrowLeftOutlined />} className="-ml-1">
              <Link to="/Contacts" className="ml-2">
                Contacts
              </Link>
            </Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <MailOutlined className="relative mr-3 top-px" />
                    Message
                  </Menu.Item>
                  <Menu.Item>
                    <PlusOutlined className="mr-3" />
                    Add to...
                  </Menu.Item>
                  <Menu.Item>
                    <UsergroupAddOutlined className="mr-3" />
                    Invite to...
                  </Menu.Item>
                  <Menu.Item>
                    <CreditCardOutlined className="mr-3" />
                    Request payment
                  </Menu.Item>
                  <Menu.Divider></Menu.Divider>
                  <Menu.Item className="text-red-500">
                    <DeleteOutlined className="mr-3" />
                    Mark as inactive
                  </Menu.Item>
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
          <div className="pt-4 pb-8 text-center">
            <div className="mb-4">
              <Avatar size="large" className="bg-indigo-500">
                JT
              </Avatar>
            </div>
            <div className="space-y-1">
              <div className="font-medium">James Toone</div>
              <div className="text-neutral-500">jamestoone@gmail.com</div>
            </div>
          </div>
          <div className="-mx-3">
            <ContactDetails />
          </div>
        </aside>
        <Content className="px-6 @2xl:px-8 @container">
          <div className="max-w-screen-lg mx-auto">
            <Tabs
              defaultActiveKey="1"
              items={tabs}
              onChange={onChange}
              rootClassName="ant-tabs-contact"
            />
          </div>
        </Content>
        <Sider
          width={340}
          trigger={null}
          collapsible
          collapsedWidth={20}
          collapsed={collapsed}
          className="sticky top-0 max-h-screen bg-white shadow-sm shadow-neutral-300 will-change-transform"
        >
          <Button
            shape="circle"
            onClick={toggleCollapsed}
            className="fixed w-6 h-6 min-w-0 -mt-12 transition-all -translate-y-1/2 shadow-md -left-3 top-1/2"
          >
            {!collapsed ? (
              <RightOutlined className="[&>svg]:w-3 [&>svg]:h-3" />
            ) : (
              <LeftOutlined className="[&>svg]:w-3 [&>svg]:h-3" />
            )}
          </Button>
          {!collapsed && <ContactSidebar />}
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Contact;
