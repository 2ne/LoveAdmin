import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Modal, Dropdown, Menu, Tag, Checkbox } from "antd";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";

interface CustomQuill extends ReactQuill {
  getEditor: () => Quill;
}

interface SMSModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const SMSModal: React.FC<SMSModalProps> = ({ visible, onOk, onCancel }) => {
  const quillRef = useRef<CustomQuill>(null);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
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
  const [showAllRecipients, setShowAllRecipients] = useState(false);

  const [expandedView, setExpandedView] = useState(false);

  const displayedRecipients = showAllRecipients
    ? recipients
    : recipients.slice(0, 6);
  const remainingRecipientsCount =
    recipients.length - displayedRecipients.length;

  const handleViewAllRecipients = () => {
    setExpandedView(true);
  };

  const handleCloseExpandedView = () => {
    setExpandedView(false);
  };

  useEffect(() => {
    setMessageCount(Math.ceil(charCount / 160));
  }, [charCount]);

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

  const handleTextChange = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const text = quill.getText();
      const length = text.length - 1;
      setCharCount(length);
      setMessageCount(Math.ceil(length / getMessageLimit(length)));
    }
  };

  const getMessageLimit = (length: number) => {
    if (length <= 160) {
      return 160;
    } else if (length <= 320) {
      return 320;
    } else {
      return 480;
    }
  };

  const modules = {
    toolbar: [],
  };

  const menu = (
    <Menu>
      <Menu.SubMenu title="Personal">
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
      </Menu.SubMenu>
      <Menu.SubMenu title="Address">
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
      okText="Send"
      onOk={onOk}
      onCancel={onCancel}
      className="max-w-lg"
    >
      <div className="flex gap-2 mb-4">
        <div>To:</div>
        <div className="flex-grow">
          {expandedView ? (
            <>
              {recipients.map((recipient, index) => (
                <Tag bordered={false} key={index} className="!mr-1 !mb-1">
                  {recipient}
                </Tag>
              ))}
              <Tag
                className="!bg-white !mr-1 !mb-1 cursor-pointer"
                onClick={handleCloseExpandedView}
              >
                <UpOutlined className="text-[9px] relative -top-px" /> Hide
              </Tag>
            </>
          ) : (
            <>
              {displayedRecipients.map((recipient, index) => (
                <Tag bordered={false} key={index} className="!mr-1 !mb-1">
                  {recipient}
                </Tag>
              ))}
              {remainingRecipientsCount > 0 && (
                <Tag
                  className="!bg-white !mr-1 !mb-1 cursor-pointer"
                  onClick={handleViewAllRecipients}
                >
                  + {remainingRecipientsCount} more
                </Tag>
              )}
            </>
          )}
        </div>
      </div>
      <div className="relative mb-6">
        <div className="absolute top-2 left-3">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className="px-0 text-neutral-900"
            >
              <PlusOutlined className="mr-1.5 text-neutral-900" />
              <span className="text-neutral-900">Add a placeholder</span>
            </a>
          </Dropdown>
        </div>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          onChange={handleTextChange}
          placeholder="Type your message here..."
        />
        <div className="flex items-center justify-between px-3 py-2 -mt-px border border-solid rounded-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-1">
            <span className="text-neutral-500">Characters</span>
            <span className="tabular-nums">
              {charCount} / {getMessageLimit(charCount)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-neutral-500">Messages</span>
            <span className="tabular-nums">{messageCount}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-6">
        <Checkbox>Send to all beneficiaries</Checkbox>
      </div>
    </Modal>
  );
};

export default SMSModal;
