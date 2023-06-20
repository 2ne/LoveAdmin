import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Layout, Typography, Button, Table, Select, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface DataType {
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
  const columns: TableColumnsType<DataType> = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      render: (text: string) => <a>{text}</a>,
      width: 700,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 340,
      sorter: (a, b) => a.level - b.level,
      defaultSortOrder: "ascend",
      render: (level: number) => <div>Level {level}</div>,
    },
    {
      title: "Progress",
      dataIndex: "overallProgress",
      key: "overallProgress",
      width: 340,
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
                  className="h-full bg-yellow-500"
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

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <div className="px-6 py-4">
      <header className="flex items-center mb-6">
        <div>
          <Title level={5} className="flex items-center gap-2 mb-0.5">
            <span>Thursday Beginners Class</span>
            <div className="relative top-px flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-primary-100/50">
              <div className="p-px w-1.5 h-1.5 rounded-full bg-primary-500"></div>
              <div className="py-px text-primary-600">Progress 30%</div>
            </div>
          </Title>
          <Text className="text-sm text-neutral-500">
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
            >
              <Option value="1" label="Level 1">
                Level 1
              </Option>
              <Option value="2" label="Level 2">
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
            <Table
              columns={columns}
              dataSource={data}
              size="small"
              pagination={false}
              rowSelection={{ ...rowSelection }}
              className="ant-table-sticky ant-table-bg-reset"
            />
          </div>
          <footer className="fixed gap-2 bottom-0 flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
            <div className="flex items-center gap-2 ml-auto">
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </div>
      <footer className="fixed gap-2 left-0 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
        <div className="flex items-center gap-2 ml-auto">
          <Button icon={<DownloadOutlined />}>Export</Button>
        </div>
      </footer>
    </div>
  );
};

export default DevProgrammeModal;
