import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, MenuProps, Modal, Table } from "antd";
import { Player } from "../data";
import {
  ArrowRightOutlined,
  CreditCardOutlined,
  EllipsisOutlined,
  MailOutlined,
  MoneyCollectOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import TableActions from "../../../components/table-actions";
import DateFilter from "../../../components/date-filter";
import { ColumnsType } from "antd/es/table";

interface PaymentsProps {
  squad?: boolean;
  players: Player[];
}

const playerItems: MenuProps["items"] = [
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
    key: "99",
    label: "Request payment",
    icon: <CreditCardOutlined />,
  },
  {
    key: "100",
    label: "Record offline payment",
    icon: <ArrowRightOutlined />,
  },
];

const Payments: React.FC<PaymentsProps> = ({ squad, players }) => {
  const [playersWithDue, setPlayersWithDue] = useState<Player[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const playersWithAmounts = players.map((player) => {
      if (Math.random() > 0.8) {
        const redCardFee = 10; // fixed fee for red card
        const yellowCardFee = 5; // fixed fee for yellow card
        const lateFee = 15; // fixed fee for late fee

        const redCards = 1;
        const yellowCards = 1;
        const lateFees = 1;

        const productFee = parseFloat((Math.random() * 20 + 10).toFixed(2));

        const totalDue = (
          productFee +
          redCards * redCardFee +
          yellowCards * yellowCardFee +
          lateFees * lateFee
        ).toFixed(2);

        const generatePastDate = () => {
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));

          const day = date.getDate();
          const month = date.toLocaleString("en-UK", { month: "short" });
          const year = date.getFullYear();
          const time = date.toLocaleTimeString("en-UK", { hour12: false });

          return `${day} ${month} ${year} · ${time}`;
        };

        let productFeeDate, redCardDate, yellowCardDate, lateFeeDate;

        if (redCards > 0) {
          redCardDate = generatePastDate();
        }
        if (yellowCards > 0) {
          yellowCardDate = generatePastDate();
        }
        if (lateFees > 0) {
          lateFeeDate = generatePastDate();
        }
        if (productFee > 0) {
          productFeeDate = generatePastDate();
        }

        return {
          ...player,
          productFee,
          redCards,
          yellowCards,
          lateFees,
          due: totalDue,
          productFeeDate,
          redCardDate,
          yellowCardDate,
          lateFeeDate,
        };
      } else {
        // For players without due payments
        return {
          ...player,
          productFee: 0,
          redCards: 0,
          yellowCards: 0,
          lateFees: 0,
          due: "0.00",
        };
      }
    });

    playersWithAmounts.sort((a, b) => parseFloat(b.due) - parseFloat(a.due));

    setPlayersWithDue(playersWithAmounts);
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, player: Player) => (
        <div className="flex">
          <Link
            to="#"
            className="flex items-center gap-2.5 text-title hover:no-underline group"
          >
            <img
              className="w-8 h-8 rounded-full shrink-0"
              src={player.image}
              alt={player.name}
            />
            <div className="text-sm">
              <div className="group-hover:underline">{text}</div>
            </div>
          </Link>
        </div>
      ),
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (text: string, player: Player) => {
        return text !== "0.00" ? (
          <Button
            type="link"
            onClick={() => showModal(player)}
            className="px-0 team-text"
          >
            £{text}
          </Button>
        ) : (
          <div className="text-neutral-400">-</div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      width: 34,
      render: () => (
        <Dropdown
          menu={{ items: playerItems }}
          trigger={["click"]}
          rootClassName="w-[12.5rem]"
        >
          <Button
            className="absolute right-[8px] top-[12px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [modalTableData, setModalTableData] = useState<
    Array<{ key: string; type: string; amount: string; date: string }>
  >([]);

  const showModal = (player: Player) => {
    const data = [
      {
        key: "1",
        type: "Product fee",
        amount:
          player.productFee && player.productFee > 0
            ? `£${player.productFee.toFixed(2)}`
            : "-",
        date: player.productFeeDate || "-",
      },
      {
        key: "2",
        type: "Red card",
        amount:
          player.redCards && player.redCards > 0
            ? `£${(player.redCards * 10).toFixed(2)}`
            : "-",
        date: player.redCardDate || "-",
      },
      {
        key: "3",
        type: "Yellow card",
        amount:
          player.yellowCards && player.yellowCards > 0
            ? `£${(player.yellowCards * 5).toFixed(2)}`
            : "-",
        date: player.yellowCardDate || "-",
      },
      {
        key: "4",
        type: "Late fee",
        amount:
          player.lateFees && player.lateFees > 0
            ? `£${(player.lateFees * 15).toFixed(2)}`
            : "-",
        date: player.lateFeeDate || "-",
      },
      {
        key: "5",
        type: "Total",
        amount: `£${player.due}`,
        date: "",
      },
    ];
    setModalTableData(data);
    setSelectedPlayer(player);
    setIsModalVisible(true);
  };

  interface ModalTableData {
    key: string;
    type: string;
    amount: string;
    date: string;
  }

  const modalColumns: ColumnsType<ModalTableData> = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "right",
      render: (date: string) => (
        <div className="text-right text-subtitle">{date}</div>
      ),
    },
    {
      title: " ",
      dataIndex: "",
      key: "action",
      width: 50,
      render: () => (
        <Dropdown
          menu={{ items: playerItems }}
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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 -mt-2.5">
        <div className="text-lg">
          <Input
            placeholder="Search players..."
            prefix={<SearchOutlined className="mr-1" />}
          />
        </div>
        <div>
          <DateFilter defaultFilter="This month" />
        </div>
      </div>
      <div className="relative rounded-md shadow-sm text-neutral-800 ring-1 ring-black/5">
        <TableActions
          isVisible={selectedRowKeys.length > 0}
          className="ml-[2.5rem] !from-white !to-white/50 [&>div]:bg-white [&>div:after]:from-white [&>div:after]:via-white/95"
        >
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

            <a
              onClick={(e) => e.preventDefault()}
              className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
            >
              <CreditCardOutlined />
              <span>Request payment</span>
            </a>
          </div>
        </TableActions>
        <Table
          rowSelection={rowSelection}
          sticky={true}
          className="ant-table-sticky [&_.ant-table]:rounded-md [&_thead_th]:bg-white [&_thead_td]:bg-white [&_th]:px-4 [&_td]:px-4 [&_tbody_tr:last-child_td]:border-b-0 [&_table]:!visible"
          size="small"
          columns={columns}
          dataSource={playersWithDue}
          rowKey="id"
          pagination={false}
        />
      </div>
      <Modal
        title={selectedPlayer ? `Due payments - ${selectedPlayer.name}` : ""}
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <Table
          dataSource={modalTableData}
          columns={modalColumns}
          pagination={false}
          size="small"
          className="mb-2 [&_tr:last-child]:font-semibold [&_tr:last-child_td]:bg-neutral-100/75 [&_tr:last-child_td]:border-0 [&_tr:last-child_td]:rounded-bl-md [&_tr:last-child_td:last-child]:rounded-br-md [&_tr:last-child_td:last-child_button]:hidden"
        />
      </Modal>
    </>
  );
};

export default Payments;
