import { PlusOutlined } from "@ant-design/icons";
import { Collapse, Button } from "antd";
import React, { ReactElement, useState } from "react";
import Notes from "./notes";
import AddNoteModal from "./notes-modal";
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
        className="rounded-none !border-neutral-200 !border-l-0 !border-t-0 !border-r-0"
      >
        <Panel
          header={
            <>
              Notes
              <span className="text-neutral-500">
                <span className="mx-1.5">·</span>1
              </span>
            </>
          }
          key="1"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
          extra={
            <>
              <Button
                type="primary"
                size="small"
                className="-mr-1.5"
                icon={<PlusOutlined />}
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddNoteClick();
                }}
              >
                Add note
              </Button>
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
          <p>1</p>
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
