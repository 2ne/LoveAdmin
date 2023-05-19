import React, { ReactElement, useEffect, useState } from "react";
import {
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  DownloadOutlined,
  LeftOutlined,
  MailOutlined,
  MenuOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Breadcrumb,
  Table,
  Dropdown,
  Space,
  Menu,
} from "antd";
import ProductTree from "./product-tree";
import { ColumnsType } from "antd/es/table/interface";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Header, Sider, Content } = Layout;

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
  const [selectedName, setSelectedName] = useState("");
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    record: DataType
  ) => {
    event.preventDefault();
    setSelectedName(record.name);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Link to="/Contact">{text}</Link>,
      ellipsis: true,
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
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const removeAllSelected = () => {
    setSelectedRowKeys([]);
  };

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
            <Breadcrumb.Item className="text-neutral-50">
              Contacts
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Header>
      <Layout>
        <Sider
          width={280}
          trigger={null}
          collapsible
          collapsedWidth={20}
          collapsed={collapsed}
          className="transition-all border-l-0 border-r border-solid border-y-0 border-neutral-200 bg-neutral-50"
        >
          <div
            className={`transition-opacity ${
              collapsed ? " opacity-0 pointer-events-none " : " contents "
            }`}
          >
            <ProductTree showSegmented={true} />
          </div>
          <Button
            shape="circle"
            onClick={toggleCollapsed}
            className={`fixed -translate-y-1/2 top-1/2 transition-all w-6 h-6 min-w-0 shadow-md ${
              collapsed ? "left-[7px]" : "left-[268px]"
            }`}
          >
            {collapsed ? (
              <RightOutlined className="[&>svg]:w-3 [&>svg]:h-3" />
            ) : (
              <LeftOutlined className="[&>svg]:w-3 [&>svg]:h-3" />
            )}
          </Button>
        </Sider>
        <Content className="pb-16 bg-white">
          <div className="p-4">
            <div className="flex items-center gap-2 mt-0.5 mb-3">
              <Title level={5}>
                <span>Contacts</span>
                <span className="mx-1.5 text-neutral-500">·</span>
                {selectedRowKeys.length === 0 && (
                  <span className="text-neutral-500">429 records</span>
                )}
                {selectedRowKeys.length > 0 && (
                  <>
                    <span className="font-medium tabular-nums text-neutral-500">
                      {selectedRowKeys.length} of 429
                      <span className="ml-1">selected</span>
                    </span>
                  </>
                )}
                <span className="mx-1.5 text-neutral-500">·</span>
                <a className="">Select all</a>
              </Title>
              <div className="flex items-center gap-2 ml-auto">
                <Button icon={<SearchOutlined />}>Search</Button>
                <Button icon={<PlusOutlined />} type="primary">
                  Add contact
                </Button>
              </div>
            </div>
            <div className="relative">
              <div
                className={`sticky overflow-x-auto bg-neutral-50 h-[38px] top-0 ml-6 transition-all z-20 flex items-center -mb-[38px] " ${
                  hasSelected
                    ? " opacity-100 "
                    : " opacity-0 pointer-events-none "
                }`}
              >
                <div className="flex items-center gap-4 ml-4">
                  <Button
                    size="small"
                    type="text"
                    icon={<MailOutlined className="relative top-px" />}
                    className="px-0 hover:bg-transparent hover:underline"
                  >
                    Message
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    icon={<PlusOutlined />}
                    className="px-0 hover:bg-transparent hover:underline"
                  >
                    Add to...
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    icon={<UsergroupAddOutlined />}
                    className="px-0 hover:bg-transparent hover:underline"
                  >
                    Invite to...
                  </Button>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item key="1" onClick={hideContextMenu}>
                          <CreditCardOutlined className="mr-3" /> Request
                          one-off payment
                        </Menu.Item>
                        <Menu.Item
                          key="2"
                          onClick={hideContextMenu}
                          className="text-red-500"
                        >
                          <DeleteOutlined className="mr-3" /> Mark as inactive
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <Space className="hover:bg-transparent hover:underline">
                        More
                        <DownOutlined className="-ml-0.5 w-2.5" />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </div>
              <Table
                rowSelection={rowSelection}
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-table-sticky"
                onRow={(record) => ({
                  onContextMenu: (event) => handleContextMenu(event, record),
                })}
              />
            </div>
          </div>
          <footer
            className={`fixed gap-2 bottom-0 flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
              collapsed ? " left-[20px] " : " left-[280px] "
            }`}
          >
            <div className="flex items-center gap-2 ml-auto">
              <Button>Edit columns</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </Layout>
      {contextMenuVisible && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={hideContextMenu}>
                <MailOutlined className="mr-3" /> Send message
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2" onClick={hideContextMenu}>
                <PlusOutlined className="mr-3" /> Add to product
              </Menu.Item>
              <Menu.Item key="3" onClick={hideContextMenu}>
                <UsergroupAddOutlined className="mr-3" /> Add to group
              </Menu.Item>
              <Menu.Item key="4" onClick={hideContextMenu}>
                <UserAddOutlined className="mr-3" /> Invite to product
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={hideContextMenu}
                className="text-red-500"
              >
                <DeleteOutlined className="mr-3" /> Mark as inactive
              </Menu.Item>
            </Menu>
          }
          open={contextMenuVisible}
          trigger={["contextMenu"]}
          autoAdjustOverflow
          destroyPopupOnHide
          getPopupContainer={() => document.body}
          overlayStyle={{ position: "fixed" }}
          onOpenChange={(visible) => !visible && hideContextMenu()}
        >
          <div
            style={{
              position: "fixed",
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
              width: "1px",
              height: "1px",
            }}
          ></div>
        </Dropdown>
      )}
    </Layout>
  );
}

export default Contacts;
