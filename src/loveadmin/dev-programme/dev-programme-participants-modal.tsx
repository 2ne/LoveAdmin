import React, { useState } from "react";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  MinusCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
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
}

const data = [
  {
    key: "1",
    participant: "James Toone",
    progress: "completed",
  },
  {
    key: "2",
    participant: "Sarah Johnson",
    progress: "completed",
  },
  {
    key: "3",
    participant: "Robert Smith",
    progress: "completed",
  },
  {
    key: "4",
    participant: "Jessica Davis",
    progress: "completed",
  },
  {
    key: "5",
    participant: "Michael Miller",
    progress: "completed",
  },
  {
    key: "6",
    participant: "Emily Clark",
    progress: "completed",
  },
  {
    key: "7",
    participant: "John White",
    progress: "completed",
  },
  {
    key: "8",
    participant: "Emma Lewis",
    progress: "completed",
  },
  {
    key: "9",
    participant: "William Green",
    progress: "completed",
  },
  {
    key: "10",
    participant: "Sophia Brown",
    progress: "completed",
  },
  {
    key: "11",
    participant: "Jacob Black",
    progress: "completed",
  },
  {
    key: "12",
    participant: "Olivia Taylor",
    progress: "completed",
  },
  {
    key: "13",
    participant: "Lucas Turner",
    progress: "completed",
  },
  {
    key: "14",
    participant: "Mia Anderson",
    progress: "completed",
  },
];

const DevProgrammeParticipantsModal: React.FC<
  DevProgrammeParticipantsModalProps
> = ({ visible, handleOk, handleCancel, rowData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [progressStatus, setProgressStatus] = useState<
    Record<string, string | null>
  >({});

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
      sorter: (a, b) => a.participant.length - b.participant.length,
      render: (text: string) => <a>{text}</a>,
      width: 320,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (_, record) => (
        <div>
          <Radio.Group
            buttonStyle="solid"
            value={progressStatus[record.key.toString()]}
            className="flex whitespace-nowrap ant-radio-group-progress"
          >
            <Radio.Button
              onClick={() => onRadioChange("NotAchieved", record.key)}
              value="NotAchieved"
              className="[&.ant-radio-button-wrapper-checked]:bg-danger-500 [&.ant-radio-button-wrapper-checked:before]:bg-danger-600 [&.ant-radio-button-wrapper-checked]:border-danger-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
            >
              <CloseCircleFilled className="text-danger-500" />
            </Radio.Button>

            <Radio.Button
              onClick={() => onRadioChange("WorkingOn", record.key)}
              value="WorkingOn"
              className="[&.ant-radio-button-wrapper-checked]:bg-primary-500 [&.ant-radio-button-wrapper-checked:before]:bg-primary-600 [&.ant-radio-button-wrapper-checked]:border-primary-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
            >
              <PlayCircleFilled className="text-primary-500" />
            </Radio.Button>

            <Radio.Button
              onClick={() => onRadioChange("Completed", record.key)}
              value="Completed"
              className="[&.ant-radio-button-wrapper-checked]:bg-success-500 [&.ant-radio-button-wrapper-checked:before]:bg-success-600 [&.ant-radio-button-wrapper-checked]:border-success-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
            >
              <CheckCircleFilled className="text-success-500" />
            </Radio.Button>

            <Radio.Button
              onClick={() => onRadioChange("Achieved", record.key)}
              value="Achieved"
              className="[&.ant-radio-button-wrapper-checked]:bg-yellow-500 [&.ant-radio-button-wrapper-checked:before]:bg-yellow-600 [&.ant-radio-button-wrapper-checked]:border-yellow-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
            >
              <StarFilled className="text-yellow-500" />
            </Radio.Button>
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
          <div className="mb-0.5">
            Level {rowData.level}
            <span className="mx-1.5">·</span>
            {rowData.skill}
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
      className="w-full max-w-3xl"
    >
      <div>
        <Content className="pb-2 bg-white">
          <div className="relative">
            <div
              className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-neutral-50 h-[38px] top-0 ml-10 transition-all pr-4 z-20 flex items-center -mb-[38px] " ${
                selectedRowKeys.length > 0
                  ? " opacity-100 "
                  : " opacity-0 pointer-events-none "
              }`}
            >
              <div className="font-medium whitespace-nowrap">
                {selectedRowKeys.length} selected
              </div>
              <div className="mx-3 text-neutral-500">|</div>
              <div className="flex items-center gap-4">
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
                <div className="flex items-center justify-end">
                  <div className="font-medium">Key</div>
                  <div className="mx-3 text-neutral-500">|</div>
                  <div className="flex gap-4">
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
