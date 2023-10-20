import React, { useEffect, useState } from "react";
import { Table, Tooltip, Layout, Breadcrumb, Input, Button } from "antd";
import { formatDate } from "../../../components/date-formatter";
import { SortOrder } from "antd/es/table/interface";
import LoveAdminHeader from "../../../components/header";
import TableTitle from "../../../components/table-title";
import DateFilter from "../../../components/date-filter";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import SMSReportInfoModal from "./sms-report-info-modal";
import SMSReportMessageModal from "./sms-report-message-modal";
import Tag from "../../../components/tag";
import {
  TableFilterBar,
  TableFilterButton,
} from "../../../components/table-filters";
import SMSReportFilters from "./sms-report-filters";

const { Content } = Layout;

export type PresetTypes = "Sending" | "Delivered" | "Invalid" | "Failed" | null;

export type NotSentReasons =
  | "underThirteen"
  | "noMobileNumber"
  | "invalidMobileNumber"
  | "optedOutOrgUpdates"
  | "optedOutMarketingMessages"
  | "duplicateMessage";

export const notSentReasonDescriptions: Record<
  string,
  { title: string; description: string }
> = {
  underThirteen: {
    title: "Age restriction",
    description: "Recipient is under 13 years old.",
  },
  noMobileNumber: {
    title: "No mobile number",
    description: "Recipient does not have a mobile number.",
  },
  invalidMobileNumber: {
    title: "Invalid number",
    description: "Recipient's mobile number is invalid.",
  },
  optedOutOrgUpdates: {
    title: "Opted out - Organisation",
    description: "Recipient opted out of organisation updates via SMS.",
  },
  optedOutMarketingMessages: {
    title: "Opted out - Marketing",
    description: "Recipient opted out of marketing messages via SMS.",
  },
  duplicateMessage: {
    title: "Duplicate message",
    description:
      "Beneficary has same number as account owner and the message is a duplicate.",
  },
};

export interface ContactDetails {
  name: string;
  mobileNumber?: string;
  deliveryDate?: Date;
  status: PresetTypes;
  notSentReason?: NotSentReasons;
}

export interface SMSReportType {
  key: string;
  message: string;
  marketing: boolean;
  contacts: ContactDetails[];
  senderName: string;
  date: Date;
}

