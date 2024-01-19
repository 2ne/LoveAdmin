import { ReactElement, useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  DownOutlined,
  PlusOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
  WarningFilled,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  RightOutlined,
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
  Alert,
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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            <Menu.Item>Class</Menu.Item>
            <Menu.Item>Product</Menu.Item>
            <Menu.Item>Group</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Invite to"
            icon={<UsergroupAddOutlined className="mr-3" />}
          >
            <Menu.Item>Product</Menu.Item>
            <Menu.Item>Organisation</Menu.Item>
          </Menu.SubMenu>
          <Menu.Divider></Menu.Divider>
          <Menu.Item>
            <CreditCardOutlined className="mr-3" />
            Request payment
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

  const Contact = () => (
    <aside className="max-lg:flex-grow bg-white rounded-tl-lg pl-2 p-2.5 lg:w-1/4 lg:max-w-[340px] lg:min-w-[280px] shadow-sm shadow-neutral-300 overflow-y-auto overflow-x-clip lg:h-[calc(100vh-4rem)]">
      {!renderInModal && (
        <>
          <div className="flex items-center justify-between">
            <Button type="link" icon={<ArrowLeftOutlined />} className="-ml-1">
              <Link to="/Contacts" className="ml-2">
                Contacts
              </Link>
            </Button>
            {actions}
          </div>
          <div className="pt-4 pb-8">
            <div className="mb-4 text-center">
              <Avatar size="large" className="bg-indigo-500">
                JT
              </Avatar>
            </div>
            <div className="text-center">
              <div className="font-medium">James Toone</div>
              <div className="text-subtitle">jamestoone@gmail.com</div>
            </div>
          </div>
        </>
      )}
      <div
        className={`-mx-3 ${renderInModal ? "mt-[calc(-0.625rem-1px)]" : ""}`}
      >
        <ContactDetails />
      </div>
    </aside>
  );

  const Details = () => (
    <Sider
      width={340}
      trigger={null}
      collapsible
      collapsedWidth={20}
      collapsed={collapsed}
      className="max-lg:hidden h-[calc(100vh-4rem)] overflow-y-auto bg-white shadow-sm shadow-neutral-300 overflow-x-clip"
    >
      <Button
        shape="circle"
        onClick={toggleCollapsed}
        className={`fixed z-20 w-6 h-6 min-w-0 -mr-px transition-all transform -translate-y-1/2 shadow-md top-1/2 ${
          collapsed ? "right-[9px]" : "right-[329px]"
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
  );

  const onTabChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Contact",
      children: (
        <div className="mt-[-17px]">
          <ContactDetails />
        </div>
      ),
    },
    {
      key: "2",
      label: "Products",
      children: (
        <div className="px-4 bg-white max-lg:bg-white max-lg:pt-6 max-lg:-my-4">
          <div className="space-y-4">
            <div className="flex gap-3.5 max-lg:border-b max-lg:pb-4 max-lg:border-neutral-200/75">
              <div>
                <img
                  className="object-cover object-center w-14 mt-0.5 rounded aspect-square"
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                />
              </div>
              <div className="flex-grow">
                <div className="font-medium">Parent and Child</div>
                <div className="mt-0.5 space-y-px">
                  <div className="flex gap-1.5 text-subtitle">
                    <CalendarOutlined className="" />
                    <span>
                      Fridays at 14:00 - 14:45
                      <span className="mx-1.5">·</span>
                      <span className="link text-primary-600">View dates</span>
                    </span>
                  </div>
                  <div className="flex gap-1.5 text-subtitle">
                    <EnvironmentOutlined className="" />
                    <span>Quaterway House, Ely Road, Little Thetford</span>
                  </div>
                  <div className="flex gap-1.5 text-subtitle">
                    <UserOutlined className="" />
                    <span>Jacob Toone</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3.5 max-lg:border-b max-lg:pb-4 max-lg:border-neutral-200/75">
              <div>
                <img
                  className="object-cover object-center w-14 mt-0.5 rounded aspect-square"
                  src="https://images.unsplash.com/photo-1519311726-5cced7383240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                />
              </div>
              <div className="flex-grow">
                <div className="font-medium">Bubble the Seahorse</div>
                <div className="mt-0.5 space-y-px">
                  <div className="flex gap-1.5 text-subtitle">
                    <CalendarOutlined className="" />
                    <span>
                      Tuesdays at 10:00 - 11:00
                      <span className="mx-1.5">·</span>
                      <span className="link text-primary-600">View dates</span>
                    </span>
                  </div>
                  <div className="flex gap-1.5 text-subtitle">
                    <EnvironmentOutlined className="" />
                    <span>Quaterway House, Ely Road, Little Thetford</span>
                  </div>
                  <div className="flex gap-1.5 text-subtitle">
                    <UserOutlined className="" />
                    <span>Jacob Toone</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3.5 max-lg:border-b max-lg:pb-4 max-lg:border-neutral-200/75">
              <div>
                <img
                  className="object-cover object-center w-14 mt-0.5 rounded aspect-square"
                  src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                />
              </div>
              <div className="flex-grow">
                <div className="font-medium">Swimming Annual</div>
                <div className="mt-0.5 space-y-px">
                  <div className="flex gap-1.5 text-subtitle">
                    <CalendarOutlined className="" />
                    <span>
                      Membership
                      <span className="mx-1.5">·</span>
                      <span>May 2023 - May 2024</span>
                    </span>
                  </div>
                  <div className="flex gap-1.5 text-subtitle">
                    <EnvironmentOutlined className="" />
                    <span>Quaterway House, Ely Road, Little Thetford</span>
                  </div>
                  <div className="flex gap-1.5 text-subtitle">
                    <UserOutlined className="" />
                    <span>Jacob Toone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Finance",
      children: (
        <>
          <div className="flex items-end justify-between px-4 mb-4">
            <div>
              <Title level={5} className="!mb-0">
                Overview
              </Title>
            </div>
            <div>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>Last 28 days</Menu.Item>
                    <Menu.Item>Last 90 days</Menu.Item>
                    <Menu.Item>Last 6 months</Menu.Item>
                    <Menu.Item>Last 12 months</Menu.Item>
                    <Menu.Divider></Menu.Divider>
                    <Menu.Item>Select date range...</Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button onClick={(e) => e.preventDefault()} className="px-3">
                  <span>Last 12 months</span>
                  <CalendarOutlined className="ml-2" />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className="px-4 pb-6 space-y-8">
            <section>
              <div className="text-base grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-2 @2xl:gap-3">
                <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
                  <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                    <div className="truncate max-w-[calc(100%-1.25rem)]">
                      Outstanding
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
                <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
                  <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                    <div className="truncate max-w-[calc(100%-1.25rem)]">
                      Pending
                    </div>
                    <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                      <RightOutlined className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                    <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                      <span>£</span>
                    </div>
                    <div className="">100.00</div>
                  </div>
                </div>
                <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
                  <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
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
                <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
                  <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
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
                    <div className="">420.00</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: "More",
      children: (
        <div className="mt-[-18px]">
          <ContactSidebar />
        </div>
      ),
    },
  ];

  const content = (
    <Layout className="min-h-screen bg-neutral-950 overflow-x-clip">
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
      <Layout
        hasSider={true}
        className={`${renderInModal ? "" : "rounded-t-lg"} overflow-hidden`}
      >
        <div className="contents max-lg:hidden">
          <Contact />
          <Content className="max-lg:hidden px-6 py-3 @2xl:px-8 @container overflow-y-auto overflow-x-clip h-[calc(100vh-4rem)]">
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
          <Details />
        </div>
        <div className="flex-grow min-w-0 lg:hidden">
          <div
            className={`flex items-center justify-between  ${
              !renderInModal ? "py-2" : "px-1 py-3"
            }`}
          >
            {!renderInModal && (
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                className="-ml-1"
              >
                <Link to="/Contacts" className="ml-2">
                  Contacts
                </Link>
              </Button>
            )}
            {actions}
          </div>
          <div className="pt-4 pb-8">
            <div className="px-3 -mt-2 mb-7 empty:hidden">
              <Alert
                message="Mandate has been cancelled"
                type="error"
                showIcon
                icon={<WarningFilled />}
                closable
                className="mb-2"
              />
              <Alert
                message="New medical condition"
                type="error"
                showIcon
                icon={<WarningFilled />}
                closable
                className="mb-2"
              />
            </div>
            <div className="mb-2 text-center">
              <Avatar size="large" className="bg-indigo-500">
                JT
              </Avatar>
            </div>
            <div className="text-center">
              <div className="font-medium">James Toone</div>
              <div className="text-subtitle">jamestoone@gmail.com</div>
            </div>
          </div>

          <Tabs
            className="flex-grow [&_.ant-tabs-tab]:ml-4"
            defaultActiveKey="1"
            items={items}
            onChange={onTabChange}
          />
        </div>
      </Layout>
    </Layout>
  );

  if (renderInModal) {
    return (
      <Modal
        title={
          isDesktop ? (
            <div className="hidden lg:flex items-center h-full gap-3.5">
              <Avatar className="bg-indigo-500">
                <span className="relative text-xs -top-px">JT</span>
              </Avatar>
              <div className="flex min-w-0 items-center w-[17.35rem] justify-between gap-3.5">
                <div className="flex-grow min-w-0">
                  <Title level={5} className="-mb-px truncate">
                    James Toone
                  </Title>
                  <div className="text-sm font-normal text-subtitle">
                    Account owner
                  </div>
                </div>
                <div className="shrink-0">{actions}</div>
              </div>
            </div>
          ) : null
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
