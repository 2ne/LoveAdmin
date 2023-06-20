import React, { useState } from "react";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownloadOutlined,
  EllipsisOutlined,
  MinusCircleOutlined,
  PlayCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Button,
  Table,
  Select,
  Progress,
  Radio,
} from "antd";
import type { TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface DataType {
  key: React.Key;
  skill: string;
  levelValue: number;
  participants: number;
  progress: number;
}

interface ExpandedDataType {
  key: React.Key;
  name: string;
  progress: number;
}

const DevProgrammeModal: React.FC = () => {
  const [radioGroupValue, setRadioGroupValue] = useState<string | null>(null);

  const onRadioChange = (value: string) => {
    setRadioGroupValue((prevValue) => (prevValue === value ? null : value));
  };

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        defaultSortOrder: "ascend",
        width: 400,
      },
      {
        title: "Progress",
        dataIndex: "progress",
        key: "progress",
        sorter: (a, b) => a.progress - b.progress,
        render: () => (
          <div className="pr-8">
            <Radio.Group buttonStyle="solid" value={radioGroupValue}>
              <Radio.Button
                onClick={() => onRadioChange("NotAchieved")}
                value="NotAchieved"
                className="[&.ant-radio-button-wrapper-checked]:bg-danger-500 [&.ant-radio-button-wrapper-checked:before]:bg-danger-600 [&.ant-radio-button-wrapper-checked]:border-danger-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
              >
                <div className="flex items-center gap-2 -ml-1">
                  <CloseCircleFilled className="text-danger-500" />
                  <span>Not achieved</span>
                </div>
              </Radio.Button>
              <Radio.Button
                onClick={() => onRadioChange("WorkingOn")}
                value="WorkingOn"
                className="[&.ant-radio-button-wrapper-checked]:bg-primary-500 [&.ant-radio-button-wrapper-checked:before]:bg-primary-600 [&.ant-radio-button-wrapper-checked]:border-primary-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
              >
                <div className="flex items-center gap-2 -ml-1">
                  <PlayCircleFilled className="text-primary-500" />
                  <span>Working on</span>
                </div>
              </Radio.Button>
              <Radio.Button
                onClick={() => onRadioChange("Completed")}
                value="Completed"
                className="[&.ant-radio-button-wrapper-checked]:bg-success-500 [&.ant-radio-button-wrapper-checked:before]:bg-success-600 [&.ant-radio-button-wrapper-checked]:border-success-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
              >
                <div className="flex items-center gap-2 -ml-1">
                  <CheckCircleFilled className="text-success-500" />
                  <span>Completed</span>
                </div>
              </Radio.Button>
              <Radio.Button
                onClick={() => onRadioChange("Achieved")}
                value="Achieved"
                className="[&.ant-radio-button-wrapper-checked]:bg-yellow-500 [&.ant-radio-button-wrapper-checked:before]:bg-yellow-600 [&.ant-radio-button-wrapper-checked]:border-yellow-600 [&.ant-radio-button-wrapper-checked_svg]:text-white"
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
      {
        title: "",
        align: "right",
        key: "operation",
        render: () => (
          <Button
            type="text"
            size="small"
            icon={<EllipsisOutlined className="text-neutral-500" />}
          ></Button>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        name: "James Toone",
        progress: 70,
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{ ...rowSelectionExpand }}
        size="small"
      />
    );
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      render: (text: string) => <a>{text}</a>,
      width: 720,
    },
    {
      title: "Level",
      dataIndex: "levelValue",
      key: "level",
      width: 340,
      sorter: (a, b) => a.levelValue - b.levelValue,
      defaultSortOrder: "ascend",
      render: (levelValue: number, record: DataType) => (
        <div>
          <div>Level {levelValue}</div>
          <div className="text-neutral-500">
            {record.participants} participants
          </div>
        </div>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      width: 340,
      sorter: (a, b) => a.progress - b.progress,
      render: (progress: number, record: DataType) => (
        <div className="pr-8">
          <Progress
            percent={record.progress}
            size="small"
            className="[&_.ant-progress-bg]:bg-primary-500"
          />
        </div>
      ),
    },
    {
      title: "",
      align: "right",
      key: "operation",
      render: () => (
        <Button
          type="text"
          size="small"
          icon={<EllipsisOutlined className="text-neutral-500" />}
        ></Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      skill: "Enter the water safely",
      levelValue: 1,
      participants: 7,
      progress: 70,
    },
    {
      key: "2",
      skill:
        "Move forward for a distance of 5 metres, feet may be on or off the floor",
      levelValue: 1,
      participants: 7,
      progress: 60,
    },
    {
      key: "3",
      skill:
        "Move backwards for a distance of 5 metres, feet may be on or off the floor",
      levelValue: 1,
      participants: 7,
      progress: 30,
    },
    {
      key: "4",
      skill:
        "Move sideways for a distance of 5 metres, feet may be on or off the floor",
      levelValue: 1,
      participants: 7,
      progress: 80,
    },
    {
      key: "5",
      skill: "Scoop the water and wash the face",
      levelValue: 1,
      participants: 7,
      progress: 20,
    },
    {
      key: "6",
      skill: "Be comfortable with water showered from overhead",
      levelValue: 1,
      participants: 7,
      progress: 10,
    },
    {
      key: "7",
      skill:
        "Move from a flat floating position on the back and return to standing",
      levelValue: 1,
      participants: 7,
      progress: 40,
    },
    {
      key: "8",
      skill:
        "Move from a flat floating position on the front and return to standing",
      levelValue: 1,
      participants: 7,
      progress: 40,
    },
    {
      key: "9",
      skill: "Push and glide in a flat position on the front from a wall",
      levelValue: 2,
      participants: 14,
      progress: 10,
    },
    {
      key: "10",
      skill: "Push and glide in a flat position on the back from a wall",
      levelValue: 2,
      participants: 14,
      progress: 40,
    },
    {
      key: "11",
      skill: "Give examples of two pool rules",
      levelValue: 2,
      participants: 14,
      progress: 40,
    },
    {
      key: "12",
      skill: "Exit the water safely",
      levelValue: 2,
      participants: 14,
      progress: 40,
    },
  ];

  const rowSelectionExpand: TableRowSelection<ExpandedDataType> = {
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
              <Option value="NotStarted" label="Not started">
                <div className="flex items-center gap-2.5">
                  <MinusCircleOutlined className="text-neutral-500" />
                  <span>Not started</span>
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
              className="ant-table-sticky ant-table-bg-reset"
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
