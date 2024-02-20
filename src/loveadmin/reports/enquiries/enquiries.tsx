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
  CheckCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  MailOutlined,
  SearchOutlined,
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
  const [pageSize, setPageSize] = useState<number>(16);
  const [EnquiryCustomers, setEnquiryCustomers] = useState<EnquiryCustomer[]>(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleWindowResize = () => {
    // Calculate the number of rows that can fit in the viewport
    const viewportHeight = window.innerHeight - 290;
    const rowHeight = 39; // Height of each row
    let newPageSize = Math.floor(viewportHeight / rowHeight);

    // Ensure the minimum pageSize is 5
    newPageSize = Math.max(newPageSize, 5);

    // Update the pageSize based on the calculation
    setPageSize(newPageSize);
  };

  useEffect(() => {
    // Initial calculation on component mount
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const fetchedData: EnquiryCustomer[] = [
      {
        id: 1,
        firstName: "James",
        lastName: "Toone",
        emailAddress: "jtoone@loveadmin.co.uk",
        mobileNumber: "07984663772",
        message: "yoyoy",
        status: "Replied",
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
      {
        id: 3,
        firstName: "Laura",
        lastName: "Smith",
        emailAddress: "lsmith@loveadmin.co.uk",
        mobileNumber: "07774663772",
        message: "Can you provide more details about the membership?",
        status: "Replied",
        date: new Date(2023, 0, 5, 10, 20),
      },
      {
        id: 4,
        firstName: "Oliver",
        lastName: "Johnson",
        emailAddress: "ojohnson@loveadmin.co.uk",
        mobileNumber: "07664663772",
        message: "I'm interested in joining, what are the next steps?",
        status: "Replied",
        date: new Date(2023, 0, 5, 11, 45),
      },
      {
        id: 5,
        firstName: "Sophia",
        lastName: "Lee",
        emailAddress: "slee@loveadmin.co.uk",
        mobileNumber: "07554663772",
        message: "Is there a discount for students?",
        status: "Replied",
        date: new Date(2023, 0, 6, 9, 30),
      },
      {
        id: 6,
        firstName: "Liam",
        lastName: "Brown",
        emailAddress: "lbrown@loveadmin.co.uk",
        mobileNumber: "07444663772",
        message: "I need to change my booking.",
        status: "Replied",
        date: new Date(2023, 0, 6, 14, 15),
      },
      {
        id: 7,
        firstName: "Emma",
        lastName: "Davis",
        emailAddress: "edavis@loveadmin.co.uk",
        mobileNumber: "07334663772",
        message: "When does the course start?",
        status: "Replied",
        date: new Date(2023, 0, 7, 13, 10),
      },
      {
        id: 8,
        firstName: "Noah",
        lastName: "Miller",
        emailAddress: "nmiller@loveadmin.co.uk",
        mobileNumber: "07224663772",
        message: "Can I cancel my subscription online?",
        status: "Replied",
        date: new Date(2023, 0, 7, 16, 20),
      },
      {
        id: 9,
        firstName: "Ava",
        lastName: "Wilson",
        emailAddress: "awilson@loveadmin.co.uk",
        mobileNumber: "07114663772",
        message: "Do you offer group discounts?",
        status: "Replied",
        date: new Date(2023, 0, 8, 12, 30),
      },
      {
        id: 10,
        firstName: "William",
        lastName: "Moore",
        emailAddress: "wmoore@loveadmin.co.uk",
        mobileNumber: "07004663772",
        message: "I haven't received my confirmation email.",
        status: "Replied",
        date: new Date(2023, 0, 8, 17, 45),
      },
      {
        id: 11,
        firstName: "Isabella",
        lastName: "Taylor",
        emailAddress: "itaylor@loveadmin.co.uk",
        mobileNumber: "06994663772",
        message: "How do I update my payment method?",
        status: "Replied",
        date: new Date(2023, 0, 9, 10, 10),
      },
      {
        id: 12,
        firstName: "Ethan",
        lastName: "Anderson",
        emailAddress: "eanderson@loveadmin.co.uk",
        mobileNumber: "06884663772",
        message: "I want to give feedback about the last event.",
        status: "Replied",
        date: new Date(2023, 0, 9, 18, 55),
      },
      {
        id: 13,
        firstName: "Mia",
        lastName: "Thomas",
        emailAddress: "mthomas@loveadmin.co.uk",
        mobileNumber: "06774663772",
        message: "What are the benefits of premium membership?",
        status: "Replied",
        date: new Date(2023, 0, 10, 11, 30),
      },
      {
        id: 14,
        firstName: "Jacob",
        lastName: "Jackson",
        emailAddress: "jjackson@loveadmin.co.uk",
        mobileNumber: "06664663772",
        message: "Can I transfer my membership to someone else?",
        status: "Replied",
        date: new Date(2023, 0, 10, 14, 20),
      },
      {
        id: 15,
        firstName: "Charlotte",
        lastName: "Harris",
        emailAddress: "charris@loveadmin.co.uk",
        mobileNumber: "06554663772",
        message: "Are there any prerequisites for joining the advanced class?",
        status: "Open",
        date: new Date(2023, 0, 11, 9, 50),
      },
      {
        id: 16,
        firstName: "Logan",
        lastName: "Martin",
        emailAddress: "lmartin@loveadmin.co.uk",
        mobileNumber: "06444663772",
        message: "What is the refund policy?",
        status: "Open",
        date: new Date(2023, 0, 11, 15, 30),
      },
      {
        id: 17,
        firstName: "Sophie",
        lastName: "Clark",
        emailAddress: "sclark@loveadmin.co.uk",
        mobileNumber: "06334663772",
        message: "Do you have any workshops scheduled?",
        status: "Open",
        date: new Date(2023, 0, 12, 10, 45),
      },
      {
        id: 18,
        firstName: "Benjamin",
        lastName: "Rodriguez",
        emailAddress: "brodriguez@loveadmin.co.uk",
        mobileNumber: "06224663772",
        message: "Can I join more than one class at a time?",
        status: "Open",
        date: new Date(2023, 0, 12, 12, 10),
      },
      {
        id: 19,
        firstName: "Amelia",
        lastName: "Lewis",
        emailAddress: "alewis@loveadmin.co.uk",
        mobileNumber: "06114663772",
        message: "What are the office hours for customer support?",
        status: "Replied",
        date: new Date(2023, 0, 13, 11, 20),
      },
      {
        id: 20,
        firstName: "Lucas",
        lastName: "Lee",
        emailAddress: "llee@loveadmin.co.uk",
        mobileNumber: "06004663772",
        message: "Is there a trial period for new members?",
        status: "Open",
        date: new Date(2023, 0, 13, 16, 35),
      },
      {
        id: 21,
        firstName: "Harper",
        lastName: "Walker",
        emailAddress: "hwalker@loveadmin.co.uk",
        mobileNumber: "05994663772",
        message: "How do I sign up for the newsletter?",
        status: "Open",
        date: new Date(2023, 0, 14, 14, 50),
      },
      {
        id: 22,
        firstName: "Elijah",
        lastName: "Hall",
        emailAddress: "ehall@loveadmin.co.uk",
        mobileNumber: "05884663772",
        message: "Do you offer any family memberships?",
        status: "Open",
        date: new Date(2023, 0, 14, 18, 30),
      },
      {
        id: 23,
        firstName: "Evelyn",
        lastName: "Allen",
        emailAddress: "eallen@loveadmin.co.uk",
        mobileNumber: "05774663772",
        message: "What equipment do I need for the online classes?",
        status: "Open",
        date: new Date(2023, 0, 15, 9, 30),
      },
      {
        id: 24,
        firstName: "Alexander",
        lastName: "Young",
        emailAddress: "ayoung@loveadmin.co.uk",
        mobileNumber: "05664663772",
        message: "Is it possible to change my class schedule?",
        status: "Open",
        date: new Date(2023, 0, 15, 17, 15),
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
      label: "Mark as replied",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "8-2-3",
      type: "divider",
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
    Open: "neutral",
    Replied: "success",
  };

  const enquiryStatusDescriptions: Record<
    Exclude<EnquiryStatus, null>,
    string
  > = {
    Open: "Open",
    Replied: "Replied",
  };

  const columns: ColumnsType<EnquiryCustomer> = [
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
    {
      title: "Submitted",
      key: "date",
      defaultSortOrder: "descend" as SortOrder,
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
            className="absolute right-[2px] top-1/2 -translate-y-1/2"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
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
      <Layout className="pb-24 bg-white rounded-t-lg">
        <Content>
          <div className="p-4">
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
              <TableActions
                isVisible={selectedRowKeys.length > 0}
                className="xl:ml-[calc(1rem+1.35vw)] from-[#f5f7fa] to-neutral-50/50"
              >
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
                        <Menu.Item icon={<MailOutlined />}>Open</Menu.Item>
                        <Menu.Item icon={<CheckCircleOutlined />}>
                          Replied
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      <span>Mark as</span>
                      <DownOutlined />
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
                pagination={{ pageSize }}
                size="small"
                scroll={{ x: 800 }}
                sticky={true}
                className="ant-table-sticky ant-table-bg-reset"
              />
            </div>
          </div>
          <TableFooter hideManageColumns={true} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Enquiries;
