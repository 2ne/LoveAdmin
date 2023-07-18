import React, { ReactElement, useState } from "react";
import { DeleteOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  Breadcrumb,
  Statistic,
  Input,
  TabsProps,
  Tabs,
  Table,
  Popconfirm,
  message,
  Modal,
  Form,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
const { Header, Content } = Layout;
const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  content: string;
  created: string;
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success("Template deleted");
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
};

const data: DataType[] = [
  {
    key: "1",
    name: "Payment due",
    content:
      "Dear {{accountOwner.FirstName}}, your payment of PRODUCT NAME is due. Thanks, {{organisation.Name}}.",
    created: "James Toone · 7 Feb 09:59",
  },
  {
    key: "2",
    name: "Special offer",
    content:
      "Dear {{accountOwner.FirstName}}, we have a special offer on PRODUCT NAME for you. Don't miss out! Thanks, {{organisation.Name}}.",
    created: "James Toone · 7 Feb 09:59",
  },
  {
    key: "3",
    name: "New event",
    content:
      "Dear {{accountOwner.FirstName}}, we have a new event coming up EVENT NAME. Hope to see you there! Thanks, {{organisation.Name}}.",
    created: "James Toone · 7 Feb 09:59",
  },
];

function SMSSettings(): ReactElement {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DataType | null>(null);

  const onChange = (key: string) => {
    console.log(key);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div>
          <Button
            className="!px-0"
            type="link"
            onClick={() => {
              setEditingTemplate(record);
              setIsModalVisible(true);
            }}
          >
            {record.name}
          </Button>
          {/* ...rest of your code */}
        </div>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (text: string) => <div className="text-subtitle">{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Popconfirm
          title="Delete template"
          description="Are you sure to delete this template?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button
            type="link"
            className="!w-auto !p-0"
            size="small"
            danger
            icon={<DeleteOutlined />}
          ></Button>
        </Popconfirm>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Settings`,
      children: (
        <div className="py-3 sm:max-w-xs">
          <div className="mb-6">
            <div className="relative">
              <Statistic
                title="Credit balance"
                value={1000}
                precision={0}
                className="px-4 py-3.5 rounded border border-solid border-neutral-200"
              />
              <Button
                type="link"
                size="small"
                className="absolute !px-0 top-2.5 right-4 hover:!text-primary-500"
              >
                Top-up
              </Button>
            </div>
          </div>
          <div>
            <label className="block mb-1.5">
              <span>Sender Name</span>
              <span className="mx-1">·</span>
              <a
                className="inline-block mt-1"
                href="mailto:support@loveadmin.com"
              >
                Request change
              </a>
            </label>
            <Input disabled value="LoveAdmin"></Input>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `Templates`,
      children: (
        <div className="py-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title level={5}>
                <span>Templates</span>
                <span className="mx-1.5 text-subtitle">·</span>
                <span className="text-subtitle">3</span>
              </Title>
            </div>
            <Button type="primary" icon={<PlusOutlined />}>
              New template
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </div>
      ),
    },
  ];
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center px-6 border-none shadow-none bg-neutral-800">
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          className="mr-3 -ml-3 hover:bg-neutral-700 text-neutral-50 hover:text-white"
        />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex">
            <img
              src="https://pro.loveadmin.com/images/loveadminlogo-reversed-v2.png"
              className="object-contain h-[14px] ml-px"
            />
          </div>
          <Breadcrumb className="[&_li]:text-neutral-400 leading-4">
            <Breadcrumb.Item className="cursor-pointer hover:underline">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer hover:underline">
              Settings
            </Breadcrumb.Item>
            <Breadcrumb.Item className="cursor-pointer hover:underline">
              Communication
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-neutral-50">
              SMS Messaging
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Header>
      <Layout>
        <Content className="p-6 pb-16 bg-white">
          <Tabs
            type="card"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </Content>
      </Layout>
      <Modal
        title="Edit Template"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          setIsModalVisible(false);
        }}
        okText="Save"
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingTemplate?.name}
              onChange={(e) =>
                setEditingTemplate({
                  ...editingTemplate!,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea
              value={editingTemplate?.content}
              onChange={(e) =>
                setEditingTemplate({
                  ...editingTemplate!,
                  content: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default SMSSettings;
