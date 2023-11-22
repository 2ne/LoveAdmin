import React, { ReactElement, useEffect, useState } from "react";
import {
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
import LoveAdminHeader from "../../components/header";
const { Sider, Content } = Layout;
const { Title } = Typography;
interface ContactProps {
  renderInModal?: boolean;
}

function Contact({ renderInModal = false }: ContactProps): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
            title="Message"
            icon={<MailOutlined className="mr-3" />}
          >
            <Menu.Item>Email</Menu.Item>
            <Menu.Item>SMS</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="Add to" icon={<PlusOutlined className="mr-3" />}>
            <Menu.Item>Product</Menu.Item>
            <Menu.Item>Group</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Invite to"
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
    <Layout className="min-h-screen overflow-x-clip">
      {!renderInModal && (
        <LoveAdminHeader
          breadcrumbChildren={[
            <Breadcrumb.Item key="home">
              <Link to="/Home">Home</Link>
            </Breadcrumb.Item>,
            <Breadcrumb.Item key="contacts">
              <Link to="/Contacts">Contacts</Link>
            </Breadcrumb.Item>,
            <Breadcrumb.Item key="jamesToone">James Toone</Breadcrumb.Item>,
          ]}
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
            className={`fixed z-20 w-6 h-6 min-w-0 -mr-px transition-all transform -translate-y-1/2 shadow-md top-1/2 ${
              collapsed
                ? "right-[calc(20px-var(--scrollbar-width)/2)]"
                : "right-[calc(340px-var(--scrollbar-width)/2)]"
            }`}
          >
            <svg
              width="200"
              height="200"
              viewBox="100 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3.5 h-3.5 transition-transform ${
                !collapsed
                  ? "rotate-90 translate-x-0.5"
                  : "-rotate-90 -translate-x-px"
              }`}
            >
              <path
                d="M135.040087,42.9038952 L126.916758,21.8263182 C126.72188,21.2929683 125.973139,21.2929683 125.768004,21.8160615 L117.460054,42.9141519 C117.213893,43.5295556 116.629259,43.929568 115.972829,43.929568 L111.531665,43.929568 C110.393169,43.929568 109.613657,42.760301 110.054696,41.703858 L121.911475,13.5491383 C122.311487,12.5952626 123.244849,11.9696021 124.291036,11.9696021 L128.250133,11.9696021 C129.296319,11.9696021 130.239938,12.6055193 130.63995,13.5799085 L142.076203,41.7243714 C142.506985,42.7808144 141.727474,43.929568 140.599234,43.929568 L136.527313,43.929568 C135.870882,43.929568 135.275992,43.5192989 135.040087,42.9038952 Z"
                fill="#29B8CC"
              ></path>
            </svg>
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
