import React, { useState } from "react";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CreditCardOutlined,
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  MailOutlined,
  MinusCircleFilled,
  PlayCircleFilled,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StarFilled,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Table,
  Modal,
  Radio,
  Tooltip,
  Space,
  Dropdown,
  Menu,
  notification,
  message,
  MenuProps,
} from "antd";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { DevProgrammeSkillsDataType as ImportedDevProgrammeDataType } from "./dev-programme";
import TableActions from "../../components/table-actions";
import { Achieved, Completed, NotAchieved, WorkingOn } from "./icons";
const { Content } = Layout;
const { Title } = Typography;

interface DevProgrammeSkillModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  rowData: ImportedDevProgrammeDataType | null;
}

interface DevProgrammeDataType {
  key: React.Key;
  participant: string;
  progress: string;
}

const data = [
  {
    key: "1",
    participant: "James Toone",
    progress: "notAchieved",
  },
  {
    key: "2",
    participant: "Sarah Johnson",
    progress: "completed",
  },
  {
    key: "3",
    participant: "Robert Smith",
    progress: "workingOn",
  },
  {
    key: "4",
    participant: "Jessica Davis",
    progress: "achieved",
  },
  {
    key: "5",
    participant: "Michael Miller",
    progress: "completed",
  },
  {
    key: "6",
    participant: "Emily Clark",
    progress: "achieved",
  },
  {
    key: "7",
    participant: "John White",
    progress: "completed",
  },
  {
    key: "8",
    participant: "Emma Lewis",
    progress: "workingOn",
  },
  {
    key: "9",
    participant: "William Green",
    progress: "achieved",
  },
  {
    key: "10",
    participant: "Sophia Brown",
    progress: "achieved",
  },
  {
    key: "11",
    participant: "Jacob Black",
    progress: "achieved",
  },
  {
    key: "12",
    participant: "Olivia Taylor",
    progress: "workingOn",
  },
  {
    key: "13",
    participant: "Lucas Turner",
    progress: "workingOn",
  },
  {
    key: "14",
    participant: "Mia Anderson",
    progress: "achieved",
  },
];

const dataToProgressStatus = (
  data: DevProgrammeDataType[]
): Record<string, string> => {
  const progressStatus: Record<string, string> = {};
  data.forEach(({ key, progress }) => {
    progressStatus[key.toString()] =
      progress.charAt(0).toUpperCase() + progress.slice(1);
  });
  return progressStatus;
};

