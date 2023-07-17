import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Modal, Dropdown, Menu, Tag, Checkbox, Tooltip, Button } from "antd";
import { InfoOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
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
  const handleOk = () => {
    if (
      (accountOwnerChecked && messageCount > 0) ||
      (beneficiaryChecked && messageCount > 0)
    ) {
      setConfirmVisible(true);
    }
  };
  const quillRef = useRef<CustomQuill>(null);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [accountOwnerChecked, setAccountOwnerChecked] = useState(true);
  const onAccountOwnerChange = (e: CheckboxChangeEvent) => {
    setAccountOwnerChecked(e.target.checked);
  };
  const [beneficiaryChecked, setBeneficiaryChecked] = useState(false);
  const onBeneficiaryChange = (e: CheckboxChangeEvent) => {
    setBeneficiaryChecked(e.target.checked);
  };
  const generateRandomName = () => {
    const firstName = [
      "John",
      "Jane",
      "Michael",
      "Emily",
      "William",
      "Olivia",
      "James",
      "Sophia",
      "Benjamin",
      "Ava",
    ];
    const lastName = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
      "Miller",
      "Wilson",
      "Moore",
      "Taylor",
    ];
    const randomFirstName =
      firstName[Math.floor(Math.random() * firstName.length)];
    const randomLastName =
      lastName[Math.floor(Math.random() * lastName.length)];
    return `${randomFirstName} ${randomLastName}`;
  };
  const [recipients, setRecipients] = useState<string[]>(
    Array.from({ length: 100 }, () => generateRandomName())
  );
  const recipientCount = recipients.length;
  const [recipientsShown, setRecipientsShown] = useState(8);
  const [showMore, setShowMore] = useState(false);

  const handleViewMoreRecipients = () => {
    setRecipientsShown(recipientsShown + 50); // show 50 more recipients on each click
    setShowMore(true);
  };

  const handleHideRecipients = () => {
    setRecipientsShown(8); // reset to initial state
    setShowMore(false);
  };

  const displayedRecipients = recipients.slice(0, recipientsShown);
  const remainingRecipientsCount =
    recipients.length - displayedRecipients.length;

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
        quill.insertText(cursorPosition, `{{${text}}}`);
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

  const menu = (
    <Menu>
      <Menu.SubMenu title="Beneficiary">
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("beneficiary.FirstName");
          }}
        >
          First name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("beneficiary.LastName");
          }}
        >
          Last name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("beneficiary.DateOfBirth");
          }}
        >
          Date of birth
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("beneficiary.Gender");
          }}
        >
          Gender
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.HouseNameOrNumber");
          }}
        >
          House name or number
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.Street");
          }}
        >
          Street
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.Town");
          }}
        >
          Town
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.County");
          }}
        >
          County
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.PostCode");
          }}
        >
          Post code
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.Country");
          }}
        >
          Country
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("address.FullAddress");
          }}
        >
          Full address
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Account owner">
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("accountOwner.FirstName");
          }}
        >
          First name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("accountOwner.LastName");
          }}
        >
          Last name
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Organisation">
        <Menu.Item
          onClick={() => {
            focusEditor();
            insertText("organisation.Name");
          }}
        >
          Name
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <>
      <Modal
        title={
          <>
            <span>Send SMS</span>
            <span className="mx-1 text-subtitle">·</span>
            <span className="font-medium tabular-nums text-subtitle">
              {recipientCount} contact{recipientCount !== 1 ? "s" : ""}
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
              title={
                messageCount === 0
                  ? "Please enter a message to send."
                  : !(accountOwnerChecked || beneficiaryChecked)
                  ? "Please select either Account Owners, Beneficiaries, or both as recipients."
                  : ""
              }
            >
              <Button type="primary" onClick={handleOk}>
                Send
              </Button>
            </Tooltip>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="w-16 shrink-0 text-subtitle">To</div>
            <div className="flex-grow">
              {displayedRecipients.map((recipient, index) => (
                <Tag bordered={false} key={index} className="!mr-1 !mb-1">
                  {recipient}
                </Tag>
              ))}
              {remainingRecipientsCount > 0 && (
                <Tag
                  bordered={false}
                  className="hover:!bg-neutral-200 !mr-1 !mb-1 cursor-pointer"
                  onClick={handleViewMoreRecipients}
                >
                  + {Math.min(remainingRecipientsCount, 50)} more
                </Tag>
              )}
              {showMore && (
                <Tag
                  bordered={false}
                  className="hover:!bg-neutral-200 !mr-1 !mb-1 cursor-pointer"
                  onClick={handleHideRecipients}
                >
                  <UpOutlined className="text-[9px] relative -top-px" /> Hide
                </Tag>
              )}
            </div>
          </div>
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
                <div className="absolute top-2 left-3">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="px-0 text-neutral-900"
                    >
                      <PlusOutlined className="mr-1.5 text-neutral-900" />
                      <span className="text-neutral-900">
                        Add a placeholder
                      </span>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-16 shrink-0 text-subtitle">Send to</div>
            <div className="space-y-0.5 select-none">
              <div>
                <Checkbox
                  checked={accountOwnerChecked}
                  onChange={onAccountOwnerChange}
                >
                  Account owners
                </Checkbox>
              </div>
              <div>
                <Checkbox
                  checked={beneficiaryChecked}
                  onChange={onBeneficiaryChange}
                >
                  Beneficiaries
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ConfirmSMS
        visible={confirmVisible}
        onOk={() => setConfirmVisible(false)}
        onCancel={() => setConfirmVisible(false)}
      />
    </>
  );
};

export default SMSModal;
