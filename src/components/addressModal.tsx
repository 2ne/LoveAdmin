import React from "react";
import { Form, Input, Modal } from "antd";

export interface AddressValues {
  addressLineOne: string;
  addressLineTwo: string;
  townCity: string;
  postcode: string;
}

interface AddressModalProps {
  open: boolean;
  onSave: (values: AddressValues) => void;
  onCancel: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  open,
  onSave,
  onCancel,
}) => {
  const [addressForm] = Form.useForm();
  return (
    <Modal
      width={368}
      maskClosable={false}
      visible={open}
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
        initialValues={{ modifier: "public" }}
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
