import React, { useRef, useState, useEffect } from "react";
import { Dropdown, Menu, Tooltip } from "antd";
import {
  FileAddOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

interface CustomSMSQuill extends ReactQuill {
  getEditor: () => Quill;
}

interface CustomSMSEditorProps {
  value?: string;
  onCharCountChange: (count: number) => void;
  onMessageCountChange: (count: number) => void;
  onContentChange: (content: string) => void;
  showTemplatesDropdown?: boolean;
  showPlaceholderDropdown?: boolean;
  showCounts?: boolean;
}

const CustomSMSEditor: React.FC<CustomSMSEditorProps> = ({
  value,
  onCharCountChange,
  onMessageCountChange,
  onContentChange,
  showTemplatesDropdown = true,
  showPlaceholderDropdown = true,
  showCounts = true,
}) => {
  const quillRef = useRef<CustomSMSQuill>(null);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

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
    if (quillRef.current && value) {
      const quill = quillRef.current.getEditor();
      quill.setText(value);
    }
  }, [value]);

  useEffect(() => {
    setMessageCount(Math.ceil(charCount / 160));
    onMessageCountChange(Math.ceil(charCount / 160));
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
      onCharCountChange(length);
      onContentChange(text);
    }
  };

  const modules = {
    toolbar: [],
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

  return (
    <>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        onChange={handleTextChange}
        className={!showCounts ? "[&_.ql-container]:rounded-b" : ""}
      />
      {showCounts && (
        <div className="flex justify-end px-3 py-2 -mt-px border border-solid rounded-b border-neutral-200 bg-neutral-50">
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
              <Tooltip
                className="ml-1 text-neutral-500 hover:text-neutral-600"
                title="Placeholder use may extend SMS length, potentially dividing them into multiple messages."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      <div className="absolute flex gap-4 top-2 left-3">
        {showPlaceholderDropdown && (
          <Dropdown overlay={placeholders} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className="px-0 text-neutral-900"
            >
              <PlusOutlined className="mr-2 text-neutral-900" />
              <span className="font-medium text-neutral-900">Placeholder</span>
            </a>
          </Dropdown>
        )}
        {showTemplatesDropdown && (
          <Dropdown overlay={templates} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className="px-0 text-neutral-900"
            >
              <FileAddOutlined className="mr-1.5 text-neutral-900" />
              <span className="font-medium text-neutral-900">Templates</span>
            </a>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default CustomSMSEditor;
