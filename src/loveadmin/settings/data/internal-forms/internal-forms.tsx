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
import LoveAdminHeader from "../../../../components/header";
import { Link } from "react-router-dom";
import TableFooter from "../../../../components/table-footer";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  MailOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TableTitle from "../../../../components/table-title";
import { ColumnsType, SortOrder } from "antd/es/table/interface";
import { formatDate } from "../../../../components/date-formatter";
import TableActions from "../../../../components/table-actions";

const { Content } = Layout;

interface EnquiryCustomer {
  id: number;
  name: string;
  associatedProducts: string[];
  created: Date;
  createdBy: string;
  updated: Date;
  updatedBy: string;
}

const InternalForms: React.FC = () => {
  const [EnquiryCustomers, setEnquiryCustomers] = useState<EnquiryCustomer[]>(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchedData: EnquiryCustomer[] = [
      {
        id: 1,
        name: "Form name 1",
        associatedProducts: ["Product 1"],
        created: new Date(2023, 0, 4, 12, 35),
        createdBy: "James Toone",
        updated: new Date(2023, 0, 4, 12, 35),
        updatedBy: "Gareth Mace",
      },
      {
        id: 2,
        name: "Form name 2",
        associatedProducts: ["Product 1", "Product 2"],
        created: new Date(2023, 0, 4, 12, 35),
        createdBy: "James Toone",
        updated: new Date(2023, 0, 4, 12, 35),
        updatedBy: "Gareth Mace",
      },
    ];
    setEnquiryCustomers(fetchedData);
  }, []);

  const columns: ColumnsType<EnquiryCustomer> = [
    {
      title: "Name",
      dataIndex: "formName",
      key: "formName",
      render: (_, record: EnquiryCustomer) => (
        <Link to="/Settings/Data/FormBuilder">{record.name}</Link>
      ),
      width: 170,
      ellipsis: true,
    },
    {
      title: "Associated products",
      dataIndex: "associatedProducts",
      key: "associatedProducts",
      render: (associatedProducts: string[]) => associatedProducts.join(", "),
      width: 170,
      ellipsis: true,
    },
    {
      title: "Created",
      key: "created",
      align: "right",
      width: 180,
      render: (text: string, record: EnquiryCustomer) => (
        <Tooltip
          title={record.created ? formatDate(record.created, "full") : ""}
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span>{record.createdBy}</span>
            <span className="mx-1.5">·</span>
            <span>
              {record.created ? formatDate(record.created, "short") : ""}
            </span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Updated",
      key: "updated",
      defaultSortOrder: "ascend" as SortOrder,
      align: "right",
      width: 180,
      render: (text: string, record: EnquiryCustomer) => (
        <Tooltip
          title={record.updated ? formatDate(record.updated, "full") : ""}
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span>{record.updatedBy}</span>
            <span className="mx-1.5">·</span>
            <span>
              {record.updated ? formatDate(record.updated, "short") : ""}
            </span>
          </div>
        </Tooltip>
      ),
      sorter: (a: EnquiryCustomer, b: EnquiryCustomer) => {
        const dateA = a.updated?.getTime() || 0;
        const dateB = b.updated?.getTime() || 0;
        return dateA - dateB;
      },
    },
  ];

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="settings">
            <Link to="/Settings">Settings</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="data">
            <Link to="/Settings/Data">Data</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="internalForms">Internal Forms</Breadcrumb.Item>,
        ]}
      />
      <Layout className="bg-white rounded-t-lg">
        <Content>
          <div className="max-w-screen-xl p-4 mx-auto">
            <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2">
              <TableTitle
                title="Internal Forms"
                totalRecords={EnquiryCustomers.length}
                selectable={false}
              />

              <div className="flex items-center gap-2.5 ml-auto">
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined className="mr-1" />}
                  allowClear
                />
              </div>
            </div>
            <div className="relative mt-5 md:mt-4">
              <Table
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
      </Layout>
    </Layout>
  );
};

export default InternalForms;
