import {
  CheckCircleOutlined,
  CheckOutlined,
  CompassOutlined,
  EditOutlined,
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
  Tooltip,
} from "antd";
import React, { ReactElement, useState } from "react";
import AddNoteModal from "./notes-modal";
import MandateDrawer from "./mandate-drawer";
const { Panel } = Collapse;
const { Title } = Typography;

function ContactDetails(): ReactElement {
  const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);
  const [isMandateModalVisible, setIsMandateModalVisible] = useState(false);

  const handleAddNoteClick = () => {
    setIsNotesModalVisible(true);
  };

  const handleNotesModalOk = () => {
    setIsNotesModalVisible(false);
  };

  const handleNotesModalCancel = () => {
    setIsNotesModalVisible(false);
  };

  const handleViewMandateHistoryClick = () => {
    setIsMandateModalVisible(true);
  };

  const [openEditFirstName, setOpenEditFirstName] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [form] = Form.useForm();
  const [firstName, setName] = useState("James");
  const [address, setAddress] = useState("28 Longhurst");

  const hide = () => {
    setOpenEditFirstName(false);
    setOpenAddress(false);
  };

  const handleOpenFirstNameChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpenEditFirstName(open);
  };

  const handleOpenAddressChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpenAddress(open);
  };

  const onFinish = (values: { firstName: React.SetStateAction<string> }) => {
    setName(values.firstName);
    hide();
    message.success("Details updated");
  };

  const onEditAddressFinish = (values: {
    address: React.SetStateAction<string>;
  }) => {
    setAddress(values.address);
    hide();
    message.success("Details updated");
  };

  const editFirstName = (
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

  const editAddress = (
    <div className="p-1 pb-2 min-w-[14.5rem]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onEditAddressFinish}
        className="flex flex-col gap-2"
        requiredMark={false}
      >
        <Form.Item
          name="houseNameOrNumber"
          label="House name or number"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="street"
          label="Street"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="town"
          label="Town"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="postCode"
          label="Post code"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="county"
          label="County"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          className="!mb-0 flex-grow"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="!mt-2 !mb-0">
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
          header="Details"
          key="1"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <div className="-mt-1.5 space-y-1">
            <Popover
              content={editFirstName}
              trigger="click"
              open={openEditFirstName}
              onOpenChange={handleOpenFirstNameChange}
              placement="right"
            >
              <Button type="text" block className="ant-btn-input group">
                <div className="relative flex-grow min-w-0 text-left">
                  <div className="text-xs mb-0.5 text-subtitle">First name</div>
                  <div>{firstName}</div>
                  <div className="absolute right-0 -translate-y-1/2 top-1/2">
                    <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              </Button>
            </Popover>
            <Button type="text" block className="ant-btn-input group">
              <div className="relative flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">Last name</div>
                <div>Toone</div>
                <div className="absolute right-0 -translate-y-1/2 top-1/2">
                  <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input group">
              <div className="relative flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Date of birth
                </div>
                <div>
                  14 April 1986
                  <span className="text-subtitle">
                    <span className="mx-1.5">·</span>37 years old
                  </span>
                </div>
                <div className="absolute right-0 -translate-y-1/2 top-1/2">
                  <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input group">
              <div className="relative flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">Gender</div>
                <div>Male</div>
                <div className="absolute right-0 -translate-y-1/2 top-1/2">
                  <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input group">
              <div className="relative flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">Email</div>
                <div>jamestoone@me.com</div>
                <div className="absolute right-0 -translate-y-1/2 top-1/2">
                  <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input group">
              <div className="relative flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Contact number
                </div>
                <div>07994884991</div>
                <div className="absolute right-0 -translate-y-1/2 top-1/2">
                  <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </Button>
            <Popover
              content={editAddress}
              trigger="click"
              open={openAddress}
              onOpenChange={handleOpenAddressChange}
              placement="right"
            >
              <Button type="text" block className="ant-btn-input group">
                <div className="relative flex-grow min-w-0 text-left">
                  <div className="text-xs mb-0.5 text-subtitle">Address</div>
                  <div className="pr-10 truncate">
                    28 Longhurst, Burgess Hill, West Sussex, RH150 0TG, United
                    Kingdom
                  </div>
                  <div className="absolute right-0 -translate-y-1/2 top-1/2">
                    <EditOutlined className="transition-opacity opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              </Button>
            </Popover>
          </div>
        </Panel>
        <Panel
          header="Account owner"
          key="3"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
        <Panel
          header={
            <div className="flex items-center">
              <span>Mandate</span>
              <span className="text-subtitle">
                <span className="mx-1.5">·</span>Active
              </span>
              <Tooltip title="View history">
                <Button
                  className="ml-1.5"
                  size="small"
                  type="text"
                  icon={<CompassOutlined />}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleViewMandateHistoryClick();
                  }}
                ></Button>
              </Tooltip>
            </div>
          }
          extra={
            <>
              <CheckCircleOutlined className="-mr-1 text-primary-500" />
            </>
          }
          key="4"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <div>
            <dl className="px-4 py-3 rounded-md bg-neutral-100">
              <dt className="pb-3">
                <Title level={5} className="m-0">
                  GoCardless
                </Title>
              </dt>
              <div className="grid grid-cols-2 gap-x-3">
                <dt className="block text-subtitle">Mandate identifier</dt>
                <dd className="block w-full mb-1.5 text-right">
                  MD000SXP3DNAQ2
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <dt className="block text-subtitle">Status </dt>
                <dd className="block w-full mb-1.5 text-right">Created</dd>
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <dt className="block text-subtitle">Date created</dt>
                <dd className="block w-full mb-1.5 text-right">
                  27 Apr 2023 15:15
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
          key="5"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <div className="-mt-1.5 space-y-1">
            <Button type="text" block className="ant-btn-input group">
              <div className="flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Behavioural conditions
                </div>
                <div>ADHD</div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input group">
              <div className="flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">Allergies</div>
                <div>Very allergic to bee stings</div>
              </div>
            </Button>
            <Button type="text" block className="ant-btn-input group">
              <div className="flex-grow min-w-0 text-left">
                <div className="text-xs mb-0.5 text-subtitle">
                  Medical notes
                </div>
                <a onClick={handleAddNoteClick} className="font-medium">
                  Add note
                </a>
              </div>
            </Button>
          </div>
        </Panel>
        <Panel
          header="Emergency contacts"
          key="6"
          className="px-2.5 bg-white rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:border-t-0"
        >
          <p>1</p>
        </Panel>
      </Collapse>
      <AddNoteModal
        visible={isNotesModalVisible}
        onOk={handleNotesModalOk}
        onCancel={handleNotesModalCancel}
      />
      <MandateDrawer
        visible={isMandateModalVisible}
        onClose={() => setIsMandateModalVisible(false)}
      />
    </>
  );
}

export default ContactDetails;
