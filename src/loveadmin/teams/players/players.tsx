import React, { useState } from "react";
import { Button, Dropdown, Input, Menu, MenuProps, Modal, Table } from "antd";
import { Player } from "../data";
import {
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  MailOutlined,
  PlusOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import TableActions from "../../../components/table-actions";
import InviteModal from "./invite";

interface PlayersProps {
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
    key: "8-1",
    label: "Add to",
    children: [
      {
        key: "8-1-1",
        label: "Squad",
      },
      {
        key: "8-1-2",
        label: "Team",
      },
    ],
    icon: <PlusOutlined />,
  },
  {
    key: "8-2",
    label: "Move to",
    icon: <SwapOutlined />,
    children: [
      {
        key: "8-2-1",
        label: "Squad ",
      },
      {
        key: "8-2-2",
        label: "Team",
      },
    ],
  },
  {
    key: "99",
    label: "Request payment",
    icon: <CreditCardOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "8-3",
    label: "Remove",
    icon: <DeleteOutlined />,
    className: "[&_*]:text-danger-500 [&_*]:bg-transparent hover:bg-danger-50",
    children: [
      {
        key: "8-3-1",
        className: "hover:bg-danger-50",
        label: <span className="text-danger-500">Remove from squad</span>,
      },
      {
        key: "8-3-2",
        className: "hover:bg-danger-50",
        label: <span className="text-danger-500">Remove from team</span>,
      },
    ],
  },
];

const Players: React.FC<PlayersProps> = ({ squad, players }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showInviteModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

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

              <div className="font-normal text-subtitle">
                <span>{player.dob}</span>
              </div>
            </div>
          </Link>
        </div>
      ),
    },
    {
      title: "Team",
      dataIndex: "teamName",
      key: "team",

      render: (text: string, player: Player) => {
        return text ? (
          <div
            className={`flex items-center gap-2.5 team-${player.teamColour}`}
          >
            <div className={`w-2 h-2 rounded-full team-bg`}></div>
            {text}
          </div>
        ) : (
          <div className="text-subtitle">No team</div>
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
          rootClassName="w-[11rem]"
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

  return (
    <>
      <div className="flex items-center justify-between mb-4 -mt-2.5">
        <div className="text-lg">
          <Input
            placeholder="Search players..."
            prefix={<SearchOutlined className="mr-1" />}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            type="primary"
            className={!squad ? "team-bg" : ""}
            onClick={showInviteModal}
          >
            Invite players
          </Button>
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
            <Dropdown
              placement="bottomLeft"
              getPopupContainer={() => document.body}
              overlayStyle={{ position: "fixed" }}
              overlay={
                <Menu>
                  <Menu.Item>Squad</Menu.Item>
                  <Menu.Item>Team</Menu.Item>
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
                  <Menu.Item>Squad</Menu.Item>
                  <Menu.Item>Team</Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <a
                onClick={(e) => e.preventDefault()}
                className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
              >
                <SwapOutlined />
                <span>Move to</span>
              </a>
            </Dropdown>
            <a
              onClick={(e) => e.preventDefault()}
              className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap"
            >
              <CreditCardOutlined />
              <span>Request payment</span>
            </a>
            <div className="text-neutral-400">|</div>
            <Dropdown
              placement="bottomLeft"
              getPopupContainer={() => document.body}
              overlayStyle={{ position: "fixed" }}
              overlay={
                <Menu>
                  <Menu.Item className="text-danger-500 hover:bg-danger-50 hover:text-danger-600">
                    Remove from squad
                  </Menu.Item>
                  <Menu.Item className="text-danger-500 hover:bg-danger-50 hover:text-danger-600">
                    Remove from team
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
          sticky={true}
          className="ant-table-sticky [&_.ant-table]:rounded-md [&_thead_th]:bg-white [&_thead_td]:bg-white [&_th]:px-4 [&_td]:px-4 [&_tbody_tr:last-child_td]:border-b-0 [&_table]:!visible"
          size="small"
          columns={columns}
          dataSource={players}
          rowKey="id"
          pagination={false}
        />
      </div>
      <InviteModal
        isVisible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        coach={false}
      />
    </>
  );
};

export default Players;
