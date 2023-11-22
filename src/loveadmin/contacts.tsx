import React, { ReactElement, useEffect, useState } from "react";
import {
  DownOutlined,
  FilterOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Button,
  Breadcrumb,
  Table,
  Dropdown,
  Menu,
  Tooltip,
  Input,
} from "antd";
import ProductTree from "./filter-product";
import { ColumnsType } from "antd/es/table/interface";
import SMSModal from "./contact/sms-modal";
import TableActions from "../components/table-actions";
import LoveAdminHeader from "../components/header";
import TableTitle from "../components/table-title";
import Sidebar from "../components/sidebar";
import EmailModal from "./email-editor";
import { Link } from "react-router-dom";
import TableFooter from "../components/table-footer";
const { Content } = Layout;

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  address: string;
  town: string;
  accountOwner: string;
}

const data = [
  {
    key: "1",
    name: "James Toone",
    email: "jamestoone@gmail.com",
    address: "14 George Street",
    town: "Derby",
    accountOwner: "Ian Toone",
  },
  {
    key: "2",
    name: "Sarah Johnson",
    email: "sarahjohnson@gmail.com",
    address: "27 Oakfield Road",
    town: "Manchester",
    accountOwner: "Mark Johnson",
  },
  {
    key: "3",
    name: "Thomas Williams",
    email: "thomaswilliams@gmail.com",
    address: "51 Church Lane",
    town: "Liverpool",
    accountOwner: "Emily Williams",
  },
  {
    key: "4",
    name: "Emma Brown",
    email: "emmabrown@gmail.com",
    address: "103 High Street",
    town: "Leeds",
    accountOwner: "George Brown",
  },
  {
    key: "5",
    name: "Lucy Davis",
    email: "lucydavis@gmail.com",
    address: "67 Springfield Avenue",
    town: "London",
    accountOwner: "John Davis",
  },
  {
    key: "6",
    name: "Daniel Taylor",
    email: "danieltaylor@gmail.com",
    address: "22 Elm Street",
    town: "Bristol",
    accountOwner: "Amy Taylor",
  },
  {
    key: "7",
    name: "Oliver Wilson",
    email: "oliverwilson@gmail.com",
    address: "39 Park Avenue",
    town: "Glasgow",
    accountOwner: "Sophie Wilson",
  },
  {
    key: "8",
    name: "Emily Thompson",
    email: "emilythompson@gmail.com",
    address: "18 Meadow Lane",
    town: "Sheffield",
    accountOwner: "Matthew Thompson",
  },
  {
    key: "9",
    name: "Alexander Scott",
    email: "alexanderscott@gmail.com",
    address: "12 Hillside Drive",
    town: "Edinburgh",
    accountOwner: "Laura Scott",
  },
  {
    key: "10",
    name: "Charlotte Green",
    email: "charlottegreen@gmail.com",
    address: "55 Willow Road",
    town: "Nottingham",
    accountOwner: "Thomas Green",
  },
  {
    key: "11",
    name: "Sophia Roberts",
    email: "sophiaroberts@gmail.com",
    address: "82 Victoria Street",
    town: "Cardiff",
    accountOwner: "David Roberts",
  },
  {
    key: "12",
    name: "Jacob Evans",
    email: "jacobevans@gmail.com",
    address: "25 Rosewood Avenue",
    town: "Birmingham",
    accountOwner: "Olivia Evans",
  },
  {
    key: "13",
    name: "Mia Patel",
    email: "miapatel@gmail.com",
    address: "48 Maple Lane",
    town: "Leicester",
    accountOwner: "Aryan Patel",
  },
  {
    key: "14",
    name: "William Walker",
    email: "williamwalker@gmail.com",
    address: "37 Elmwood Road",
    town: "Newcastle",
    accountOwner: "Grace Walker",
  },
  {
    key: "15",
    name: "Ella Turner",
    email: "ellaturner@gmail.com",
    address: "63 Willow Avenue",
    town: "York",
    accountOwner: "Benjamin Turner",
  },
  {
    key: "16",
    name: "Henry Cooper",
    email: "henrycooper@gmail.com",
    address: "99 Oakwood Drive",
    town: "Southampton",
    accountOwner: "Alice Cooper",
  },
  {
    key: "17",
    name: "Olivia Baker",
    email: "oliviabaker@gmail.com",
    address: "29 Cherry Lane",
    town: "Cambridge",
    accountOwner: "Daniel Baker",
  },
  {
    key: "18",
    name: "Liam Wilson",
    email: "liamwilson@gmail.com",
    address: "43 Parkside Avenue",
    town: "Oxford",
    accountOwner: "Sophie Wilson",
  },
  {
    key: "19",
    name: "Isabella Clark",
    email: "isabellaclark@gmail.com",
    address: "77 Pine Street",
    town: "Exeter",
    accountOwner: "James Clark",
  },
  {
    key: "20",
    name: "Mason Lee",
    email: "masonlee@gmail.com",
    address: "52 Cedar Road",
    town: "Norwich",
    accountOwner: "Oliver Lee",
  },
];

