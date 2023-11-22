import React, { useState } from "react";
import { Modal, Checkbox, Typography } from "antd";
import { Achieved } from "./icons";

const { Title } = Typography;

interface LevelAchievedModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  participant: string;
}

const LevelAchievedModal: React.FC<LevelAchievedModalProps> = ({
  visible,
  handleOk,
  handleCancel,
  participant,
}) => {
  const [newLevels, setNewLevels] = useState(false);
  const [moveClass, setMoveClass] = useState(false);
  const [printAward, setPrintAward] = useState(false);

  const handleConfirm = () => {
    handleOk();
  };

  return (
    <Modal
      title={
        <Title level={5}>
          <div className="relative flex items-center gap-2 mb-0.5">
            <div
              className="absolute w-16 rounded-full bg-yellow-100/50 -left-6 aspect-square"
              style={{
                maskImage: "radial-gradient(black, transparent)",
                WebkitMaskImage: "radial-gradient(black, transparent)",
              }}
            ></div>
            <div className="relative inline-flex items-center min-w-0 max-w-[calc(100%-9rem)]">
              <Achieved className="mr-2.5" />
              <div className="whitespace-nowrap">Level achieved</div>
              <div className="mx-1.5 text-subtitle">·</div>
              <div className="truncate text-subtitle">{participant}</div>
            </div>
          </div>
        </Title>
      }
      visible={visible}
      okText="Confirm"
      onCancel={handleCancel}
      onOk={handleConfirm}
      className="w-[32rem] [&_.ant-modal-content]:overflow-hidden"
    >
      <p className="relative">
        Once confirmed, a notification will be sent to the account owner. Choose
        from the following options to assist the participant's progress.
      </p>

      <div className="mt-4 space-y-1">
        <div>
          <Checkbox
            checked={newLevels}
            onChange={(e) => setNewLevels(e.target.checked)}
          >
            <span>Assign new level</span>
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={moveClass}
            onChange={(e) => setMoveClass(e.target.checked)}
          >
            <span>Move class</span>
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={printAward}
            onChange={(e) => setPrintAward(e.target.checked)}
          >
            <span>Issue a certificate</span>
          </Checkbox>
        </div>
      </div>
    </Modal>
  );
};

export default LevelAchievedModal;
