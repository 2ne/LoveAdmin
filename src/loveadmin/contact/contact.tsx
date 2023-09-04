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
  Modal,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import ContactDashboard from "./dashboard";
import ContactDetails from "./contact-details";
import ContactSidebar from "./contact-sidebar";
import Finance from "./finance";
import Messaging from "./messaging";
import Attendance from "./attendance";
import DevelopmentProgramme from "./development-programme";
import useScrollBarWidth from "../../components/useScrollBarWidth";
import LoveAdminHeader from "../../components/header";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
interface ContactProps {
  renderInModal?: boolean;
}

function Contact({ renderInModal = false }: ContactProps): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const scrollbarWidth = useScrollBarWidth();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1400);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onTabsContactChange = (key: string) => {
    console.log(key);
  };

  const contactTabs: TabsProps["items"] = [
    {
      key: "1",
      label: `Dashboard`,
      children: <ContactDashboard />,
    },
    {
      key: "2",
      label: `Finance`,
      children: <Finance />,
    },
    {
      key: "3",
      label: `Messaging`,
      children: <Messaging />,
    },
    {
      key: "4",
      label: `Attendance`,
      children: <Attendance />,
    },
    {
      key: "5",
      label: `Development programme`,
      children: <DevelopmentProgramme />,
    },
  ];

  const actions = (
    <Dropdown
      overlay={
        <Menu>
          <Menu.SubMenu
            title="Message..."
            icon={<MailOutlined className="mr-3" />}
          >
            <Menu.Item>Email</Menu.Item>
            <Menu.Item>SMS</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Add to..."
            icon={<PlusOutlined className="mr-3" />}
          >
            <Menu.Item>Product</Menu.Item>
            <Menu.Item>Group</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Invite to..."
            icon={<UsergroupAddOutlined className="mr-3" />}
          >
            <Menu.Item>Product</Menu.Item>
            <Menu.Item>Group</Menu.Item>
          </Menu.SubMenu>
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
      <Button
        type={!renderInModal ? "text" : "default"}
        onClick={(e) => e.preventDefault()}
        className={!renderInModal ? "" : "ml-2"}
      >
        <span>Actions</span>
        <DownOutlined className="ml-1.5 [&>svg]:mt-px [&>svg]:w-3 [&>svg]:h-3" />
      </Button>
    </Dropdown>
  );

  const content = (
    <Layout className="min-h-screen">
      {!renderInModal && (
        <LoveAdminHeader
          breadcrumbChildren={
            <>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item>Contacts</Breadcrumb.Item>
              <Breadcrumb.Item>James Toone</Breadcrumb.Item>
            </>
          }
        ></LoveAdminHeader>
      )}
      <Layout hasSider={true}>
        <aside className="bg-white pl-2 p-2.5 w-1/4 max-w-[340px] min-w-[280px] shadow-sm shadow-neutral-300 overflow-hidden">
          {!renderInModal && (
            <>
              <div className="flex items-center justify-between">
                <Button
                  type="link"
                  icon={<ArrowLeftOutlined />}
                  className="-ml-1"
                >
                  <Link to="/Contacts" className="ml-2">
                    Contacts
                  </Link>
                </Button>
                {actions}
              </div>
              <div className="pt-4 pb-8 text-center">
                <div className="mb-4">
                  <Avatar size="large" className="bg-indigo-500">
                    JT
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">James Toone</div>
                  <div className="text-subtitle">jamestoone@gmail.com</div>
                </div>
              </div>
            </>
          )}
          <div
            className={`-mx-3 ${
              renderInModal ? "mt-[calc(-0.625rem-1px)]" : ""
            }`}
          >
            <ContactDetails />
          </div>
        </aside>
        <Content className="px-6 py-3 @2xl:px-8 @container">
          <div className="max-w-[66rem] mx-auto">
            <Tabs
              type="card"
              defaultActiveKey="1"
              items={contactTabs}
              onChange={onTabsContactChange}
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
          className="min-h-screen bg-white shadow-sm shadow-neutral-300"
        >
          <Button
            shape="circle"
            onClick={toggleCollapsed}
            style={{
              right: collapsed
                ? `calc(8px + ${scrollbarWidth}px)`
                : `calc(328px + ${scrollbarWidth}px)`,
            }}
            className="fixed z-20 w-6 h-6 min-w-0 -mt-12 transition-all -translate-y-1/2 shadow-md top-1/2"
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

  if (renderInModal) {
    return (
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <Avatar size="small" className="bg-indigo-500">
              <span className="relative text-xs -top-px">JT</span>
            </Avatar>
            <Title level={5} className="mb-0">
              James Toone
            </Title>
            <div>{actions}</div>
          </div>
        }
        open={true}
        footer={null}
        rootClassName="ant-modal-fullscreen"
      >
        {content}
      </Modal>
    );
  }

  return content;
}

export default Contact;
