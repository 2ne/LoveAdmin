import React, { useRef, FC, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Select,
  Switch,
  Tooltip,
  DatePicker,
  Dropdown,
  Menu,
} from "antd";
import EmailEditor from "react-email-editor";
import {
  EyeOutlined,
  InfoCircleOutlined,
  PaperClipOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
const { Option } = Select;

interface EmailModalProps {
  visible: boolean;
  onClose: () => void;
  showTemplatesDropdown?: boolean;
}

const EmailModal: FC<EmailModalProps> = ({
  visible,
  onClose,
  showTemplatesDropdown = true,
}) => {
  const emailEditorRef = useRef(null);
  const [scheduledTime, setScheduledTime] = useState(null);

  const handleDateTimeOk = (value: any) => {
    setScheduledTime(value);
  };

  const handleOk = () => {
    if (emailEditorRef.current) {
      (emailEditorRef.current as any).saveDesign((design: any) => {
        console.log("Design JSON:", design);
      });
    }
    onClose();
  };

  const [isMarketing, setIsMarketing] = useState(false);

  const toggleMarketing = () => {
    setIsMarketing(!isMarketing);
  };

  const [isTimeline, setIsTimeline] = useState(false);

  const toggleTimeline = () => {
    setIsTimeline(!isTimeline);
  };

  const placeholders = (
    <Menu>
      <Menu.SubMenu title="Account owner">
        <Menu.Item>First name</Menu.Item>
        <Menu.Item>Last name</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Beneficiary">
        <Menu.Item>First name</Menu.Item>
        <Menu.Item>Last name</Menu.Item>
        <Menu.Item>Date of birth</Menu.Item>
        <Menu.Item>Gender</Menu.Item>
        <Menu.Item>House name or number</Menu.Item>
        <Menu.Item>Street</Menu.Item>
        <Menu.Item>Town</Menu.Item>
        <Menu.Item>County</Menu.Item>
        <Menu.Item>Post code</Menu.Item>
        <Menu.Item>Country</Menu.Item>
        <Menu.Item>Full address</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Organisation">
        <Menu.Item>Name</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <Modal
      title={
        <>
          <span>Send email</span>
          <span className="mx-1 text-subtitle">·</span>
          <span className="text-subtitle">100 contacts selected</span>
        </>
      }
      open={visible}
      onOk={handleOk}
      className="w-full max-w-[67.5rem]"
      wrapClassName="[&_.ant-modal-footer]:mt-6"
      centered
      onCancel={onClose}
      footer={
        <div className="flex gap-2.5 text-start">
          <div className="flex flex-grow gap-3">
            <Tooltip title="Preview message">
              <Button icon={<EyeOutlined />} />
            </Tooltip>
            <Tooltip title="Choose where your replies are sent">
              <Input
                placeholder="Reply to address"
                suffix={<UserOutlined className="text-neutral-400/75" />}
                value="jtoone@loveadmin.co.uk"
                className="w-52"
              />
            </Tooltip>
            <Tooltip title="Set the date and time you want this email to be sent">
              <DatePicker
                placeholder="Set schedule..."
                showTime
                format="DD-MM-YYYY HH:mm"
                onChange={(date) => handleDateTimeOk(date)}
                allowClear={true}
                className="w-[10.5rem]"
              />
            </Tooltip>
          </div>
          <div>
            <Button>Cancel</Button>
            <Button type="primary">
              {!scheduledTime ? "Send" : "Schedule"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="border rounded-md bg-neutral-50 border-neutral-200">
        <div className="p-4 space-y-4 border-b rounded-md rounded-b-none border-neutral-200">
          <div className="flex items-center min-w-0 ">
            <label className="block w-20 shrink-0 text-neutral-600">
              Subject
            </label>
            <Input className="w-full" />
          </div>
          {showTemplatesDropdown && (
            <div className="flex items-center min-w-0">
              <label className="block w-20 shrink-0 text-neutral-600">
                Template
              </label>
              <Select
                placeholder="Select a template"
                allowClear={true}
                className="w-full"
              >
                ß
                <Option value="Payment due">
                  <span className="mr-1.5">🚨</span> Payment due
                </Option>
                <Option value="Special offer">
                  <span className="mr-1.5">💰</span> Special offer
                </Option>
                <Option value="New event">
                  <span className="mr-1.5">📅</span> New event
                </Option>
              </Select>
            </div>
          )}
          <div className="flex items-center min-w-0">
            <label className="block w-20 shrink-0 text-neutral-600">
              Options
            </label>
            <div className="flex flex-wrap flex-grow min-w-0 gap-x-4 gap-y-3">
              <div className="flex min-w-0 gap-3">
                <Button icon={<PaperClipOutlined />}>Attachments</Button>
                <Dropdown overlay={placeholders} trigger={["click"]}>
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="px-0 text-neutral-900"
                  >
                    <Button icon={<PlusOutlined />}>Personalise</Button>
                  </a>
                </Dropdown>
              </div>
              <div className="flex min-w-0 gap-3">
                <div className="flex items-center min-w-0">
                  <Switch
                    size="small"
                    checked={isTimeline}
                    onChange={toggleTimeline}
                  ></Switch>
                  <div className="flex items-center min-w-0 cursor-default">
                    <div
                      className="ml-2 mr-1.5 cursor-pointer truncate"
                      onClick={toggleTimeline}
                    >
                      Post on timeline
                    </div>
                  </div>
                </div>
                <div className="flex items-center min-w-0">
                  <Switch
                    size="small"
                    checked={isMarketing}
                    onChange={toggleMarketing}
                  ></Switch>
                  <div className="flex items-center min-w-0 cursor-default">
                    <div
                      className="ml-2 mr-1.5 cursor-pointer truncate"
                      onClick={toggleMarketing}
                    >
                      Marketing message
                    </div>
                    <Tooltip
                      className="mt-px text-neutral-400 hover:text-neutral-500"
                      title="To follow privacy rules, turn this option on when sending special offers or promotional messages. This way, you'll only message people who've opted in."
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-thin-x rounded-b-md">
          <EmailEditor
            ref={emailEditorRef}
            options={{
              features: {
                preview: false,
              },
            }}
            onLoad={() => {
              console.log("Email editor has loaded.");
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EmailModal;