const SMSReport: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [modalData, setModalData] = useState<SMSReportType | null>(null);
  const [activePresetType, setActivePresetType] = useState<PresetTypes | null>(
    null
  );
  const [countColumnWidth, setCountColumnWidth] = useState(150);
  useEffect(() => {
    const updateWidth = () => {
      setCountColumnWidth(window.innerWidth <= 1280 ? 120 : 150);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const data: SMSReportType[] = [
    {
      key: "1",
      message:
        "Don't miss out on our holiday sale this weekend! 25% off all classes! Visit our JoinIn store today. https://app.joinin.online/#/app/joinin/organisation/shop/ed7064ba-9681-4948-abc5-1f009a922a5a.",
      marketing: true,
      contacts: [
        {
          name: "Alice Reed",
          mobileNumber: "07911223344",
          deliveryDate: undefined,
          status: "Sending",
        },
        {
          name: "John Reed",
          mobileNumber: "07884773994",
          deliveryDate: new Date(2023, 0, 4, 12, 35),
          status: "Delivered",
        },
        {
          name: "Andrew Reed",
          mobileNumber: "07987663779",
          deliveryDate: undefined,
          status: "Invalid",
          notSentReason: "optedOutOrgUpdates",
        },
        {
          name: "Bill Reed",
          mobileNumber: undefined,
          deliveryDate: undefined,
          status: "Failed",
        },
      ],
      senderName: "John Doe",
      date: new Date(2023, 0, 4, 12, 30),
    },
    {
      key: "2",
      message: "Your subscription has been renewed",
      marketing: false,
      contacts: [
        {
          name: "Clara Barton",
          mobileNumber: "07911224455",
          deliveryDate: new Date(2023, 0, 2, 10, 15),
          status: "Delivered",
        },
        {
          name: "Henry Smith",
          mobileNumber: "07885859595",
          deliveryDate: new Date(2023, 0, 2, 10, 15),
          status: "Delivered",
        },
        {
          name: "Ella Fitzgerald",
          mobileNumber: "07966739778",
          deliveryDate: new Date(2023, 0, 2, 10, 15),
          status: "Delivered",
        },
        {
          name: "Duke Ellington",
          mobileNumber: "07886869797",
          deliveryDate: new Date(2023, 0, 2, 10, 15),
          status: "Delivered",
        },
      ],
      senderName: "Jane Smith",
      date: new Date(2023, 0, 2, 10, 10),
    },
    {
      key: "3",
      message:
        "Welcome to LoveAdmin text alerts! Now you will get alerted every time we have a deal so you don't miss out. Hope to see ya soon!",
      marketing: false,
      contacts: [
        {
          name: "Alice Reed",
          mobileNumber: "07911223344",
          deliveryDate: new Date(2023, 0, 1, 12, 35),
          status: "Delivered",
        },
        {
          name: "John Reed",
          mobileNumber: "07884773994",
          deliveryDate: new Date(2023, 0, 1, 12, 35),
          status: "Delivered",
        },
        {
          name: "Andrew Reed",
          mobileNumber: "07987663779",

          deliveryDate: new Date(2023, 0, 1, 12, 35),
          status: "Delivered",
        },
        {
          name: "Bill Reed",
          mobileNumber: undefined,
          deliveryDate: new Date(2023, 0, 1, 12, 35),
          status: "Delivered",
        },
      ],
      senderName: "John Doe",
      date: new Date(2023, 0, 1, 12, 30),
    },
  ];

  const showModal = (record: SMSReportType, preset: PresetTypes) => {
    setModalData(record);
    setActivePresetType(preset);
    setVisible(true);
  };

  const showMessageModal = (record: SMSReportType | null) => {
    setModalData(record);
    setMessageModalVisible(true);
  };

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text: string, record: SMSReportType) => (
        <div className="flex">
          <a
            className="block max-w-[50rem] truncate"
            onClick={() => {
              showMessageModal(record);
            }}
          >
            {text}
          </a>
          {record.marketing === true && (
            <Tooltip title="This SMS message is for marketing purposes. Only recipients who opted in will receive it.">
              <div>
                <Tag colour="fuchsia" className="ml-1">
                  Marketing
                </Tag>
              </div>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "Total contacts",
      dataIndex: "contacts",
      key: "contacts",
      width: countColumnWidth,
      render: (details: ContactDetails[], record: SMSReportType) =>
        record.contacts ? (
          <a className="p-2 -m-2" onClick={() => showModal(record, null)}>
            {record.contacts.length}
          </a>
        ) : (
          <div className="text-subtitle-light">-</div>
        ),
    },
    {
      title: "Invalid contacts",
      dataIndex: "invalid",
      key: "invalid",
      width: countColumnWidth,
      render: (_: any, record: SMSReportType) => {
        const notSentCount = record.contacts.filter(
          (r) => r.status === "Invalid"
        ).length;
        return notSentCount > 0 ? (
          <a className="p-2 -m-2" onClick={() => showModal(record, "Invalid")}>
            {notSentCount}
          </a>
        ) : (
          <div className="text-subtitle-light">-</div>
        );
      },
    },
    {
      title: "SMS delivered",
      dataIndex: "Delivered",
      key: "Delivered",
      width: countColumnWidth,
      render: (_: any, record: SMSReportType) => {
        const SentCount = record.contacts.filter(
          (r) => r.status === "Delivered"
        ).length;
        return SentCount > 0 ? (
          <a
            className="p-2 -m-2"
            onClick={() => showModal(record, "Delivered")}
          >
            {SentCount}
          </a>
        ) : (
          <div className="text-subtitle-light">-</div>
        );
      },
    },
    {
      title: "SMS failed",
      dataIndex: "failed",
      key: "failed",
      width: countColumnWidth,
      render: (_: any, record: SMSReportType) => {
        const failedCount = record.contacts.filter(
          (r) => r.status === "Failed"
        ).length;
        return failedCount > 0 ? (
          <a className="p-2 -m-2" onClick={() => showModal(record, "Failed")}>
            {failedCount}
          </a>
        ) : (
          <div className="text-subtitle-light">-</div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a: SMSReportType, b: SMSReportType) =>
        (b.date?.getTime() || 0) - (a.date?.getTime() || 0),
      render: (date: Date, record: SMSReportType) => (
        <Tooltip
          title={
            record.senderName + " - " + date ? formatDate(date, "full") : ""
          }
          placement="topRight"
        >
          <div className="flex justify-end truncate text-subtitle">
            <span className="truncate">{record.senderName}</span>
            <span className="mx-1">·</span>
            <span>{date ? formatDate(date, "short") : ""}</span>
          </div>
        </Tooltip>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <LoveAdminHeader
        breadcrumbChildren={
          <>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Reports</Breadcrumb.Item>
            <Breadcrumb.Item>Communication</Breadcrumb.Item>
            <Breadcrumb.Item>SMS History</Breadcrumb.Item>
          </>
        }
      ></LoveAdminHeader>
      <Layout>
        <Content className="p-6 pb-16 bg-white">
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <TableTitle
                title="SMS History"
                totalRecords={data.length}
                selectable={false}
                recordsTerm={{ singular: "Message", plural: "Messages" }}
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Input
                className="min-w-[15.5rem]"
                placeholder="Search message, sender name..."
                prefix={<SearchOutlined className="mr-1" />}
              />
              <DateFilter defaultFilter="This week" />
              <TableFilterButton
                toggleActive={() => setIsActive(!isActive)}
                isActive={isActive}
              />
            </div>
          </div>
          <TableFilterBar isActive={isActive}>
            <SMSReportFilters />
          </TableFilterBar>
          <Table
            columns={columns}
            dataSource={data}
            size="small"
            pagination={false}
            className="ant-table-bg-reset [&_th:last-child]:text-right [&_table]:table-fixed"
          />
          <SMSReportInfoModal
            visible={visible}
            closeModal={() => setVisible(false)}
            handleCancel={() => setVisible(false)}
            modalData={modalData}
            activePresetType={activePresetType}
          />
          <SMSReportMessageModal
            visible={messageModalVisible}
            closeModal={() => setMessageModalVisible(false)}
            modalData={modalData}
          />
          <footer className="fixed gap-2 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 left-0">
            <div className="flex items-center gap-2 ml-auto">
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SMSReport;
