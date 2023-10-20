import React, { useState } from "react";
import { Modal, Button, Checkbox, message } from "antd";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";

const ProductSettingsAmend = () => {
  const [isOverrideChecked, setOverrideChecked] = useState(false);
  const [isActionConfirmed, setIsActionConfirmed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [showValidationError, setShowValidationError] = useState(false);

  const handleSaveChanges = () => {
    if (!isActionConfirmed) {
      message.error("You must confirm the changes before proceeding.");
      setShowValidationError(true);
      return;
    }

    console.log("Changes saved");
    setIsModalVisible(false);
  };

  const data = [
    {
      label: "Session price",
      oldValue: "£12.00",
      newValue: "£15.00",
    },
    {
      label: "Receive the first payment by",
      oldValue: "London & Zurich",
      newValue: "PayPal",
    },
    {
      label: "Date on which to consider the next 'as of date'",
      oldValue: "27 Sep",
      newValue: "29 Sep",
    },
    {
      label: "Name of product",
      oldValue: "Non-member Free Session Age 4-9",
      newValue: "Non-member Free Session Age 6-9",
    },
  ];

  return (
    <Modal
      title="Confirm product changes - Bubble the Seahorse"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      className="w-full max-w-[34rem]"
      maskClosable={false}
      footer={[
        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSaveChanges}>
          Confirm
        </Button>,
      ]}
    >
      <form>
        <div className="p-3 mb-6 border rounded border-neutral-200 bg-neutral-50">
          <div className="grid grid-cols-7 gap-y-4 gap-x-2">
            {data.map((item) => (
              <>
                <div className="col-span-3 mr-3">{item.label}</div>
                <div className="col-span-2 font-medium line-through text-danger-600">
                  {item.oldValue}
                </div>
                <div className="col-span-2 font-medium text-title">
                  {item.newValue}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex items-start mb-4">
          <label className="flex items-start flex-grow cursor-pointer">
            <Checkbox
              onChange={() => {
                setIsActionConfirmed(!isActionConfirmed);
                setShowValidationError(false);
              }}
              className="mr-2"
            />
            <div className="flex-grow select-none">
              <span className="flex items-center mr-2 font-medium">
                <span
                  className={
                    showValidationError ? "text-danger-600 underline" : ""
                  }
                >
                  I confirm the changes
                </span>
                <span className="mx-1.5 text-subtitle">·</span>
                <span className="text-subtitle">Required</span>
              </span>
              <p className="flex-shrink text-sm">
                Ensure you're aware of the implications this may have on
                customer retention and satisfaction before confirming.
              </p>
            </div>
          </label>
        </div>

        <div className="flex items-start mb-7">
          <label className="flex items-start flex-grow cursor-pointer">
            <Checkbox
              onChange={() => setOverrideChecked(!isOverrideChecked)}
              className="mr-2"
            />
            <div className="flex-grow select-none">
              <span className="mr-2 font-medium">Override validation</span>
              <p className="flex-shrink text-sm">
                Bypassing this will process payments even if users haven't given
                consent or have missing conditions.
              </p>
            </div>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default ProductSettingsAmend;
