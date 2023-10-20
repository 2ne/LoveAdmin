import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  CreditCardOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Button, Table, Dropdown, Menu, Modal, Input } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import TableTitle from "../../../components/table-title";
import TableActions from "../../../components/table-actions";
const { Content } = Layout;

interface ProductSalesReportModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

interface DataType {
  key: React.Key;
  invoiceNumber: string;
  name: string;
  accountOwner: string;
  product: string;
  date: string;
  quantity: number;
  invoiced: number;
  paid: number;
  pending: number;
  outstanding: number;
  failed: number;
  daysOverdue: number;
  lastReminder: string;
}

const data = [
  {
    key: "1",
    invoiceNumber: "#462378",
    name: "James Toone",
    accountOwner: "Ian Toone",
    product: "Adult Gymnastics",
    date: "15 May 2023",
    quantity: 1,
    invoiced: 54.0,
    paid: 54.0,
    pending: 0,
    outstanding: 0,
    failed: 54.0,
    daysOverdue: 0,
    lastReminder: "",
  },
  {
    key: "2",
    invoiceNumber: "#462379",
    name: "Sarah Smith",
    accountOwner: "John Smith",
    product: "Yoga Classes",
    date: "16 May 2023",
    quantity: 2,
    invoiced: 100.0,
    paid: 50.0,
    pending: 50.0,
    outstanding: 0,
    failed: 0,
    daysOverdue: 0,
    lastReminder: "",
  },
  {
    key: "3",
    invoiceNumber: "#462380",
    name: "Emily Johnson",
    accountOwner: "Michael Johnson",
    product: "Swimming Lessons",
    date: "17 May 2023",
    quantity: 3,
    invoiced: 150.0,
    paid: 50.0,
    pending: 0,
    outstanding: 100.0,
    failed: 0,
    daysOverdue: 5,
    lastReminder: "20 May 2023",
  },
  {
    key: "4",
    invoiceNumber: "#462381",
    name: "Daniel Brown",
    accountOwner: "Samantha Brown",
    product: "Boxing Classes",
    date: "18 May 2023",
    quantity: 1,
    invoiced: 40.0,
    paid: 40.0,
    pending: 0,
    outstanding: 0,
    failed: 0,
    daysOverdue: 0,
    lastReminder: "",
  },
  {
    key: "5",
    invoiceNumber: "#462382",
    name: "Rebecca Williams",
    accountOwner: "Daniel Williams",
    product: "Dance Classes",
    date: "19 May 2023",
    quantity: 4,
    invoiced: 200.0,
    paid: 0,
    pending: 0,
    outstanding: 200.0,
    failed: 0,
    daysOverdue: 10,
    lastReminder: "25 May 2023",
  },
  {
    key: "6",
    invoiceNumber: "#462383",
    name: "Oliver Wilson",
    accountOwner: "Claire Wilson",
    product: "Personal Training",
    date: "20 May 2023",
    quantity: 1,
    invoiced: 60.0,
    paid: 60.0,
    pending: 0,
    outstanding: 0,
    failed: 0,
    daysOverdue: 0,
    lastReminder: "",
  },
  {
    key: "7",
    invoiceNumber: "#462384",
    name: "Lucy Patel",
    accountOwner: "Raj Patel",
    product: "Zumba Classes",
    date: "21 May 2023",
    quantity: 2,
    invoiced: 80.0,
    paid: 40.0,
    pending: 40.0,
    outstanding: 0,
    failed: 0,
    daysOverdue: 0,
    lastReminder: "",
  },
  {
    key: "8",
    invoiceNumber: "#462385",
    name: "William Thompson",
    accountOwner: "Lisa Thompson",
    product: "Spin Classes",
    date: "22 May 2023",
    quantity: 3,
    invoiced: 90.0,
    paid: 0,
    pending: 0,
    outstanding: 90.0,
    failed: 0,
    daysOverdue: 3,
    lastReminder: "24 May 2023",
  },
  {
    key: "9",
    invoiceNumber: "#462386",
    name: "Sophia Lee",
    accountOwner: "David Lee",
    product: "CrossFit",
    date: "23 May 2023",
    quantity: 1,
    invoiced: 70.0,
    paid: 70.0,
    pending: 0,
    outstanding: 0,
    failed: 0,
    daysOverdue: 0,
    lastReminder: "",
  },
  {
    key: "10",
    invoiceNumber: "#462387",
    name: "Isabella Roberts",
    accountOwner: "Sarah Roberts",
    product: "Pilates",
    date: "24 May 2023",
    quantity: 2,
    invoiced: 100.0,
    paid: 50.0,
    pending: 50.0,
    outstanding: 0,
    failed: 0,
    daysOverdue: 0,
    lastReminder: "",
  },
];

