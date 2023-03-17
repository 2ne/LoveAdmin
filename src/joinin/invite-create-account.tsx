import React, { ReactElement } from "react";
import { Layout, Typography, Button, Form, Input, Checkbox } from "antd";
import PublicMarketingColumn from "../components/public-marketing-column";
import PublicHeader from "../components/public-header";
import PublicFormTemplate from "../components/public-form-template";
const { Link, Paragraph } = Typography;

function InviteCreateAccount(): ReactElement {
  const [inviteCreateAccountForm] = Form.useForm();

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
        <PublicFormTemplate
          title="Create your joinin account"
          subtitle="jamestoone@gmail.com"
          center={true}
        >
          <Paragraph>
            Please set a password for your joinin account. This will enable you
            to connect with
            <span className="font-medium"> Maidenhead Squash Club.</span>
          </Paragraph>
          <Form
            layout="vertical"
            form={inviteCreateAccountForm}
            name="inviteCreateAccountForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="hide-validation-asterix"
          >
            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                { required: true, message: "Please setup a new password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="acceptTermsConditions"
              valuePropName="checked"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: "Please accept terms to create an account",
                },
              ]}
            >
              <Checkbox>
                I've read and agree with the{" "}
                <Link href="https://ant.design" target="_blank">
                  terms & conditions
                </Link>
              </Checkbox>
            </Form.Item>
            <Form.Item name="acceptMarketing" valuePropName="checked">
              <Checkbox>I'd like to receive updates from joinin</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create account
              </Button>
            </Form.Item>
          </Form>
        </PublicFormTemplate>
      </Layout>
    </Layout>
  );
}

export default InviteCreateAccount;
