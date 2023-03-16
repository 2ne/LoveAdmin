import React, { ReactElement, useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Form,
  Input,
  Space,
  Modal,
  Switch,
} from "antd";
import PublicMarketingColumn from "../components/publicMarketingColumn";
import PublicHeader from "../components/publicHeader";
const { Text, Title } = Typography;

interface AddressValues {
  addressLineOne: string;
  addressLineTwo: string;
  townCity: string;
  postcode: string;
}

interface AddressFormProps {
  open: boolean;
  onSave: (values: AddressValues) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  open,
  onSave,
  onCancel,
}) => {
  const [addressForm] = Form.useForm();
  return (
    <Modal
      width={368}
      maskClosable={false}
      open={open}
      title="Setup address"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        addressForm
          .validateFields()
          .then((values) => {
            onSave(values);
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

function SetupAccount(): ReactElement {
  const [detailsForm] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [modalValues, setModalValues] = useState<AddressValues>();
  const [validAddress, setValidAddress] = useState(true);

  const [inheritEmail, setInheritEmail] = useState(true);

  const onDetailsFinish = (values: any) => {
    console.log("Success:", values);
    setValidAddress(true);
    setStepTwo(true);
  };

  const onDetailsFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setValidAddress(!!modalValues);
  };

  const onSave = (values: any) => {
    console.log("Received values of form: ", values);
    detailsForm.setFieldsValue({ ...values });
    setModalValues(values);
    setOpen(false);
  };

  const onInheritEmailChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setInheritEmail(checked);
  };

  // just for prototype
  const [stepTwo, setStepTwo] = useState(false);

  return (
    <Layout className="min-h-screen">
      <PublicHeader product="joinin" />
      <Layout className="flex-row">
        <PublicMarketingColumn />
        <div className="flex-1 bg-white p-12 sm:p-14 sm:pt-[10vh]">
          <div className="w-full max-w-xs mx-auto space-y-6">
            <div>
              <Title level={4} className="my-0">
                Finish setting up your account
              </Title>
              <Title level={5} className="my-1 text-neutral-500">
                hsimpson@foxtv.com
              </Title>
            </div>
            <ol
              className="p-0 flex items-center gap-2 [&>li:first-child>div]:hidden"
              aria-label="Steps"
            >
              {stepTwo && (
                <li className="contents [&+li>div]:bg-primary-500">
                  <div className="flex-grow w-full h-px bg-neutral-300"></div>
                  <i className="grid flex-shrink-0 w-4 h-4 border border-solid rounded-full place-items-center border-primary-500 bg-cyan-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </i>
                </li>
              )}
              <li className="contents">
                <div className="flex-grow w-full h-px bg-neutral-300"></div>
                <i className="grid flex-shrink-0 w-4 h-4 bg-white border border-solid rounded-full place-items-center border-primary-500">
                  <div className="w-1 h-1 rounded-full bg-primary-500"></div>
                </i>
              </li>
              {!stepTwo && (
                <li className="contents">
                  <div className="flex-grow w-full h-px bg-neutral-300"></div>
                  <i className="flex-shrink-0 w-4 h-4 bg-transparent border border-solid rounded-full border-neutral-300"></i>
                </li>
              )}
            </ol>
            {/* Current step 
              <li className="contents">
                <div className="flex-grow w-full h-px bg-neutral-300"></div>
                <i className="grid flex-shrink-0 w-4 h-4 bg-white border border-solid rounded-full place-items-center border-primary-500">
                  <div className="w-1 h-1 rounded-full bg-primary-500"></div>
                </i>
              </li>*/}
            {/* Pending step 
              <li className="contents">
                <div className="flex-grow w-full h-px bg-neutral-300"></div>
                <i className="flex-shrink-0 w-4 h-4 bg-transparent border border-solid rounded-full border-neutral-300"></i>
              </li>*/}
            {/* Done step 
              <li className="contents [&+li>div]:bg-primary-500">
                <div className="flex-grow w-full h-px bg-neutral-300"></div>
                <i className="grid flex-shrink-0 w-4 h-4 border border-solid rounded-full place-items-center border-primary-500 bg-cyan-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </i>
              </li>*/}
            {!stepTwo && (
              <section className="space-y-6">
                {/* Step 1 */}
                <div>
                  <Text className="my-0 font-medium">
                    Step 1 · Homer Simpson's details
                  </Text>
                </div>
                <Form
                  layout="vertical"
                  form={detailsForm}
                  name="detailsForm"
                  onFinish={onDetailsFinish}
                  onFinishFailed={onDetailsFinishFailed}
                  className="hide-validation-asterix"
                >
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[{ required: true, message: "Please enter a name" }]}
                  >
                    <Input value="Homer" />
                  </Form.Item>
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter a name" }]}
                  >
                    <Input value="Simpson" />
                  </Form.Item>
                  <Form.Item label="Date of birth" extra="Example · 31/04/1970">
                    <Space.Compact className="-space-x-px [&_.ant-form-item-label]:sr-only">
                      <Form.Item
                        name="dobDD"
                        label="Day"
                        rules={[{ required: true, message: "" }]}
                        className="mb-0"
                      >
                        <Input
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="DD"
                        />
                      </Form.Item>
                      <Form.Item
                        name="dobMM"
                        label="Month"
                        rules={[{ required: true, message: "" }]}
                        className="mb-0"
                      >
                        <Input
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="MM"
                        />
                      </Form.Item>
                      <Form.Item
                        name="dobYYYY"
                        label="Year"
                        rules={[{ required: true, message: "" }]}
                        className="mb-0"
                      >
                        <Input
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="YYYY"
                        />
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item
                    label="Mobile number"
                    name="mobileNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a mobile number",
                      },
                    ]}
                  >
                    <Input type="tel" />
                  </Form.Item>
                  <Form.Item label="Address">
                    <Form.Item
                      name="addressLineOne"
                      rules={[{ required: true, message: "" }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item
                      name="addressLineTwo"
                      rules={[{ required: false }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item
                      name="townCity"
                      rules={[{ required: true, message: "" }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item
                      name="postcode"
                      rules={[{ required: true, message: "" }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Button
                      block={true}
                      type={!modalValues ? "link" : "text"}
                      onClick={() => {
                        setOpen(true);
                      }}
                      className={`${
                        !modalValues
                          ? "border-primary-500 justify-center"
                          : "border-neutral-300 hover:bg-white hover:border-primary-500"
                      }
                  ${
                    !modalValues &&
                    !validAddress &&
                    " border-error-500 text-error-500 "
                  }
                   border border-solid `}
                    >
                      {!modalValues ? (
                        "Add address"
                      ) : (
                        <div className="-ml-1 truncate">
                          <span>{modalValues.addressLineOne}, </span>
                          {modalValues.addressLineTwo && (
                            <span>{modalValues.addressLineTwo}, </span>
                          )}
                          <span>{modalValues.townCity}, </span>
                          <span>{modalValues.postcode}</span>
                        </div>
                      )}
                    </Button>
                    {!modalValues && !validAddress && (
                      <div className="ant-form-item-explain-error">
                        Please add an address
                      </div>
                    )}
                    <AddressForm
                      open={open}
                      onSave={onSave}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="flex justify-end">
                      <Button type="primary" htmlType="submit">
                        Next
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </section>
            )}
            {stepTwo && (
              <section className="space-y-6">
                {/* Step 2 */}
                <div>
                  <Text className="my-0 font-medium">
                    Step 2 · Bart Simpson's details
                  </Text>
                </div>
                <Form
                  layout="vertical"
                  form={detailsForm}
                  name="detailsForm"
                  onFinish={onDetailsFinish}
                  onFinishFailed={onDetailsFinishFailed}
                  className="hide-validation-asterix"
                >
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[{ required: true, message: "Please enter a name" }]}
                  >
                    <Input value="Homer" />
                  </Form.Item>
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter a name" }]}
                  >
                    <Input value="Simpson" />
                  </Form.Item>
                  <Form.Item label="Date of birth" extra="Example · 31/04/1970">
                    <Space.Compact className="-space-x-px">
                      <Form.Item
                        name="dobDD"
                        rules={[{ required: true, message: "" }]}
                        className="mb-0"
                      >
                        <Input
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="DD"
                        />
                      </Form.Item>
                      <Form.Item
                        name="dobMM"
                        rules={[{ required: true, message: "" }]}
                        className="mb-0"
                      >
                        <Input
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="MM"
                        />
                      </Form.Item>
                      <Form.Item
                        name="dobYYYY"
                        rules={[{ required: true, message: "" }]}
                        className="mb-0"
                      >
                        <Input
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="YYYY"
                        />
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item label="Address">
                    <Form.Item
                      name="addressLineOne"
                      rules={[{ required: true, message: "" }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item
                      name="addressLineTwo"
                      rules={[{ required: false }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item
                      name="townCity"
                      rules={[{ required: true, message: "" }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item
                      name="postcode"
                      rules={[{ required: true, message: "" }]}
                      hidden
                    >
                      <Input readOnly />
                    </Form.Item>
                    <Button
                      block={true}
                      type={!modalValues ? "link" : "text"}
                      onClick={() => {
                        setOpen(true);
                      }}
                      className={`${
                        !modalValues
                          ? "border-primary-500 justify-center"
                          : "border-neutral-300 hover:bg-white hover:border-primary-500"
                      }
                  ${
                    !modalValues &&
                    !validAddress &&
                    " border-error-500 text-error-500 "
                  }
                   border border-solid `}
                    >
                      {!modalValues ? (
                        "Add address"
                      ) : (
                        <div className="-ml-1 truncate">
                          <span>{modalValues.addressLineOne}, </span>
                          {modalValues.addressLineTwo && (
                            <span>{modalValues.addressLineTwo}, </span>
                          )}
                          <span>{modalValues.townCity}, </span>
                          <span>{modalValues.postcode}</span>
                        </div>
                      )}
                    </Button>
                    {!modalValues && !validAddress && (
                      <div className="ant-form-item-explain-error">
                        Please add an address
                      </div>
                    )}
                    <AddressForm
                      open={open}
                      onSave={onSave}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </Form.Item>
                  <Form.Item valuePropName="checked">
                    <div className="flex items-center gap-2">
                      <Switch
                        size="small"
                        defaultChecked
                        onChange={onInheritEmailChange}
                      />
                      <Text className="-mt-px">
                        Use my email address for notifications
                      </Text>
                    </div>
                  </Form.Item>
                  {!inheritEmail && (
                    <Form.Item
                      className="-mt-3.5"
                      label="Email address"
                      name="emailAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please enter an email address",
                        },
                      ]}
                    >
                      <Input type="email" />
                    </Form.Item>
                  )}
                  <Form.Item>
                    <div className="flex justify-between">
                      <Button onClick={() => setStepTwo(false)}>Back</Button>
                      <Button type="primary" htmlType="submit">
                        Finish
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </section>
            )}
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

export default SetupAccount;
