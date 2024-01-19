import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  Table,
  Tooltip,
} from "antd";
import LoveAdminHeader from "../../../components/header";
import { Link } from "react-router-dom";
import TableFooter from "../../../components/table-footer";
import DateFilter from "../../../components/date-filter";
import {
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  MailOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TableTitle from "../../../components/table-title";
import { ColumnsType, SortOrder } from "antd/es/table/interface";
import { formatDate } from "../../../components/date-formatter";
import TableActions from "../../../components/table-actions";
import Tag, { Colours } from "../../../components/tag";

const { Content } = Layout;

export type EnquiryStatus = "Open" | "Replied" | null;

interface EnquiryCustomer {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  message: string;
  status: EnquiryStatus;
  date: Date;
}

const Enquiries: React.FC = () => {
  const [dropdownValue, setDropdownValue] = useState("1.0");
  const [collapsed, setCollapsed] = useState(false);
  const [EnquiryCustomers, setEnquiryCustomers] = useState<EnquiryCustomer[]>(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchedData: EnquiryCustomer[] = [
      {
        id: 1,
        firstName: "James",
        lastName: "Toone",
        emailAddress: "jtoone@loveadmin.co.uk",
        mobileNumber: "07984663772",
        message: "yoyoy",
        status: "Open",
        date: new Date(2023, 0, 4, 12, 35),
      },
      {
        id: 2,
        firstName: "Gareth",
        lastName: "Mace",
        emailAddress: "gmace@loveadmin.co.uk",
        mobileNumber: "07884663772",
        message:
          "Hello this is a long message to test the design more. I would like to buy a product please.",
        status: "Replied",
        date: new Date(2023, 0, 4, 12, 35),
      },
    ];
    setEnquiryCustomers(fetchedData);
  }, []);

  const actionItems: MenuProps["items"] = [
    {
      key: "7-0",
      label: "Message",
      children: [
        {
          key: "7-0-1",
          label: "Email",
        },
        {
          key: "7-0-2",
          label: "SMS",
        },
      ],
      icon: <MailOutlined />,
    },
    {
      key: "8-2",
      label: "Invite to",
      icon: <UsergroupAddOutlined />,
      children: [
        {
          key: "8-2-1",
          label: "Product",
        },
      ],
    },
    {
      key: "8-3-1",
      className:
        "[&_*]:text-danger-500 [&_*]:bg-transparent hover:bg-danger-50",
      icon: <DeleteOutlined />,
      label: <span className="text-danger-500">Delete</span>,
    },
  ];

  const mapStatusToStyle: Record<NonNullable<EnquiryStatus>, Colours> = {
    Open: "primary",
    Replied: "success",
  };

  const enquiryStatusDescriptions: Record<
    Exclude<EnquiryStatus, null>,
    string
  > = {
    Open: "Open",
    Replied: "Replied",
  };

  const initialColumns: ColumnsType<EnquiryCustomer> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record: EnquiryCustomer) =>
        `${record.firstName} ${record.lastName}`,
      width: 170,
      ellipsis: true,
    },
    {
      title: "Email address",
      dataIndex: "emailAddress",
      key: "emailAddress",
      width: 215,
    },
    {
      title: "Mobile number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 150,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 280,
      render: (message: string) => {
        return <p>{message}</p>;
      },
    },
  ];

  const statusColumn: ColumnsType<EnquiryCustomer> = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 90,
      filters: Object.keys(enquiryStatusDescriptions).map((statusKey) => ({
        text: enquiryStatusDescriptions[
          statusKey as keyof typeof enquiryStatusDescriptions
        ],
        value: statusKey,
      })),
      onFilter: (value: string | number | boolean, record: EnquiryCustomer) => {
        if (typeof value === "string") {
          return record.status === value;
        }
        return false;
      },
      render: (status: EnquiryStatus) => {
        return status ? (
          <Tag colour={mapStatusToStyle[status] || "default"}>{status}</Tag>
        ) : null;
      },
    },
  ];

  const submittedActionColumns: ColumnsType<EnquiryCustomer> = [
    {
      title: "Submitted",
      key: "date",
      defaultSortOrder: "ascend" as SortOrder,
      align: "right",
      width: 180,
      render: (text: string, record: EnquiryCustomer) => (
        <Tooltip
          title={record.date ? formatDate(record.date, "full") : ""}
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span>{record.date ? formatDate(record.date, "full") : ""}</span>
          </div>
        </Tooltip>
      ),
      sorter: (a: EnquiryCustomer, b: EnquiryCustomer) => {
        const dateA = a.date?.getTime() || 0;
        const dateB = b.date?.getTime() || 0;
        return dateA - dateB;
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      width: 80,
      render: () => (
        <Dropdown
          menu={{ items: actionItems }}
          trigger={["click"]}
          rootClassName="w-[11rem]"
        >
          <Button
            className="absolute right-[2px] top-[3px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  let columns: ColumnsType<EnquiryCustomer>;
  if (dropdownValue === "1.1") {
    columns = [...initialColumns, ...statusColumn, ...submittedActionColumns];
  } else {
    columns = [...initialColumns, ...submittedActionColumns];
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSelectAll = () => {
    const allRowKeys = EnquiryCustomers.map((item) => item.id);
    setSelectedRowKeys(allRowKeys);
  };

  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="reports">
            <Link to="/Reports">Reports</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="Enquiries">Enquiries</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Content>
          <div className="max-w-screen-xl p-4 mx-auto">
            <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2">
              <TableTitle
                title="Enquiries"
                totalRecords={EnquiryCustomers.length}
                selectedRowKeysLength={selectedRowKeys.length}
                onSelectAll={handleSelectAll}
                onUnselectAll={handleUnselectAll}
              />

              <div className="flex items-center gap-2.5 ml-auto">
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined className="mr-1" />}
                  allowClear
                />
                <DateFilter defaultFilter="This month" />
              </div>
            </div>
            <div className="relative mt-5 md:mt-4">
              <TableActions isVisible={selectedRowKeys.length > 0}>
                <div className="flex items-center gap-4">
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
                        <Menu.Item>Product</Menu.Item>
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
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="flex gap-1.5 font-medium text-danger-500 whitespace-nowrap"
                  >
                    <DeleteOutlined className="" />
                    <span>Delete</span>
                  </a>
                </div>
              </TableActions>
              <Table
                rowSelection={rowSelection}
                dataSource={EnquiryCustomers}
                columns={columns}
                rowKey="id"
                pagination={false}
                size="small"
                scroll={{ x: 800 }}
                className="ant-table-sticky ant-table-bg-reset"
              />
            </div>
          </div>
          <TableFooter hideManageColumns={true} />
        </Content>
        <div className="fixed mx-auto -translate-x-1/2 top-4 left-1/2 isolate z-max">
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu
                onClick={({ key }) => setDropdownValue(key)}
                selectedKeys={[dropdownValue]}
              >
                <Menu.Item key="1.0">1.0</Menu.Item>
                <Menu.Item key="1.1">1.1</Menu.Item>
              </Menu>
            }
          >
            <Button>
              Version {dropdownValue} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Layout>
    </Layout>
  );
};

export default Enquiries;
