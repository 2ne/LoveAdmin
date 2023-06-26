import {
  CheckCircleOutlined,
  CheckOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  Popover,
  Button,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import React, { ReactElement, useState } from "react";
import AddNoteModal from "./notes-modal";
const { Panel } = Collapse;
const { Title } = Typography;

function ContactDetails(): ReactElement {
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
    message.success("Details updated");
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
    <>
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
                  <div className="text-xs mb-0.5 text-subtitle">First name</div>
                  <div>{firstName}</div>
                </div>
              </Button>
            </Popover>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">Last name</div>
                <div>Toone</div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Date of birth
                </div>
                <div>
                  14 April 1986
                  <span className="text-subtitle">
                    <span className="mx-1.5">·</span>37 years old
                  </span>
                </div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">Gender</div>
                <div>Male</div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">Email</div>
                <div>
                  <a href="mailto:jamestoone@me.com">jamestoone@me.com</a>
                </div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Contact number
                </div>
                <div>
                  <a href="tel:07994884991">07994884991</a>
                </div>
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
              Mandate
              <span className="text-subtitle">
                <span className="mx-1.5">·</span>Active
              </span>
            </>
          }
          extra={<CheckCircleOutlined className="-mr-1 text-primary-500" />}
          key="3"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <div>
            <dl className="px-4 py-3 rounded-md bg-neutral-100">
              <dt className="pb-2 mb-2.5 border-t-0 border-b border-solid border-b-neutral-300/75 border-x-0">
                <Title level={5} className="m-0">
                  GoCardless
                </Title>
              </dt>
              <div className="grid grid-cols-2 gap-x-3">
                <dt className="block">Mandate identifier</dt>
                <dd className="block w-full mb-1.5 text-right">
                  MD000SXP3DNAQ2
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <dt className="block">Status </dt>
                <dd className="block w-full mb-1.5 text-right">Created</dd>
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <dt className="block">Date created</dt>
                <dd className="block w-full mb-1.5 text-right">
                  27 Apr 2023 15:15:07
                </dd>
              </div>
            </dl>
          </div>
        </Panel>
        <Panel
          header={
            <>
              Medical
              <span className="text-subtitle">
                <span className="mx-1.5">·</span>2 conditions
              </span>
            </>
          }
          extra={<WarningOutlined className="-mr-1 text-danger-500" />}
          key="4"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <div className="-mt-1.5 space-y-1">
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Behavioural conditions
                </div>
                <div>ADHD</div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">Allergies</div>
                <div>Very allergic to bee stings</div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input">
              <div className="flex-grow text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Medical notes
                </div>
                <a onClick={handleAddNoteClick}>Add note</a>
              </div>
            </Button>
          </div>
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
              <span className="text-subtitle">
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
      <AddNoteModal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </>
  );
}

export default ContactDetails;
