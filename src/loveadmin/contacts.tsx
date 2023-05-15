import React, { ReactElement, useEffect, useState } from "react";
import {
  DownloadOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Typography, Button, Breadcrumb, Table } from "antd";
import ProductTree from "./product-tree";
import { ColumnsType } from "antd/es/table/interface";
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
      render: (text: string) => <a>{text}</a>,
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

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center px-6 border-none shadow-none bg-neutral-800">
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          ghost
          className="mr-3 -ml-3 hover:bg-neutral-700 text-neutral-50 hover:text-white"
        />
        <div>
          <div>
            <Title level={5} className="text-neutral-50 !m-0">
              Contacts
            </Title>
          </div>
          <div>
            <Breadcrumb className="[&_li]:text-neutral-400">
              <Breadcrumb.Item className="cursor-pointer hover:underline">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item className="text-neutral-50">
                Contacts
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          width={280}
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          className={`py-4 overflow-hidden border-l-0 border-r border-solid border-y-0 bg-neutral-50 border-neutral-200 ${
            collapsed ? " px-0 " : " px-3 "
          }`}
        >
          <ProductTree showSegmented={true} />
        </Sider>
        <Content className="pb-16 bg-white">
          <div className="p-4">
            <div className="flex items-center gap-2 mt-0.5 mb-3">
              <Title level={5}>
                <span>Contacts</span>
                <span className="text-neutral-500">
                  <span className="mx-1.5">·</span>429
                </span>
              </Title>
              <div className="flex items-center gap-2 ml-auto">
                <Button icon={<SearchOutlined />}>Search</Button>
                <Button icon={<PlusOutlined />} type="primary">
                  Add contact
                </Button>
              </div>
            </div>
            <div>
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
          <div
            className={`fixed transition-all duration-500 bg-white/95 right-0 z-20 w-full max-w-lg p-4 mx-auto border-t border-b-0 border-solid rounded shadow-md border-black/10 " ${
              collapsed ? " left-0 " : " left-[280px] "
            } ${
              hasSelected ? " opacity-100 bottom-20 " : " opacity-0 bottom-0 "
            }`}
          >
            <span className="tabular-nums">{selectedRowKeys.length}</span>
            <span className="text-neutral-500">
              <span className="mx-1.5">·</span>item selected
            </span>
          </div>
          <footer
            className={`fixed gap-2 bottom-0 flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
              collapsed ? " left-0 " : " left-[280px] "
            }`}
          >
            <Button onClick={toggleCollapsed} className="px-2">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <Button>Edit columns</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Contacts;
