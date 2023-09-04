import React, { ReactElement, useEffect, useState } from "react";
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Button, Breadcrumb, Dropdown, Table, Input, Menu } from "antd";
import ProductTree from "./product-tree";
import { ColumnsType } from "antd/es/table/interface";
import ProductSalesReportModal from "./product-sales-report-modal";
import DateFilter from "../components/date-filter";
import LoveAdminHeader from "../components/header";
import TableTitle from "../components/table-title";
import { TableFilterBar, TableFilterButton } from "../components/table-filters";
const { Sider, Content } = Layout;

interface DataType {
  key: React.Key;
  name: string;
  invoiced: number;
  received: number;
  pending: number;
  outstanding: number;
  failed: number;
}

const data = [
  {
    key: "1",
    name: "Adult Gymnastics",
    invoiced: 54.0,
    received: 0,
    pending: 0,
    outstanding: 0,
    failed: 0,
  },
  {
    key: "2",
    name: "Gymnastics 5-7 years",
    invoiced: 42.0,
    received: 0,
    pending: 0,
    outstanding: 0,
    failed: 0,
  },
];

function ProductSalesReport(): ReactElement {
  const [isActive, setIsActive] = useState(false);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Product",
      dataIndex: "name",

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
          <a onClick={showModal} className="tabular-nums">{`£${text.toFixed(
            2
          )}`}</a>
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
          <a onClick={showModal} className="tabular-nums">{`£${text.toFixed(
            2
          )}`}</a>
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
          <a onClick={showModal} className="tabular-nums">{`£${text.toFixed(
            2
          )}`}</a>
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
          <a onClick={showModal} className="tabular-nums">{`£${text.toFixed(
            2
          )}`}</a>
        ),
    },
    {
      title: "Failed",
      dataIndex: "failed",
      key: "failed",
      align: "right",
      sorter: (a, b) => a.failed - b.failed,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <a onClick={showModal} className="tabular-nums">{`£${text.toFixed(
            2
          )}`}</a>
        ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <LoveAdminHeader
        breadcrumbChildren={
          <>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Reports</Breadcrumb.Item>
            <Breadcrumb.Item>Financials</Breadcrumb.Item>
            <Breadcrumb.Item>Sales Reports</Breadcrumb.Item>
            <Breadcrumb.Item>Product Sales Report</Breadcrumb.Item>
          </>
        }
      ></LoveAdminHeader>
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
            <ProductTree hideFilters={true} />
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
            <div className="flex items-center mb-2.5">
              <div className="flex items-center">
                <TableTitle
                  title="Product Sales"
                  totalRecords={2}
                  selectable={false}
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Input
                  placeholder="Search product..."
                  prefix={<SearchOutlined className="mr-1" />}
                />
                <DateFilter />
                <TableFilterButton
                  toggleActive={() => setIsActive(!isActive)}
                  isActive={isActive}
                />
              </div>
            </div>
            <TableFilterBar isActive={isActive} />
            <div className="relative">
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
                  let totalFailed = 0;

                  pageData.forEach(
                    ({ invoiced, received, pending, outstanding, failed }) => {
                      totalInvoiced += invoiced;
                      totalReceived += received;
                      totalPending += pending;
                      totalOutstanding += outstanding;
                      totalFailed += totalFailed;
                    }
                  );

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row className="border-b-0 bg-neutral-50">
                        <Table.Summary.Cell
                          index={0}
                          align="right"
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
                              onClick={showModal}
                              className="font-semibold tabular-nums"
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
                              onClick={showModal}
                              className="tabular-nums"
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
                              onClick={showModal}
                              className="tabular-nums"
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
                              onClick={showModal}
                              className="tabular-nums"
                            >{`£${totalOutstanding.toFixed(2)}`}</a>
                          )}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={5}
                          align="right"
                          className="font-medium border-b-0"
                        >
                          {totalFailed === 0 ? (
                            "-"
                          ) : (
                            <a
                              onClick={showModal}
                              className="tabular-nums"
                            >{`£${totalFailed.toFixed(2)}`}</a>
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
              collapsed ? " left-[20px] " : " left-[280px] "
            }`}
          >
            <div className="flex items-center gap-2 ml-auto">
              <Button>Manage columns</Button>
              <Dropdown
                placement="topRight"
                overlay={
                  <Menu>
                    <Menu.Item
                      key="1"
                      onClick={() => console.log("Export PDF clicked")}
                    >
                      <div className="flex items-center gap-3">
                        <FilePdfOutlined />
                        <span>PDF</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      onClick={() => console.log("Export Excel clicked")}
                    >
                      <div className="flex items-center gap-3">
                        <FileExcelOutlined />
                        <span>Excel</span>
                      </div>
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button icon={<DownloadOutlined />}>Export</Button>
              </Dropdown>
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
