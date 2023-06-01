import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CheckOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Collapse, Popover, Button, Form, Input } from "antd";
import React, { ReactElement, useState } from "react";
const { Panel } = Collapse;

function ContactDetails(): ReactElement {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [firstName, setName] = useState("James");

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpen(open);
  };

  const onFinish = (values: { firstName: React.SetStateAction<string> }) => {
    setName(values.firstName);
    hide();
  };

  const editDetailContent = (
    <div className="p-1 pb-2 min-w-[14.5rem]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="flex items-end gap-2 [&_.ant-form-item-has-error+.ant-form-item_.ant-btn]:top-[-1.375rem]"
        requiredMark={false}
      >
        <Form.Item
          name="firstName"
          initialValue={firstName}
          label="First name"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
          ></Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Collapse
      defaultActiveKey={["1"]}
      size="small"
      className="-mx-px rounded-none !border-neutral-200"
    >
      <Panel
        header="Contact details"
        key="1"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <div className="-mt-1.5 space-y-1">
          <Popover
            content={editDetailContent}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="right"
          >
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-neutral-500">
                  First name
                </div>
                <div>{firstName}</div>
              </div>
            </Button>
          </Popover>
          <Button type="text" block className="ant-btn-input">
            <div className="flex-grow text-left">
              <div className="text-xs mb-0.5 text-neutral-500">Last name</div>
              <div>Toone</div>
            </div>
          </Button>
          <Button type="text" block className="ant-btn-input">
            <div className="flex-grow text-left">
              <div className="text-xs mb-0.5 text-neutral-500">
                Date of birth
              </div>
              <div>
                14 April 1986
                <span className="text-neutral-500">
                  <span className="mx-1.5">·</span>37 years old
                </span>
              </div>
            </div>
          </Button>
          <Button type="text" block className="ant-btn-input">
            <div className="flex-grow text-left">
              <div className="text-xs mb-0.5 text-neutral-500">Gender</div>
              <div>Male</div>
            </div>
          </Button>
          <Button type="text" block className="ant-btn-input">
            <div className="flex-grow text-left">
              <div className="text-xs mb-0.5 text-neutral-500">Email</div>
              <div>jamestoone@me.com</div>
            </div>
          </Button>
          <Button type="text" block className="ant-btn-input">
            <div className="flex-grow text-left">
              <div className="text-xs mb-0.5 text-neutral-500">
                Contact number
              </div>
              <div>07994884991</div>
            </div>
          </Button>
        </div>
      </Panel>
      <Panel
        header="Address"
        key="2"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
      <Panel
        header={
          <>
            Manadate
            <span className="text-neutral-500">
              <span className="mx-1.5">·</span>Active
            </span>
          </>
        }
        extra={<CheckCircleOutlined className="-mr-1 text-primary-500" />}
        key="3"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
      <Panel
        header={
          <>
            Medical
            <span className="text-neutral-500">
              <span className="mx-1.5">·</span>2 conditions
            </span>
          </>
        }
        extra={<WarningOutlined className="-mr-1 text-danger-500" />}
        key="4"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
      <Panel
        header="Emergency contacts"
        key="5"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
      <Panel
        header="Account owner"
        key="6"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
      <Panel
        header={
          <>
            Linked accounts
            <span className="text-neutral-500">
              <span className="mx-1.5">·</span>2
            </span>
          </>
        }
        key="7"
        className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
      >
        <p>1</p>
      </Panel>
    </Collapse>
  );
}

export default ContactDetails;