const DevProgrammeSkillModal: React.FC<DevProgrammeSkillModalProps> = ({
  visible,
  handleOk,
  handleCancel,
  rowData,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [progressStatus, setProgressStatus] = useState<
    Record<string, string | null>
  >(dataToProgressStatus(data));

  const onRadioChange = (value: string, key: React.Key) => {
    setProgressStatus((prevStatus) => ({
      ...prevStatus,
      [key.toString()]: prevStatus[key.toString()] === value ? null : value,
    }));
  };

  const items: MenuProps["items"] = [
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

  const columns: ColumnsType<DevProgrammeDataType> = [
    {
      title: "Participant",
      dataIndex: "participant",
      key: "participant",
      ellipsis: true,
      sorter: (a, b) => a.participant.localeCompare(b.participant),
      render: (text: string) => <a className="block pr-3 truncate">{text}</a>,
      filterSearch: true,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      sorter: (a, b) => {
        const sortOrder: { [key: string]: number } = {
          notAchieved: 0,
          workingOn: 1,
          completed: 2,
          achieved: 3,
          notStarted: 4,
        };

        return sortOrder[a.progress] - sortOrder[b.progress];
      },
      defaultSortOrder: "ascend",
      render: (_, record) => (
        <div>
          <Radio.Group
            buttonStyle="solid"
            value={progressStatus[record.key.toString()]}
            className="flex whitespace-nowrap ant-radio-group-progress"
          >
            <Tooltip title="Not achieved" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("NotAchieved", record.key)}
                value="NotAchieved"
                className="[&.ant-radio-button-wrapper-checked]:bg-danger-500 [&.ant-radio-button-wrapper-checked:before]:bg-danger-600 [&.ant-radio-button-wrapper-checked]:border-danger-600 [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper-checked_.anticon]:text-white [&.ant-radio-button-wrapper-checked_.anticon_path]:stroke-danger-500 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <NotAchieved className="absolute inset-0 w-4 h-4 m-auto transition-colors rounded-full opacity-50 text-danger-500 anticon" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Working on" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("WorkingOn", record.key)}
                value="WorkingOn"
                className="shrink-0 [&.ant-radio-button-wrapper-checked]:bg-primary-500 [&.ant-radio-button-wrapper-checked:before]:bg-primary-600 [&.ant-radio-button-wrapper-checked]:border-primary-600 [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper-checked_.anticon]:text-white [&.ant-radio-button-wrapper-checked_.anticon_path:last-child]:fill-primary-500 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <WorkingOn className="absolute inset-0 w-4 h-4 m-auto transition-colors rounded-full opacity-50 text-primary-500 anticon" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Completed" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("Completed", record.key)}
                value="Completed"
                className="[&.ant-radio-button-wrapper-checked]:bg-success-500 [&.ant-radio-button-wrapper-checked:before]:bg-success-600 [&.ant-radio-button-wrapper-checked]:border-success-600 [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper-checked_.anticon]:text-white  [&.ant-radio-button-wrapper-checked_.anticon_path:first-child]:fill-white [&.ant-radio-button-wrapper-checked_.anticon_path:last-child]:stroke-success-500 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <Completed className="absolute inset-0 w-4 h-4 m-auto transition-colors rounded-full opacity-50 anticon text-success-500" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Achieved" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("Achieved", record.key)}
                value="Achieved"
                className="[&.ant-radio-button-wrapper-checked]:bg-yellow-400 [&.ant-radio-button-wrapper-checked:before]:bg-yellow-600 [&.ant-radio-button-wrapper-checked]:border-yellow-600 [&.ant-radio-button-wrapper-checked_svg_path]:fill-white [&.ant-radio-button-wrapper-checked_svg_path]:stroke-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <Achieved className="absolute inset-0 w-4 h-4 m-auto text-yellow-400 transition-colors opacity-50 -top-px anticon" />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
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
          menu={{ items: items }}
          trigger={["click"]}
          rootClassName="w-40"
        >
          <Button
            className="absolute right-0 top-2.5"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const rowSelection: TableRowSelection<DevProgrammeDataType> = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
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
    setSelectedRowKeys([]);
  };

  const notAchieved = () => {
    handleAction(selectedRowKeys, "marked as not achieved", "participant");
  };

  const workingOn = () => {
    handleAction(selectedRowKeys, "marked as working on", "participant");
  };

  const completed = () => {
    handleAction(selectedRowKeys, "marked as completed", "participant");
  };

  const achieved = () => {
    handleAction(selectedRowKeys, "marked as achieved", "participant");
  };

  const notStarted = () => {
    handleAction(selectedRowKeys, "marked as not started", "participant");
  };

  return (
    <Modal
      title={
        <Title level={5}>
          <div className="flex items-center gap-2 mb-0.5">
            {rowData !== null && (
              <Tooltip title={`Level ${rowData.level} · ${rowData.skill}`}>
                <div className="inline-flex min-w-0 max-w-[calc(100%-9rem)]">
                  <div className="whitespace-nowrap">Level {rowData.level}</div>
                  <div className="mx-1.5">·</div>
                  <div className="truncate">{rowData.skill}</div>
                </div>
              </Tooltip>
            )}
          </div>
          <div className="text-sm font-normal text-subtitle">
            Select participants and mark their progress for this skill
          </div>
        </Title>
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose={true}
      className="w-full max-w-[52rem]"
      style={{ top: 20 }}
    >
      <div>
        <Content className="pb-2 bg-white">
          <div className="relative">
            <TableActions isVisible={selectedRowKeys.length > 0}>
              <div className="font-medium whitespace-nowrap -ml-0.5">
                {selectedRowKeys.length} selected
              </div>
              <div className="text-subtitle">|</div>
              <div className="flex items-center gap-3 mr-2">
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={notStarted}
                >
                  <div className="flex items-center gap-1.5">
                    <MinusCircleFilled className="text-neutral-400" />
                    <span className="font-medium">Not started</span>
                  </div>
                </Button>
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={notAchieved}
                >
                  <div className="flex items-center gap-1.5">
                    <CloseCircleFilled className="text-danger-500" />
                    <span className="font-medium">Not achieved</span>
                  </div>
                </Button>
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={workingOn}
                >
                  <div className="flex items-center gap-1.5">
                    <PlayCircleFilled className="text-primary-500" />
                    <span className="font-medium">Working on</span>
                  </div>
                </Button>
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={completed}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircleFilled className="text-success-500" />
                    <span className="font-medium">Completed</span>
                  </div>
                </Button>
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={achieved}
                >
                  <div className="flex items-center gap-1.5">
                    <StarFilled className="text-yellow-400" />
                    <span className="font-medium">Achieved</span>
                  </div>
                </Button>
                <div className="text-neutral-400">|</div>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  className="w-40"
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
              rowSelection={rowSelection}
              size="small"
              columns={columns}
              dataSource={data}
              pagination={false}
              className="ant-table-sticky ant-table-modal-scroll-y ant-table-bg-reset [&_th:nth-child(3)]:pl-4 [&_td:nth-child(3)]:!pl-3.5"
              scroll={{ y: 0 }}
            />
          </div>
        </Content>
      </div>
    </Modal>
  );
};

export default DevProgrammeSkillModal;
