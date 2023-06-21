import React, { useState } from "react";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  MailOutlined,
  MinusCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Table,
  Dropdown,
  Menu,
  Modal,
  Radio,
} from "antd";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { DevProgrammeDataType } from "./dev-programme";
const { Content } = Layout;
const { Title } = Typography;

interface DevProgrammeParticipantsModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  rowData: DevProgrammeDataType;
}

interface DataType {
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

  const [radioGroupValue, setRadioGroupValue] = useState<string | null>(null);

  const onRadioChange = (value: string) => {
    setRadioGroupValue((prevValue) => (prevValue === value ? null : value));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Participant",
      dataIndex: "participant",
      key: "participant",
      ellipsis: true,
      sorter: (a, b) => a.participant.length - b.participant.length,
      render: (text: string) => <a>{text}</a>,
      width: 210,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: () => (
        <div>
          <Radio.Group
            buttonStyle="solid"
            value={radioGroupValue}
            className="flex whitespace-nowrap"
          >
            <Radio.Button
              onClick={() => onRadioChange("NotAchieved")}
              value="NotAchieved"
              className="[&.ant-radio-button-wrapper-checked]:bg-danger-500 [&.ant-radio-button-wrapper-checked:before]:bg-danger-600 [&.ant-radio-button-wrapper-checked]:border-danger-600 [&.ant-radio-button-wrapper-checked_svg]:text-white w-full"
            >
              <div className="flex items-center gap-2 -ml-1">
                <CloseCircleFilled className="text-danger-500" />
                <span>Not achieved</span>
              </div>
            </Radio.Button>
            <Radio.Button
              onClick={() => onRadioChange("WorkingOn")}
              value="WorkingOn"
              className="[&.ant-radio-button-wrapper-checked]:bg-primary-500 [&.ant-radio-button-wrapper-checked:before]:bg-primary-600 [&.ant-radio-button-wrapper-checked]:border-primary-600 [&.ant-radio-button-wrapper-checked_svg]:text-white w-full"
            >
              <div className="flex items-center gap-2 -ml-1">
                <PlayCircleFilled className="text-primary-500" />
                <span>Working on</span>
              </div>
            </Radio.Button>
            <Radio.Button
              onClick={() => onRadioChange("Completed")}
              value="Completed"
              className="[&.ant-radio-button-wrapper-checked]:bg-success-500 [&.ant-radio-button-wrapper-checked:before]:bg-success-600 [&.ant-radio-button-wrapper-checked]:border-success-600 [&.ant-radio-button-wrapper-checked_svg]:text-white w-full"
            >
              <div className="flex items-center gap-2 -ml-1">
                <CheckCircleFilled className="text-success-500" />
                <span>Completed</span>
              </div>
            </Radio.Button>
            <Radio.Button
              onClick={() => onRadioChange("Achieved")}
              value="Achieved"
              className="[&.ant-radio-button-wrapper-checked]:bg-yellow-500 [&.ant-radio-button-wrapper-checked:before]:bg-yellow-600 [&.ant-radio-button-wrapper-checked]:border-yellow-600 [&.ant-radio-button-wrapper-checked_svg]:text-white w-full"
            >
              <div className="flex items-center gap-2 -ml-1">
                <StarFilled className="text-yellow-500" />
                <span>Achieved</span>
              </div>
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
              className="ant-table-sticky"
            />
          </div>
        </Content>
      </div>
    </Modal>
  );
};

export default DevProgrammeParticipantsModal;
