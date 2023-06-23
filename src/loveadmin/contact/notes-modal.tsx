import React from "react";
import { Modal, Input } from "antd";

interface AddNoteModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Add Note"
      open={visible}
      okText="Add"
      onOk={onOk}
      onCancel={onCancel}
      className="max-w-sm"
    >
      <Input.TextArea rows={4} placeholder="Enter your note" />
    </Modal>
  );
};

export default AddNoteModal;
