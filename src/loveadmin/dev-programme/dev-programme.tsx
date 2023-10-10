import React, { useState } from "react";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  MailOutlined,
  MinusCircleFilled,
  PlayCircleFilled,
  SettingOutlined,
  ShoppingCartOutlined,
  StarFilled,
  UserOutlined,
  UsergroupAddOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Table,
  Tooltip,
  notification,
  Segmented,
  Popover,
  message,
  Progress,
  Dropdown,
  Menu,
  Space,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import DevProgrammeSkillModal from "./dev-programme-skill-modal";
import TableActions from "../../components/table-actions";
import DevProgrammeParticipantModal from "./dev-programme-participant-modal";
import ManageLevelsModal from "./manage-levels-modal";
const { Content } = Layout;
const { Title, Text } = Typography;

export interface DevProgrammeSkillsDataType {
  key: React.Key;
  skill: string;
  level: number;
  notAchieved: number;
  workingOn: number;
  completed: number;
  achieved: number;
  notStarted: number;
}

export interface DevProgrammeParticipantsDataType {
  key: React.Key;
  participant: string;
  level: number;
  notAchieved: number;
  workingOn: number;
  completed: number;
  achieved: number;
  notStarted: number;
}

const DevProgrammeModal: React.FC = () => {
  const [segmentValue, setSegmentValue] = useState<string | number>(
    "Participants"
  );
  const [selectedSkillRowData, setSelectedSkillRowData] =
    useState<DevProgrammeSkillsDataType | null>(null);
  const [selectedParticipantRowData, setSelectedParticipantRowData] =
    useState<DevProgrammeParticipantsDataType | null>(null);

  const [selectedSkillRowKeys, setSelectedSkillRowKeys] = useState<React.Key[]>(
    []
  );
  const [selectedParticipantRowKeys, setSelectedParticipantRowKeys] = useState<
    React.Key[]
  >([]);
  const [selectedLevel, setSelectedLevel] = useState("Level 1");

  const options = ["Level 1", "Level 2"];

  const handleChange = (selected: any) => {
    setSelectedLevel(selected);
  };

  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const [participantModalVisible, setParticipantModalVisible] = useState(false);
  const [manageLevelsModalVisible, setManageLevelsModalVisible] =
    useState(false);

  const showSkillsModal = (rowData: DevProgrammeSkillsDataType) => {
    setSelectedSkillRowData(rowData);
    setSkillModalVisible(true);
  };

  const handleSkillModalOk = () => {
    setSkillModalVisible(false);
  };

  const handleSkillModalCancel = () => {
    setSkillModalVisible(false);
  };

  const showParticipantsModal = (rowData: DevProgrammeParticipantsDataType) => {
    setSelectedParticipantRowData(rowData);
    setParticipantModalVisible(true);
  };

  const handleParticipantModalOk = () => {
    setParticipantModalVisible(false);
  };

  const handleParticipantModalCancel = () => {
    setParticipantModalVisible(false);
  };

  type NotificationOptions = {
    rowKeys: React.Key[];
    itemName: string;
    action: string;
  };

  const openNotification = (options: NotificationOptions) => {
    const { rowKeys, itemName, action } = options;
    const rowKeysCount = rowKeys.length;
    let icon;

    switch (action) {
      case "marked as achieved":
        icon = <StarFilled className="mt-px text-lg text-yellow-400 w-7" />;
        break;
      case "marked as not achieved":
        icon = (
          <CloseCircleFilled className="mt-px text-lg w-7 text-danger-500" />
        );
        break;
      case "marked as working on":
        icon = (
          <PlayCircleFilled className="mt-px text-lg w-7 text-primary-500" />
        );
        break;
      case "marked as completed":
        icon = (
          <CheckCircleFilled className="mt-px text-lg w-7 text-success-500" />
        );
        break;
      case "marked as not started":
        icon = (
          <MinusCircleFilled className="mt-px text-lg w-7 text-neutral-400" />
        );
        break;
      default:
        icon = (
          <MinusCircleFilled className="mt-px text-lg w-7 text-neutral-400" />
        );
    }

    notification.open({
      message: (
        <div className="flex items-center">
          {icon}
          <div className="first-letter:uppercase">
            {rowKeysCount === 1 ? itemName : `${itemName}s`} updated
          </div>
        </div>
      ),
      description: (
        <div className="ml-7">
          <span className="text-neutral-700">
            {`${rowKeysCount} ${itemName}${
              rowKeysCount === 1 ? "" : "s"
            } ${action}`}
          </span>
          <Button
            type="link"
            size="small"
            className="absolute mt-px top-4 right-14 bg-neutral-100 text-neutral-900"
            onClick={closeNotificationAndToastMessage}
          >
            Undo
          </Button>
        </div>
      ),
      placement: "top",
    });
  };

  const closeNotificationAndToastMessage = () => {
    notification.destroy();
    message.success("Action undone");
  };

  const handleAction = (
    rowKeys: React.Key[],
    action: string,
    itemName: string
  ) => {
    openNotification({
      rowKeys,
      itemName,
      action,
    });
    setSelectedSkillRowKeys([]);
    setSelectedParticipantRowKeys([]);
  };

  const skillNotAchieved = () => {
    handleAction(selectedSkillRowKeys, "marked as not achieved", "skill");
  };

  const skillWorkingOn = () => {
    handleAction(selectedSkillRowKeys, "marked as working on", "skill");
  };

  const skillCompleted = () => {
    handleAction(selectedSkillRowKeys, "marked as completed", "skill");
  };

  const skillAchieved = () => {
    handleAction(selectedSkillRowKeys, "marked as achieved", "skill");
  };

  const skillNotStarted = () => {
    handleAction(selectedSkillRowKeys, "marked as not started", "skill");
  };

  const levelAchieved = () => {
    handleAction(selectedParticipantRowKeys, "marked as achieved", "level");
  };

  const PopoverContent = () => (
    <div className="flex gap-4 pr-2 text-sm text-neutral-700">
      <div className="flex items-center gap-1.5">
        <CloseCircleFilled className="text-danger-500" />
        <span>Not achieved</span>
      </div>
      <div className="flex items-center gap-1.5">
        <PlayCircleFilled className="text-primary-500" />
        <span>Working on</span>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircleFilled className="text-success-500" />
        <span>Completed</span>
      </div>
      <div className="flex items-center gap-1.5">
        <StarFilled className="text-yellow-400" />
        <span>Achieved</span>
      </div>
    </div>
  );

  const skillItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Not achieved",
      icon: <CloseCircleFilled className="mt-px text-danger-500" />,
    },
    {
      key: "2",
      label: "Working on",
      icon: <PlayCircleFilled className="mt-px text-primary-500" />,
    },
    {
      key: "3",
      label: "Completed",
      icon: <CheckCircleFilled className="mt-px text-success-500" />,
    },
    {
      key: "4",
      label: "Achieved",
      icon: <StarFilled className="mt-px text-yellow-400" />,
    },
    {
      key: "5",
      label: "Not started",
      icon: <MinusCircleFilled className="mt-px text-neutral-400" />,
    },
  ];

  const skillColumns: TableColumnsType<DevProgrammeSkillsDataType> = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      sorter: (a, b) => a.skill.length - b.skill.length,
      render: (text: string, record: DevProgrammeSkillsDataType) => (
        <a onClick={() => showSkillsModal(record)} className="truncate">
          {text}
        </a>
      ),
      ellipsis: true,
    },
    {
      title: "Participants",
      render: () => <div>14</div>,
      width: 180,
    },
    {
      title: "Progress",
      render: (record) => (
        <div className="flex items-center gap-3 max-w-[260px]">
          <div className="flex flex-grow h-2 min-w-0 gap-px overflow-hidden rounded-full bg-neutral-100">
            {record.notAchieved > 0 && (
              <Tooltip title={<>Not achieved · {record.notAchieved}%</>}>
                <div
                  className="h-full bg-danger-500"
                  style={{ width: `${record.notAchieved}%` }}
                ></div>
              </Tooltip>
            )}
            {record.workingOn > 0 && (
              <Tooltip title={<>Working on · {record.workingOn}%</>}>
                <div
                  className="h-full bg-primary-500"
                  style={{ width: `${record.workingOn}%` }}
                ></div>
              </Tooltip>
            )}
            {record.completed > 0 && (
              <Tooltip title={<>Completed · {record.completed}%</>}>
                <div
                  className="h-full bg-success-500"
                  style={{ width: `${record.completed}%` }}
                ></div>
              </Tooltip>
            )}
            {record.achieved > 0 && (
              <Tooltip title={<>Achieved · {record.achieved}%</>}>
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${record.achieved}%` }}
                ></div>
              </Tooltip>
            )}
            {record.notStarted > 0 && (
              <Tooltip title={<>Not started · {record.notStarted}%</>}>
                <div
                  className="h-full bg-neutral-200"
                  style={{ width: `${record.notStarted}%` }}
                ></div>
              </Tooltip>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      width: 34,
      render: () => (
        <Dropdown
          menu={{ items: skillItems }}
          trigger={["click"]}
          rootClassName="w-48"
        >
          <Button
            className="absolute right-[3px] top-[3px]"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const skillData = [
    {
      key: "1",
      skill: "Enter the water safely",
      level: 1,
      notStarted: 10,
      notAchieved: 5,
      workingOn: 15,
      completed: 30,
      achieved: 40,
    },
    {
      key: "2",
      skill:
        "Move forward for a distance of 5 metres, feet may be on or off the floor",
      level: 1,
      notStarted: 30,
      notAchieved: 0,
      workingOn: 10,
      completed: 30,
      achieved: 30,
    },
    {
      key: "3",
      skill:
        "Move backwards for a distance of 5 metres, feet may be on or off the floor",
      level: 1,
      notStarted: 40,
      notAchieved: 20,
      workingOn: 10,
      completed: 15,
      achieved: 15,
    },
    {
      key: "4",
      skill:
        "Move sideways for a distance of 5 metres, feet may be on or off the floor",
      level: 1,
      notStarted: 10,
      notAchieved: 0,
      workingOn: 10,
      completed: 40,
      achieved: 40,
    },
    {
      key: "5",
      skill: "Scoop the water and wash the face",
      level: 1,
      notStarted: 60,
      notAchieved: 10,
      workingOn: 10,
      completed: 10,
      achieved: 10,
    },
    {
      key: "6",
      skill: "Be comfortable with water showered from overhead",
      level: 1,
      notStarted: 70,
      notAchieved: 10,
      workingOn: 10,
      completed: 5,
      achieved: 5,
    },
    {
      key: "7",
      skill:
        "Move from a flat floating position on the back and return to standing",
      level: 1,
      notStarted: 30,
      notAchieved: 20,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
    {
      key: "8",
      skill:
        "Move from a flat floating position on the front and return to standing",
      level: 1,
      notStarted: 30,
      notAchieved: 20,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
    {
      key: "9",
      skill: "Push and glide in a flat position on the front from a wall",
      level: 2,
      notStarted: 70,
      notAchieved: 10,
      workingOn: 10,
      completed: 5,
      achieved: 5,
    },
    {
      key: "10",
      skill: "Push and glide in a flat position on the back from a wall",
      level: 2,
      notStarted: 30,
      notAchieved: 20,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
    {
      key: "11",
      skill: "Give examples of two pool rules",
      level: 2,
      notStarted: 30,
      notAchieved: 20,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
    {
      key: "12",
      skill: "Exit the water safely",
      level: 2,
      notStarted: 30,
      notAchieved: 20,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
  ];

  const skillRowSelection: TableRowSelection<DevProgrammeSkillsDataType> = {
    selectedRowKeys: selectedSkillRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedSkillRowKeys(selectedRowKeys);
    },
  };

  const participantItems = [
    {
      key: "1",
      label: "Level achieved",
      icon: <StarFilled className="mt-px text-yellow-400" />,
    },
    {
      key: "2",
      label: "Manage levels",
      icon: <SettingOutlined className="text-neutral-500" />,
      onClick: () => setManageLevelsModalVisible(true),
    },
    {
      key: "3",
      type: "divider",
    },
    {
      key: "4",
      label: "More...",
      children: [
        {
          key: "4-0",
          label: "Message",
          children: [
            {
              key: "4-0-1",
              label: "Send email",
            },
            {
              key: "4-0-2",
              label: "Send SMS",
            },
          ],
          icon: <MailOutlined className="text-neutral-500" />,
        },
        {
          key: "4-1",
          label: "Product",
          children: [
            {
              key: "4-1-1",
              label: "Invite to product",
            },
            {
              key: "4-1-2",
              label: "Add to product",
            },
            {
              key: "4-1-3",
              label: "Remove from product",
            },
          ],
          icon: <ShoppingCartOutlined className="text-neutral-500" />,
        },
        {
          key: "4-2",
          label: "Class",
          children: [
            {
              key: "4-2-1",
              label: "Add to class",
            },
            {
              key: "4-2-2",
              label: "Move to class",
            },
          ],
          icon: <UsergroupAddOutlined className="text-neutral-500" />,
        },
        {
          key: "4-3",
          label: "Coach",
          children: [
            {
              key: "4-3-1",
              label: "Add coach",
            },
            {
              key: "4-3-2",
              label: "Remove coach",
            },
          ],
          icon: <UserOutlined className="text-neutral-500" />,
        },
        {
          key: "4-4",
          label: "Request payment",
          icon: <CreditCardOutlined className="text-neutral-500" />,
        },
        {
          key: "4-5",
          label: <span className="text-danger-500">Remove from session</span>,
          icon: <DeleteOutlined className="mt-px text-danger-500" />,
        },
      ],
    },
  ];

  const participantColumns: TableColumnsType<DevProgrammeParticipantsDataType> =
    [
      {
        title: "Participant",
        dataIndex: "participant",
        key: "participant",
        sorter: (a, b) => a.participant.localeCompare(b.participant),
        render: (text: string, record) => (
          <a onClick={() => showParticipantsModal(record)} className="truncate">
            {text}
          </a>
        ),
        ellipsis: true,
      },
      {
        title: "Progress",
        render: (record) => (
          <div className="flex items-center gap-3 max-w-[260px]">
            <div className="flex flex-grow h-2 min-w-0 gap-px overflow-hidden rounded-full bg-neutral-100">
              {record.notAchieved > 0 && (
                <Tooltip title={<>Not achieved · {record.notAchieved}%</>}>
                  <div
                    className="h-full bg-danger-500"
                    style={{ width: `${record.notAchieved}%` }}
                  ></div>
                </Tooltip>
              )}
              {record.workingOn > 0 && (
                <Tooltip title={<>Working on · {record.workingOn}%</>}>
                  <div
                    className="h-full bg-primary-500"
                    style={{ width: `${record.workingOn}%` }}
                  ></div>
                </Tooltip>
              )}
              {record.completed > 0 && (
                <Tooltip title={<>Completed · {record.completed}%</>}>
                  <div
                    className="h-full bg-success-500"
                    style={{ width: `${record.completed}%` }}
                  ></div>
                </Tooltip>
              )}
              {record.achieved > 0 && (
                <Tooltip title={<>Achieved · {record.achieved}%</>}>
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${record.achieved}%` }}
                  ></div>
                </Tooltip>
              )}
              {record.notStarted > 0 && (
                <Tooltip title={<>Not started · {record.notStarted}%</>}>
                  <div
                    className="h-full bg-neutral-200"
                    style={{ width: `${record.notStarted}%` }}
                  ></div>
                </Tooltip>
              )}
            </div>
          </div>
        ),
      },
      {
        title: "",
        dataIndex: "",
        key: "action",
        width: 34,
        render: () => (
          <Dropdown
            menu={{ items: participantItems }}
            trigger={["click"]}
            rootClassName="w-48"
          >
            <Button
              className="absolute right-[3px] top-[3px]"
              type="text"
              icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
              onClick={(e) => e.preventDefault()}
            ></Button>
          </Dropdown>
        ),
      },
    ];

  const participantData = [
    {
      key: "1",
      participant: "James Toone",
      level: 1,
      notStarted: 10,
      notAchieved: 10,
      workingOn: 20,
      completed: 25,
      achieved: 35,
    },
    {
      key: "2",
      participant: "Sarah Johnson",
      level: 1,
      notStarted: 20,
      notAchieved: 10,
      workingOn: 10,
      completed: 20,
      achieved: 40,
    },
    {
      key: "3",
      participant: "Robert Smith",
      level: 1,
      notStarted: 20,
      notAchieved: 20,
      workingOn: 10,
      completed: 25,
      achieved: 25,
    },
    {
      key: "4",
      participant: "Jessica Davis",
      level: 1,
      notStarted: 10,
      notAchieved: 5,
      workingOn: 20,
      completed: 30,
      achieved: 35,
    },
    {
      key: "5",
      participant: "Michael Miller",
      level: 1,
      notStarted: 40,
      notAchieved: 10,
      workingOn: 15,
      completed: 20,
      achieved: 15,
    },
    {
      key: "6",
      participant: "Emily Clark",
      level: 1,
      notStarted: 30,
      notAchieved: 10,
      workingOn: 10,
      completed: 25,
      achieved: 25,
    },
    {
      key: "7",
      participant: "John White",
      level: 1,
      notStarted: 15,
      notAchieved: 15,
      workingOn: 10,
      completed: 25,
      achieved: 35,
    },
    {
      key: "8",
      participant: "Emma Lewis",
      level: 1,
      notStarted: 25,
      notAchieved: 15,
      workingOn: 15,
      completed: 20,
      achieved: 25,
    },
    {
      key: "9",
      participant: "William Green",
      level: 2,
      notStarted: 50,
      notAchieved: 10,
      workingOn: 10,
      completed: 15,
      achieved: 15,
    },
    {
      key: "10",
      participant: "Sophia Brown",
      level: 2,
      notStarted: 25,
      notAchieved: 15,
      workingOn: 10,
      completed: 25,
      achieved: 25,
    },
    {
      key: "11",
      participant: "Jacob Black",
      level: 2,
      notStarted: 20,
      notAchieved: 10,
      workingOn: 10,
      completed: 30,
      achieved: 30,
    },
    {
      key: "12",
      participant: "Olivia Taylor",
      level: 2,
      notStarted: 25,
      notAchieved: 15,
      workingOn: 10,
      completed: 25,
      achieved: 25,
    },
    {
      key: "13",
      participant: "Lucas Turner",
      level: 1,
      notStarted: 40,
      notAchieved: 10,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
    {
      key: "14",
      participant: "Mia Anderson",
      level: 1,
      notStarted: 35,
      notAchieved: 15,
      workingOn: 10,
      completed: 20,
      achieved: 20,
    },
  ];

  const participantRowSelection: TableRowSelection<DevProgrammeParticipantsDataType> =
    {
      selectedRowKeys: selectedParticipantRowKeys,
      onChange: (selectedRowKeys) => {
        setSelectedParticipantRowKeys(selectedRowKeys);
      },
    };

  const skillsFilteredData = skillData.filter((item) =>
    selectedLevel.length ? selectedLevel.includes(item.level.toString()) : true
  );

  const participantsFilteredData = participantData.filter((item) =>
    selectedLevel.length ? selectedLevel.includes(item.level.toString()) : true
  );

  return (
    <div className="px-6 py-4">
      <header className="mb-6">
        <div className="flex items-center">
          <div>
            <Title level={5} className="flex items-center mb-0">
              <span>Thursday Beginners Class</span>
            </Title>
            <Text className="flex items-center text-sm text-subtitle">
              <span>9 Feb @ 16:00 - 17:00</span>
              <span className="mx-1.5">·</span>
              <span>14 participants</span>
            </Text>
          </div>
          <div className="ml-auto">
            <Progress
              type="circle"
              percent={40}
              size={44}
              className="font-medium"
              strokeWidth={10}
            />
          </div>
        </div>
        <div className="mt-3">
          <Segmented
            options={options}
            value={selectedLevel}
            onChange={handleChange}
            block
          />
        </div>
      </header>
      <div>
        <Content className="pb-16 bg-white">
          {segmentValue === "Participants" && (
            <div className="relative">
              <TableActions isVisible={selectedParticipantRowKeys.length > 0}>
                <div className="font-medium whitespace-nowrap -ml-0.5">
                  {selectedParticipantRowKeys.length} selected
                </div>
                <div className="text-neutral-400">|</div>
                <div className="flex items-center gap-4">
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={levelAchieved}
                  >
                    <div className="flex items-center gap-1.5">
                      <StarFilled className="text-yellow-400" />
                      <span>Level achieved</span>
                    </div>
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={() => setManageLevelsModalVisible(true)}
                  >
                    <div className="flex items-center gap-1.5">
                      <SettingOutlined className="text-neutral-600" />
                      <span>Manage levels</span>
                    </div>
                  </Button>
                </div>
                <div className="text-neutral-400">|</div>
                <div className="flex items-center gap-4 ml-1">
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Send email</Menu.Item>
                        <Menu.Item>Send SMS</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <Space className="hover:bg-transparent hover:underline">
                        <MailOutlined className="text-neutral-600" />
                        Message
                      </Space>
                    </a>
                  </Dropdown>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Invite to product</Menu.Item>
                        <Menu.Item>Add to product</Menu.Item>
                        <Menu.Item>Remove from product</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <Space className="hover:bg-transparent hover:underline">
                        <ShoppingCartOutlined className="text-neutral-600" />
                        Product
                      </Space>
                    </a>
                  </Dropdown>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Add to class</Menu.Item>
                        <Menu.Item>Move to class </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <Space className="hover:bg-transparent hover:underline">
                        <UsergroupAddOutlined className="text-neutral-600" />
                        Class
                      </Space>
                    </a>
                  </Dropdown>
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>Add coach</Menu.Item>
                        <Menu.Item>Remove coach</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <Space className="hover:bg-transparent hover:underline">
                        <UserOutlined className="text-neutral-600" />
                        Coach
                      </Space>
                    </a>
                  </Dropdown>
                </div>
                <div className="text-neutral-400">|</div>
                <div className="flex items-center gap-4 ml-1 mr-2">
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <CreditCardOutlined className="mr-3" /> Request
                          payment
                        </Menu.Item>

                        <Menu.Item className="text-danger-500">
                          <DeleteOutlined className="mr-3 text-danger-500" />
                          Remove from session
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <Space className="hover:bg-transparent hover:underline">
                        More...
                        <DownOutlined className="-ml-0.5 w-2.5" />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </TableActions>
              <Table
                columns={participantColumns}
                dataSource={participantsFilteredData}
                size="small"
                pagination={false}
                rowSelection={{
                  ...participantRowSelection,
                  selectedRowKeys: selectedParticipantRowKeys,
                }}
                className="ant-table-sticky [&_tr>*:last-child]:pl-6"
              />
            </div>
          )}
          {segmentValue === "Skills" && (
            <div className="relative">
              <TableActions isVisible={selectedSkillRowKeys.length > 0}>
                <div className="font-medium whitespace-nowrap -ml-0.5">
                  {selectedSkillRowKeys.length} selected
                </div>
                <div className="text-subtitle">|</div>
                <div className="flex items-center gap-4 mr-2">
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={skillNotAchieved}
                  >
                    <div className="flex items-center gap-1.5">
                      <CloseCircleFilled className="text-danger-500" />
                      <span>Not achieved</span>
                    </div>
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={skillWorkingOn}
                  >
                    <div className="flex items-center gap-1.5">
                      <PlayCircleFilled className="text-primary-500" />
                      <span>Working on</span>
                    </div>
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={skillCompleted}
                  >
                    <div className="flex items-center gap-1.5">
                      <CheckCircleFilled className="text-success-500" />
                      <span>Completed</span>
                    </div>
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={skillAchieved}
                  >
                    <div className="flex items-center gap-1.5">
                      <StarFilled className="text-yellow-400" />
                      <span>Achieved</span>
                    </div>
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={skillNotStarted}
                  >
                    <div className="flex items-center gap-1.5">
                      <MinusCircleFilled className="text-neutral-400" />
                      <span>Not started</span>
                    </div>
                  </Button>
                </div>
              </TableActions>
              <Table
                columns={skillColumns}
                dataSource={skillsFilteredData}
                size="small"
                pagination={false}
                rowSelection={{
                  ...skillRowSelection,
                  selectedRowKeys: selectedSkillRowKeys,
                }}
                className="ant-table-sticky [&_tr>*:last-child]:pl-6"
              />
            </div>
          )}
        </Content>
      </div>
      <footer className="font-body fixed gap-2 left-0 flex items-center justify-between bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
        <div className="w-full flex-grow flex items-center justify-start pr-0.5">
          <Popover
            content={<PopoverContent />}
            trigger="click"
            placement="topLeft"
          >
            <Button>Key</Button>
          </Popover>
        </div>
        <div className="mx-auto">
          <Segmented
            block
            options={["Participants", "Skills"]}
            className="bg-neutral-200/75 w-60"
            value={segmentValue}
            onChange={setSegmentValue}
          />
        </div>
        <div className="flex items-center justify-end flex-grow w-full gap-2">
          <Button icon={<DownloadOutlined />}>Export</Button>
        </div>
      </footer>
      <DevProgrammeSkillModal
        visible={skillModalVisible}
        handleOk={handleSkillModalOk}
        handleCancel={handleSkillModalCancel}
        rowData={selectedSkillRowData}
      />
      <DevProgrammeParticipantModal
        visible={participantModalVisible}
        handleOk={handleParticipantModalOk}
        handleCancel={handleParticipantModalCancel}
        rowData={selectedParticipantRowData}
      ></DevProgrammeParticipantModal>
      <ManageLevelsModal
        visible={manageLevelsModalVisible}
        onClose={() => setManageLevelsModalVisible(false)}
      />
    </div>
  );
};

export default DevProgrammeModal;
