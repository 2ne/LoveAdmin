import React from "react";
import { Button, Modal, Statistic } from "antd";

interface ConfirmSMSProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ConfirmSMS: React.FC<ConfirmSMSProps> = ({ visible, onOk, onCancel }) => {
  return (
    <Modal
      title="Confirm SMS"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Send now"
      className="max-w-xl"
    >
      {/*       <div className="px-5 pt-3 pb-1 rounded bg-neutral-100">
        <div className="mb-1 font-medium">Message preview</div>
        <p>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit...
        </p>
      </div> */}
      <div className="mb-6">
        <p>
          SMS will be sent to 80 out of 100 contacts. 20 contacts won't receive
          it due to missing number or because they have opted out.{" "}
          <span className="link">Export contacts.</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 mb-7">
        <div className="relative">
          <Statistic
            title="SMS credits"
            value={1000}
            precision={0}
            className="px-4 py-3.5 rounded bg-neutral-100"
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
            title="Message cost"
            value={80}
            precision={0}
            className="px-4 py-3.5 rounded bg-neutral-100"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmSMS;
