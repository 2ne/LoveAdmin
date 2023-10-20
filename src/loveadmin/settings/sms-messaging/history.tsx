import React, { useState } from "react";
import { Typography, Table, Tooltip, Modal } from "antd";
import { formatDate } from "../../../components/date-formatter";
import { ColumnsType } from "antd/es/table";
import { SortOrder } from "antd/es/table/interface";
import Tag from "../../../components/tag";
const { Title } = Typography;

interface TransactionType {
  key: string;
  name: string;
  date?: Date;
  creditsAdded?: string;
  creditsSpent?: string;
  transaction: string;
  message?: string;
}

const transactions: TransactionType[] = [
  {
    key: "1",
    name: "",
    date: new Date(2023, 0, 1, 9, 59),
    creditsAdded: "+ 1000",
    creditsSpent: undefined,
    transaction: "Top-up",
  },
  {
    key: "2",
    name: "John Doe",
    date: new Date(2023, 0, 2, 10, 59),
    creditsAdded: undefined,
    creditsSpent: "- 50",
    transaction: "Message sent",
    message:
      "Dear {{accountOwner.FirstName}}, we have a special offer on PRODUCT NAME for you. Don't miss out! Thanks, {{organisation.Name}}.",
  },
];

function History(): React.ReactElement {
  const [messageModal, setMessageModal] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

  const showMessage = (message: string) => {
    setMessageModal({ visible: true, message });
  };

  const hideMessage = () => {
    setMessageModal({ visible: false, message: "" });
  };

  const columns: ColumnsType<TransactionType> = [
    {
      title: "Transaction",
      dataIndex: "transaction",
      key: "transaction",
      width: 200,
      render: (transaction: string, record: TransactionType) => (
        <div>
          {transaction === "Message sent" ? (
            <>Message sent</>
          ) : (
            <span>{record.transaction}</span>
          )}
        </div>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (transaction: string, record: TransactionType) => (
        <a
          className="block max-w-full truncate"
          onClick={() => {
            if (record.message) {
              showMessage(record.message);
            }
          }}
        >
          {record.message}
        </a>
      ),
    },

    {
      title: "Added",
      dataIndex: "creditsAdded",
      key: "creditsAdded",
      width: 100,
      render: (creditsAdded: string) => {
        return creditsAdded && <Tag colour="primary">{creditsAdded}</Tag>;
      },
    },
    {
      title: "Spent",
      dataIndex: "creditsSpent",
      key: "creditsSpent",
      width: 100,
      render: (creditsSpent: string) => {
        return creditsSpent && <Tag colour="danger">{creditsSpent}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a: TransactionType, b: TransactionType) =>
        (b.date?.getTime() || 0) - (a.date?.getTime() || 0),
      align: "right",
      render: (date: Date | undefined, record: TransactionType) => (
        <Tooltip title={date ? formatDate(date) : ""} placement="topRight">
          <div className="text-subtitle">
            {record.name && record.name} {record.name && " · "}
            {date ? formatDate(date, "short") : ""}
          </div>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <div className="py-3">
        <div className="flex items-end justify-between mb-4">
          <Title level={5} className="!mb-0">
            <span>SMS History</span>
            <span className="mx-1.5 text-subtitle">·</span>
            <span className="text-subtitle">{transactions.length}</span>
            <span className="mx-1.5 text-subtitle">records</span>
          </Title>
        </div>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={false}
          size="small"
          className="[&_table]:table-fixed"
        />
      </div>
      <Modal
        title="SMS Message"
        visible={messageModal.visible}
        onOk={hideMessage}
        onCancel={hideMessage}
        footer={null}
      >
        <p>{messageModal.message}</p>
      </Modal>
    </>
  );
}

export default History;
