import React, { useState } from "react";
import { Modal, Checkbox, Tooltip, Button } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ConfirmSMS from "./sms-confirm";
import CustomSMSEditor from "../sms-editor";

interface SMSModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const SMSModal: React.FC<SMSModalProps> = ({ visible, onOk, onCancel }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [accountOwnerChecked, setAccountOwnerChecked] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [content, setContent] = useState("");

  const onAccountOwnerChange = (e: CheckboxChangeEvent) => {
    setAccountOwnerChecked(e.target.checked);
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

  const handleOk = () => {
    if (messageCount > 0) {
      setConfirmVisible(true);
    }
  };

  const onSend = () => {
    onCancel();
  };

  const recipientCount = 4;

  return (
    <>
      <Modal
        title={
          <>
            <span>Send SMS</span>
            <span className="mx-1 text-subtitle">·</span>
            <span className="font-medium tabular-nums text-subtitle">
              {recipientCount} contact{recipientCount > 1 ? "s" : ""}
            </span>
          </>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={onCancel}
        className="max-w-xl"
        footer={
          <div className="flex justify-end">
            <Button onClick={onCancel}>Cancel</Button>
            <Tooltip
              placement="topRight"
              title={messageCount === 0 ? "Please enter a message." : ""}
            >
              <Button type="primary" onClick={handleOk}>
                Send
              </Button>
            </Tooltip>
          </div>
        }
      >
        <div className="mb-6 space-y-6">
          <div className="relative">
            <div className="flex gap-2">
              <div className="w-16 shrink-0 text-subtitle">Message</div>
              <div className="relative flex-grow min-w-0">
                <CustomSMSEditor
                  onCharCountChange={handleCharCountChange}
                  onMessageCountChange={handleMessageCountChange}
                  onContentChange={handleContentChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 shrink-0 text-subtitle">Options</div>
            <div className="space-y-0.5 select-none">
              <div>
                <Checkbox
                  checked={accountOwnerChecked}
                  onChange={onAccountOwnerChange}
                >
                  Only send to account owners
                </Checkbox>
                <div className="ml-6 text-subtitle">
                  This can help reduce the amount of messages sent
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ConfirmSMS
        visible={confirmVisible}
        onOk={() => {
          setConfirmVisible(false);
          onSend();
        }}
        onCancel={() => setConfirmVisible(false)}
      />
    </>
  );
};

export default SMSModal;
