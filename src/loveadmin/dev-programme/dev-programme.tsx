import React, { useState } from "react";
import {
  CheckCircleFilled,
  CheckSquareOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  DownOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MinusCircleFilled,
  PlayCircleFilled,
  PlusOutlined,
  SettingOutlined,
  StarFilled,
  TeamOutlined,
  UserSwitchOutlined,
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
  Select,
  Dropdown,
  Menu,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import DevProgrammeSkillModal from "./dev-programme-skill-modal";
import TableActions from "../../components/table-actions";
import DevProgrammeParticipantModal from "./dev-programme-participant-modal";
import ManageLevelsModal from "./manage-levels-modal";
import {
  Achieved,
  Completed,
  NotAchieved,
  NotStarted,
  WorkingOn,
} from "./icons";
import LevelAchievedModal from "./level-achieved-modal";
import { participantData } from "./participant-data";
import { skillData } from "./skill-data";
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

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
  levelCompleted?: boolean;
}

const DevProgrammeModal: React.FC = () => {
  const [selectedSkillState, setSelectedSkillState] = useState("achieved");
  const [levelModal, setLevelModal] = useState(false);

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

  const handleChange = (selected: any) => {
    setSelectedLevel(selected);
  };

  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const [participantModalVisible, setParticipantModalVisible] = useState(false);
  const [manageLevelsModalVisible, setManageLevelsModalVisible] =
    useState(false);

  const levelAchieved = () => {
    setLevelModal(true);
  };

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

  const KeyContent = () => (
    <div className="flex gap-4 pr-2 text-sm text-neutral-700">
      <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
        <CloseCircleFilled className="text-danger-500" />
        <span>Not achieved</span>
      </div>
      <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
        <PlayCircleFilled className="text-primary-500" />
        <span>Working on</span>
      </div>
      <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
        <CheckCircleFilled className="text-success-500" />
        <span>Completed</span>
      </div>
      <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
        <StarFilled className="text-yellow-400" />
        <span>Achieved</span>
      </div>
    </div>
  );

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
      title: "Progress",
      render: (record) => {
        const totalParticpants = 10;
        const achievedSkills = record.achieved;
        const achievedPercentage = (achievedSkills / totalParticpants) * 100;

        return (
          <Tooltip
            className="flex w-full max-w-[15rem] items-center gap-3"
            title={
              achievedSkills === totalParticpants
                ? "All participants have achieved this skill"
                : `Achieved by ${achievedSkills} out of ${totalParticpants} participants`
            }
          >
            <a
              onClick={() => showSkillsModal(record)}
              className="flex flex-grow min-w-0 gap-px overflow-hidden rounded-full bg-neutral-200/75"
            >
              <div
                className="flex items-center justify-center h-3.5 bg-yellow-400 rounded-full"
                style={{ width: `${achievedPercentage}%` }}
              ></div>
            </a>

            <div className="-ml-0.5">
              {achievedSkills}/{totalParticpants}
            </div>
          </Tooltip>
        );
      },
    },
  ];

  const participantItems: MenuProps["items"] = [
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
          label: "Class",
        },
        {
          key: "8-1-2",
          label: "Product",
        },
        {
          key: "8-1-3",
          label: "Group",
        },
      ],
      icon: <PlusOutlined />,
    },
    {
      key: "8-2",
      label: "Manage",
      icon: <UserSwitchOutlined />,
      children: [
        {
          key: "8-2-1",
          label: "Move to class",
        },
        {
          key: "8-2-2",
          label: "Invite to product",
        },
        {
          key: "8-2-3",
          type: "divider",
        },
        {
          key: "8-2-4",
          label: "Manage coaches",
        },
      ],
    },
    {
      key: "8-3",
      label: "Remove",
      icon: <DeleteOutlined />,
      className:
        "[&_*]:text-danger-500 [&_*]:bg-transparent hover:bg-danger-50",
      children: [
        {
          key: "8-3-1",
          className: "hover:bg-danger-50",
          label: <span className="text-danger-500">Remove from product</span>,
        },
        {
          key: "8-3-2",
          className: "hover:bg-danger-50",
          label: <span className="text-danger-500">Remove from session</span>,
        },
      ],
    },
  ];

  const getColumn = () => {
    return {
      title: (
        <Select
          value={selectedSkillState}
          onChange={(value) => setSelectedSkillState(value)}
          bordered={false}
          popupMatchSelectWidth={false}
          className="!shadow-none [&_.ant-select-selector]:border-0 [&_.ant-select-selection-item]:!self-auto [&_.ant-select-selection-item]:!text-neutral-900 -my-4 -ml-2 relative top-1 [&_.ant-select-arrow]:text-neutral-400"
        >
          <Option value="notStarted">
            <div className="flex items-center gap-1.5">
              <NotStarted className="w-4 h-4 mr-1 rounded-full" />
              <div className="label">Not started</div>
            </div>
          </Option>
          <Option value="notAchieved">
            <div className="flex items-center gap-1.5">
              <NotAchieved className="w-4 h-4 mt-px mr-1 rounded-full text-danger-500" />
              <div className="label">Not achieved</div>
            </div>
          </Option>
          <Option value="workingOn">
            <div className="flex items-center gap-1.5">
              <WorkingOn className="w-4 h-4 mt-px mr-1 rounded-full text-primary-500" />
              <div className="label">Working on</div>
            </div>
          </Option>
          <Option value="completed">
            <div className="flex items-center gap-1.5">
              <Completed className="w-4 h-4 mt-px mr-1 rounded-full" />
              <div className="label">Completed</div>
            </div>
          </Option>
          <Option value="achieved">
            <div className="flex items-center gap-1.5">
              <Achieved className="w-4 h-4 mr-1 -mt-px" />
              <div className="label">Achieved</div>
            </div>
          </Option>
        </Select>
      ),
      render: (record: any) => {
        const totalSkills = 8;
        const currentSkills = record[selectedSkillState];
        const currentPercentage = (currentSkills / totalSkills) * 100;

        let colour;
        switch (selectedSkillState) {
          case "achieved":
            colour = "bg-yellow-400";
            break;
          case "workingOn":
            colour = "bg-primary-500";
            break;
          case "completed":
            colour = "bg-success-500";
            break;
          case "notStarted":
            colour = "bg-neutral-300";
            break;
          case "notAchieved":
            colour = "bg-danger-500";
            break;
          default:
            colour = "bg-neutral-300";
            break;
        }

        return (
          <>
            {!record.levelCompleted ? (
              <Tooltip
                className="flex w-full max-w-[15rem] items-center gap-3"
                title={
                  currentSkills === totalSkills
                    ? "All skills achieved"
                    : `View progress`
                }
              >
                <a
                  onClick={() => showParticipantsModal(record)}
                  className="flex flex-grow min-w-0 gap-px overflow-hidden rounded-full bg-neutral-200/75"
                >
                  {currentSkills > 0 ? (
                    <div
                      className={`flex items-center justify-center h-3 ${colour} rounded-full`}
                      style={{ width: `${currentPercentage}%` }}
                    ></div>
                  ) : (
                    <div className="h-3.5 rounded-full "></div>
                  )}
                </a>

                <div className="-ml-0.5">
                  {currentSkills}/{totalSkills}
                </div>
              </Tooltip>
            ) : (
              <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
                <Tooltip title="Level achieved · 6 out of 8 skills">
                  <div className="flex items-center gap-2 leading-tight">
                    <Achieved className="-mt-px" />
                    <div className="flex gap-1 font-medium">
                      <span>Level achieved</span>
                      <span>·</span>
                      <span>6/8</span>
                    </div>
                  </div>
                </Tooltip>
              </div>
            )}
          </>
        );
      },
    };
  };

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
      getColumn(),
      {
        title: "",
        dataIndex: "",
        key: "action",
        width: 34,
        render: () => (
          <Dropdown
            menu={{ items: participantItems }}
            trigger={["click"]}
            rootClassName="w-40"
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

  const uniqueLevels = Array.from(
    new Set(participantData.map((item) => `Level ${item.level}`))
  );

  const levelOptions = uniqueLevels.map((level) => ({
    label: level,
    value: level,
  }));

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
    <div className="min-h-screen px-6 py-4 bg-white">
      <header className="mb-7">
        <div className="flex items-center mb-5">
          <div>
            <Title level={5} className="flex items-center mb-0.5">
              <span>Thursday Beginners Class</span>
            </Title>
            <Text className="flex items-center text-subtitle">
              <span>9 Feb · 16:00 - 17:00</span>
              <span className="mx-1.5 text-subtitle">·</span>
              <span>20 participants</span>
              <Tooltip
                className="cursor-pointer hover:underline"
                title={
                  <div className="space-y-0.5">
                    <div className="flex">
                      <div className="text-neutral-300">Level 1</div>
                      <div className="min-w-[3ch] flex-grow text-right tabular-nums">
                        10
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-neutral-300">Level 2</div>
                      <div className="min-w-[3ch] flex-grow text-right tabular-nums">
                        4
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-neutral-300">Unassigned</div>
                      <div className="min-w-[3ch] flex-grow text-right tabular-nums">
                        6
                      </div>
                    </div>
                  </div>
                }
              >
                <InfoCircleOutlined className="relative ml-1 text-xs top-px text-neutral-500/75 hover:text-neutral-500" />
              </Tooltip>
              <span className="mx-1.5 text-danger-500">·</span>
              <a className="text-danger-500">
                <span className="text-danger-500 hover:cursor-pointer hover:underline">
                  6 unassigned
                </span>
              </a>
            </Text>
          </div>
        </div>
        <div>
          <Segmented
            options={levelOptions}
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
                <div className="font-medium whitespace-nowrap ml-[-3px]">
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
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
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
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
                      <SettingOutlined />
                      <span>Manage levels</span>
                    </div>
                  </Button>
                </div>
                <div className="text-neutral-400">|</div>
                <div className="flex items-center gap-4 ml-1 mr-2">
                  <Dropdown
                    placement="bottomLeft"
                    getPopupContainer={() => document.body}
                    overlayStyle={{ position: "fixed" }}
                    rootClassName="w-40"
                    overlay={
                      <Menu>
                        <Menu.SubMenu
                          key="7-1"
                          title={
                            <>
                              <MailOutlined className="relative mr-3 top-px" />
                              Message
                            </>
                          }
                        >
                          <Menu.Item key="7-1-1">Email</Menu.Item>
                          <Menu.Item key="7-1-2">SMS</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                          key="7-2"
                          title={
                            <>
                              <PlusOutlined className="relative mr-3 top-px" />
                              Add to
                            </>
                          }
                        >
                          <Menu.Item key="7-2-1">Class</Menu.Item>
                          <Menu.Item key="7-2-2">Product</Menu.Item>
                          <Menu.Item key="7-2-3">Group</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                          key="7-3"
                          title={
                            <>
                              <UserSwitchOutlined className="relative mr-3 top-px" />
                              Manage
                            </>
                          }
                        >
                          <Menu.Item key="7-3-1">Move to class</Menu.Item>
                          <Menu.Item key="7-3-2">Invite to product</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item key="7-3-3">Manage coaches</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                          key="7-4"
                          className="[&_*]:bg-transparent [&_*]:text-danger-500 hover:bg-danger-50"
                          title={
                            <>
                              <DeleteOutlined className="relative mr-3 top-px" />
                              Remove
                            </>
                          }
                        >
                          <Menu.Item
                            key="7-4-1"
                            className="text-danger-500 hover:bg-danger-50"
                          >
                            Remove from product
                          </Menu.Item>
                          <Menu.Item
                            key="7-4-2"
                            className="text-danger-500 hover:bg-danger-50"
                          >
                            Remove from session
                          </Menu.Item>
                        </Menu.SubMenu>
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
                columns={participantColumns}
                dataSource={participantsFilteredData}
                size="small"
                pagination={false}
                rowSelection={{
                  ...participantRowSelection,
                  selectedRowKeys: selectedParticipantRowKeys,
                }}
                className="ant-table-sticky [&_tr>*:last-child]:pl-6 [&_th_.label]:font-medium"
              />
            </div>
          )}
          {segmentValue === "Skills" && (
            <div className="relative">
              <TableActions isVisible={selectedSkillRowKeys.length > 0}>
                <div className="font-medium whitespace-nowrap -ml-0.5">
                  {selectedSkillRowKeys.length} selected
                </div>
                <div className="">|</div>
                <div className="flex items-center gap-3 mr-2">
                  <Button
                    size="small"
                    type="text"
                    className="px-0 hover:bg-transparent hover:underline"
                    onClick={skillNotAchieved}
                  >
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
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
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
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
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
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
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
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
                    <div className="flex gap-1.5 font-medium text-neutral-900 whitespace-nowrap">
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
                className="ant-table-sticky"
              />
            </div>
          )}
        </Content>
      </div>
      <footer className="font-body fixed gap-2 left-0 flex items-center justify-between bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
        <div className="hidden w-full flex-grow sm:flex items-center justify-start pr-0.5">
          <Popover content={<KeyContent />} trigger="click" placement="topLeft">
            <Button>Key</Button>
          </Popover>
        </div>
        <div className="mx-auto">
          <Segmented
            block
            options={[
              {
                label: (
                  <>
                    <TeamOutlined className="relative mr-2 text-xs text-subtitle -top-px" />
                    Participants
                  </>
                ),
                value: "Participants",
              },
              {
                label: (
                  <>
                    <CheckSquareOutlined className="relative mr-2 text-xs text-subtitle -top-px" />
                    Skills
                  </>
                ),
                value: "Skills",
              },
            ]}
            className="w-[16.5rem]"
            value={segmentValue}
            onChange={setSegmentValue}
          />
        </div>
        <div className="items-center justify-end flex-grow hidden w-full gap-2 sm:flex">
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
        handleOk={() => setManageLevelsModalVisible(false)}
        handleCancel={() => setManageLevelsModalVisible(false)}
      />
      <LevelAchievedModal
        visible={levelModal}
        handleOk={() => setLevelModal(false)}
        handleCancel={() => setLevelModal(false)}
        participant="James Toone"
      />
    </div>
  );
};

export default DevProgrammeModal;
