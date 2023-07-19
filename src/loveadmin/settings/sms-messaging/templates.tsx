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
const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  content: string;
  created: string;
}

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
  ];

  const placeholders = (
    <Menu>
      <Menu.SubMenu title="Account owner">
        <Menu.Item
          onClick={() => {
            console.log("Account owner first name clicked");
          }}
        >
          First name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Account owner last name clicked");
          }}
        >
          Last name
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Beneficiary">
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary first name clicked");
          }}
        >
          First name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary last name clicked");
          }}
        >
          Last name
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary date of birth clicked");
          }}
        >
          Date of birth
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary gender clicked");
          }}
        >
          Gender
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary house name or number clicked");
          }}
        >
          House name or number
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary street clicked");
          }}
        >
          Street
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary town clicked");
          }}
        >
          Town
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary county clicked");
          }}
        >
          County
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary post code clicked");
          }}
        >
          Post code
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary country clicked");
          }}
        >
          Country
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            console.log("Beneficiary full address clicked");
          }}
        >
          Full address
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Organisation">
        <Menu.Item
          onClick={() => {
            console.log("Organisation name clicked");
          }}
        >
          Name
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

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
          <Form.Item label="Content">
            <div className="px-3 py-2 -mt-px border border-b-0 border-solid rounded-t border-neutral-200 bg-neutral-50">
              <Dropdown overlay={placeholders} trigger={["click"]}>
                <a
                  onClick={(e) => e.preventDefault()}
                  className="px-0 text-neutral-900"
                >
                  <PlusOutlined className="mr-1.5 text-neutral-900" />
                  <span className="text-neutral-900">Placeholder</span>
                </a>
              </Dropdown>
            </div>
            <Input.TextArea
              className="min-h-[105px] rounded-t-none"
              autoSize={true}
              value={editingTemplate?.content}
              onChange={(e) =>
                editingTemplate &&
                setEditingTemplate({
                  ...editingTemplate,
                  content: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Templates;
