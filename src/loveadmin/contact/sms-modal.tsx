import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Modal, Dropdown, Menu, Checkbox, Tooltip, Button } from "antd";
import { FileAddOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ConfirmSMS from "./sms-confirm";

interface CustomQuill extends ReactQuill {
  getEditor: () => Quill;
}

interface SMSModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const SMSModal: React.FC<SMSModalProps> = ({ visible, onOk, onCancel }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const quillRef = useRef<CustomQuill>(null);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [accountOwnerChecked, setAccountOwnerChecked] = useState(true);
  const onAccountOwnerChange = (e: CheckboxChangeEvent) => {
    setAccountOwnerChecked(e.target.checked);
  };

  const clearAndFocusEditor = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.setText("");
      quill.focus();
    }
  };

  const focusEditor = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.focus();
    }
  };

  const insertText = (text: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        const cursorPosition = range.index;
        quill.insertText(cursorPosition, `${text}`);
        quill.setSelection({
          index: cursorPosition + text.length + 4,
          length: 0,
        });
      }
    }
    handleTextChange();
  };

  useEffect(() => {
    setMessageCount(Math.ceil(charCount / 160));
  }, [charCount]);

  const getMessageLimit = (length: number) => {
    if (length <= 160) {
      return 160;
    } else if (length <= 320) {
      return 320;
    } else {
      return 480;
    }
  };

  const handleTextChange = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const text = quill.getText();
      const length = text.length - 1;
      setCharCount(length);
      setMessageCount(Math.ceil(length / getMessageLimit(length)));
    }
  };

  const modules = {
    toolbar: [],
  };

  const onSend = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.setText(""); // Clear the editor
    }
    onCancel();
  };

  const placeholders = (
    <Menu>
      <Menu.SubMenu title="Account owner">
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{accountOwner.FirstName}}");
          }}
        >
          First name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{accountOwner.LastName}}");
          }}
        >
          Last name
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Beneficiary">
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{beneficiary.FirstName}}");
          }}
        >
          First name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{beneficiary.LastName}}");
          }}
        >
          Last name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{beneficiary.DateOfBirth}}");
          }}
        >
          Date of birth
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{beneficiary.Gender}}");
          }}
        >
          Gender
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.HouseNameOrNumber}}");
          }}
        >
          House name or number
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.Street}}");
          }}
        >
          Street
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.Town}}");
          }}
        >
          Town
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.County}}");
          }}
        >
          County
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.PostCode}}");
          }}
        >
          Post code
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.Country}}");
          }}
        >
          Country
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{address.FullAddress}}");
          }}
        >
          Full address
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Organisation">
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("{{organisation.Name}}");
          }}
        >
          Name
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const templates = (
    <Menu>
      <Menu.Item
        onClick={() => {
          clearAndFocusEditor();
          insertText(
            "Dear {{accountOwner.FirstName}}, your payment of PRODUCT NAME is due. Thanks, {{organisation.Name}}."
          );
        }}
      >
        Payment due
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          clearAndFocusEditor();
          insertText(
            "Dear {{accountOwner.FirstName}}, we have a special offer on PRODUCT NAME for you. Don't miss out! Thanks, {{organisation.Name}}."
          );
        }}
      >
        Special offer
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          clearAndFocusEditor();
          insertText(
            "Dear {{accountOwner.FirstName}}, we have a new event coming up EVENT NAME. Hope to see you there! Thanks, {{organisation.Name}}."
          );
        }}
      >
        New event
      </Menu.Item>
    </Menu>
  );

  const handleOk = () => {
    if (messageCount > 0) {
      setConfirmVisible(true);
    }
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
                <ReactQuill
                  ref={quillRef}
                  modules={modules}
                  onChange={handleTextChange}
                />
                <div className="px-3 py-2 -mt-px border border-solid rounded-b border-neutral-200 bg-neutral-50">
                  <Tooltip
                    placement="topRight"
                    title="Placeholders may lengthen SMSs beyond displayed amount, potentially splitting them into extra messages."
                  >
                    <div className="cursor-default flex items-center justify-end gap-2.5">
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">Characters</span>
                        <span className="tabular-nums">
                          {charCount} / {getMessageLimit(charCount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">Messages</span>
                        <span className="tabular-nums">{messageCount}</span>
                        <InfoOutlined className="text-neutral-600 ml-0.5 w-3.5 h-3.5 text-center rounded-full bg-neutral-200 text-[8px] flex justify-center relative top-px" />
                      </div>
                    </div>
                  </Tooltip>
                </div>
                <div className="absolute flex gap-4 top-2 left-3">
                  <Dropdown overlay={placeholders} trigger={["click"]}>
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <PlusOutlined className="mr-1.5 text-neutral-900" />
                      <span className="text-neutral-900">Placeholder</span>
                    </a>
                  </Dropdown>
                  <Dropdown overlay={templates} trigger={["click"]}>
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <FileAddOutlined className="mr-1.5 text-neutral-900" />
                      <span className="text-neutral-900">Templates</span>
                    </a>
                  </Dropdown>
                </div>
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
