import { PlusOutlined } from "@ant-design/icons";
import { Collapse, Button, Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import Notes from "./notes";
import AddNoteModal from "./notes-modal";
import ChangeLog from "./change-log";
const { Panel } = Collapse;

function ContactSidebar(): ReactElement {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddNoteClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Collapse
        defaultActiveKey={["1"]}
        size="small"
        className="rounded-none pt-0.5 !border-neutral-200 !border-l-0 !border-t-0 !border-r-0"
      >
        <Panel
          header={
            <>
              Notes
              <span className="text-subtitle">
                <span className="mx-1.5">·</span>1
              </span>
            </>
          }
          key="1"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
          extra={
            <>
              <Tooltip title="Add note" placement="bottomRight">
                <Button
                  type="primary"
                  size="small"
                  className="-mr-1.5"
                  icon={<PlusOutlined />}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddNoteClick();
                  }}
                ></Button>
              </Tooltip>
            </>
          }
        >
          <Notes />
        </Panel>
        <Panel
          header="Consents"
          key="2"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
        <Panel
          header="Forms"
          key="3"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
        <Panel
          header="Shared files"
          key="4"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
        <Panel
          header="Product invitations"
          key="5"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
        <Panel
          header="Roles"
          key="6"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
        <Panel
          header="Change log"
          key="7"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
        >
          <ChangeLog />
        </Panel>
      </Collapse>
      <AddNoteModal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </>
  );
}

export default ContactSidebar;
