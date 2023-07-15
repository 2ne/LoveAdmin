import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Modal } from "antd";

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

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("firstName", function () {
        const range = quill.getSelection();
        if (range) {
          const cursorPosition = range.index;
          quill.insertText(cursorPosition, "{{firstName}}");
          quill.setSelection({ index: cursorPosition + 13, length: 0 });
        }
      });
    }
  }, []);

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["firstName"]],
  };

  return (
    <Modal
      title="Send SMS"
      visible={visible}
      okText="Add"
      onOk={onOk}
      onCancel={onCancel}
      className="max-w-sm"
    >
      <ReactQuill ref={quillRef} modules={modules} />
    </Modal>
  );
};

export default SMSModal;
