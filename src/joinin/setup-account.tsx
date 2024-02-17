import React, { ReactElement, useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Form,
  Input,
  Space,
  Switch,
  Tooltip,
} from "antd";
import PublicMarketingColumn from "../components/public-marketing-column";
import PublicHeader from "../components/public-header";
import AddressModal, { AddressValues } from "../components/address-modal";
import classNames from "classnames";
import Steps, { Step } from "../components/steps";
import PublicFormTemplate from "../components/public-form-template";
const { Text } = Typography;

function getInitialSteps(): Step[] {
  return [
    { name: "Step 1 · Homer Simpson's details", status: "current" },
    {
      name: "Step 2 · Bart Simpson's details",
      status: "incomplete",
    },
  ];
}

interface AccountHolderFormValues {
  firstName: string;
  lastName: string;
  dobDD: number;
  dobMM: number;
  dobYYYY: number;
  mobileNumber: string;
  addressLineOne: string;
  addressLineTwo?: string;
  postcode: string;
  townCity: string;
}

interface BeneficiaryFormValues {
  firstName: string;
  lastName: string;
  dobDD: number;
  dobMM: number;
  dobYYYY: number;
  addressLineOne: string;
  addressLineTwo?: string;
  postcode: string;
  townCity: string;
  emailAddress?: string;
}

