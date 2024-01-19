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
import Sidebar from "../../../components/sidebar";
import ProductTree from "../../filter-product";
import TableFooter from "../../../components/table-footer";
import DateFilter from "../../../components/date-filter";
import {
  EllipsisOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TableTitle from "../../../components/table-title";
import { ColumnsType, SortOrder } from "antd/es/table/interface";
import { formatDate } from "../../../components/date-formatter";
import TableActions from "../../../components/table-actions";

const { Content } = Layout;

interface Condition {
  type: string;
  isMet: boolean;
}

interface Customer {
  id: number;
  name: string;
  accountOwner: string;
  product: string;
  conditions: Condition[];
  overriddenBy?: string;
  overriddenDate?: Date;

  missingConditions: () => string;
  overriddenInfo: () => string;
}

const ConditionsOfSale: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchedData: Customer[] = [
      {
        id: 1,
        name: "James Toone",
        accountOwner: "Ian Toone",
        product: "Product A",
        conditions: [{ type: "Consent", isMet: false }],
        overriddenBy: "Admin",
        overriddenDate: new Date(2023, 0, 4, 12, 35),
        missingConditions: function () {
          return this.conditions
            .filter((c) => !c.isMet)
            .map((c) => c.type)
            .join(", ");
        },
        overriddenInfo: function () {
          return this.overriddenBy
            ? `${this.overriddenBy} on ${this.overriddenDate}`
            : "";
        },
      },
      // Adding a new customer record
      {
        id: 2,
        name: "Jane Smith",
        accountOwner: "Tom Smith",
        product: "Product B",
        conditions: [
          { type: "Registration form", isMet: false },
          { type: "Photography consent", isMet: false },
        ],
        overriddenBy: "Julia Smith",
        overriddenDate: new Date(2023, 2, 15, 10, 20),
        missingConditions: function () {
          return this.conditions
            .filter((c) => !c.isMet)
            .map((c) => c.type)
            .join(", ");
        },
        overriddenInfo: function () {
          return this.overriddenBy
            ? `${this.overriddenBy} on ${this.overriddenDate}`
            : "";
        },
      },
      // Adding another new customer record
      {
        id: 3,
        name: "Emma Brown",
        accountOwner: "Sarah Brown",
        product: "Product C",
        conditions: [{ type: "Photography consent", isMet: false }],
        overriddenBy: "Julia Smith",
        overriddenDate: new Date(2023, 2, 15, 10, 20),
        missingConditions: function () {
          return this.conditions
            .filter((c) => !c.isMet)
            .map((c) => c.type)
            .join(", ");
        },
        overriddenInfo: function () {
          return this.overriddenBy
            ? `${this.overriddenBy} on ${this.overriddenDate}`
            : "";
        },
      },
    ];
    setCustomers(fetchedData);
  }, []);

  const getUniqueMissingConditions = (customers: Customer[]): string[] => {
    const allConditions = customers.flatMap((customer) =>
      customer.conditions.map((cond) => cond.type)
    );
    return Array.from(new Set(allConditions));
  };

  const uniqueConditions = getUniqueMissingConditions(customers);

  const conditionFilters = uniqueConditions.map((condition) => ({
    text: condition,
    value: condition,
  }));

  const onFilterMissingRequirements = (
    value: string | number | boolean,
    record: Customer
  ) => {
    const filterValue = String(value);
    return record.conditions.some(
      (condition) => !condition.isMet && condition.type === filterValue
    );
  };

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
      key: "8-1",
      label: "Add to",
      children: [
        {
          key: "8-1-1",
          label: "Class",
        },
        {
          key: "8-1-2",
          label: "Product",
        },
        {
          key: "8-1-3",
          label: "Group",
        },
      ],
      icon: <PlusOutlined />,
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
  ];

  const columns: ColumnsType<Customer> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Account owner",
      dataIndex: "accountOwner",
      key: "accountOwner",

      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Missing requirements",
      key: "missingRequirements",
      filters: conditionFilters,
      onFilter: onFilterMissingRequirements,
      render: (text: string, record: Customer) => record.missingConditions(),
    },
    {
      title: "Overridden date",
      key: "overridden",
      defaultSortOrder: "ascend" as SortOrder,
      align: "right",
      render: (text: string, record: Customer) => (
        <Tooltip
          title={
            record.overriddenDate
              ? formatDate(record.overriddenDate, "full")
              : ""
          }
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span className="truncate">{record.overriddenBy}</span>
            <span className="mx-1">·</span>
            <span>
              {record.overriddenDate
                ? formatDate(record.overriddenDate, "short")
                : ""}
            </span>
          </div>
        </Tooltip>
      ),
      sorter: (a: Customer, b: Customer) => {
        const dateA = a.overriddenDate?.getTime() || 0;
        const dateB = b.overriddenDate?.getTime() || 0;
        return dateA - dateB;
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "action",

      width: 50,
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSelectAll = () => {
    const allRowKeys = customers.map((item) => item.id);
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
          <Breadcrumb.Item key="ConditionsOfSale">
            Conditions of sale
          </Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <ProductTree hideFilters={true} />
        </Sidebar>
        <Content>
          <div className="p-4">
            <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2">
              <TableTitle
                title="Condition of sale exemptions"
                totalRecords={customers.length}
                selectable={false}
              />

              <div className="flex items-center gap-2.5 ml-auto">
                <Input
                  placeholder="Search product..."
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
                        <Menu.Item>Class</Menu.Item>
                        <Menu.Item>Product</Menu.Item>
                        <Menu.Item>Group</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      <PlusOutlined />
                      <span>Add to</span>
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
                </div>
              </TableActions>
              <Table
                rowSelection={rowSelection}
                dataSource={customers}
                columns={columns}
                rowKey="id"
                pagination={false}
                size="small"
                scroll={{ x: 800 }}
                className="ant-table-sticky ant-table-bg-reset"
              />
            </div>
          </div>
          <TableFooter collapsed={collapsed} sidebar={true} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ConditionsOfSale;
