import React, { useState } from "react";
import {
  MailOutlined,
  PlusOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Typography, Button, Table, Dropdown, Menu, Modal } from "antd";
import { ColumnsType } from "antd/es/table/interface";
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
  name: string;
}

const data = [
  {
    key: "1",
    participant: "James Toone",
  },
];

const DevProgrammeParticipantsModal: React.FC<
  DevProgrammeParticipantsModalProps
> = ({ visible, handleOk, handleCancel, rowData }) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    record: DataType
  ) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Participant",
      dataIndex: "participant",
      key: "participant",
      ellipsis: true,
      sorter: (a, b) => a.participant.length - b.participant.length,
      render: (text: string) => <a>{text}</a>,
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const removeAllSelected = () => {
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
            Select participants and set their progress towards this skill...
          </div>
        </Title>
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={false}
      className="w-full max-w-2xl"
    >
      <div>
        <Content className="pb-2 bg-white">
          <div className="relative">
            <div
              className={`sticky overflow-x-auto overflow-y-hidden scrollbar-thin-x bg-neutral-50 h-[38px] top-0 ml-6 transition-all z-20 flex items-center -mb-[38px] " ${
                hasSelected
                  ? " opacity-100 "
                  : " opacity-0 pointer-events-none "
              }`}
            >
              <div className="flex items-center gap-4 ml-4">
                <Button
                  size="small"
                  type="text"
                  icon={<MailOutlined className="relative top-px" />}
                  className="px-0 hover:bg-transparent hover:underline"
                >
                  Message account owner
                </Button>
                <Button
                  size="small"
                  type="text"
                  icon={<PlusOutlined />}
                  className="px-0 hover:bg-transparent hover:underline"
                >
                  Add beneficiary to...
                </Button>
                <Button
                  size="small"
                  type="text"
                  icon={<UsergroupAddOutlined />}
                  className="px-0 hover:bg-transparent hover:underline"
                >
                  Invite beneficiary to...
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
              onRow={(record) => ({
                onContextMenu: (event) => handleContextMenu(event, record),
              })}
            />
          </div>
        </Content>
      </div>
      {contextMenuVisible && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={hideContextMenu}>
                <MailOutlined className="mr-3" /> Message account owner
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2" onClick={hideContextMenu}>
                <PlusOutlined className="mr-3" /> Add beneficiary to...
              </Menu.Item>
              <Menu.Item key="3" onClick={hideContextMenu}>
                <UserAddOutlined className="mr-3" /> Invite beneficiary to...
              </Menu.Item>
            </Menu>
          }
          open={contextMenuVisible}
          trigger={["contextMenu"]}
          autoAdjustOverflow
          destroyPopupOnHide
          getPopupContainer={() => document.body}
          overlayStyle={{ position: "fixed" }}
          onOpenChange={(visible) => !visible && hideContextMenu()}
        >
          <div
            style={{
              position: "fixed",
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
              width: "1px",
              height: "1px",
            }}
          ></div>
        </Dropdown>
      )}
    </Modal>
  );
};

export default DevProgrammeParticipantsModal;
