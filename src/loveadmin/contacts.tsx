import React, { ReactElement, useEffect, useState } from "react";
import {
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  DownloadOutlined,
  FilterOutlined,
  LeftOutlined,
  MailOutlined,
  PlusOutlined,
  RightOutlined,
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
import ProductTree from "./product-tree";
import { ColumnsType } from "antd/es/table/interface";
import SMSModal from "./contact/sms-modal";
import TableActions from "../components/table-actions";
import LoveAdminHeader from "../components/header";
import TableTitle from "../components/table-title";
import Sidebar from "../components/sidebar";
const { Sider, Content } = Layout;

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

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
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
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSendSMSClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectAll = () => {
    const allRowKeys = data.map((item) => item.key);
    setSelectedRowKeys(allRowKeys);
  };

  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  return (
    <Layout className="min-h-screen">
      <LoveAdminHeader
        breadcrumbChildren={
          <>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Contacts</Breadcrumb.Item>
          </>
        }
      ></LoveAdminHeader>
      <Layout>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <ProductTree showSegmented={true} />
        </Sidebar>
        <Content className="pb-16 bg-white">
          <div className="p-4">
            <div className="flex items-center gap-2 mt-0.5 mb-3">
              <TableTitle
                title="Contacts"
                selectedRowKeysLength={selectedRowKeys.length}
                onSelectAll={handleSelectAll}
                onUnselectAll={handleUnselectAll}
                totalRecords={data.length}
              />
              <div className="flex items-center gap-2 ml-auto">
                <Input
                  placeholder="Name, email, address..."
                  prefix={<SearchOutlined className="mr-1" />}
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
            <div className="relative">
              <TableActions isVisible={selectedRowKeys.length > 0}>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  overlay={
                    <Menu>
                      <Menu.Item key="1" onClick={handleSendSMSClick}>
                        Email
                      </Menu.Item>
                      <Menu.Item key="2" onClick={handleSendSMSClick}>
                        SMS
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="small"
                    type="text"
                    icon={<MailOutlined />}
                    className="px-0 font-medium hover:bg-transparent hover:underline text-neutral-800"
                  >
                    Message...
                  </Button>
                </Dropdown>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Product</Menu.Item>
                      <Menu.Item key="2">Group</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="small"
                    type="text"
                    icon={<PlusOutlined />}
                    className="px-0 font-medium hover:bg-transparent hover:underline text-neutral-800"
                  >
                    Add to...
                  </Button>
                </Dropdown>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Product</Menu.Item>
                      <Menu.Item key="2">Group</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="small"
                    type="text"
                    icon={<UsergroupAddOutlined />}
                    className="px-0 font-medium hover:bg-transparent hover:underline text-neutral-800"
                  >
                    Invite to...
                  </Button>
                </Dropdown>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  overlay={
                    <Menu>
                      <Menu.Item key="1">
                        <CreditCardOutlined className="mr-3" /> Request payment
                      </Menu.Item>
                      <Menu.Item key="2" className="text-red-500">
                        <DeleteOutlined className="mr-3" /> Mark as inactive
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="small"
                    type="text"
                    className="px-0 font-medium hover:bg-transparent hover:underline text-neutral-800"
                  >
                    More
                    <DownOutlined className="ml-1 w-2.5 relative top-px" />
                  </Button>
                </Dropdown>
              </TableActions>
              <Table
                rowSelection={rowSelection}
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-table-sticky"
              />
            </div>
          </div>
          <footer
            className={`fixed gap-2 bottom-0 flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
              collapsed ? " left-[20px] " : " left-[280px] "
            }`}
          >
            <div className="flex items-center gap-2 ml-auto">
              <Button>Manage columns</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </Layout>
      <SMSModal visible={isModalVisible} onCancel={handleModalCancel} />
    </Layout>
  );
}

export default Contacts;
