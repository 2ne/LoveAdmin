import React, { useState } from "react";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  DownloadOutlined,
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
  Select,
  Tooltip,
  notification,
  Segmented,
  Popover,
} from "antd";
import type { TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import DevProgrammeParticipantsModal from "./dev-programme-participants-modal";
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export interface DevProgrammeDataType {
  key: React.Key;
  skill: string;
  level: number;
  overallProgress: number;
  notAchieved: number;
  workingOn: number;
  completed: number;
  achieved: number;
  notStarted: number;
}

const DevProgrammeModal: React.FC = () => {
  const [selectedRowData, setSelectedRowData] = useState<DevProgrammeDataType>(
    {}
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  const [visible, setVisible] = useState(false);

  const showModal = (rowData: DevProgrammeDataType) => {
    setSelectedRowData(rowData);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
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

  const columns: TableColumnsType<DevProgrammeDataType> = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      render: (text: string, record: DevProgrammeDataType) => (
        <a onClick={() => showModal(record)}>{text}</a>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      sorter: (a, b) => a.level - b.level,
      defaultSortOrder: "ascend",
      render: (level: number) => <div>Level {level}</div>,
    },
    {
      title: "Progress",
      dataIndex: "overallProgress",
      key: "overallProgress",
      sorter: (a, b) => a.overallProgress - b.overallProgress,
      render: (overallProgress, record) => (
        <div className="flex items-center gap-3">
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
  ];

  const data = [
    {
      key: "1",
      skill: "Enter the water safely",
      level: 1,
      notStarted: 10,
      notAchieved: 5,
      workingOn: 15,
      completed: 30,
      achieved: 40,
      overallProgress: 70,
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
      overallProgress: 60,
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
      overallProgress: 30,
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
      overallProgress: 80,
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
      overallProgress: 20,
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
      overallProgress: 10,
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
      overallProgress: 40,
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
      overallProgress: 40,
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
      overallProgress: 10,
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
      overallProgress: 40,
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
      overallProgress: 40,
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
      overallProgress: 40,
    },
  ];

  const rowSelection: TableRowSelection<DevProgrammeDataType> = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const notAchieved = () => {
    setSelectedRowKeys([]);

    notification.open({
      message: "Skill Progress Updated",
      description: (
        <>
          14 participants set to Not Achieved.
          <Button
            type="primary"
            size="small"
            className="absolute top-4 mt-px right-14 !bg-neutral-800 border-neutral-700/25 shadow-none hover:!bg-neutral-700"
          >
            Undo
          </Button>
        </>
      ),
      placement: "top",
    });
  };

  const workingOn = () => {
    setSelectedRowKeys([]);

    notification.open({
      message: "Skill Progress Updated",
      description: (
        <>
          14 participants set to Working On.
          <Button
            type="primary"
            size="small"
            className="absolute top-4 mt-px right-14 !bg-neutral-800 border-neutral-700/25 shadow-none hover:!bg-neutral-700"
          >
            Undo
          </Button>
        </>
      ),
      placement: "bottomRight",
    });
  };

  const completed = () => {
    setSelectedRowKeys([]);

    notification.open({
      message: "Skill Progress Updated",
      description: (
        <>
          14 participants set to Completed.
          <Button
            type="primary"
            size="small"
            className="absolute top-4 mt-px right-14 !bg-neutral-800 border-neutral-700/25 shadow-none hover:!bg-neutral-700"
          >
            Undo
          </Button>
        </>
      ),
      placement: "bottomRight",
    });
  };

  const achieved = () => {
    setSelectedRowKeys([]);

    notification.open({
      message: "Skill Progress Updated",
      description: (
        <>
          14 participants set to Achieved.
          <Button
            type="primary"
            size="small"
            className="absolute top-4 mt-px right-14 !bg-neutral-800 border-neutral-700/25 shadow-none hover:!bg-neutral-700"
          >
            Undo
          </Button>
        </>
      ),
      placement: "bottomRight",
    });
  };

  const notStarted = () => {
    setSelectedRowKeys([]);

    notification.open({
      message: "Skill Progress Updated",
      description: (
        <>
          14 participants set to Not Started.
          <Button
            type="primary"
            size="small"
            className="absolute top-4 mt-px right-14 !bg-neutral-800 border-neutral-700/25 shadow-none hover:!bg-neutral-700"
          >
            Undo
          </Button>
        </>
      ),
      placement: "bottomRight",
    });
  };

  const filteredData = data.filter((item) =>
    selectedLevels.length ? selectedLevels.includes(item.level) : true
  );

  return (
    <div className="px-6 py-4">
      <header className="flex items-center mb-6">
        <div>
          <Title level={5} className="flex items-center gap-2 mb-0.5">
            <span>Thursday Beginners Class</span>
            <div className="relative top-px flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-primary-100/50">
              <div className="p-px w-1.5 h-1.5 rounded-full bg-primary-500"></div>
              <div className="py-px text-primary-600">Progress 35%</div>
            </div>
          </Title>
          <Text className="text-sm text-subtitle">
            <span>9 Feb @ 16:00 - 17:00</span>
            <span className="mx-1.5">·</span>
            <span>Level 1 & 2</span>
            <span className="mx-1.5">·</span>
            <span>14 participants</span>
          </Text>
        </div>
        <div className="flex items-center gap-3.5 ml-auto">
          <div className="relative">
            <Select
              mode="multiple"
              placeholder="Select level..."
              optionLabelProp="label"
              className="min-w-[10rem]"
              rootClassName="ant-select-float"
              popupMatchSelectWidth={true}
              showSearch={false}
              placement="bottomRight"
              value={selectedLevels} // Set the current value
              onChange={setSelectedLevels} // Update the selected levels when the selection changes
            >
              <Option value={1} label="Level 1">
                Level 1
              </Option>
              <Option value={2} label="Level 2">
                Level 2
              </Option>
            </Select>
            <Text className="mt-px absolute h-3 px-1 text-[11px] font-medium leading-3 bg-white pointer-events-none left-2 -top-2">
              Level
            </Text>
          </div>
        </div>
      </header>
      <div>
        <Content className="pb-16 bg-white">
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
              <div className="mx-3 text-subtitle">|</div>
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
              columns={columns}
              dataSource={filteredData}
              size="small"
              pagination={false}
              rowSelection={{ ...rowSelection, selectedRowKeys }}
              className="ant-table-sticky [&_tr>*:last-child]:pl-6"
            />
          </div>
        </Content>
      </div>
      <footer className="font-body fixed gap-2 left-0 flex items-center justify-between bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
        <div className="w-full flex-grow flex items-center justify-start pr-0.5">
          <Popover
            content={<PopoverContent />}
            trigger="click"
            placement="topLeft"
          >
            <Button>Show key</Button>
          </Popover>
        </div>
        <div className="mx-auto">
          <Segmented
            block
            options={["Skill", "Participants"]}
            className="bg-neutral-200/75 w-52"
          />
        </div>
        <div className="flex items-center justify-end flex-grow w-full gap-2">
          <Button>Edit columns</Button>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </div>
      </footer>
      <DevProgrammeParticipantsModal
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        rowData={selectedRowData}
      />
    </div>
  );
};

export default DevProgrammeModal;
