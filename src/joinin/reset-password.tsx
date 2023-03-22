import React, { ReactElement } from "react";
import { Layout, Typography, Button, Form, Input, Alert } from "antd";
import PublicMarketingColumn from "../components/public-marketing-column";
import PublicHeader from "../components/public-header";
import PublicFormTemplate from "../components/public-form-template";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

function ResetPasswordJoinin(): ReactElement {
  const [resetPasswordJoininForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="min-h-screen">
      <PublicHeader product="joinin" />
      <Layout className="flex-row">
        <PublicMarketingColumn />
        <PublicFormTemplate title="Reset your password" center={true}>
          <Paragraph>
            Enter the email address associated with your account, and we'll send
            you a link to reset your password.
          </Paragraph>
          <Form
            layout="vertical"
            form={resetPasswordJoininForm}
            name="resetPasswordJoininForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="hide-validation-asterix"
          >
            <Form.Item
              aria-label="Email address"
              name="emailAddress"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="mr-1.5" />}
                placeholder="Email address"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Continue
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center">
            <Link to="/LoginJoinin">Back to sign in</Link>
          </div>
          <div>
            <Alert
              className="mt-[5vh] text-center"
              message="Having trouble logging in? Please contact your
            organisation for help."
            />
          </div>
        </PublicFormTemplate>
      </Layout>
    </Layout>
  );
}

export default ResetPasswordJoinin;
