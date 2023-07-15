import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Modal, Dropdown, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface CustomQuill extends ReactQuill {
  getEditor: () => Quill;
}

interface SMSModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const SMSModal: React.FC<SMSModalProps> = ({ visible, onOk, onCancel }) => {
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const quillRef = useRef<CustomQuill>(null);

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
      title="Send SMS"
      visible={visible}
      okText="Send"
      onOk={onOk}
      onCancel={onCancel}
      className="max-w-md"
    >
      <div className="relative mb-5">
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
    </Modal>
  );
};

export default SMSModal;
