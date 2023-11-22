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
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import CustomSMSEditor from "../../sms-editor";
import { formatDate } from "../../../components/date-formatter";
const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  template: string;
  updatedBy: string;
  updatedAt: Date;
}

const data: DataType[] = [
  {
    key: "1",
    name: "Payment due",
    template:
      "Dear {{accountOwner.FirstName}}, your payment of PRODUCT NAME is due. Thanks, {{organisation.Name}}.",
    updatedBy: "John Smith",
    updatedAt: new Date(2023, 6, 19, 9, 59), // July 19, 2023, 9:59 AM
  },
  {
    key: "2",
    name: "Special offer",
    template:
      "Dear {{accountOwner.FirstName}}, we have a special offer on PRODUCT NAME for you. Don't miss out! Thanks, {{organisation.Name}}.",
    updatedBy: "Jane Doe",
    updatedAt: new Date(2023, 6, 20, 14, 45), // July 20, 2023, 2:45 PM
  },
  {
    key: "3",
    name: "New event",
    template:
      "Dear {{accountOwner.FirstName}}, we have a new event coming up EVENT NAME. Hope to see you there! Thanks, {{organisation.Name}}.",
    updatedBy: "Alice Johnson",
    updatedAt: new Date(2023, 6, 21, 16, 30), // July 21, 2023, 4:30 PM
  },
];

function Templates(): React.ReactElement {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DataType | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [content, setContent] = useState("");
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);

  const templateDeleteConfirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setIsModalVisible(false);
    message.success("Template deleted");
  };

  const templateDeleteCancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const updateTemplate = () => {
    setIsModalVisible(false);
    message.success("Template updated");
  };

  const createTemplate = () => {
    setIsModalVisible(false);
    message.success("New template created");
  };

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
            className="!m-0 !p-0 !h-auto"
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
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      defaultSortOrder: "ascend",
      width: 175,
      align: "right",
      sorter: (a: DataType, b: DataType) =>
        b.updatedAt.getTime() - a.updatedAt.getTime(),
      render: (_, record) => (
        <div className="text-subtitle">
          <Tooltip title={formatDate(record.updatedAt)} placement="topRight">
            {`${record.updatedBy} · ${formatDate(record.updatedAt, "short")}`}
          </Tooltip>
        </div>
      ),
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
        scroll={{ x: 800 }}
        size="small"
      />
      <Modal
        className={`w-[32rem] ${popConfirmVisible ? "dim" : ""}`}
        destroyOnClose={true}
        title={editingTemplate ? "Update template" : "Create template"}
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
                  onConfirm={templateDeleteConfirm}
                  onCancel={templateDeleteCancel}
                  okText="Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                  visible={popConfirmVisible}
                  onVisibleChange={setPopConfirmVisible}
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
              {editingTemplate ? (
                <Button
                  type="primary"
                  onClick={() => {
                    updateTemplate();
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    createTemplate();
                  }}
                >
                  Create
                </Button>
              )}
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
              hideLabel={true}
              value={editingTemplate?.template}
              onCharCountChange={handleCharCountChange}
              onMessageCountChange={handleMessageCountChange}
              onContentChange={(newContent) => {
                editingTemplate &&
                  setEditingTemplate({
                    ...editingTemplate,
                    template: newContent,
                  });
              }}
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
