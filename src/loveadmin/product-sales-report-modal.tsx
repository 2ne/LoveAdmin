import React, { useState } from "react";
import {
  DownloadOutlined,
  MailOutlined,
  PlusOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Typography, Button, Table, Dropdown, Menu, Modal } from "antd";
import { ColumnsType } from "antd/es/table/interface";
const { Content } = Layout;
const { Title } = Typography;

interface ProductSalesReportModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

interface DataType {
  key: React.Key;
  invoiceNumber: string;
  status: string;
  beneficiary: string;
  date: string;
  quantity: number;
  invoiced: number;
}

const data = [
  {
    key: "1",
    invoiceNumber: "#462378",
    status: "Pending",
    beneficiary: "James Toone",
    date: "15 May 2023",
    quantity: 1,
    invoiced: 54.0,
  },
  {
    key: "2",
    invoiceNumber: "#462379",
    status: "Paid",
    beneficiary: "John Doe",
    date: "16 May 2023",
    quantity: 3,
    invoiced: 120.0,
  },
  {
    key: "3",
    invoiceNumber: "#462380",
    status: "Outstanding",
    beneficiary: "Sarah Smith",
    date: "17 May 2023",
    quantity: 2,
    invoiced: 100.0,
  },
  {
    key: "4",
    invoiceNumber: "#462381",
    status: "Paid",
    beneficiary: "Emily Johnson",
    date: "18 May 2023",
    quantity: 1,
    invoiced: 60.0,
  },
  {
    key: "5",
    invoiceNumber: "#462382",
    status: "Pending",
    beneficiary: "Robert Brown",
    date: "19 May 2023",
    quantity: 4,
    invoiced: 200.0,
  },
  {
    key: "6",
    invoiceNumber: "#462383",
    status: "Paid",
    beneficiary: "Michael Davis",
    date: "20 May 2023",
    quantity: 2,
    invoiced: 140.0,
  },
  {
    key: "7",
    invoiceNumber: "#462384",
    status: "Outstanding",
    beneficiary: "Jessica Miller",
    date: "21 May 2023",
    quantity: 1,
    invoiced: 50.0,
  },
  {
    key: "8",
    invoiceNumber: "#462385",
    status: "Paid",
    beneficiary: "Thomas Wilson",
    date: "22 May 2023",
    quantity: 1,
    invoiced: 180.0,
  },
  {
    key: "9",
    invoiceNumber: "#462386",
    status: "Pending",
    beneficiary: "Jennifer Taylor",
    date: "23 May 2023",
    quantity: 1,
    invoiced: 120.0,
  },
  {
    key: "10",
    invoiceNumber: "#462387",
    status: "Outstanding",
    beneficiary: "David Moore",
    date: "24 May 2023",
    quantity: 2,
    invoiced: 70.0,
  },
  {
    key: "11",
    invoiceNumber: "#462388",
    status: "Paid",
    beneficiary: "Mary Johnson",
    date: "25 May 2023",
    quantity: 1,
    invoiced: 240.0,
  },
  {
    key: "12",
    invoiceNumber: "#462389",
    status: "Pending",
    beneficiary: "William Jackson",
    date: "26 May 2023",
    quantity: 2,
    invoiced: 110.0,
  },
];

const ProductSalesReportModal: React.FC<ProductSalesReportModalProps> = ({
  visible,
  handleOk,
  handleCancel,
}) => {
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
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text: string) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.invoiceNumber.length - b.invoiceNumber.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      ellipsis: true,
      sorter: (a, b) => a.beneficiary.length - b.beneficiary.length,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      ellipsis: true,
      sorter: (a, b) => a.quantity - b.quantity,
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
    <Modal
      title={
        <Title level={5}>
          <span>Sales Report</span>
          <span className="mx-1.5">·</span>
          <span>Adult Gymnastics for this month</span>
          <span className="mx-1.5 text-subtitle">·</span>
          {selectedRowKeys.length === 0 && (
            <span className="text-subtitle">12 records</span>
          )}
          {selectedRowKeys.length > 0 && (
            <>
              <span className="font-medium tabular-nums text-subtitle">
                {selectedRowKeys.length} of 12
                <span className="ml-1">selected</span>
              </span>
              <span className="mx-1.5 text-subtitle">·</span>
              <a className="">Select all</a>
            </>
          )}
        </Title>
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="[&_.ant-modal-content]:rounded-none [&_.ant-modal-content]:min-h-screen [&>*]:w-full [&>*]:max-w-full"
      centered
      footer={false}
    >
      <div>
        <Content className="pb-16 bg-white">
          <div className="relative">
            <div
              className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-neutral-50 h-[38px] top-0 ml-6 transition-all z-20 flex items-center -mb-[38px] " ${
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
                  Message account owner
                </Button>
                <Button
                  size="small"
                  type="text"
                  icon={<PlusOutlined />}
                  className="px-0 hover:bg-transparent hover:underline"
                >
                  Add beneficiary to...
                </Button>
                <Button
                  size="small"
                  type="text"
                  icon={<UsergroupAddOutlined />}
                  className="px-0 hover:bg-transparent hover:underline"
                >
                  Invite beneficiary to...
                </Button>
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
          <footer className="fixed gap-2 bottom-0 flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
            <div className="flex items-center gap-2 ml-auto">
              <Button>Edit columns</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </div>
      <footer className="fixed gap-2 left-0 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
        <div className="flex items-center gap-2 ml-auto">
          <Button>Edit columns</Button>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </div>
      </footer>
      {contextMenuVisible && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={hideContextMenu}>
                <MailOutlined className="mr-3" /> Message account owner
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2" onClick={hideContextMenu}>
                <PlusOutlined className="mr-3" /> Add beneficiary to...
              </Menu.Item>
              <Menu.Item key="3" onClick={hideContextMenu}>
                <UserAddOutlined className="mr-3" /> Invite beneficiary to...
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
    </Modal>
  );
};

export default ProductSalesReportModal;
