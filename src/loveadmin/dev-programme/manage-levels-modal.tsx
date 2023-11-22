import React, { useState } from "react";
import { Modal, Checkbox, Typography } from "antd";
const { Title } = Typography;

interface ManageLevelsModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const ManageLevelsModal: React.FC<ManageLevelsModalProps> = ({
  visible,
  handleOk,
  handleCancel,
}) => {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([1]);
  const levels = Array.from({ length: 4 }, (_, i) => i + 1);
  const handleChange = (checkedValues: any[]) => {
    setSelectedLevels(checkedValues);
  };

  return (
    <>
      <Modal
        title={
          <Title level={5}>
            <div>
              <div className="inline-flex min-w-0 max-w-[calc(100%-3rem)] mb-1">
                <div className="whitespace-nowrap">Manage levels</div>
                <div className="mx-1.5">·</div>
                <div className="truncate">James Toone</div>
              </div>
              <div className="text-sm font-normal text-subtitle">
                Select participant levels
              </div>
            </div>
          </Title>
        }
        visible={visible}
        onOk={() => {
          console.log("Selected Levels:", selectedLevels);
          handleOk();
        }}
        onCancel={handleCancel}
        okText="Save"
        width={320}
      >
        <Checkbox.Group
          className="grid grid-cols-1 gap-2 px-3 py-2.5 mb-6 border rounded-md border-neutral-200"
          options={levels.map((level) => ({
            label: `Level ${level}`,
            value: level,
          }))}
          value={selectedLevels}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default ManageLevelsModal;
