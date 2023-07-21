import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined, WarningFilled } from "@ant-design/icons";
import {
  Button,
  Table,
  Popconfirm,
  message,
  Modal,
  Form,
  Typography,
  Input,
  Dropdown,
  Menu,
} from "antd";
import { ColumnsType } from "antd/es/table";
import CustomSMSEditor from "../../sms-editor";
const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  template: string;
  created: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "Payment due",
    template:
      "Dear {{accountOwner.FirstName}}, your payment of PRODUCT NAME is due. Thanks, {{organisation.Name}}.",
    created: "James Toone · 7 Feb 09:59",
  },
  {
    key: "2",
    name: "Special offer",
    template:
      "Dear {{accountOwner.FirstName}}, we have a special offer on PRODUCT NAME for you. Don't miss out! Thanks, {{organisation.Name}}.",
    created: "James Toone · 7 Feb 09:59",
  },
  {
    key: "3",
    name: "New event",
    template:
      "Dear {{accountOwner.FirstName}}, we have a new event coming up EVENT NAME. Hope to see you there! Thanks, {{organisation.Name}}.",
    created: "James Toone · 7 Feb 09:59",
  },
];

const confirm = (e?: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success("Template deleted");
};

const cancel = (e?: React.MouseEvent<HTMLElement>) => {
  console.log(e);
};

function Templates(): React.ReactElement {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DataType | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [content, setContent] = useState("");

  const handleCharCountChange = (count: number) => {
    setCharCount(count);
    console.log("New Char Count: ", count);
  };

  const handleMessageCountChange = (count: number) => {
    setMessageCount(count);
    console.log("New Message Count: ", count);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    console.log("New Content: ", newContent);
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
        </div>
      ),
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (text: string) => <div className="text-subtitle">{text}</div>,
    },
  ];

  return (
    <div className="py-1">
      <div className="flex items-end justify-between mb-4">
        <Title level={5} className="!mb-0">
          <span>SMS Templates</span>
          <span className="mx-1.5 text-subtitle">·</span>
          <span className="text-subtitle">3</span>
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingTemplate(null);
            setIsModalVisible(true);
          }}
        >
          New template
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
      <Modal
        title={editingTemplate ? "Edit template" : "New template"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <div className="flex justify-between">
            <div>
              {editingTemplate && (
                <Popconfirm
                  icon={<WarningFilled className="text-danger-500" />}
                  title="Delete template"
                  description="Are you sure to delete this template?"
                  onConfirm={() => {
                    setIsModalVisible(false);
                  }}
                  onCancel={cancel}
                  okText="Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                >
                  <Button
                    className="hover:text-danger-500 hover:border-danger-500"
                    icon={<DeleteOutlined />}
                  ></Button>
                </Popconfirm>
              )}
            </div>
            <div>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                {editingTemplate ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingTemplate?.name}
              onChange={(e) =>
                editingTemplate &&
                setEditingTemplate({
                  ...editingTemplate,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Template">
            <CustomSMSEditor
              onCharCountChange={handleCharCountChange}
              onMessageCountChange={handleMessageCountChange}
              onContentChange={handleContentChange}
              showTemplatesDropdown={false}
              showCounts={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Templates;