const ProductSalesReportModal: React.FC<ProductSalesReportModalProps> = ({
  visible,
  handleOk,
  handleCancel,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Invoice",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text: string) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.invoiceNumber.length - b.invoiceNumber.length,
      width: 100,
      fixed: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text: string) => <a>{text}</a>,
      width: 200,
    },
    {
      title: "Account owner",
      dataIndex: "accountOwner",
      key: "accountOwner",
      ellipsis: true,
      sorter: (a, b) => a.accountOwner.length - b.accountOwner.length,
      render: (text: string) => <a>{text}</a>,
      width: 200,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      width: 225,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      sorter: (a, b) => a.date.length - b.date.length,
      width: 125,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      ellipsis: true,
      sorter: (a, b) => a.quantity - b.quantity,
      width: 90,
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
          <span className="tabular-nums">{`£${text.toFixed(2)}`}</span>
        ),
      width: 90,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      align: "right",
      sorter: (a, b) => a.paid - b.paid,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <span className="tabular-nums">{`£${text.toFixed(2)}`}</span>
        ),
      width: 90,
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
          <span className="tabular-nums">{`£${text.toFixed(2)}`}</span>
        ),
      width: 90,
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
          <span className="tabular-nums">{`£${text.toFixed(2)}`}</span>
        ),
      width: 125,
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
          <a className="tabular-nums">{`£${text.toFixed(2)}`}</a>
        ),
      width: 90,
    },
    {
      title: "Days overdue",
      dataIndex: "daysOverdue",
      key: "daysOverdue",
      align: "right",
      ellipsis: true,
      sorter: (a, b) => a.daysOverdue - b.daysOverdue,
      render: (text: number) => (text === 0 ? "-" : <span>{text}</span>),
      width: 130,
    },
    {
      title: "Last reminder",
      dataIndex: "lastReminder",
      key: "lastReminder",
      ellipsis: true,
      sorter: (a, b) => a.lastReminder.length - b.lastReminder.length,
      render: (text: string) => (text === " " ? " " : <span>{text}</span>),
      width: 130,
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

  const handleSelectAll = () => {
    const allRowKeys = data.map((item) => item.key);
    setSelectedRowKeys(allRowKeys);
  };

  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            className="rounded-full"
            onClick={handleCancel}
          />
          <TableTitle
            title="Product Sales - Adult Gymnastics for this month"
            selectedRowKeysLength={selectedRowKeys.length}
            onSelectAll={handleSelectAll}
            onUnselectAll={handleUnselectAll}
            totalRecords={data.length}
          />
          <div className="ml-auto font-normal">
            <Input
              className="w-[19rem]"
              placeholder="Search invoice, name, payment reference..."
              prefix={<SearchOutlined className="mr-1" />}
            />
          </div>
        </div>
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="[&_.ant-modal-content]:rounded-none [&_.ant-modal-content]:min-h-screen [&>*]:w-full [&>*]:max-w-full"
      centered
      footer={false}
      closeIcon={null}
    >
      <div>
        <Content className="pb-16 bg-white">
          <div className="relative">
            <TableActions isVisible={selectedRowKeys.length > 0}>
              <Dropdown
                placement="bottomLeft"
                getPopupContainer={() => document.body}
                overlayStyle={{ position: "fixed" }}
                overlay={
                  <Menu>
                    <Menu.Item key="1">Email</Menu.Item>
                    <Menu.Item key="2">SMS</Menu.Item>
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
                    <Menu.Item key="1">Request payment</Menu.Item>
                    <Menu.Item key="2">Raise credit note</Menu.Item>
                    <Menu.Item key="3">Record offline payment</Menu.Item>
                    <Menu.Item key="4">Refund</Menu.Item>
                    <Menu.Item key="5">Re-attempt payment collection</Menu.Item>
                    <Menu.Item key="6">Cancel automatic reminder</Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button
                  onClick={(e) => e.preventDefault()}
                  size="small"
                  type="text"
                  icon={<CreditCardOutlined />}
                  className="px-0 font-medium hover:bg-transparent hover:underline text-neutral-800"
                >
                  Finance options...
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
              scroll={{ x: 1700 }}
            />
          </div>
        </Content>
      </div>
      <footer className="fixed gap-2 left-0 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
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
                  <div className="flex items-center gap-2">
                    <FilePdfOutlined />
                    <span>PDF</span>
                  </div>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => console.log("Export Excel clicked")}
                >
                  <div className="flex items-center gap-2">
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
    </Modal>
  );
};

export default ProductSalesReportModal;
