import React, { ReactElement, useState } from "react";
import {
  DownOutlined,
  DownloadOutlined,
  ExportOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Breadcrumb,
  Dropdown,
  Space,
  MenuProps,
  Checkbox,
  Table,
} from "antd";
import ProductTree from "./product-tree";
import { ColumnsType } from "antd/es/table/interface";
const { Text, Title } = Typography;
const { Header, Sider, Content } = Layout;

function ProductSalesReport(): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
  ];

  interface DataType {
    key: React.Key;
    name: string;
    invoiced: string;
    received: string;
    pending: string;
    outstanding: string;
    credits: string;
  }

  const data = [
    {
      key: "1",
      name: "Adult Gymnastics",
      invoiced: "£54.00",
    },
    {
      key: "2",
      name: "Gymnastics 5-7 years",
      invoiced: "£42.00",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Product description",
      dataIndex: "name",
      key: "name",
      render: (
        text:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Invoiced",
      dataIndex: "invoiced",
      key: "invoiced",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.invoiced.length - b.invoiced.length,
      render: (text) => text || "-",
    },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.received.length - b.received.length,
      render: (text) => text || "-",
    },
    {
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.pending.length - b.pending.length,
      render: (text) => text || "-",
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      key: "outstanding",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.outstanding.length - b.outstanding.length,
      render: (text) => text || "-",
    },
    {
      title: "Credits applied",
      dataIndex: "credits",
      key: "credits",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.credits.length - b.credits.length,
      render: (text) => text || "-",
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center px-6 border-none shadow-none bg-neutral-800">
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          ghost
          className="mr-3 -ml-3 text-neutral-50 hover:text-neutral-300"
        />
        <div>
          <div>
            <Title level={5} className="text-neutral-50 !m-0">
              Product Sales Report
            </Title>
          </div>
          <div>
            <Breadcrumb className="[&_li]:text-neutral-400">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Reports</Breadcrumb.Item>
              <Breadcrumb.Item>Financials</Breadcrumb.Item>
              <Breadcrumb.Item>Sales Reports</Breadcrumb.Item>
              <Breadcrumb.Item className="text-neutral-50">
                Product Sales Report
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          width={300}
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          className={`py-4 overflow-hidden border-l-0 border-r border-solid border-y-0 bg-neutral-50 border-neutral-200 ${
            collapsed ? " px-0 " : " px-3 "
          }`}
        >
          <ProductTree />
        </Sider>
        <Content className="bg-white">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="h-8 px-2.5 transition-all rounded text-neutral-800 hover:bg-neutral-100">
                    This month
                    <DownOutlined className="text-neutral-400" />
                  </Space>
                </a>
              </Dropdown>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="h-8 px-2.5 transition-all rounded text-neutral-800 hover:bg-neutral-100">
                    All schedules
                    <DownOutlined className="text-neutral-400" />
                  </Space>
                </a>
              </Dropdown>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="h-8 px-2.5 transition-all rounded text-neutral-800 hover:bg-neutral-100">
                    All addresses
                    <DownOutlined className="text-neutral-400" />
                  </Space>
                </a>
              </Dropdown>
              <Checkbox className="ml-3">Show cancelled</Checkbox>
            </div>
            <div>
              <Table size="small" columns={columns} dataSource={data} />
            </div>
          </div>
          <footer
            className={`fixed gap-2 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
              collapsed ? " left-0 " : " left-[300px] "
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

export default ProductSalesReport;
