import React, { ReactElement, useEffect, useRef, useState } from "react";
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
  WarningOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  PlusCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
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
  Popover,
  Form,
  Input,
  InputRef,
} from "antd";
import { Link } from "react-router-dom";
import ContactDashboard from "./dashboard";
const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const { Panel } = Collapse;

function Contact(): ReactElement {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [firstName, setName] = useState("James");

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

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpen(open);
  };

  const onFinish = (values: { firstName: React.SetStateAction<string> }) => {
    setName(values.firstName);
    hide();
  };

  const content = (
    <div className="p-1 pb-2 min-w-[14.5rem]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="flex items-end gap-2 [&_.ant-form-item-has-error+.ant-form-item_.ant-btn]:top-[-1.35rem]"
        requiredMark={false}
      >
        <Form.Item
          name="firstName"
          initialValue={firstName}
          label="First name"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            type="text"
            htmlType="submit"
            icon={
              <CheckCircleFilled className="[&>svg]:h-[1.1rem] [&>svg]:w-[1.1rem] group-hover:text-primary-400 transition-colors" />
            }
            shape="circle"
            size="small"
            className="text-primary-500 !px-0 hover:!bg-transparent group"
          ></Button>
        </Form.Item>
      </Form>
    </div>
  );

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
            <Collapse
              defaultActiveKey={["1"]}
              size="small"
              className="-mx-px rounded-none !border-neutral-200"
            >
              <Panel
                header="Contact details"
                key="1"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <div className="-mt-1.5 space-y-1">
                  <Popover
                    content={content}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="right"
                  >
                    <Button type="text" block className="ant-btn-input">
                      <div className="flex-grow text-left">
                        <div className="text-xs mb-0.5 text-neutral-500">
                          First name
                        </div>
                        <div>{firstName}</div>
                      </div>
                    </Button>
                  </Popover>
                  <Button type="text" block className="ant-btn-input">
                    <div className="flex-grow text-left">
                      <div className="text-xs mb-0.5 text-neutral-500">
                        Last name
                      </div>
                      <div>Toone</div>
                    </div>
                  </Button>
                  <Button type="text" block className="ant-btn-input">
                    <div className="flex-grow text-left">
                      <div className="text-xs mb-0.5 text-neutral-500">
                        Date of birth
                      </div>
                      <div>
                        14 April 1986
                        <span className="text-neutral-500">
                          <span className="mx-1.5">·</span>37 years old
                        </span>
                      </div>
                    </div>
                  </Button>
                  <Button type="text" block className="ant-btn-input">
                    <div className="flex-grow text-left">
                      <div className="text-xs mb-0.5 text-neutral-500">
                        Gender
                      </div>
                      <div>Male</div>
                    </div>
                  </Button>
                  <Button type="text" block className="ant-btn-input">
                    <div className="flex-grow text-left">
                      <div className="text-xs mb-0.5 text-neutral-500">
                        Email
                      </div>
                      <div>jamestoone@me.com</div>
                    </div>
                  </Button>
                  <Button type="text" block className="ant-btn-input">
                    <div className="flex-grow text-left">
                      <div className="text-xs mb-0.5 text-neutral-500">
                        Contact number
                      </div>
                      <div>07994884991</div>
                    </div>
                  </Button>
                </div>
              </Panel>
              <Panel
                header="Address"
                key="2"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <p>1</p>
              </Panel>
              <Panel
                header={
                  <>
                    Manadate
                    <span className="text-neutral-500">
                      <span className="mx-1.5">·</span>Active
                    </span>
                  </>
                }
                extra={
                  <CheckCircleOutlined className="-mr-1 text-primary-500" />
                }
                key="3"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <p>1</p>
              </Panel>
              <Panel
                header={
                  <>
                    Medical
                    <span className="text-neutral-500">
                      <span className="mx-1.5">·</span>2 conditions
                    </span>
                  </>
                }
                extra={<WarningOutlined className="-mr-1 text-danger-500" />}
                key="4"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Emergency contacts"
                key="5"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <p>1</p>
              </Panel>
              <Panel
                header="Account owner"
                key="6"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <p>1</p>
              </Panel>
              <Panel
                header={
                  <>
                    Linked accounts
                    <span className="text-neutral-500">
                      <span className="mx-1.5">·</span>2
                    </span>
                  </>
                }
                key="7"
                className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
              >
                <p>1</p>
              </Panel>
            </Collapse>
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
          {!collapsed && (
            <div>
              <Collapse
                defaultActiveKey={["1"]}
                size="small"
                className="rounded-none !border-neutral-200 !border-l-0 !border-t-0 !border-r-0"
              >
                <Panel
                  header="Notes"
                  extra={
                    <Button
                      type="primary"
                      size="small"
                      className="-mr-1.5"
                      icon={<PlusOutlined />}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      Add note
                    </Button>
                  }
                  key="1"
                  className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
                >
                  <div className="[&>*:not(:last-child)]:mb-5 mb-2">
                    <div className="space-y-1.5">
                      <div>
                        This is some note text. I am not sure how long a note
                        would be but this is just a guess.
                      </div>
                      <div className="text-neutral-400">
                        James Toone · 7 Feb 09:59
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div>
                        This is some note text. I am not sure how long a note
                        would be but this is just a guess.
                      </div>
                      <div className="text-neutral-400">
                        James Toone · 7 Feb 09:59
                      </div>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          )}
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Contact;
