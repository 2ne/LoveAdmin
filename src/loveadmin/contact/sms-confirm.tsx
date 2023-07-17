import React from "react";
import { Button, Modal, Statistic, message } from "antd";

interface ConfirmSMSProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ConfirmSMS: React.FC<ConfirmSMSProps> = ({ visible, onOk, onCancel }) => {
  const handleOk = () => {
    message.success("SMS sent successfully!");
    onOk();
  };

  return (
    <Modal
      title="Send SMS"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Send now"
      className="max-w-xl"
    >
      <div className="mb-5">
        <p>
          SMS will be sent to 80 out of 100 contacts. 20 contacts won't receive
          it due to missing mobile number or because they have opted out.{" "}
          <span className="link">Export 20 contacts.</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 mb-6">
        <div className="relative">
          <Statistic
            title="Credit balance"
            value={1000}
            precision={0}
            className="px-4 py-3.5 rounded border border-solid border-neutral-200"
          />
          <Button
            type="link"
            size="small"
            className="absolute !px-0 top-2.5 right-4"
          >
            Top-up
          </Button>
        </div>
        <div className="relative">
          <Statistic
            title="Message cost (credits)"
            value={80}
            precision={0}
            className="px-4 py-3.5 rounded border border-solid border-neutral-200"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmSMS;
