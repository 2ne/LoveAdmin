import React, { ReactElement, useState } from "react";
import { Layout, Typography, Button, Form, Input, Modal, Collapse } from "antd";
import PublicMarketingColumn from "../components/publicMarketingColumn";
import PublicHeader from "../components/publicHeader";
import PublicFormTemplate from "../components/publicFormTemplate";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Text, Link, Paragraph } = Typography;
const { Panel } = Collapse;

function LoginJoinin(): ReactElement {
  const [loginJoininForm] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [open, setOpen] = useState(false);

  return (
    <Layout className="min-h-screen">
      <PublicHeader product="joinin" />
      <Layout className="flex-row">
        <PublicMarketingColumn />
        <PublicFormTemplate title="Sign into your joinin acount" center={true}>
          <Form
            layout="vertical"
            form={loginJoininForm}
            name="loginJoininForm"
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
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              aria-label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="mr-1.5" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-between">
            <Button type="link" className="px-0" onClick={() => setOpen(true)}>
              Trouble signing in?
            </Button>
            <Button type="link" className="px-0">
              Reset password
            </Button>
          </div>
        </PublicFormTemplate>
      </Layout>
      <Modal
        title="Trouble signing in?"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        className="w-full max-w-xl"
      >
        <Collapse size="small" className="mb-1">
          <Panel
            header="How do I know if I have an existing joinin account?"
            key="1"
          >
            <Paragraph>
              If you've received an email from an organisation using joinin,
              you'll have a joinin account already. The email address that was
              contacted will be used for logging in. If you try to create an
              account again using the same email address, you will get an error
              telling you there is an account with that email address already
              and requesting that you login.
            </Paragraph>
          </Panel>
          <Panel
            header="My email or password is not being recognised, what do I do?"
            key="2"
          >
            <Paragraph>
              If you attempt to log in and you get the error “Login failed,
              Incorrect credentials” it means that either your email or password
              has not been recognised.
            </Paragraph>
            <Paragraph>
              If you know you have an account with this email, try a different
              password.
            </Paragraph>
            <Paragraph>
              Selecting Reset password and entering your email address will send
              a link to that email, where you can set a new password.
            </Paragraph>
            <Paragraph>
              If your email address was entered correctly and the email is not
              in your junk or spam folders, it may be because you do not have an
              account with that email address. To confirm that this email
              address is the one your account was created with, you can try to
              search for an old email from LoveAdmin. If you cannot find any
              contact from LoveAdmin to any email address you own, please
              contact the organisation directly to see if you are on their
              system.
            </Paragraph>
          </Panel>
          <Panel header="How do I create a joinin account?" key="3">
            <Paragraph>
              When you checkout a product from an organisation's shop page, you
              will be prompted to sign in or create an account. To create an
              account, select “Create account”. A form collecting basic account
              information will then appear.
            </Paragraph>
            <Paragraph>
              If you are purchasing a product on behalf of someone else, please
              note that the “Create account” form must be filled out with your
              details and not those of the child or dependant. As you continue
              with the checkout process after signing in, you will then be
              prompted to add the child or dependant's details.
            </Paragraph>
          </Panel>
          <Panel header="How do I reset my password?" key="4">
            <Paragraph>
              If you cannot remember your password and would like to reset it,
              click “Reset password” on the login screen and follow the
              instructions that arrive in the subsequent email.
            </Paragraph>
          </Panel>
          <Panel
            header="Why am I not receiving an email when trying to reset my password?"
            key="5"
          >
            <Paragraph>
              If your email address was entered correctly and the email is not
              in your junk or spam folders, it may be because you do not have an
              account with that email address. To confirm that this email
              address is the one your account was created with, you can try to
              search for an old email from LoveAdmin. If you cannot find any
              contact from LoveAdmin to any email address you own, please
              contact the organisation directly to see if you are on their
              system.
            </Paragraph>
          </Panel>
        </Collapse>
      </Modal>
    </Layout>
  );
}

export default LoginJoinin;
