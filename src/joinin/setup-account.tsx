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
const { Text, Title } = Typography;
const { Header } = Layout;

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
      <Header className="flex items-center px-4 border-none shadow-none bg-neutral-800">
        <h1 className="contents">
          <span className="sr-only">joinin.online</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="106"
            height="34"
            viewBox="0 0 106 34"
            fill="none"
            className="w-[5.5rem] text-primary-500"
          >
            <path
              d="M8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3Z"
              fill="currentColor"
            />
            <path
              d="M6 9.5V27.5C6 29.7091 4.20914 31.5 2 31.5V31.5"
              stroke="currentColor"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
            <path
              d="M35 3C35 4.10457 34.1046 5 33 5C31.8954 5 31 4.10457 31 3C31 1.89543 31.8954 1 33 1C34.1046 1 35 1.89543 35 3Z"
              fill="currentColor"
            />
            <path
              d="M33 10V23"
              stroke="currentColor"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
            <path
              d="M40 23V15.5C40 12.4624 42.4624 10 45.5 10V10C48.5376 10 51 12.4624 51 15.5V23"
              stroke="currentColor"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
            <path
              d="M65 23V15.5C65 12.4624 67.4624 10 70.5 10V10C73.5376 10 76 12.4624 76 15.5V23"
              stroke="#fff"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
            <path
              d="M60 3C60 4.10457 59.1046 5 58 5C56.8954 5 56 4.10457 56 3C56 1.89543 56.8954 1 58 1C59.1046 1 60 1.89543 60 3Z"
              fill="#fff"
            />
            <path
              d="M58 10V23"
              stroke="#fff"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
            <path
              d="M19.5 23C15.9101 23 13 20.0899 13 16.5C13 12.9101 15.9101 10 19.5 10C23.0899 10 26 12.9101 26 16.5C26 20.0899 23.0899 23 19.5 23Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
            <path
              d="M83 9L96.9059 15.0838C97.7048 15.4334 97.7048 16.5666 96.9059 16.9162L83 23"
              stroke="currentColor"
              strokeWidth="4"
              strokeMiterlimit="3.99393"
              strokeLinecap="round"
            />
          </svg>
        </h1>
      </Header>
      <Layout className="flex-row">
        <div className="sticky top-0 flex-1 hidden max-h-screen lg:block">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://app.joinin.online/images/about-hero.jpeg"
            alt="Background image showing a club photo in a gym"
          />
          <div className="absolute inset-0 grid w-full h-full p-8 bg-primary-500/70 place-items-center">
            <div className="relative w-full mx-auto leading-normal text-white max-w-prose">
              <div className="flex items-center mb-6 text-3xl tracking-tight">
                <Title level={2} className="my-0 text-white">
                  Ready to take part?
                </Title>
              </div>
              <Title level={4} className="my-0 text-primary-50">
                You're here because your club or organisation uses joinin's
                software. Sign in to your account to register for classes, renew
                memberships, buy merchandise, and so much more!
              </Title>
            </div>
          </div>
        </div>
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
