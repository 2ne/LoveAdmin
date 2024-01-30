import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  MenuProps,
  Modal,
  Table,
  Tooltip,
} from "antd";
import type { SortOrder } from "antd/lib/table/interface";
import { formatDate } from "../../../components/date-formatter";
import {
  BarChartOutlined,
  EllipsisOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DateFilter from "../../../components/date-filter";
import { Link } from "react-router-dom";
import TableActions from "../../../components/table-actions";

interface Contact {
  id: string;
  name: string;
}

interface Message {
  key: string;
  message: string;
  contacts: Contact[];
  date: Date;
  senderName: string;
}

const contactItems: MenuProps["items"] = [
  /*   {
    key: "1",
    label: "View message",
    icon: <MailOutlined />,
  },
  {
    key: "2",
    label: "View contacts",
    icon: <UserOutlined />,
  }, */
  {
    key: "3",
    label: "Delivery report",
    icon: <BarChartOutlined />,
  },
];

const messageContactItems: MenuProps["items"] = [
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
];

interface MessagesProps {
  squad?: boolean;
}

const Messages: React.FC<MessagesProps> = ({ squad }) => {
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageModalData, setMessageModalData] = useState<Message | null>(
    null
  );
  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const showContactsModal = (record: Message) => {
    setSelectedContacts(record.contacts);
    setIsContactsModalVisible(true);
  };

  const cancelContactsModal = () => {
    setIsContactsModalVisible(false);
  };

  const showMessageModal = (record: Message) => {
    setMessageModalData(record);
    setIsMessageModalVisible(true);
  };

  const cancelMessageModal = () => {
    setIsMessageModalVisible(false);
  };

  const data: Message[] = [
    {
      key: "1",
      message:
        "This is a really long message that is an example of how long a message could be. It may be even longer than this.",
      contacts: [
        { id: "c1", name: "Jamie Smith" },
        { id: "c2", name: "Ardur Ranesh" },
      ],
      date: new Date(2023, 0, 4, 12, 35),
      senderName: "John Doe",
    },
    {
      key: "2",
      message:
        "This is a different really long message that is an example of how long a message could be. It may be even longer than this.",
      contacts: [
        { id: "b1", name: "Andrew Mace" },
        { id: "b2", name: "Phillip Snape" },
        { id: "b3", name: "Jamie Smith" },
        { id: "b4", name: "Billy Turner" },
        { id: "b5", name: "Josie Glow" },
        { id: "b6", name: "Katie Holmes" },
        { id: "b7", name: "Fred Howe" },
        { id: "b8", name: "Ardur Ranesh" },
      ],
      date: new Date(2023, 0, 4, 12, 35),
      senderName: "John Doe",
    },
  ];

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text: string, record: Message) => (
        <div className="flex">
          <a
            className="block max-w-[50rem] truncate link text-title"
            onClick={() => {
              showMessageModal(record);
            }}
          >
            {text}
          </a>
        </div>
      ),
    },
    {
      title: "Contacts",
      dataIndex: "contacts",
      key: "contacts",
      render: (contacts: Contact[], record: Message) => {
        const contactNames = contacts.map((contact) => contact.name);
        let displayText = "";

        if (contacts.length === 1) {
          displayText = contactNames[0];
        } else if (contacts.length === 2) {
          displayText = contactNames.join(", ");
        } else if (contacts.length > 2) {
          const othersCount = contacts.length - 2; // Subtract the two displayed names
          displayText = `${contactNames[0]}, ${contactNames[1]} + ${othersCount}`;
        }

        return (
          <a
            className="link text-title"
            onClick={() => showContactsModal(record)}
          >
            {displayText}
          </a>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      defaultSortOrder: "ascend" as SortOrder,
      sorter: (a: Message, b: Message) =>
        (b.date?.getTime() || 0) - (a.date?.getTime() || 0),
      render: (date: Date, record: Message) => (
        <Tooltip
          title={date ? formatDate(date, "full") : ""}
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
    {
      title: " ",
      dataIndex: "",
      key: "action",
      width: 100,
      render: () => (
        <Dropdown
          menu={{ items: contactItems }}
          trigger={["click"]}
          rootClassName="w-[12.5rem]"
        >
          <Button
            className="absolute right-[4px] top-[3px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const contactColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Link to="#" className="text-title">
          {text}
        </Link>
      ),
    },
    {
      title: " ",
      dataIndex: "",
      key: "action",
      width: 100,
      render: () => (
        <Dropdown
          menu={{ items: messageContactItems }}
          trigger={["click"]}
          rootClassName="w-[10.5rem]"
        >
          <Button
            className="absolute right-[4px] top-[3px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const handleMessageMenuClick = (e: any) => {
    console.log("click", e.key);
  };

  const messageMenu = (
    <Menu onClick={handleMessageMenuClick}>
      <Menu.Item key="sms">Send SMS</Menu.Item>
      <Menu.Item key="email">Send email</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4 -mt-2.5">
        <div className="text-lg">
          <Input
            className="w-64"
            placeholder="Search message, sender name..."
            prefix={<SearchOutlined className="mr-1" />}
          />
        </div>
        <div className="flex gap-3">
          <DateFilter defaultFilter="This month" />
          <Dropdown overlay={messageMenu} trigger={["click"]}>
            {squad ? (
              <Button type="primary">Message squad</Button>
            ) : (
              <Button type="primary">Message team</Button>
            )}
          </Dropdown>
        </div>
      </div>
      <div className="relative rounded-md shadow-sm overflow-clip text-neutral-800 ring-1 ring-black/5">
        <Table
          dataSource={data}
          columns={columns}
          size="small"
          pagination={false}
          scroll={{ x: 600 }}
          className="ant-table-bg-reset [&_th:last-child]:text-right [&_table]:table-fixed ant-table-sticky [&_.ant-table]:rounded-md [&_thead_th]:bg-white [&_thead_td]:bg-white [&_th]:px-4 [&_td]:px-4 [&_tbody_tr:last-child_td]:border-b-0 [&_table]:!visible [&_table_th:nth-child(3)]:!text-right"
        />
      </div>
      <Modal
        title="Message details"
        visible={isMessageModalVisible}
        onCancel={cancelMessageModal}
        destroyOnClose={true}
        footer={null}
        width={420}
      >
        {messageModalData && (
          <div className="mb-1">
            <div>{messageModalData.message}</div>
            <div className="mt-6 mb-3 border-b border-neutral-200/75"></div>
            <div className="flex text-subtitle">
              {messageModalData.senderName}
              <div className="mx-1">-</div>{" "}
              {formatDate(messageModalData.date, "full")}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title="Message contacts"
        visible={isContactsModalVisible}
        onCancel={cancelContactsModal}
        footer={null}
        width={425}
      >
        <div className="relative">
          <TableActions isVisible={selectedRowKeys.length > 0}>
            <div className="font-medium whitespace-nowrap ml-[-3px]">
              {selectedRowKeys.length} selected
            </div>
            <div className="text-neutral-400">|</div>
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
            </div>
          </TableActions>
          <Table
            rowKey="id"
            dataSource={selectedContacts}
            columns={contactColumns}
            size="small"
            pagination={false}
            rowSelection={rowSelection}
            sticky={true}
            className="ant-table-sticky"
          />
        </div>
      </Modal>
    </>
  );
};

export default Messages;
