import React, { ReactElement } from "react";
import { Layout, Typography, Button, Form, Input } from "antd";
import PublicMarketingColumn from "../components/public-marketing-column";
import PublicHeader from "../components/public-header";
import PublicFormTemplate from "../components/public-form-template";
const { Paragraph } = Typography;

function SetNewPasswordJoinin(): ReactElement {
  const [SetNewPasswordJoininForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <PublicHeader product="joinin" />
      <Layout className="flex-row px-2 pb-2 rounded-t-lg bg-neutral-950">
        <PublicMarketingColumn />
        <PublicFormTemplate
          title="Create a new password"
          subtitle="jamestoone@gmail.com"
          center={true}
        >
          <Paragraph>
            Please set a new password for your{" "}
            <span className="font-medium">JoinIn</span> account. Use a strong
            password to keep your account secure.
          </Paragraph>
          <Form
            layout="vertical"
            form={SetNewPasswordJoininForm}
            name="SetNewPasswordJoininForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="hide-validation-asterix"
          >
            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Set password
              </Button>
            </Form.Item>
          </Form>
        </PublicFormTemplate>
      </Layout>
    </Layout>
  );
}

export default SetNewPasswordJoinin;
