import React, { useState } from "react";
import {
  CalendarOutlined,
  CreditCardOutlined,
  DownOutlined,
  DownloadOutlined,
  EditOutlined,
  MailOutlined,
  PlusOutlined,
  StopOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Table,
  Dropdown,
  Menu,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import { ColumnsType } from "antd/es/table/interface";
const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

interface DataType {
  key: React.Key;
  orderNumber: string;
  beneficiary: string;
  product: string;
  quantity: number;
  unitPrice: number;
  createdDate: string;
  invoiceDate: string;
  total: number;
}

const data = [
  {
    key: "1",
    orderNumber: "#472389",
    createdDate: "14 May 2023",
    beneficiary: "James Toone",
    product:
      "Juniors juggling class, Junior schedule, 60 mins, ending 6 Nov 2023",
    quantity: 22,
    unitPrice: 5,
    invoiceDate: "15 May 2023",
    total: 110.0,
  },
  {
    key: "2",
    orderNumber: "#472389 (R)",
    createdDate: "9 May 2023",
    beneficiary: "Bill Murray",
    product: "Seahorse Swimmer, Junior schedule, 45 mins, ending 12 May 2023",
    quantity: 10,
    unitPrice: 10,
    invoiceDate: "11 May 2023",
    total: 100.0,
  },
];

const ScheduledOrders: React.FC = () => {
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
      title: "Order #",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text: string) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.orderNumber.length - b.orderNumber.length,
      width: 60,
      fixed: "left",
    },
    {
      title: "Beneficiary",
      dataIndex: "beneficiary",
      key: "beneficiary",
      render: (text: string) => <a>{text}</a>,
      ellipsis: true,
      sorter: (a, b) => a.beneficiary.length - b.beneficiary.length,
      width: 110,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      ellipsis: true,
      width: 180,
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => a.product.length - b.product.length,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      sorter: (a, b) => a.quantity - b.quantity,
      width: 60,
    },
    {
      title: "Unit price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "right",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <span className="tabular-nums">{`£${text.toFixed(2)}`}</span>
        ),
      width: 80,
    },
    {
      title: "Created",
      dataIndex: "createdDate",
      key: "createdDate",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.createdDate.length - b.createdDate.length,
      width: 80,
    },
    {
      title: "Invoiced",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      ellipsis: true,
      align: "right",
      sorter: (a, b) => a.invoiceDate.length - b.invoiceDate.length,
      width: 80,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "right",
      sorter: (a, b) => a.total - b.total,
      render: (text: number) =>
        text === 0 ? (
          "-"
        ) : (
          <span className="tabular-nums">{`£${text.toFixed(2)}`}</span>
        ),
      fixed: "right",
      width: 60,
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

  const [radioValue, setRadioValue] = useState(1);

  const onRadioValueChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-row-reverse items-center gap-1 mb-3">
        <RangePicker />
        <Radio.Group onChange={onRadioValueChange} value={radioValue}>
          <Radio value={1}>Date created</Radio>
          <Radio value={2}>Date payable</Radio>
        </Radio.Group>
      </div>
      <div>
        <Content className="bg-white border border-solid rounded border-neutral-200">
          <div className="relative">
            <div
              className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-neutral-50 h-[38px] top-0 ml-12 transition-all z-20 flex items-center -mb-[38px] " ${
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
                  Send message
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
                <Button
                  size="small"
                  type="text"
                  icon={<CreditCardOutlined />}
                  className="px-0 hover:bg-transparent hover:underline"
                >
                  Request payment
                </Button>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  overlay={
                    <Menu>
                      <Menu.Item key="1" onClick={hideContextMenu}>
                        <CalendarOutlined className="mr-3" /> Edit invoice date
                      </Menu.Item>
                      <Menu.Item key="2" onClick={hideContextMenu}>
                        <EditOutlined className="mr-3" /> Edit gross amount
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        onClick={hideContextMenu}
                        className="text-danger-500"
                      >
                        <StopOutlined className="mr-3" /> Cancel order
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
            </div>
            <Table
              rowSelection={rowSelection}
              size="small"
              scroll={{ x: 1300 }}
              columns={columns}
              dataSource={data}
              pagination={false}
              className="ant-table-sticky"
              onRow={(record) => ({
                onContextMenu: (event) => handleContextMenu(event, record),
              })}
            />
          </div>
          <footer className="flex items-center transition-all py-2.5 px-2 bg-neutral-50 rounded-b">
            <div className="flex items-center gap-2 ml-auto">
              <Button size="small">Manage columns</Button>
              <Button size="small" icon={<DownloadOutlined />}>
                Export
              </Button>
            </div>
          </footer>
        </Content>
      </div>
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
    </div>
  );
};

export default ScheduledOrders;
