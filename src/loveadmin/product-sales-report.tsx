import React, { ReactElement, useEffect, useState } from "react";
import {
  DownOutlined,
  DownloadOutlined,
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
  Modal,
} from "antd";
import ProductTree from "./product-tree";
import { ColumnsType } from "antd/es/table/interface";
import ProductSalesReportModal from "./product-sales-report-modal";
const { Title } = Typography;
const { Header, Sider, Content } = Layout;

interface DataType {
  key: React.Key;
  name: string;
  invoiced: number;
  received: number;
  pending: number;
  outstanding: number;
  credits: number;
}

const data = [
  {
    key: "1",
    name: "Adult Gymnastics",
    invoiced: 54.0,
    received: 0,
    pending: 0,
    outstanding: 0,
    credits: 0,
  },
  {
    key: "2",
    name: "Gymnastics 5-7 years",
    invoiced: 42.0,
    received: 0,
    pending: 0,
    outstanding: 0,
    credits: 0,
  },
];

function ProductSalesReport(): ReactElement {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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

  const items: MenuProps["items"] = [
    {
      label: <a href="#">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="#">2nd menu item</a>,
      key: "1",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Product description",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a onClick={showModal}>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Invoiced",
      dataIndex: "invoiced",
      key: "invoiced",
      align: "right",
      sorter: (a, b) => a.invoiced - b.invoiced,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <a
            href="#"
            className="text-neutral-900 tabular-nums"
          >{`£${text.toFixed(2)}`}</a>
        ),
    },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
      align: "right",
      sorter: (a, b) => a.received - b.received,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <a
            href="#"
            className="text-neutral-900 tabular-nums"
          >{`£${text.toFixed(2)}`}</a>
        ),
    },
    {
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
      align: "right",
      sorter: (a, b) => a.pending - b.pending,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <a
            href="#"
            className="text-neutral-900 tabular-nums"
          >{`£${text.toFixed(2)}`}</a>
        ),
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      key: "outstanding",
      align: "right",
      sorter: (a, b) => a.outstanding - b.outstanding,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <a
            href="#"
            className="text-neutral-900 tabular-nums"
          >{`£${text.toFixed(2)}`}</a>
        ),
    },
    {
      title: "Credits applied",
      dataIndex: "credits",
      key: "credits",
      align: "right",
      sorter: (a, b) => a.credits - b.credits,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <a
            href="#"
            className="text-neutral-900 tabular-nums"
          >{`£${text.toFixed(2)}`}</a>
        ),
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
          className="mr-3 -ml-3 hover:bg-neutral-700 text-neutral-50 hover:text-white"
        />
        <div>
          <div>
            <Title level={5} className="text-neutral-50 !m-0">
              Product Sales Report
            </Title>
          </div>
          <div>
            <Breadcrumb className="[&_li]:text-neutral-400">
              <Breadcrumb.Item className="cursor-pointer hover:underline">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item className="cursor-pointer hover:underline">
                Reports
              </Breadcrumb.Item>
              <Breadcrumb.Item className="cursor-pointer hover:underline">
                Financials
              </Breadcrumb.Item>
              <Breadcrumb.Item className="cursor-pointer hover:underline">
                Sales Reports
              </Breadcrumb.Item>
              <Breadcrumb.Item className="text-neutral-50">
                Product Sales Report
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
          className="border-l-0 border-r border-solid border-y-0 bg-neutral-50 border-neutral-200"
        >
          <ProductTree />
        </Sider>
        <Content className="pb-16 bg-white">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="h-8 px-2.5 transition-all rounded text-neutral-800 hover:bg-neutral-100">
                    This month
                    <DownOutlined className="-ml-0.5 w-2.5 text-neutral-400" />
                  </Space>
                </a>
              </Dropdown>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="h-8 px-2.5 transition-all rounded text-neutral-800 hover:bg-neutral-100">
                    All schedules
                    <DownOutlined className="-ml-0.5 w-2.5 text-neutral-400" />
                  </Space>
                </a>
              </Dropdown>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="h-8 px-2.5 transition-all rounded text-neutral-800 hover:bg-neutral-100">
                    All addresses
                    <DownOutlined className="-ml-0.5 w-2.5 text-neutral-400" />
                  </Space>
                </a>
              </Dropdown>
              <Checkbox className="ml-3">Show cancelled</Checkbox>
            </div>
            <div>
              <Table
                pagination={false}
                size="small"
                columns={columns}
                dataSource={data}
                className="ant-table-sticky"
                summary={(pageData) => {
                  let totalInvoiced = 0;
                  let totalReceived = 0;
                  let totalPending = 0;
                  let totalOutstanding = 0;
                  let totalCredits = 0;

                  pageData.forEach(
                    ({ invoiced, received, pending, outstanding, credits }) => {
                      totalInvoiced += invoiced;
                      totalReceived += received;
                      totalPending += pending;
                      totalOutstanding += outstanding;
                      totalCredits += credits;
                    }
                  );

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row className="border-b-0 bg-neutral-50">
                        <Table.Summary.Cell
                          index={0}
                          className="font-medium border-b-0 rounded-bl-md rounded-br-md"
                        >
                          Totals
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={1}
                          align="right"
                          className="font-medium border-b-0"
                        >
                          {totalInvoiced === 0 ? (
                            "-"
                          ) : (
                            <a
                              href="#"
                              className="text-neutral-900 tabular-nums"
                            >{`£${totalInvoiced.toFixed(2)}`}</a>
                          )}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={2}
                          align="right"
                          className="font-medium border-b-0"
                        >
                          {totalReceived === 0 ? (
                            "-"
                          ) : (
                            <a
                              href="#"
                              className="text-neutral-900 tabular-nums"
                            >{`£${totalReceived.toFixed(2)}`}</a>
                          )}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={3}
                          align="right"
                          className="font-medium border-b-0"
                        >
                          {totalPending === 0 ? (
                            "-"
                          ) : (
                            <a
                              href="#"
                              className="text-neutral-900 tabular-nums"
                            >{`£${totalPending.toFixed(2)}`}</a>
                          )}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={4}
                          align="right"
                          className="font-medium border-b-0"
                        >
                          {totalOutstanding === 0 ? (
                            "-"
                          ) : (
                            <a
                              href="#"
                              className="text-neutral-900 tabular-nums"
                            >{`£${totalOutstanding.toFixed(2)}`}</a>
                          )}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={5}
                          align="right"
                          className="font-medium border-b-0"
                        >
                          {totalCredits === 0 ? (
                            "-"
                          ) : (
                            <a
                              href="#"
                              className="text-neutral-900 tabular-nums"
                            >{`£${totalCredits.toFixed(2)}`}</a>
                          )}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
              />
            </div>
          </div>
          <footer
            className={`fixed gap-2 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
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
      <ProductSalesReportModal
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Layout>
  );
}

export default ProductSalesReport;