function Contacts(): ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [nameColumnWidth, seNameColumnWidth] = useState(150);

  useEffect(() => {
    const updateWidth = () => {
      seNameColumnWidth(window.innerWidth <= 640 ? 120 : 175);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <Link to="/Contact">{text}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
      fixed: true,
      width: nameColumnWidth,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Town",
      dataIndex: "town",
      key: "town",
      ellipsis: true,
      sorter: (a, b) => a.town.length - b.town.length,
    },
    {
      title: "Account owner",
      dataIndex: "accountOwner",
      key: "accountOwner",
      render: (text: string) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.accountOwner.length - b.accountOwner.length,
    },
    {
      title: "Group",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [isSMSModalVisible, setIsSMSModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);

  const handleSendSMSClick = () => {
    setIsSMSModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsSMSModalVisible(false);
    setIsEmailModalVisible(false);
  };

  const handleSendEmailClick = () => {
    setIsEmailModalVisible(true);
  };

  const handleSelectAll = () => {
    const allRowKeys = data.map((item) => item.key);
    setSelectedRowKeys(allRowKeys);
  };

  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  return (
    <Layout className="min-h-screen bg-neutral-900">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="contacts">Contacts</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <ProductTree />
        </Sidebar>
        <Content className="pb-40">
          <div className="p-4">
            <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2.5">
              <div className="relative flex items-center">
                <TableTitle
                  title="Contacts"
                  selectedRowKeysLength={selectedRowKeys.length}
                  onSelectAll={handleSelectAll}
                  onUnselectAll={handleUnselectAll}
                  totalRecords={data.length}
                />
              </div>
              <div className="flex items-center gap-2.5 ml-auto">
                <Input
                  placeholder="Search name, email, address..."
                  prefix={<SearchOutlined className="mr-1" />}
                  className="w-full lg:w-[16rem]"
                />
                <Button icon={<FilterOutlined className="mt-px -ml-px " />}>
                  Filters
                </Button>
                <Tooltip
                  title="Add contact"
                  placement="topRight"
                  className="shrink-0"
                >
                  <Button icon={<PlusOutlined />} type="primary"></Button>
                </Tooltip>
              </div>
            </div>
            <div className="relative mt-5 md:mt-4">
              <TableActions
                isVisible={selectedRowKeys.length > 0}
                collapsed={collapsed}
                hasSidebar={true}
              >
                <div className="flex items-center gap-4">
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item key="1" onClick={handleSendEmailClick}>
                          Email
                        </Menu.Item>
                        <Menu.Item key="2" onClick={handleSendSMSClick}>
                          SMS
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex gap-2 font-medium text-neutral-900"
                    >
                      <MailOutlined />
                      <span>Message</span>
                    </a>
                  </Dropdown>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Class</Menu.Item>
                        <Menu.Item>Product</Menu.Item>
                        <Menu.Item>Group</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      <PlusOutlined />
                      <span>Add to</span>
                    </a>
                  </Dropdown>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Product</Menu.Item>
                        <Menu.Item>Organisation</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      <UsergroupAddOutlined />
                      <span>Invite to</span>
                    </a>
                  </Dropdown>
                  <div className="text-neutral-400">|</div>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Request payment</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="text-danger-500 hover:bg-danger-50 hover:text-danger-600">
                          Remove from product
                        </Menu.Item>
                        <Menu.Item className="text-danger-500 hover:bg-danger-50 hover:text-danger-600">
                          Mark as inactive
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      <span>More...</span>
                      <DownOutlined className="-ml-0.5 w-2.5" />
                    </a>
                  </Dropdown>
                </div>
              </TableActions>
              <Table
                rowSelection={rowSelection}
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ x: 1000 }}
                className="ant-table-sticky"
                sticky={true}
              />
            </div>
          </div>
          <TableFooter collapsed={collapsed} sidebar={true} />
        </Content>
      </Layout>
      <SMSModal visible={isSMSModalVisible} onCancel={handleModalCancel} />
      <EmailModal visible={isEmailModalVisible} onClose={handleModalCancel} />
    </Layout>
  );
}

export default Contacts;
