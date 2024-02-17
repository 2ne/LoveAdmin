import React, { useState, useEffect } from "react";
import { Breadcrumb, Input, Layout, Table, Tooltip } from "antd";
import LoveAdminHeader from "../../../../components/header";
import { Link } from "react-router-dom";
import TableFooter from "../../../../components/table-footer";
import { SearchOutlined } from "@ant-design/icons";
import TableTitle from "../../../../components/table-title";
import { ColumnsType, SortOrder } from "antd/es/table/interface";
import { formatDate } from "../../../../components/date-formatter";

const { Content } = Layout;

interface InternalForm {
  id: number;
  name: string;
  updated: Date;
  updatedBy: string;
}

const InternalContactForms: React.FC = () => {
  const [internalForms, setInternalForms] = useState<InternalForm[]>([]);

  useEffect(() => {
    const fetchedData: InternalForm[] = [
      {
        id: 1,
        name: "Form name 1",
        updated: new Date(2023, 0, 4, 12, 35),
        updatedBy: "Gareth Mace",
      },
      {
        id: 2,
        name: "Form name 2",
        updated: new Date(2023, 0, 4, 12, 35),
        updatedBy: "Gareth Mace",
      },
    ];
    setInternalForms(fetchedData);
  }, []);

  const columns: ColumnsType<InternalForm> = [
    {
      title: "Name",
      dataIndex: "formName",
      key: "formName",
      render: (_, record: InternalForm) => (
        <Link to="/Settings/Data/FormBuilder">{record.name}</Link>
      ),
      width: 170,
      ellipsis: true,
    },

    {
      title: "Updated",
      key: "updated",
      defaultSortOrder: "ascend" as SortOrder,
      align: "right",
      width: 180,
      render: (text: string, record: InternalForm) => (
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
      sorter: (a: InternalForm, b: InternalForm) => {
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
          <Breadcrumb.Item key="forms">
            <Link to="/Settings/Data/Forms">Forms</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="internalContactForms">
            Internal Contact Forms
          </Breadcrumb.Item>,
        ]}
      />
      <Layout className="bg-white rounded-t-lg">
        <Content>
          <div className="max-w-screen-xl p-4 mx-auto">
            <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2">
              <div>
                <TableTitle
                  title="Internal Contact Forms"
                  totalRecords={internalForms.length}
                  selectable={false}
                />
                <div className="mt-0.5 text-subtitle">
                  Record more information on contact records. Internal contact
                  forms are visible to the organisation but not the contact.
                </div>
              </div>
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
                dataSource={internalForms}
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

export default InternalContactForms;
