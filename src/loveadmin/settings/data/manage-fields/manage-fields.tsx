import React, { useState } from "react";
import {
  Table,
  Button,
  Layout,
  Breadcrumb,
  Input,
  Modal,
  Tooltip,
  Menu,
  Dropdown,
  message,
} from "antd";
import dayjs from "dayjs";
import LoveAdminHeader from "../../../../components/header";
import { Link } from "react-router-dom";
import TableTitle from "../../../../components/table-title";
import {
  CompassOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UndoOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import TableFooter from "../../../../components/table-footer";
import { formatDate } from "../../../../components/date-formatter";

const { Content } = Layout;

type InputType =
  | "Text input"
  | "Text area"
  | "Number"
  | "Dropdown"
  | "Radio"
  | "Checkbox"
  | "Date"
  | "Divider";

interface CustomField {
  id: number;
  dataGroup: string;
  fieldName: string;
  label: string;
  inputType: InputType;
  value?: string;
  options?: string[];
  originalId?: number;
  isDragged?: boolean;
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
  helpText?: string;
  updatedBy?: string;
  updatedDate?: Date;
  associatedForms?: string[];
  archivedBy?: string;
  archivedDate?: Date;
  isArchived?: boolean;
}

type Group = "Customer" | "Internal contact" | "Internal product";

const CustomFieldsTable: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("Active");
  const customFields: Record<Group, CustomField[]> = {
    Customer: [
      {
        id: 1,
        label: "Swim club ID",
        fieldName: "Swim Club ID",
        inputType: "Text input",
        dataGroup: "Customer",
        associatedForms: ["Product 1", "Product 2"],
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
      {
        id: 2,
        label: "Additional notes",
        fieldName: "Additional Notes",
        inputType: "Text area",
        dataGroup: "Customer",
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
      {
        id: 3,
        label: "Years of swimming experience",
        fieldName: "Years of Experience",
        inputType: "Number",
        dataGroup: "Customer",
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
      {
        id: 4,
        label: "Preferred swim category",
        fieldName: "Preferred Swim Category",
        inputType: "Dropdown",
        options: ["Competitive", "Recreational", "Masters", "Open Water"],
        dataGroup: "Customer",
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
      {
        id: 5,
        label: "Preferred training time",
        fieldName: "Preferred Training Time",
        inputType: "Radio",
        options: ["Morning", "Afternoon", "Evening"],
        dataGroup: "Customer",
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
      {
        id: 6,
        label: "Equipment rental",
        fieldName: "Equipment Rental",
        inputType: "Checkbox",
        options: ["Goggles", "Fins", "Kickboard", "Pull Buoy"],
        dataGroup: "Customer",
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
      {
        id: 7,
        label: "Membership renewal date",
        fieldName: "Membership Renewal Date",
        inputType: "Date",
        dataGroup: "Customer",
        updatedDate: new Date(2023, 0, 4, 12, 35),
        updatedBy: "James Toone",
      },
    ],
    "Internal contact": [],
    "Internal product": [],
  };

  const [fields, setFields] =
    useState<Record<Group, CustomField[]>>(customFields);

  const toggleArchiveState = (id: number, isArchived: boolean) => {
    const action = isArchived ? "restore" : "archive";
    const modalContent = isArchived
      ? {
          title: "Are you sure you want to restore this field?",
          content:
            "Restoring this field will make it active again. It will not be associated to any forms.",
          okText: "Restore",
          icon: <QuestionCircleOutlined className="text-primary-500" />,
          okType: "primary" as const,
        }
      : {
          title: "Are you sure you want to archive this field?",
          content:
            "Archiving this field will remove it from all forms. Data stored against this field will still be available.",
          okText: "Archive",
          okType: "danger" as const,
          icon: <WarningOutlined className="text-danger-500" />,
        };

    Modal.confirm({
      ...modalContent,
      cancelText: "Cancel",
      onOk() {
        const updatedFields = Object.entries(fields).reduce(
          (acc, [group, customFields]) => {
            const groupKey: Group = group as Group;
            acc[groupKey] = customFields.map((field) => {
              if (field.id === id) {
                // Toggle the archived state
                const updatedField = { ...field, isArchived: !isArchived };
                if (!isArchived) {
                  updatedField.archivedBy = "James Toone";
                  updatedField.archivedDate = new Date();
                } else {
                  // If unarchiving, clear archivedBy and archivedDate
                  delete updatedField.archivedBy;
                  delete updatedField.archivedDate;
                }
                return updatedField;
              }
              return field;
            });
            return acc;
          },
          {} as Record<Group, CustomField[]>
        );
        setFields(updatedFields);
        message.success(`Field ${action}d successfully`);
      },
      onCancel() {
        console.log(`Archive cancelled`);
      },
    });
  };

  const activeCustomFields = Object.values(fields)
    .flat()
    .filter((field) => !field.isArchived);
  const archivedCustomFields = Object.values(fields)
    .flat()
    .filter((field) => field.isArchived);

  const activeCustomFieldsCount = activeCustomFields.length;
  const archivedCustomFieldsCount = archivedCustomFields.length;
  const currentViewCount =
    currentView === "Active"
      ? activeCustomFieldsCount
      : archivedCustomFieldsCount;

  const getFieldMenuItems = (record: CustomField) => {
    const commonItems = [
      {
        key: "1",
        label: "Edit field",
        icon: <EditOutlined />,
      },
      {
        key: "2",
        label: "View history",
        icon: <CompassOutlined />,
      },
      {
        type: "divider",
      },
    ];

    const archiveItem = {
      key: "3",
      className:
        "[&_*]:text-danger-500 [&_*]:bg-transparent hover:bg-danger-50",
      label: (
        <a
          className="no-underline"
          onClick={() => toggleArchiveState(record.id, false)}
        >
          Archive
        </a>
      ),
      icon: <DeleteOutlined />,
    };

    const restoreItem = {
      key: "3",
      label: <a onClick={() => toggleArchiveState(record.id, true)}>Restore</a>,
      icon: <UndoOutlined />,
    };

    // Add the conditional item based on the archived state of the field
    const actionItem = record.isArchived ? restoreItem : archiveItem;

    return [...commonItems, actionItem];
  };

  const menuForField = (record: CustomField) => (
    <Menu items={getFieldMenuItems(record)} />
  );

  const columnsActive = [
    {
      title: "Name",
      dataIndex: "label",
      key: "label",
      ellipsis: true,
      render: (_: any, record: CustomField) => (
        <Link to="#" className="truncate">
          {record.label}
        </Link>
      ),
      width: 350,
    },
    {
      title: "Type",
      dataIndex: "inputType",
      key: "inputType",
      render: (_: any, record: CustomField) => (
        <div className="flex items-center gap-2">
          {record.inputType === "Text input" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="w-4 h-4 text-neutral-400 shrink-0"
            >
              <path
                fill="currentColor"
                d="M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H576c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm184 32c9.5 0 18.1 5.6 21.9 14.3l64 144c5.4 12.1-.1 26.3-12.2 31.7s-26.3-.1-31.7-12.2l-4.3-9.7H146.3l-4.3 9.7c-5.4 12.1-19.6 17.6-31.7 12.2s-17.6-19.6-12.2-31.7l64-144c3.9-8.7 12.4-14.3 21.9-14.3zm0 83.1L167.6 280h32.8L184 243.1zM304 184c0-13.3 10.7-24 24-24h52c33.1 0 60 26.9 60 60c0 9.2-2.1 17.9-5.8 25.7c13.3 11 21.8 27.6 21.8 46.3c0 33.1-26.9 60-60 60H328c-13.3 0-24-10.7-24-24v-8V256 192v-8zm48 24v24h28c6.6 0 12-5.4 12-12s-5.4-12-12-12H352zm0 96h44c6.6 0 12-5.4 12-12s-5.4-12-12-12H380 352v24z"
              />
            </svg>
          )}
          {record.inputType === "Dropdown" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 text-neutral-400 shrink-0"
            >
              <path
                fill="currentColor"
                d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241L239 345c9.4 9.4 24.6 9.4 33.9 0L377 241c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87-87-87c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
              />
            </svg>
          )}
          {record.inputType === "Text area" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4 text-neutral-400 shrink-0"
            >
              <path
                fill="currentColor"
                d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"
              />
            </svg>
          )}
          {record.inputType === "Number" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="w-4 h-4 text-neutral-400 shrink-0"
            >
              <path
                fill="currentColor"
                d="M576 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H576zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm40 120c0 13.3 10.7 24 24 24h8v96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H184V184c0-13.3-10.7-24-24-24H128c-13.3 0-24 10.7-24 24zm190.6 30.4c5.7-8 17.5-8.6 24-1.2c5.2 5.9 5 14.7-.3 20.5l-72 78c-6.5 7-8.2 17.2-4.3 25.9s12.5 14.4 22 14.4h88c13.3 0 24-10.7 24-24s-10.7-24-24-24H318.8l34.8-37.7c22-23.8 22.4-60.3 1.1-84.7c-26.9-30.7-75.4-28.4-99.2 4.9l-11.1 15.6c-7.7 10.8-5.2 25.8 5.6 33.5s25.8 5.2 33.5-5.6l11.1-15.6z"
              />
            </svg>
          )}
          {record.inputType === "Radio" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 text-neutral-400 shrink-0"
            >
              <path
                fill="currentColor"
                d="M64 32a64 64 0 1 0 0 128A64 64 0 1 0 64 32zM184 72c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zM64 280a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm0-88a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM40 416a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z"
              />
            </svg>
          )}
          {record.inputType === "Checkbox" && (
            <svg
              className="w-4 h-4 text-neutral-400 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
          )}
          {record.inputType === "Date" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4 text-neutral-400 shrink-0"
            >
              <path
                fill="currentColor"
                d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
              />
            </svg>
          )}
          {record.inputType}
        </div>
      ),
      width: 250,
    },
    {
      title: "Group",
      dataIndex: "dataGroup",
      key: "dataGroup",
      width: 200,
    },
    {
      title: "Associated forms",
      dataIndex: "associatedForms",
      key: "associatedForms",
      render: (forms: string[] | undefined) => forms?.join(", ") || "",
      width: 250,
    },
    {
      title: "Updated",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (text: string, record: CustomField) => (
        <Tooltip
          title={
            record.updatedDate ? formatDate(record.updatedDate, "full") : ""
          }
          placement="topLeft"
        >
          <div className="truncate text-subtitle">
            <span>{record.updatedBy}</span>
            <span className="mx-1.5">·</span>
            <span>
              {record.updatedDate
                ? formatDate(record.updatedDate, "short")
                : ""}
            </span>
          </div>
        </Tooltip>
      ),
      width: 250,
    },
    {
      title: " ",
      key: "actions",
      render: (_: any, record: CustomField) => (
        <Dropdown overlay={menuForField(record)} trigger={["click"]}>
          <Button
            className="absolute right-[8px] top-[3px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const columnsArchived = [
    ...columnsActive.filter(
      (column) =>
        column.key !== "actions" &&
        column.key !== "associatedForms" &&
        column.key !== "updatedDate"
    ),
    {
      title: "Archived",
      dataIndex: "archivedDate",
      key: "archivedDate",
      render: (text: string, record: CustomField) =>
        record.archivedDate && (
          <Tooltip
            title={
              record.archivedDate ? formatDate(record.archivedDate, "full") : ""
            }
            placement="topLeft"
          >
            <div className="truncate text-subtitle">
              <span>{record.archivedBy}</span>
              <span className="mx-1.5">·</span>
              <span>
                {record.archivedDate
                  ? formatDate(record.archivedDate, "short")
                  : ""}
              </span>
            </div>
          </Tooltip>
        ),
      width: 250,
    },
    {
      title: " ",
      key: "actions",
      render: (_: any, record: CustomField) => (
        <Dropdown overlay={menuForField(record)} trigger={["click"]}>
          <Button
            className="absolute right-[8px] top-[3px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Customer",
          onClick: () => {
            console.log("Customer clicked");
            // Add your logic here for "Customer"
          },
        },
        {
          key: "2",
          label: "Internal contact",
          onClick: () => {
            console.log("Internal contact clicked");
            // Add your logic here for "Internal contact"
          },
        },
        {
          key: "3",
          label: "Internal product",
          onClick: () => {
            console.log("Internal product clicked");
            // Add your logic here for "Internal product"
          },
        },
      ]}
    />
  );

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
          <Breadcrumb.Item key="manageFields">Manage Fields</Breadcrumb.Item>,
        ]}
      />
      <Layout className="bg-white rounded-t-lg">
        <Content>
          <div className="p-4 mx-auto max-w-screen-2xl">
            <div className="md:items-center md:flex md:gap-2.5 max-md:space-y-2">
              <div>
                <TableTitle
                  title={["Active", "Archived"]}
                  totalRecords={currentViewCount}
                  selectable={false}
                  recordsTerm={{ singular: "field", plural: "fields" }}
                  onTitleChange={setCurrentView}
                />

                <div className="-mt-0.5 mb-0.5 text-subtitle text-sm">
                  Custom fields are used to collect and store information about
                  your customers and products.
                </div>
              </div>
              <div className="flex items-center gap-2.5 ml-auto">
                <Input
                  placeholder="Search custom fields..."
                  prefix={<SearchOutlined className="mr-1" />}
                  allowClear
                />
                <Tooltip
                  title="Add field"
                  placement="topRight"
                  className="shrink-0"
                >
                  <Dropdown
                    placement="bottomRight"
                    overlay={menu}
                    trigger={["click"]}
                  >
                    <Button icon={<PlusOutlined />} type="primary" />
                  </Dropdown>
                </Tooltip>
              </div>
            </div>
            <div className="relative mt-5 md:mt-4">
              {currentView === "Active" ? (
                <Table
                  dataSource={activeCustomFields}
                  columns={columnsActive}
                  rowKey="id"
                  size="small"
                  scroll={{ x: 1024 }}
                  className="ant-table-sticky"
                  pagination={false}
                />
              ) : (
                <Table
                  dataSource={archivedCustomFields}
                  columns={columnsArchived}
                  rowKey="id"
                  size="small"
                  scroll={{ x: 1024 }}
                  className="ant-table-sticky"
                  pagination={false}
                />
              )}
            </div>
            <TableFooter hideManageColumns={true} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomFieldsTable;
