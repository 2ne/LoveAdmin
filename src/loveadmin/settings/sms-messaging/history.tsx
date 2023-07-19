import React from "react";
import { Typography, Table, Tag } from "antd";
const { Title } = Typography;

interface TransactionType {
  key: string;
  name: string;
  date: string;
  creditsAdded?: string;
  creditsSpent?: string;
  transaction: string;
}

const transactions: TransactionType[] = [
  {
    key: "1",
    name: "John Doe",
    date: "1 Jan 09:59",
    creditsAdded: "+ 1000",
    creditsSpent: undefined,
    transaction: "Top-up",
  },
  {
    key: "2",
    name: "John Doe",
    date: "2 Jan 10:59",
    creditsAdded: undefined,
    creditsSpent: "- 50",
    transaction: "Message sent",
  },
];

function History(): React.ReactElement {
  const columns = [
    {
      title: "Transaction",
      dataIndex: "transaction",
      key: "transaction",
      width: 300,
    },
    {
      title: "Added",
      dataIndex: "creditsAdded",
      key: "creditsAdded",
      width: 100,
      render: (creditsAdded: string) => {
        return creditsAdded && <Tag color="cyan">{creditsAdded}</Tag>;
      },
    },
    {
      title: "Spent",
      dataIndex: "creditsSpent",
      key: "creditsSpent",
      width: 100,
      render: (creditsSpent: string) => {
        return creditsSpent && <Tag color="red">{creditsSpent}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "name",
      key: "name",
      align: "right",
      render: (text: string, record: TransactionType) => (
        <div className="subtitle">
          {record.date} · {record.name}
        </div>
      ),
    },
  ];

  return (
    <div className="py-3">
      <div className="flex items-end justify-between mb-4">
        <Title level={5} className="!mb-0">
          <span>SMS Credit History</span>
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
      />
    </div>
  );
}

export default History;
