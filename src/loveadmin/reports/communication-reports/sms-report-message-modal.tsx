import React from "react";
import { Modal } from "antd";
import { SMSReportType } from "./sms-report";
import { formatDate } from "../../../components/date-formatter";

interface SMSReportMessageModalProps {
  visible: boolean;
  closeModal: () => void;
  modalData: SMSReportType | null;
}

const SMSReportMessageModal: React.FC<SMSReportMessageModalProps> = ({
  visible,
  closeModal,
  modalData,
}) => {
  return (
    <Modal
      title="SMS Message"
      visible={visible}
      onCancel={closeModal}
      footer={null}
      width={420}
    >
      {modalData && (
        <div className="mb-1">
          <div>{modalData.message}</div>
          <div className="mt-6 mb-3 border-b border-neutral-200/75"></div>
          <div className="flex text-subtitle">
            {modalData.senderName}
            <div className="mx-1">-</div> {formatDate(modalData.date, "full")}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SMSReportMessageModal;
