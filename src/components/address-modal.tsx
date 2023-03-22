import React from "react";
import { Form, Input, Modal } from "antd";

export interface AddressValues {
  addressLineOne: string;
  addressLineTwo: string;
  townCity: string;
  postcode: string;
}

interface AddressModalProps {
  openModal: boolean;
  onModalSave: (values: AddressValues) => void;
  onModalCancel: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  openModal: isModalOpen,
  onModalSave: onSave,
  onModalCancel: onCancel,
}) => {
  const [addressForm] = Form.useForm();
  return (
    <Modal
      width={368}
      maskClosable={false}
      open={isModalOpen}
      title="Setup address"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        addressForm
          .validateFields()
          .then((values) => {
            onSave(values as AddressValues);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={addressForm}
        layout="vertical"
        name="addressForm"
        className="hide-validation-asterix"
      >
        <Form.Item
          label="Address line 1"
          name="addressLineOne"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address line 2 (optional)" name="addressLineTwo">
          <Input />
        </Form.Item>
        <Form.Item
          label="Town or city"
          name="townCity"
          rules={[{ required: true, message: "Please enter a town or city" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Postcode"
          name="postcode"
          rules={[{ required: true, message: "Please enter a postcode" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressModal;
