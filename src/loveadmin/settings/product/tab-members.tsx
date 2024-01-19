import React, { useState } from "react";
import { Table, Button, Dropdown, Menu, Tooltip, Input, MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatDate } from "../../../components/date-formatter";
import TableTitle from "../../../components/table-title";
import {
  BlockOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  StopOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TableActions from "../../../components/table-actions";

interface User {
  key: string;
  name: string;
  since: Date;
  suspended: Date;
}

const ProductMembers: React.FC = () => {
  const [data, setData] = useState<User[]>([
    {
      key: "1",
      name: "John Doe",
      since: new Date(2023, 0, 4, 12, 35),
      suspended: new Date(2023, 0, 4, 12, 35),
    },
    // Add more sample users here...
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
      key: "9",
      type: "divider",
    },
    {
      key: "10",
      label: "Request payment",
      icon: <CreditCardOutlined className="text-neutral-500" />,
    },
    {
      key: "11",
      type: "divider",
    },
    {
      key: "12",
      label: "Invite to product",
      icon: <UserAddOutlined className="text-neutral-500" />,
    },
    {
      key: "13",
      label: "Move to product",
      icon: <UserSwitchOutlined className="text-neutral-500" />,
    },
    {
      key: "14",
      type: "divider",
    },
    {
      key: "15",
      label: "Suspend renewal",
      className: "text-danger-500 hover:bg-danger-50",
      icon: <StopOutlined className="text-danger-500" />,
    },
    {
      key: "16",
      label: "Remove from product",
      className: "text-danger-500 hover:bg-danger-50",
      icon: <CreditCardOutlined className="text-danger-500" />,
    },
  ];

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: true,
      width: 140,
      ellipsis: true,
    },
    {
      title: "Since",
      dataIndex: "since",
      key: "since",
      align: "right",
      render: (text: string, record: User) => (
        <Tooltip
          title={record.since ? formatDate(record.since, "full") : ""}
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span>{record.since ? formatDate(record.since, "full") : ""}</span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Suspended",
      dataIndex: "suspended",
      key: "suspended",
      align: "right",
      render: (text: string, record: User) => (
        <Tooltip
          title={record.suspended ? formatDate(record.suspended, "full") : ""}
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span>
              {record.suspended ? formatDate(record.suspended, "long") : ""}
            </span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: " ",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Dropdown trigger={["click"]} menu={{ items: actionItems }}>
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

  const handleSelectAll = () => {
    const allRowKeys = data.map((item) => item.key);
    setSelectedRowKeys(allRowKeys);
  };

  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  return (
    <div className="-mt-2">
      <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2">
        <TableTitle
          title="Members"
          totalRecords={data.length}
          small={true}
          selectedRowKeysLength={selectedRowKeys.length}
          onSelectAll={handleSelectAll}
          onUnselectAll={handleUnselectAll}
        />
        <div className="flex items-center gap-2.5 ml-auto">
          <Input
            placeholder="Search members..."
            prefix={<SearchOutlined className="mr-1" />}
            allowClear
          />
        </div>
      </div>
      <div className="relative mt-4 md:mt-3">
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
            <div className="text-neutral-400">|</div>
            <Dropdown
              placement="bottomLeft"
              getPopupContainer={() => document.body}
              overlayStyle={{ position: "fixed" }}
              overlay={
                <Menu>
                  <Menu.Item icon={<CreditCardOutlined />}>
                    Request payment
                  </Menu.Item>
                  <Menu.Divider></Menu.Divider>
                  <Menu.Item icon={<UserAddOutlined />}>
                    Invite to product
                  </Menu.Item>
                  <Menu.Item icon={<UserSwitchOutlined />}>
                    Move to product
                  </Menu.Item>
                  <Menu.Divider></Menu.Divider>
                  <Menu.Item
                    className="group text-danger-500 hover:bg-danger-50 hover:text-danger-600"
                    icon={
                      <StopOutlined className="text-danger-500 group-hover:text-danger-600" />
                    }
                  >
                    Suspend renewal
                  </Menu.Item>
                  <Menu.Item
                    className="text-danger-500 hover:bg-danger-50 hover:text-danger-600"
                    icon={
                      <DeleteOutlined className="text-danger-500 group-hover:text-danger-600" />
                    }
                  >
                    Remove from product
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
        </TableActions>
        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          size="small"
          pagination={false}
          scroll={{ x: 800 }}
          className="ant-table-sticky ant-table-bg-reset"
        />
      </div>
    </div>
  );
};

export default ProductMembers;
