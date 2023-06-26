import React, { useState } from "react";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  CreditCardOutlined,
  DownOutlined,
  DownloadOutlined,
  MailOutlined,
  MinusCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
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
} from "antd";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { DevProgrammeDataType as ImportedDevProgrammeDataType } from "./dev-programme";
const { Content } = Layout;
const { Title } = Typography;

interface DevProgrammeParticipantsModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  rowData: ImportedDevProgrammeDataType;
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

const DevProgrammeParticipantsModal: React.FC<
  DevProgrammeParticipantsModalProps
> = ({ visible, handleOk, handleCancel, rowData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showKey, setShowKey] = useState(false);
  const [progressStatus, setProgressStatus] = useState<
    Record<string, string | null>
  >(dataToProgressStatus(data));

  const onRadioChange = (value: string, key: React.Key) => {
    setProgressStatus((prevStatus) => ({
      ...prevStatus,
      [key.toString()]: prevStatus[key.toString()] === value ? null : value,
    }));
  };

  const columns: ColumnsType<DevProgrammeDataType> = [
    {
      title: "Participant",
      dataIndex: "participant",
      key: "participant",
      ellipsis: true,
      sorter: (a, b) => a.participant.localeCompare(b.participant),
      render: (text: string) => <a>{text}</a>,
      width: 320,
      filterSearch: true,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      filters: [
        { text: "Not achieved", value: "notAchieved" },
        { text: "Working on", value: "workingOn" },
        { text: "Completed", value: "completed" },
        { text: "Achieved", value: "achieved" },
        { text: "Not started", value: "notStarted" },
      ],
      onFilter: (value, record) =>
        record.progress.indexOf(value as string) === 0,
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
                <CloseCircleFilled className="absolute inset-0 transition-colors opacity-60 text-danger-500 place-content-center" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Working on" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("WorkingOn", record.key)}
                value="WorkingOn"
                className="[&.ant-radio-button-wrapper-checked]:bg-primary-500 [&.ant-radio-button-wrapper-checked:before]:bg-primary-600 [&.ant-radio-button-wrapper-checked]:border-primary-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <PlayCircleFilled className="absolute inset-0 transition-colors opacity-60 text-primary-500 place-content-center" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Completed" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("Completed", record.key)}
                value="Completed"
                className="[&.ant-radio-button-wrapper-checked]:bg-success-500 [&.ant-radio-button-wrapper-checked:before]:bg-success-600 [&.ant-radio-button-wrapper-checked]:border-success-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <CheckCircleFilled className="absolute inset-0 transition-colors opacity-60 text-success-500 place-content-center" />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Achieved" rootClassName="pointer-events-none">
              <Radio.Button
                onClick={() => onRadioChange("Achieved", record.key)}
                value="Achieved"
                className="[&.ant-radio-button-wrapper-checked]:bg-yellow-500 [&.ant-radio-button-wrapper-checked:before]:bg-yellow-600 [&.ant-radio-button-wrapper-checked]:border-yellow-600 [&.ant-radio-button-wrapper-checked_svg]:text-white [&.ant-radio-button-wrapper-checked_.anticon]:opacity-100 [&.ant-radio-button-wrapper:hover_.anticon]:!opacity-100 border-neutral-200 hover:border-neutral-300"
              >
                <StarFilled className="absolute inset-0 text-yellow-500 transition-colors opacity-60 place-content-center" />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </div>
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

  const removeAllSelected = () => {
    setSelectedRowKeys([]);
  };

  const notAchieved = () => {
    setSelectedRowKeys([]);
  };
  const workingOn = () => {
    setSelectedRowKeys([]);
  };
  const completed = () => {
    setSelectedRowKeys([]);
  };
  const achieved = () => {
    setSelectedRowKeys([]);
  };
  const notStarted = () => {
    setSelectedRowKeys([]);
  };

  return (
    <Modal
      title={
        <Title level={5}>
          <div className="flex items-center gap-2 mb-0.5">
            <Tooltip title={`Level ${rowData.level} · ${rowData.skill}`}>
              <div className="inline-flex min-w-0 max-w-[calc(100%-9rem)]">
                <div className="whitespace-nowrap">Level {rowData.level}</div>
                <div className="mx-1.5">·</div>
                <div className="truncate">{rowData.skill}</div>
              </div>
            </Tooltip>
            <div className="whitespace-nowrap relative top-px inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-primary-100/50">
              <div className="p-px w-1.5 h-1.5 rounded-full bg-primary-500"></div>
              <div className="py-px text-primary-600">Progress 80%</div>
            </div>
          </div>
          <div className="text-sm font-normal text-neutral-500">
            Select participants and set their progress for this skill...
          </div>
        </Title>
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={false}
      className="w-full max-w-[49rem]"
    >
      <div>
        <Content className="pb-2 bg-white">
          <div className="relative">
            <div
              className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-neutral-50 h-[38px] top-0 ml-6 transition-all pr-4 pl-4 z-20 flex items-center -mb-[38px] " ${
                selectedRowKeys.length > 0
                  ? " opacity-100 "
                  : " opacity-0 pointer-events-none "
              }`}
            >
              <div className="font-medium whitespace-nowrap">
                {selectedRowKeys.length} selected
              </div>
              <div className="mx-3 text-neutral-500">|</div>
              <div className="flex items-center gap-3.5">
                <Button
                  size="small"
                  type="text"
                  className="px-0 hover:bg-transparent hover:underline"
                  onClick={notAchieved}
                >
                  <div className="flex items-center gap-1.5">
                    <CloseCircleOutlined />
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
                    <PlayCircleOutlined />
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
                    <CheckCircleOutlined />
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
                    <StarOutlined />
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
                    <MinusCircleOutlined />
                    <span>Not started</span>
                  </div>
                </Button>
                <Dropdown
                  placement="bottomLeft"
                  getPopupContainer={() => document.body}
                  overlayStyle={{ position: "fixed" }}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <MailOutlined className="relative mr-3 top-px" />
                        Message
                      </Menu.Item>
                      <Menu.Item>
                        <CreditCardOutlined className="mr-3" /> Request payment
                      </Menu.Item>
                      <Menu.Item>
                        <PlusOutlined className="mr-3" />
                        Add to class
                      </Menu.Item>
                      <Menu.Item>
                        <ArrowRightOutlined className="mr-3" />
                        Move class
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
            </div>
            <Table
              rowSelection={rowSelection}
              size="small"
              columns={columns}
              dataSource={data}
              pagination={false}
              className="ant-table-sticky ant-table-modal-scroll-y"
              scroll={{ y: 0 }}
              footer={() => (
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end pr-0.5">
                    {showKey ? (
                      <>
                        <Button onClick={() => setShowKey(false)} size="small">
                          Hide key
                        </Button>
                        <div className="flex gap-4 ml-2 text-neutral-700">
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
                      </>
                    ) : (
                      <Button onClick={() => setShowKey(true)} size="small">
                        Show key
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <Button size="small">Edit columns</Button>
                    <Button
                      size="small"
                      icon={<DownloadOutlined className="-mr-0.5" />}
                    >
                      Export
                    </Button>
                  </div>
                </div>
              )}
            />
          </div>
        </Content>
      </div>
    </Modal>
  );
};

export default DevProgrammeParticipantsModal;
