import React, { useState } from "react";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EllipsisOutlined,
  MinusCircleFilled,
  PlayCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Table,
  Modal,
  Radio,
  Tooltip,
  notification,
  message,
  Dropdown,
  MenuProps,
} from "antd";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { DevProgrammeParticipantsDataType as ImportedDevProgrammeDataType } from "./dev-programme";
import TableActions from "../../components/table-actions";
const { Content } = Layout;
const { Title } = Typography;

interface DevProgrammeParticipantModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  rowData: ImportedDevProgrammeDataType | null;
}

interface DevProgrammeDataType {
  key: React.Key;
  skill: string;
  progress: string;
}

const data = [
  {
    key: "1",
    skill: "Enter the water safely",
    progress: "achieved",
  },
  {
    key: "2",
    skill:
      "Move forward for a distance of 5 metres, feet may be on or off the floor",
    progress: "achieved",
  },
  {
    key: "3",
    skill:
      "Move backwards for a distance of 5 metres, feet may be on or off the floor",
    progress: "completed",
  },
  {
    key: "4",
    skill:
      "Move sideways for a distance of 5 metres, feet may be on or off the floor",
    progress: "completed",
  },
  {
    key: "5",
    skill: "Scoop the water and wash the face",
    progress: "workingOn",
  },
  {
    key: "6",
    skill: "Be comfortable with water showered from overhead",
    progress: "notAchieved",
  },
  {
    key: "7",
    skill:
      "Move from a flat floating position on the back and return to standing",
    progress: "notStarted",
  },
  {
    key: "8",
    skill:
      "Move from a flat floating position on the front and return to standing",
    progress: "notStarted",
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

const DevProgrammeParticipantModal: React.FC<
  DevProgrammeParticipantModalProps
> = ({ visible, handleOk, handleCancel, rowData }) => {
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
      icon: <StarFilled className="mt-px text-yellow-500" />,
    },
    {
      key: "5",
      type: "divider",
    },
    {
      key: "6",
      label: "Not started",
      icon: <MinusCircleFilled className="mt-px text-neutral-400" />,
    },
  ];

  const columns: ColumnsType<DevProgrammeDataType> = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      ellipsis: true,
      sorter: (a, b) => a.skill.localeCompare(b.skill),
      render: (text: string) => <a className="block pr-3 truncate">{text}</a>,
      width: 360,
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
                className="[&.ant-radio-button-wrapper-checked]:bg-danger-500 [&.ant-radio-button-wrapper-checked:before]:bg-danger-600 [&.ant-radio-button-wrapper-checked]:border-danger-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <CloseCircleFilled className="absolute inset-0 grid transition-colors opacity-50 text-danger-500 place-content-center" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Working on" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("WorkingOn", record.key)}
                value="WorkingOn"
                className="[&.ant-radio-button-wrapper-checked]:bg-primary-500 [&.ant-radio-button-wrapper-checked:before]:bg-primary-600 [&.ant-radio-button-wrapper-checked]:border-primary-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <PlayCircleFilled className="absolute inset-0 grid transition-colors opacity-50 text-primary-500 place-content-center" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Completed" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("Completed", record.key)}
                value="Completed"
                className="[&.ant-radio-button-wrapper-checked]:bg-success-500 [&.ant-radio-button-wrapper-checked:before]:bg-success-600 [&.ant-radio-button-wrapper-checked]:border-success-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <CheckCircleFilled className="absolute inset-0 grid transition-colors opacity-50 text-success-500 place-content-center" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Achieved" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("Achieved", record.key)}
                value="Achieved"
                className="[&.ant-radio-button-wrapper-checked]:bg-yellow-500 [&.ant-radio-button-wrapper-checked:before]:bg-yellow-600 [&.ant-radio-button-wrapper-checked]:border-yellow-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <StarFilled className="absolute inset-0 grid text-yellow-500 transition-colors opacity-50 place-content-center" />
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
            className="absolute right-0 top-1.5"
            type="text"
            icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
            onClick={(e) => e.preventDefault()}
          ></Button>
        </Dropdown>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

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
        icon = <StarFilled className="mt-px text-lg text-yellow-500 w-7" />;
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
    handleAction(selectedRowKeys, "marked as not achieved", "skill");
  };

  const workingOn = () => {
    handleAction(selectedRowKeys, "marked as working on", "skill");
  };

  const completed = () => {
    handleAction(selectedRowKeys, "marked as completed", "skill");
  };

  const achieved = () => {
    handleAction(selectedRowKeys, "marked as achieved", "skill");
  };

  const notStarted = () => {
    handleAction(selectedRowKeys, "marked as not started", "skill");
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
        <StarFilled className="text-yellow-500" />
        <span>Achieved</span>
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <Title level={5}>
          <div className="flex items-center gap-2 mb-0.5">
            {rowData !== null && (
              <Tooltip
                title={`${rowData.participant} · Level ${rowData.level}`}
              >
                <div className="inline-flex min-w-0 max-w-[calc(100%-9rem)]">
                  <div className="truncate">{rowData.participant}</div>
                  <div className="mx-1.5">·</div>
                  <div className="whitespace-nowrap">Level {rowData.level}</div>
                </div>
              </Tooltip>
            )}
          </div>
          <div className="text-sm font-normal text-subtitle">
            Select skills and mark progress for this level...
          </div>
        </Title>
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={false}
      destroyOnClose={true}
      className="w-full max-w-[52rem]"
    >
      <div>
        <Content className="pb-2 bg-white">
          <div className="relative">
            <TableActions isVisible={selectedRowKeys.length > 0}>
              <div className="font-medium whitespace-nowrap -ml-0.5">
                {selectedRowKeys.length} selected
              </div>
              <div className="text-subtitle">|</div>
              <div className="flex items-center gap-4 mr-2">
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={notAchieved}
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
                  onClick={workingOn}
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
                  onClick={completed}
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
                  onClick={achieved}
                >
                  <div className="flex items-center gap-1.5">
                    <StarFilled className="text-yellow-500" />
                    <span>Achieved</span>
                  </div>
                </Button>
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={notStarted}
                >
                  <div className="flex items-center gap-1.5">
                    <MinusCircleFilled className="text-neutral-400" />
                    <span>Not started</span>
                  </div>
                </Button>
              </div>
            </TableActions>
            <Table
              rowSelection={rowSelection}
              size="small"
              columns={columns}
              dataSource={data}
              pagination={false}
              className="ant-table-sticky ant-table-modal-scroll-y ant-table-bg-reset"
              scroll={{ y: 0 }}
            />
          </div>
        </Content>
      </div>
    </Modal>
  );
};

export default DevProgrammeParticipantModal;
