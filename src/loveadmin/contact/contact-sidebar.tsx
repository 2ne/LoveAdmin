import { PlusOutlined } from "@ant-design/icons";
import { Collapse, Button } from "antd";
import React, { ReactElement } from "react";
const { Panel } = Collapse;

function ContactSidebar(): ReactElement {
  return (
    <Collapse
      defaultActiveKey={["1"]}
      size="small"
      className="rounded-none !border-neutral-200 !border-l-0 !border-t-0 !border-r-0"
    >
      <Panel
        header="Notes"
        extra={
          <Button
            type="primary"
            size="small"
            className="-mr-1.5"
            icon={<PlusOutlined />}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            Add note
          </Button>
        }
        key="1"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
      >
        <div className="[&>*:not(:last-child)]:mb-5 mb-2">
          <div className="space-y-1.5">
            <div>
              This is some note text. I am not sure how long a note would be but
              this is just a guess.
            </div>
            <div className="text-neutral-400">James Toone · 7 Feb 09:59</div>
          </div>
          <div className="space-y-1.5">
            <div>
              This is some note text. I am not sure how long a note would be but
              this is just a guess.
            </div>
            <div className="text-neutral-400">James Toone · 7 Feb 09:59</div>
          </div>
        </div>
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
        header="Timeline"
        key="7"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-[calc(0.5rem+2px)] [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
    </Collapse>
  );
}

export default ContactSidebar;