function SetupAccount(): ReactElement {
  const [accountHolderForm] = Form.useForm();
  React.useEffect(() => {
    accountHolderForm.setFieldsValue({
      firstName: "Homer",
      lastName: "Simpson",
    });
  }, []);

  const [beneficiaryForm] = Form.useForm();
  React.useEffect(() => {
    beneficiaryForm.setFieldsValue({
      firstName: "Bart",
      lastName: "Simpson",
    });
  }, []);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [modalAddressValues, setModalAddressValues] = useState<AddressValues>();
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [inheritAccountHolderEmail, setInheritAccountHolderEmail] =
    useState(true);
  const [
    inheritAccountHolderMobileNumber,
    setInheritAccountHolderMobileNumber,
  ] = useState(true);

  const onDetailsFinish = (values: any) => {
    setIsValidAddress(true);
    goToStep(2);
  };

  const onDetailsFinishFailed = (errorInfo: any) => {
    setIsValidAddress(!!modalAddressValues);
  };

  const onSave = (values: any) => {
    accountHolderForm.setFieldsValue({ ...values });
    setModalAddressValues(values);
    setIsAddressModalOpen(false);
  };

  const onInheritEmailChange = (checked: boolean) => {
    setInheritAccountHolderEmail(checked);
  };

  const onInheritMobileNumberChange = (checked: boolean) => {
    setInheritAccountHolderMobileNumber(checked);
  };

  const [steps, setSteps] = useState<Step[]>(getInitialSteps);

  function getCurrentStep(steps: Step[]): Step | undefined {
    return steps.find((step) => step.status === "current");
  }

  const currentStep = getCurrentStep(steps);

  function goToStep(stepNumber: number) {
    const updatedSteps = steps.map((step, index) => {
      let newStatus: Step["status"];

      if (index < stepNumber - 1) {
        newStatus = "complete";
      } else if (index === stepNumber - 1) {
        newStatus = "current";
      } else {
        newStatus = "incomplete";
      }

      return { ...step, status: newStatus };
    });

    setSteps(updatedSteps);
  }

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <PublicHeader product="joinin" />
      <Layout className="grid grid-cols-1 rounded-t-lg lg:grid-cols-5 xl:grid-cols-3 bg-neutral-950">
        <PublicMarketingColumn />
        <PublicFormTemplate
          title="Finish setting up your account"
          subtitle="hsimpson@foxtv.com"
          divider={false}
        >
          <Steps steps={steps} />
          {currentStep && currentStep.name.includes("Step 1") && (
            <section className="space-y-6">
              <div>
                {currentStep && (
                  <Text className="my-0 font-medium">{currentStep.name}</Text>
                )}
              </div>
              <Form
                layout="vertical"
                form={accountHolderForm}
                name="accountHolderForm"
                onFinish={onDetailsFinish}
                onFinishFailed={onDetailsFinishFailed}
                className="hide-validation-asterix"
              >
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input />
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
                    onClick={() => {
                      setIsAddressModalOpen(true);
                    }}
                    className={classNames({
                      "border border-solid": true,
                      "border-primary-500 text-primary-600 hover:text-primary-500 hover:underline":
                        !modalAddressValues && isValidAddress,
                      "border-danger-500 text-danger-500 hover:text-danger-400 hover:underline":
                        !modalAddressValues && !isValidAddress,
                      "border-neutral-300 justify-start hover:bg-white hover:border-primary-500":
                        modalAddressValues && isValidAddress,
                    })}
                  >
                    {!modalAddressValues ? (
                      "Add address"
                    ) : (
                      <div className="-ml-1 truncate">
                        <span>{modalAddressValues.addressLineOne}, </span>
                        {modalAddressValues.addressLineTwo && (
                          <span>{modalAddressValues.addressLineTwo}, </span>
                        )}
                        <span>{modalAddressValues.townCity}, </span>
                        <span>{modalAddressValues.postcode}</span>
                      </div>
                    )}
                  </Button>
                  {!modalAddressValues && !isValidAddress && (
                    <div className="ant-form-item-explain-error">
                      Please add an address
                    </div>
                  )}
                  <AddressModal
                    openModal={isAddressModalOpen}
                    onModalSave={onSave}
                    onModalCancel={() => {
                      setIsAddressModalOpen(false);
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
          {currentStep && currentStep.name.includes("Step 2") && (
            <section className="space-y-6">
              <div>
                <Text className="my-0 font-medium">
                  <div>
                    {currentStep && (
                      <Text className="my-0 font-medium">
                        {currentStep.name}
                      </Text>
                    )}
                  </div>
                </Text>
              </div>
              <Form
                layout="vertical"
                form={beneficiaryForm}
                name="beneficiaryForm"
                onFinish={onDetailsFinish}
                onFinishFailed={onDetailsFinishFailed}
                className="hide-validation-asterix"
              >
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input />
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
                    type={!modalAddressValues ? "link" : "text"}
                    onClick={() => {
                      setIsAddressModalOpen(true);
                    }}
                    className={classNames({
                      "border border-solid": true,
                      "border-primary-500":
                        !modalAddressValues && isValidAddress,
                      "border-danger-500 text-danger-500 hover:text-danger-400":
                        !modalAddressValues && !isValidAddress,
                      "border-neutral-300 justify-start hover:bg-white hover:border-primary-500":
                        modalAddressValues && isValidAddress,
                    })}
                  >
                    {!modalAddressValues ? (
                      "Add address"
                    ) : (
                      <div className="-ml-1 truncate">
                        <span>{modalAddressValues.addressLineOne}, </span>
                        {modalAddressValues.addressLineTwo && (
                          <span>{modalAddressValues.addressLineTwo}, </span>
                        )}
                        <span>{modalAddressValues.townCity}, </span>
                        <span>{modalAddressValues.postcode}</span>
                      </div>
                    )}
                  </Button>
                  {!modalAddressValues && !isValidAddress && (
                    <div className="ant-form-item-explain-error">
                      Please add an address
                    </div>
                  )}
                  <AddressModal
                    openModal={isAddressModalOpen}
                    onModalSave={onSave}
                    onModalCancel={() => {
                      setIsAddressModalOpen(false);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  valuePropName="checked"
                  label="Notifications"
                  className="!mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Switch
                      size="small"
                      defaultChecked
                      onChange={onInheritEmailChange}
                    />
                    <Tooltip title="jamestoone@gmail.com" placement="topRight">
                      <Text className="-mt-px truncate">
                        Use my email address -{" "}
                        <span
                          className={
                            inheritAccountHolderEmail
                              ? "font-medium"
                              : "text-neutral-500"
                          }
                        >
                          jamestoone@gmail.com
                        </span>
                      </Text>
                    </Tooltip>
                  </div>
                </Form.Item>
                {!inheritAccountHolderEmail && (
                  <Form.Item
                    className="-mt-1"
                    label=""
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
                <Form.Item valuePropName="checked">
                  <div className="flex items-center gap-2">
                    <Switch
                      size="small"
                      defaultChecked
                      onChange={onInheritMobileNumberChange}
                    />
                    <Tooltip title="07987664772" placement="topRight">
                      <Text className="-mt-px truncate">
                        Use my mobile number -{" "}
                        <span
                          className={
                            inheritAccountHolderMobileNumber
                              ? "font-medium"
                              : "text-neutral-500"
                          }
                        >
                          07987664772
                        </span>
                      </Text>
                    </Tooltip>
                  </div>
                </Form.Item>
                {!inheritAccountHolderMobileNumber && (
                  <Form.Item
                    className="-mt-6"
                    label=""
                    name="mobileNumber"
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
                    <Button onClick={() => goToStep(1)}>Back</Button>
                    <Button type="primary" htmlType="submit">
                      Finish
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </section>
          )}
        </PublicFormTemplate>
      </Layout>
    </Layout>
  );
}

export default SetupAccount;
