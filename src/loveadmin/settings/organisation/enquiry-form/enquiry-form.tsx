import React, { useState } from "react";
import { Breadcrumb, Button, Layout, Tooltip, message, Select } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Form, Input, Switch } from "antd";
import LoveAdminHeader from "../../../../components/header";
const { Option } = Select;
const { Content } = Layout;

interface Contact {
  name: string;
}

const contacts: Contact[] = [
  { name: "James Toone" },
  { name: "Gareth Mace" },
  { name: "Rob Anderson" },
  { name: "Mark Smith" },
  { name: "Luke Moulange" },
  { name: "Georges Panis" },
  { name: "Amir Razavi" },
];

const SettingsEnquiryForm: React.FC = () => {
  const [form] = Form.useForm();
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleChange = (selectedItems: string[]) => {
    setSelectedContacts(selectedItems);
  };

  // Define your initial form values here, including isEnabled
  const initialFormValues = {
    isEnabled: false,
    label: "",
    title: "",
    description: "",
    messagePlaceholder: "",
    notificationContacts: [],
  };

  // Function to check if form values have changed
  const onFormChange = (_, allValues: any) => {
    setFormChanged(
      JSON.stringify(allValues) !== JSON.stringify(initialFormValues)
    );
  };

  const onFinish = (values: any) => {
    setFormChanged(false); // Reset formChanged state
    message.success("Enquiry form updated"); // Show success message
  };

  const handleSaveChanges = () => {
    form.submit();
  };

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="settings">
            <Link to="/Settings">Settings</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="organisation">
            <Link to="/Settings/Organisation">Organisation</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="enquiryForm">Enquiry Form</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Content className="relative w-full max-w-screen-lg p-6 pb-16 mx-auto md:flex md:gap-12">
          <div>
            <Title level={5} className="mb-2.5">
              Enquiry Form
            </Title>
            <p className="mb-8">
              This is used to collect information from visitors of your JoinIn
              shop. Use the settings below to customise the form. All
              submissions can be found in the{" "}
              <Link className="font-medium" to={"/Reports/Enquiries"}>
                Enquiries Report.
              </Link>
            </p>
            <Form
              form={form}
              layout="horizontal"
              initialValues={initialFormValues}
              onFieldsChange={onFormChange}
              onFinish={onFinish}
              className="[&_.ant-form-item-row]:grid [&_.ant-form-item-row]:gap-1 [&_.ant-form-item-row]:md:gap-12 [&_label]:h-auto [&_.ant-form-item-row]:md:grid-cols-2 [&_.ant-form-item-label]:text-left [&_.ant-form-item-label]:whitespace-normal [&_.ant-form-item]:mb-6 [&_.ant-form-item]:pt-6 [&_.ant-form-item]:border-t [&_.ant-form-item]:border-neutral-200/75"
            >
              <Form.Item
                className="mb-4 ant-form-item-switch [&_.ant-form-item-control-input]:min-h-0 [&_.ant-form-item-control-input]:-mt-px"
                label={
                  <div className="space-y-1">
                    <label>Enable enquiry form</label>
                    <p className="font-normal text-subtitle [text-wrap:pretty]">
                      Show the enquiry form link in your JoinIn shop.
                    </p>
                  </div>
                }
                name="isEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                label={
                  <div className="space-y-1">
                    <label>Label</label>
                    <p className="font-normal text-subtitle [text-wrap:pretty]">
                      Personalise the link customers will use to access your
                      enquiry form.
                    </p>
                  </div>
                }
                name="label"
              >
                <Input placeholder="Enquiry Form" />
              </Form.Item>
              <Form.Item
                label={
                  <div className="space-y-1">
                    <label>Title</label>
                    <p className="font-normal text-subtitle [text-wrap:pretty]">
                      Change the heading for your form. Options could include
                      'Contact us' or 'Get in touch'.
                    </p>
                  </div>
                }
                name="title"
              >
                <Input placeholder="Enquiry Form" />
              </Form.Item>
              <Form.Item
                name="description"
                label={
                  <div className="space-y-1">
                    <label>Description</label>
                    <p className="font-normal text-subtitle [text-wrap:pretty]">
                      Tell customers the purpose of your form. Try to keep the
                      description short and below 30 words.
                    </p>
                  </div>
                }
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Looking for more information on the products and services we provide? Send us a message and we will get back to you as quick as possible!"
                />
              </Form.Item>
              <Form.Item
                label={
                  <div className="space-y-1">
                    <label>Message placeholder</label>
                    <p className="font-normal text-subtitle [text-wrap:pretty]">
                      Tell your customers what information they should give you
                      in order to help them with their enquiry.
                    </p>
                  </div>
                }
                name="messagePlaceholder"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Tell us about which product you are interested in and what information you would like us to provide to you."
                />
              </Form.Item>
              <Form.Item
                label={
                  <div className="space-y-1">
                    <label>Notification contacts</label>
                    <p className="font-normal text-subtitle [text-wrap:pretty]">
                      Select staff accounts to recieve notifications when the
                      form is submitted.
                    </p>
                  </div>
                }
                name="notificationEmail"
              >
                <Select
                  placement="topLeft"
                  mode="multiple"
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select contacts"
                  value={selectedContacts}
                  onChange={handleChange}
                  filterOption={(input, option) =>
                    option?.children
                      ? option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      : false
                  }
                >
                  {contacts.map((contact) => (
                    <Option key={contact.name} value={contact.name}>
                      {contact.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>
          <aside className="md:w-36 lg:w-48 md:shrink-0 max-md:mt-8 max-md:border-t max-md:border-neutral-200 max-md:pt-8">
            <div className="md:sticky md:top-3">
              <Title level={5} className="mb-3 max-md:hidden">
                Settings
              </Title>
              <div className="space-y-4 md:space-y-3">
                <Button block>
                  View form
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 -mr-0.5 ml-2"
                  >
                    <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                    <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
                  </svg>
                </Button>
                <Tooltip title={!formChanged ? "No changes" : ""}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={!formChanged}
                    onClick={handleSaveChanges}
                  >
                    Save
                  </Button>
                </Tooltip>
              </div>
            </div>
          </aside>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SettingsEnquiryForm;
