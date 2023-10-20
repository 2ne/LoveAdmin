import React, { useState } from "react";
import {
  Modal,
  Tooltip,
  Button,
  Switch,
  Alert,
  Popconfirm,
  message,
} from "antd";
import CustomSMSEditor from "../sms-editor";
import {
  CheckCircleFilled,
  InfoCircleFilled,
  InfoCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";

interface SMSModalProps {
  visible: boolean;
  onCancel: () => void;
}

const SMSModal: React.FC<SMSModalProps> = ({ visible, onCancel }) => {
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [content, setContent] = useState("");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);

  const toggleMarketing = () => {
    setIsMarketing(!isMarketing);
  };

  const handleCharCountChange = (count: number) => {
    setCharCount(count);
    console.log("New Char Count: ", count);
  };

  const handleMessageCountChange = (count: number) => {
    setMessageCount(count);
    console.log("New Message Count: ", count);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    console.log("New Content: ", newContent);
  };

  const goToStep2 = () => {
    if (messageCount > 0) {
      setStep2(true);
    }
  };

  const goToStep1 = () => {
    setStep2(false);
  };

  const sendConfirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    onCancel();
    message.success("SMS sent successfully!");
    setStep2(false);
    setStep1(true);
  };

  const sendCancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const recipientCount = 100;

  return (
    <>
      <Modal
        maskClosable={false}
        destroyOnClose={true}
        title={
          <div>
            <div>
              <span>Send SMS</span>
            </div>
            <div className="mt-1 text-sm font-normal text-subtitle">
              {step1 && !step2 && (
                <>
                  <span>Step 1 of 2</span>
                  <span className="mx-1">·</span>
                  <span>Create SMS</span>
                  <span className="mx-1">·</span>
                  <span>
                    {recipientCount} contact{recipientCount > 1 ? "s" : ""}{" "}
                    selected
                  </span>
                </>
              )}
              {step2 && (
                <>
                  <span>Step 2 of 2</span>
                  <span className="mx-1">·</span>
                  <span>Confirmation</span>
                </>
              )}
            </div>
          </div>
        }
        visible={visible}
        closable={!step2}
        onOk={goToStep2}
        onCancel={onCancel}
        className={`max-w-lg ${popConfirmVisible ? "dim" : ""}`}
        footer={
          <div className="flex justify-between">
            {step1 && !step2 && (
              <>
                <Tooltip
                  placement="topRight"
                  title={messageCount === 0 ? "Please enter a message." : ""}
                  className="ml-auto"
                >
                  <Button
                    type="primary"
                    onClick={goToStep2}
                    className={messageCount === 0 ? "opacity-60" : ""}
                  >
                    <span className="w-8">Next</span>
                  </Button>
                </Tooltip>
              </>
            )}
            {step2 && (
              <>
                <div>
                  <Button onClick={goToStep1}>Back</Button>
                </div>
                <div>
                  {!insufficientCredits ? (
                    <Popconfirm
                      icon={<CheckCircleFilled className="text-primary-500" />}
                      title={
                        <div className="mb-1">
                          <div className="mb-0.5 font-medium">
                            <span>Send SMS to 80 contacts</span>
                          </div>
                          <div className="text-neutral-700">
                            Are you sure you want to send SMS?
                          </div>
                        </div>
                      }
                      okText="Send"
                      cancelText="Cancel"
                      onConfirm={sendConfirm}
                      onCancel={sendCancel}
                      visible={popConfirmVisible}
                      onVisibleChange={setPopConfirmVisible}
                    >
                      <Button type="primary">
                        <span className="w-8">Send</span>
                      </Button>
                    </Popconfirm>
                  ) : (
                    <Tooltip
                      placement="topRight"
                      title="You don't have enough credits to send this message, please Top-up."
                      className="ml-auto"
                    >
                      <Button
                        type="primary"
                        onClick={goToStep2}
                        className="opacity-60"
                      >
                        <span className="w-8">Send</span>
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </>
            )}
          </div>
        }
      >
        <div className={step1 && !step2 ? "block" : "hidden"}>
          <div className="space-y-6">
            <div className="relative">
              <div className="relative flex-grow min-w-0">
                <CustomSMSEditor
                  onCharCountChange={handleCharCountChange}
                  onMessageCountChange={handleMessageCountChange}
                  onContentChange={handleContentChange}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Switch size="small" checked={isMarketing}></Switch>
              <div className="flex items-center cursor-default">
                <div
                  className="ml-2 mr-1.5 cursor-pointer"
                  onClick={toggleMarketing}
                >
                  Marketing or promotional message
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

        {step2 && (
          <>
            <div className="absolute z-50 ml-auto bg-white top-6 right-6">
              <span className="font-medium">
                <span className="text-subtitle">SMS Credits</span>
                <span className="mx-1 text-subtitle">·</span>
                <span className="text-subtitle">1000</span>
              </span>
            </div>
            <div className="mb-5 overflow-hidden border border-solid rounded border-neutral-200">
              <div className="grid grid-cols-2 gap-3 my-3">
                <div className="relative border-r border-solid border-y-transparent border-l-transparent border-r-neutral-200">
                  <div className="px-4 space-y-2">
                    <div className="text-subtitle">Total recipients</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xl">80 out of 100</div>
                      <div className="relative top-px">
                        <InfoCircleFilled className="text-primary-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="px-4 space-y-2">
                    <div className="text-subtitle">Total message cost</div>
                    <div className="text-xl">80 credits</div>
                  </div>
                </div>
              </div>
              {!insufficientCredits ? (
                <div className="px-4 py-2.5 mx-px mb-px rounded-b-sm bg-neutral-100/75">
                  This message will cost 80 credits, leaving you with 920
                  remaining.
                </div>
              ) : (
                <div className="px-4 py-2.5 mx-px mb-px rounded-b-sm bg-danger-50">
                  <WarningFilled className="mr-1.5 text-danger-600" /> You don't
                  have enough credits to send this message, please{" "}
                  <a className="font-medium">Top-up.</a>
                </div>
              )}
            </div>
            <Alert
              showIcon
              className="hidden mb-6"
              message={
                <>
                  20 contacts won't receive SMS due to missing mobile number,
                  age or because they have opted out.{" "}
                  <a className="font-medium">Email 20 contacts.</a>
                </>
              }
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default SMSModal;
