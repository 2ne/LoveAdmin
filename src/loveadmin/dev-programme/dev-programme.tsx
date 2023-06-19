import React, { useState } from "react";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownloadOutlined,
  PlayCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import { Layout, Typography, Button, Table, Select } from "antd";
import type { TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface DataType {
  key: React.Key;
  skill: string;
  level: string;
  progress: string;
}

interface ExpandedDataType {
  key: React.Key;
  name: string;
  progress: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const DevProgrammeModal: React.FC = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Progress", dataIndex: "progress", key: "progress" },
      { title: "Action", key: "operation", render: () => <a>Publish</a> },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Skill", dataIndex: "skill", key: "skill" },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Progress", dataIndex: "progress", key: "progress" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      skill: "Screen",
      level: "iOS",
      progress: "10.3.4.5654",
    });
  }

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
            <div className="relative top-px flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-warning-100/60">
              <div className="p-px w-1.5 h-1.5 rounded-full bg-warning-500"></div>
              <div className="py-px text-warning-600">Progress 30%</div>
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
              placeholder="Select progress..."
              optionLabelProp="label"
              className="min-w-[10rem]"
              rootClassName="ant-select-float"
              popupMatchSelectWidth={true}
              showSearch={false}
              placement="bottomRight"
            >
              <Option value="NotAchieved" label="Not achieved">
                <div className="flex items-center gap-2.5">
                  <CloseCircleFilled className="text-danger-500" />
                  <span>Not achieved</span>
                </div>
              </Option>
              <Option value="WorkingOn" label="Working on">
                <div className="flex items-center gap-2.5">
                  <PlayCircleFilled className="text-primary-500" />
                  <span>Working on</span>
                </div>
              </Option>
              <Option value="Completed" label="Completed">
                <div className="flex items-center gap-2.5">
                  <CheckCircleFilled className="text-success-500" />
                  <span>Completed</span>
                </div>
              </Option>
              <Option value="Achieved" label="Achieved">
                <div className="flex items-center gap-2.5">
                  <StarFilled className="text-yellow-500" />
                  <span>Achieved</span>
                </div>
              </Option>
            </Select>
            <Text className="mt-px absolute h-3 px-1 text-[11px] font-medium leading-3 bg-white pointer-events-none left-2 -top-2">
              Progress
            </Text>
          </div>
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
              <Option value="3" label="Level 3">
                Level 3
              </Option>
              <Option value="4" label="Level 4">
                Level 4
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
              expandable={{ expandedRowRender }}
              dataSource={data}
              size="small"
              pagination={false}
              rowSelection={{ ...rowSelection }}
            />
          </div>
          <footer className="fixed gap-2 bottom-0 flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
            <div className="flex items-center gap-2 ml-auto">
              <Button>Edit columns</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
            </div>
          </footer>
        </Content>
      </div>
      <footer className="fixed gap-2 left-0 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200">
        <div className="flex items-center gap-2 ml-auto">
          <Button>Edit columns</Button>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </div>
      </footer>
    </div>
  );
};

export default DevProgrammeModal;
