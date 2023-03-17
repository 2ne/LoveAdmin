import React, { ReactElement } from "react";
import { Layout, Typography, Button, Form, Input } from "antd";
import PublicMarketingColumn from "../components/publicMarketingColumn";
import PublicHeader from "../components/publicHeader";
import PublicFormTemplate from "../components/publicFormTemplate";
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
            The email address you enter must belong to an
            <span className="font-medium"> existing joinin account.</span>
          </Paragraph>
          <Paragraph>
            If you do not receive the reset password email then please contact
            your organisation to confirm your account email address.
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
                prefix={<UserOutlined className="mr-1.5" />}
                placeholder="Email address"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send link to email
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center">
            <Link to="/LoginJoinin">Back to sign in</Link>
          </div>
        </PublicFormTemplate>
      </Layout>
    </Layout>
  );
}

export default ResetPasswordJoinin;
