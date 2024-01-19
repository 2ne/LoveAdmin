import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Layout,
  message,
  Form,
  Table,
  Popconfirm,
  Input,
  Tooltip,
  Drawer,
  Segmented,
  Avatar,
  Switch,
  TreeSelect,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import LoveAdminHeader from "../../../components/header";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  TagOutlined,
  WarningFilled,
} from "@ant-design/icons";
import TableTitle from "../../../components/table-title";
import { SegmentedValue } from "antd/es/segmented";
import Tag from "../../../components/tag";
const { Content } = Layout;
const { TreeNode } = TreeSelect;
const { Option } = Select;

interface Group {
  name: string;
  members?: Member[];
  discounts?: string[];
  roles?: string[];
  privateProducts?: string[];
}

interface Discount {
  name: string;
}

interface Role {
  name: string;
  description: string;
}

interface Member {
  id: string;
  initials: string;
  firstName: string;
  lastName: string;
  image?: string;
}

const allDiscounts: Discount[] = [
  { name: "Owner's Discount (100% off)" },
  { name: "Private Lessons Discount" },
  { name: "Sibling Discount (10%)" },
  { name: "Special Discount (£10 per class)" },
  { name: "Staff Discount (50% off)" },
  { name: "50% off any class" },
];

const allRoles: Role[] = [
  {
    name: "Admin (Full Access)",
    description: "Full administration access",
  },
  {
    name: "Assets and Resources Admin",
    description: "Create and manage assets and resources",
  },
  {
    name: "Coaching Staff",
    description:
      "Grants access to schedules and attendees they have been assigned to.",
  },
  {
    name: "Communications Admin",
    description: "Create and manage message templates",
  },
  {
    name: "Data Admin",
    description:
      "Create and manage additional registration forms, consents and import users",
  },
  {
    name: "Finance Admin",
    description: "View financial reports, manage payments and invoices",
  },
  {
    name: "Group Admin",
    description: "Administrate groups",
  },
  {
    name: "Learning Admin",
    description: "Create and manage development programmes",
  },
  {
    name: "Organisation Admin",
    description: "Manage the administration of the organisation settings",
  },
  {
    name: "Product Admin",
    description: "Create and manage products, and the shop",
  },
  {
    name: "Reporting Admin",
    description: "Administrator access to all reports",
  },
  {
    name: "Schedule Admin",
    description: "Create and manage product schedules",
  },
];

function generateRandomName(): string {
  const firstNames = [
    "Addison",
    "James",
    "Emily",
    "Michael",
    "Ava",
    "Chris",
    "Laura",
    "Oliver",
    "Sophia",
    "Ethan",
    "Isabella",
    "Mason",
    "Emma",
    "Lucas",
    "Mia",
    "Alexander",
    "Charlotte",
    "Henry",
    "Amelia",
    "Jackson",
    "Harper",
    "Liam",
    "Evelyn",
    "Benjamin",
    "Abigail",
    "William",
    "Elizabeth",
    "Logan",
    "Sofia",
    "Noah",
    "Avery",
    "Samuel",
    "Scarlett",
    "David",
    "Victoria",
    "Joseph",
    "Madison",
    "Carter",
    "Luna",
    "Daniel",
    "Grace",
    "Matthew",
    "Chloe",
    "Jacob",
    "Penelope",
    "Leo",
    "Layla",
    "Owen",
    "Riley",
    "Ella",
    "Jack",
    "Sophie",
    "Caleb",
    "Hannah",
    "Henry",
    "Aria",
    "Liam",
    "Grace",
    "Noah",
    "Zoe",
    "Oliver",
    "Lily",
    "Elijah",
    "Audrey",
    "Lucas",
    "Aurora",
    "Ethan",
    "Hazel",
    "Alexander",
    "Alice",
    "Mason",
    "Madelyn",
    "William",
    "Aubrey",
    "James",
    "Scarlett",
    "Aiden",
    "Violet",
    "Daniel",
    "Nova",
    "Matthew",
    "Stella",
    "Samuel",
    "Ruby",
    "David",
    "Naomi",
    "Joseph",
    "Eleanor",
    "Andrew",
    "Clara",
    "Logan",
    "Ivy",
    "Anthony",
    "Lillian",
    "Nicholas",
    "Grace",
    "Ryan",
    "Hannah",
    "Christopher",
    "Addison",
    "Nathan",
    "Eva",
    "Jackson",
    "Natalie",
    "Nathan",
    "Eva",
    "Dylan",
    "Luna",
    "William",
    "Hazel",
  ];

  const lastNames = [
    "Lewis",
    "Toone",
    "Smith",
    "Doe",
    "Brown",
    "Rogers",
    "Wilson",
    "Johnson",
    "Williams",
    "Jones",
    "Davis",
    "Miller",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
    "Rodriguez",
    "Maydew",
    "Walker",
    "Hall",
    "Allen",
    "Young",
    "Hernandez",
    "King",
    "Wright",
    "Lopez",
    "Hill",
    "Scott",
    "Green",
    "Adams",
    "Baker",
    "Gonzalez",
    "Nelson",
    "Carter",
    "Turner",
    "Perez",
    "Hall",
    "Howard",
    "Flores",
    "Hayes",
    "Murphy",
    "Watson",
    "Ward",
    "Gomez",
    "Cook",
    "Morales",
    "Bennett",
    "Sullivan",
    "Reed",
    "Foster",
    "Barnes",
    "Brooks",
    "Price",
    "Reyes",
    "Long",
    "Fisher",
    "Myers",
    "Jordan",
    "Russell",
    "Ferguson",
    "Hamilton",
    "Wallace",
    "Sims",
    "Coleman",
    "Ray",
    "Boyd",
    "Burns",
    "Gardner",
    "Edwards",
    "Reynolds",
    "Hunt",
    "Henry",
    "Graham",
    "Parker",
    "West",
    "Butler",
    "Simmons",
    "Fleming",
    "Perry",
    "Stone",
    "Frazier",
    "Murray",
    "Kennedy",
    "Wells",
    "Mills",
    "Ross",
    "Hudson",
    "Gibson",
    "Wagner",
    "Mendoza",
    "Bishop",
    "Dunn",
    "Gray",
    "Rice",
    "Hanson",
    "Mcdonald",
  ];

  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
}

function generateRandomInitials(name: string): string {
  // Split the name by space, get the first letter of each part, and join them
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return initials;
}

function generateRandomImageUrl(): string | undefined {
  return Math.random() > 0.5
    ? `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/300`
    : undefined;
}

function createRandomMembers(n: number): Member[] {
  return Array.from({ length: n }, (_, i) => {
    const fullName = generateRandomName();
    const [firstName, ...lastNames] = fullName.split(" ");
    const lastName = lastNames.join(" ");

    return {
      id: (i + 1).toString(),
      initials: generateRandomInitials(fullName),
      firstName,
      lastName,
      name: fullName, // Optional
      image: generateRandomImageUrl(),
    };
  });
}

const allMembers: Member[] = createRandomMembers(2000).sort((a, b) => {
  const lastNameComparison = a.lastName.localeCompare(b.lastName);
  if (lastNameComparison !== 0) {
    return lastNameComparison;
  }
  return a.firstName.localeCompare(b.firstName);
});

// Function to get random members without repetition
function getRandomMembers(count: number): Member[] {
  const shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5);
  return shuffledMembers.slice(0, count);
}

const data: Group[] = [
  {
    name: "Admin Team",
    members: getRandomMembers(3),
    discounts: [],
    roles: [],
  },
  {
    name: "Office Team",
    members: getRandomMembers(3),
    discounts: [],
    roles: ["Coaching Staff"],
  },
  {
    name: "Owners Discount",
    members: getRandomMembers(3),
    discounts: ["Owner's Discount (100% off)"],
    roles: [],
  },
  {
    name: "Special Discount",
    members: getRandomMembers(1),
    discounts: ["Special Discount (£10 per class)", "50% off any class"],
    roles: [],
  },
  {
    name: "Staff Discount",
    members: getRandomMembers(2),
    discounts: ["Staff Discount (50% off)"],
    roles: [],
  },
  {
    name: "Teachers",
    members: getRandomMembers(11),
    discounts: [],
    roles: [],
  },
];

const swimmingClasses = [
  {
    title: "Beginners",
    value: "beginners",
    children: [
      { title: "Beginners Level 1", value: "Beginners Level 1" },
      { title: "Beginners Level 2", value: "Beginners Level 2" },
    ],
  },
  {
    title: "Intermediate",
    value: "intermediate",
    children: [
      { title: "Intermediate Level 1", value: "Intermediate Level 1" },
      { title: "Intermediate Level 2", value: "Intermediate Level 2" },
    ],
  },
  {
    title: "Advanced",
    value: "advanced",
    children: [
      { title: "Advanced Level 1", value: "Advanced Level 1" },
      { title: "Advanced Level 2", value: "Advanced Level 2" },
    ],
  },
];

const renderTreeNodes = (data: any[], parentValue = ""): JSX.Element[] =>
  data.map((item) => {
    const combinedValue = parentValue
      ? `${parentValue}-${item.value}`
      : item.value;
    if (item.children) {
      return (
        <TreeNode title={item.title} key={combinedValue} value={combinedValue}>
          {renderTreeNodes(item.children, combinedValue)}
        </TreeNode>
      );
    }
    return (
      <TreeNode title={item.title} key={combinedValue} value={item.value} />
    );
  });

const SettingsGroups: React.FC = () => {
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [groupForm] = Form.useForm();
  const [selectedSegment, setSelectedSegment] = useState<string>("Members");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newGroup, setNewGroup] = useState<Group | null>(null);
  const [listHeight, setListHeight] = useState<number | undefined>(undefined);
  const [groupSearchTerm, setGroupSearchTerm] = useState<string>("");

  // Calculate the dynamic height
  const calculateDynamicHeight = () => {
    const windowHeight = window.innerHeight;
    const dynamicHeight = windowHeight >= 768 ? windowHeight - 450 : undefined;
    setListHeight(dynamicHeight);
  };

  // Add an event listener to recalculate the height on window resize
  useEffect(() => {
    calculateDynamicHeight();
    window.addEventListener("resize", calculateDynamicHeight);
    return () => {
      window.removeEventListener("resize", calculateDynamicHeight);
    };
  }, []);

  // Use useEffect to update form fields when selectedGroup changes
  useEffect(() => {
    if (selectedGroup) {
      groupForm.setFieldsValue({
        name: selectedGroup.name,
        members: selectedGroup.members,
        discounts: selectedGroup.discounts,
        roles: selectedGroup.roles,
        privateProducts: selectedGroup.privateProducts,
      });
    } else {
      groupForm.resetFields();
    }
  }, [selectedGroup, groupForm]);

  // Add a useEffect to update selectedGroup when tableData changes
  useEffect(() => {
    if (selectedGroup) {
      setSelectedGroup(
        (prevSelectedGroup) =>
          tableData.find((group) => group.name === prevSelectedGroup?.name) ||
          selectedGroup
      );
    }
  }, [tableData]);

  const handleGroupSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupSearchTerm(event.target.value);
  };

  const filteredTableData = groupSearchTerm
    ? tableData.filter((group) =>
        group.name.toLowerCase().includes(groupSearchTerm.toLowerCase())
      )
    : tableData;

  const resetForm = () => {
    setSelectedGroup(null);
    setNewGroup({
      name: "",
      members: [],
      discounts: [],
      roles: [],
      privateProducts: [],
    });
    groupForm.resetFields();
  };

  const openDrawer = () => {
    setSelectedSegment("Members");
    setIsDrawerVisible(true);
  };

  const handleGroupClick = (groupName: string) => {
    const group = tableData.find((g) => g.name === groupName);
    if (group) {
      setSelectedGroup(group);
      openDrawer();
    }
  };

  const handleAddNewGroup = () => {
    resetForm();
    openDrawer();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSelectMembers = (selectedIds: string[]) => {
    setSelectedMembers(selectedIds);
  };

  const handleCancelSelectMembers = () => {
    setSelectedMembers([]); // Clear the selected members after adding
    setIsSelectOpen(false); // Close the Select dropdown
    setSearchTerm("");
  };

  const handleAddSelectedMembers = () => {
    const membersToAdd = allMembers.filter((member) =>
      selectedMembers.includes(member.id)
    );

    if (selectedGroup) {
      // Update selectedGroup with all new members
      setSelectedGroup((prevSelectedGroup) => ({
        ...prevSelectedGroup,
        members: [...(prevSelectedGroup?.members || []), ...membersToAdd],
      }));
    } else if (newGroup) {
      // Update newGroup when adding members to a new group
      setNewGroup((prevNewGroup) => ({
        ...prevNewGroup,
        members: [...(prevNewGroup?.members || []), ...membersToAdd],
      }));
    }

    setSelectedMembers([]); // Clear the selected members after adding
    setIsSelectOpen(false); // Close the Select dropdown
    setSearchTerm("");
  };

  const handleRemoveMember = (memberId: string) => {
    if (selectedGroup && selectedGroup.members) {
      // Update selectedGroup without modifying tableData
      const updatedMembers = selectedGroup.members.filter(
        (member) => member.id !== memberId
      );
      setSelectedGroup({ ...selectedGroup, members: updatedMembers });
    } else if (newGroup && newGroup.members) {
      // Update newGroup when removing member from a new group
      setNewGroup((prevGroup) => ({
        ...prevGroup,
        members:
          prevGroup?.members &&
          prevGroup.members.filter((member) => member.id !== memberId),
      }));
    }
  };

  const nonGroupMembers = allMembers.filter(
    (member) =>
      !(selectedGroup?.members?.some((m) => m.id === member.id) ?? false) &&
      !(newGroup?.members?.some((m) => m.id === member.id) ?? false)
  );

  const availableMembers = nonGroupMembers.filter((member) => {
    // If there is a selected group, exclude members that are already in it
    if (selectedGroup?.members) {
      return !selectedGroup.members.some((m) => m.id === member.id);
    }

    // If there is a newGroup being created, exclude members already in it
    if (newGroup?.members) {
      return !newGroup.members.some((m) => m.id === member.id);
    }

    // If there is no selected group, include all non-group members
    return true;
  });

  const filteredAvailableMembers = availableMembers.filter((member) =>
    (
      member.firstName.toLowerCase() +
      " " +
      member.lastName.toLowerCase()
    ).includes(searchTerm.toLowerCase())
  );

  const handleSegmentChange = (value: SegmentedValue) => {
    setSelectedSegment(value.toString());
  };

  const handleDiscountChange = (discountName: string, checked: boolean) => {
    // Handling for selectedGroup
    if (selectedGroup) {
      let updatedDiscounts = [...(selectedGroup.discounts || [])];
      if (checked) {
        if (!updatedDiscounts.includes(discountName)) {
          updatedDiscounts.push(discountName);
        }
      } else {
        updatedDiscounts = updatedDiscounts.filter((d) => d !== discountName);
      }
      setSelectedGroup({ ...selectedGroup, discounts: updatedDiscounts });
    }

    // Handling for newGroup
    else if (newGroup) {
      let updatedDiscounts = [...(newGroup.discounts || [])];
      if (checked) {
        if (!updatedDiscounts.includes(discountName)) {
          updatedDiscounts.push(discountName);
        }
      } else {
        updatedDiscounts = updatedDiscounts.filter((d) => d !== discountName);
      }
      setNewGroup({ ...newGroup, discounts: updatedDiscounts });
    }
  };

  const handleRoleChange = (roleName: string, checked: boolean) => {
    // Handling for selectedGroup
    if (selectedGroup) {
      let updatedRoles = selectedGroup.roles ? [...selectedGroup.roles] : [];
      if (checked) {
        if (!updatedRoles.includes(roleName)) {
          updatedRoles.push(roleName);
        }
      } else {
        updatedRoles = updatedRoles.filter((r) => r !== roleName);
      }
      setSelectedGroup({ ...selectedGroup, roles: updatedRoles });
    }

    // Handling for newGroup
    else if (newGroup) {
      let updatedRoles = newGroup.roles ? [...newGroup.roles] : [];
      if (checked) {
        if (!updatedRoles.includes(roleName)) {
          updatedRoles.push(roleName);
        }
      } else {
        updatedRoles = updatedRoles.filter((r) => r !== roleName);
      }
      setNewGroup({ ...newGroup, roles: updatedRoles });
    }
  };

  const deleteGroupConfirm = (record: Group) => {
    return () => {
      setTableData((prevData) =>
        prevData.filter((item) => item.name !== record.name)
      );
      setPopConfirmVisible(false);
      setIsDrawerVisible(false);
      message.success(`${record.name} deleted`);
    };
  };

  const deleteGroupCancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const closeDrawer = () => {
    resetForm();
    setIsDrawerVisible(false);
  };

  const handleSave = () => {
    groupForm
      .validateFields()
      .then((values) => {
        if (selectedGroup) {
          // Update existing group
          const updatedGroup = { ...selectedGroup, ...values };
          setTableData((prevTableData) =>
            prevTableData.map((group) =>
              group.name === selectedGroup.name ? updatedGroup : group
            )
          );
          message.success(`${updatedGroup.name} updated`);
        } else if (newGroup) {
          // Create new group with members, discounts and roles from newGroup
          const createdGroup = {
            ...values,
            members: newGroup.members,
            discounts: newGroup.discounts || [],
            roles: newGroup.roles || [],
          };
          setTableData((prevTableData) => [...prevTableData, createdGroup]);
          message.success(`${createdGroup.name} created`);
          resetForm(); // Reset the form and newGroup after saving
        }
        closeDrawer();
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const columns = [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
      width: 180,
      fixed: true,
      render: (text: string) => (
        <a
          className="inline-flex my-[3px]"
          onClick={() => handleGroupClick(text)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      width: 115,
      render: (members: Member[] | undefined) => {
        return members && members.length > 0 ? members.length : null;
      },
    },
    {
      title: "Discounts",
      dataIndex: "discounts",
      key: "discounts",
      width: 400,
      render: (discounts: string[] | undefined) => (
        <ul className="flex flex-wrap gap-1.5">
          {discounts?.map((discount) => (
            <li key={discount}>
              <Tag colour="primary">
                <TagOutlined className="-ml-0.5 mr-1.5" />
                <span>{discount}</span>
              </Tag>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      width: 180,
      render: (roles: string[] | undefined) => (
        <div className="[text-wrap:pretty] text-sm">
          {roles?.map((role, index) => (
            <span key={role}>{index === 0 ? role : `, ${role}`}</span>
          ))}
        </div>
      ),
    },
    {
      title: "Products",
      dataIndex: "privateProducts",
      key: "privateProducts",
      width: 200,
      render: (privateProducts: string[] | undefined) => (
        <div className="[text-wrap:pretty] text-sm">
          {privateProducts?.map((productValue, index) => {
            const product = swimmingClasses.find(
              (item) => item.value === productValue
            );
            const productTitle = product ? product.title : productValue;
            return index === 0 ? productTitle : `, ${productTitle}`;
          })}
        </div>
      ),
    },
  ];

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
          <Breadcrumb.Item key="groups">Groups</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Content className="relative w-full max-w-screen-xl p-6 mx-auto">
          <div className="md:items-center md:flex md:gap-3 max-md:space-y-2.5">
            <TableTitle
              title="Manage groups"
              totalRecords={tableData.length}
              selectable={false}
              recordsTerm={{ singular: " ", plural: " " }}
            />
            <div className="flex items-center gap-3 ml-auto">
              <Input
                placeholder="Search groups..."
                prefix={<SearchOutlined className="mr-1" />}
                onChange={handleGroupSearchChange} // Updated line
              />

              <Tooltip
                title="Add group"
                placement="topRight"
                className="shrink-0"
              >
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={handleAddNewGroup}
                ></Button>
              </Tooltip>
            </div>
          </div>
          <div className="relative mt-5">
            <Table
              className="[&_table]:table-fixed"
              size="small"
              dataSource={filteredTableData}
              columns={columns}
              pagination={false}
              scroll={{ x: 800 }}
              sticky={true}
            />
          </div>
        </Content>
      </Layout>
      <Drawer
        forceRender
        title={selectedGroup ? `Edit ${selectedGroup.name}` : "Add group"}
        open={isDrawerVisible}
        width={390}
        onClose={closeDrawer}
        className={`${
          popConfirmVisible ? "dim" : ""
        } [&_.ant-drawer-body]:[scrollbar-gutter:stable] [&_.ant-drawer-body]:pr-[calc(32px-var(--scrollbar-width))]`}
        footer={
          <div className="flex justify-between">
            <div className="flex items-center flex-grow">
              <Button key="submit" type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button className="ml-3" onClick={closeDrawer}>
                Cancel
              </Button>
            </div>
            {selectedGroup && (
              <Popconfirm
                icon={<WarningFilled className="text-danger-500" />}
                title={`Delete group`}
                description={`Are you sure you want to delete the ${selectedGroup.name} group?`}
                onConfirm={deleteGroupConfirm(selectedGroup)}
                onCancel={deleteGroupCancel}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                visible={popConfirmVisible}
                onVisibleChange={setPopConfirmVisible}
                placement="topLeft"
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  className="text-neutral-600 border-neutral-300 hover:text-danger-500 hover:border-danger-400"
                  onClick={(e) => e.preventDefault()}
                ></Button>
              </Popconfirm>
            )}
          </div>
        }
      >
        <Form
          form={groupForm}
          layout="vertical"
          name="groupForm"
          requiredMark={false}
          initialValues={
            selectedGroup
              ? {
                  name: selectedGroup.name,
                  members: selectedGroup.members,
                  discounts: selectedGroup.discounts,
                  roles: selectedGroup.roles,
                  privateProducts: selectedGroup.privateProducts,
                }
              : {}
          }
        >
          <Form.Item
            label="Name"
            name="name"
            className="mb-7"
            rules={[
              { required: true, message: "Please enter a group name" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || selectedGroup?.name === value) {
                    return Promise.resolve();
                  }
                  const groupNameExists = tableData.some(
                    (group) => group.name === value
                  );
                  if (groupNameExists) {
                    return Promise.reject(
                      new Error(
                        `A group with the name "${value}" already exists.`
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Segmented
            options={["Members", "Discounts", "Roles", "Products"]}
            value={selectedSegment}
            onChange={handleSegmentChange}
            className="[&_.ant-segmented-item]:grow [&_.ant-segmented-item-label]:px-3.5 w-full mb-5"
          />

          <Form.Item
            name="members"
            className={selectedSegment === "Members" ? "block" : "hidden"}
            label={
              <div className="">
                <span>Add members</span>
                <span className="mx-1 text-subtitle">·</span>
                <span className="text-subtitle">{nonGroupMembers.length}</span>
              </div>
            }
          >
            <div>
              <div className="mb-6">
                <Select
                  mode="multiple"
                  value={selectedMembers}
                  onChange={handleSelectMembers}
                  onSearch={handleSearchChange}
                  placeholder="Search and select members"
                  filterOption={false}
                  virtual={true}
                  open={isSelectOpen}
                  onDropdownVisibleChange={setIsSelectOpen}
                  suffixIcon={<SearchOutlined />}
                  allowClear={false}
                  listHeight={listHeight}
                  maxTagCount={3}
                  rootClassName="[&_.ant-select-selection-item-content_.ant-avatar-sm]:h-4 [&_.ant-select-selection-item-content_.ant-avatar-sm]:w-4 [&_.ant-select-selection-item-content_.ant-avatar-sm]:-mr-0.5 [&_.ant-select-selection-item-content_.ant-avatar-sm]:leading-tight [&_.ant-select-selection-item-content_.font-medium]:font-normal [&_.ant-select-item-option-selected:not(.ant-select-item-option-disabled)]:font-normal"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <div className="flex justify-end gap-1.5 pt-2 m-1 mt-2 border-t border-neutral-200">
                        <Button
                          size="small"
                          className="px-2.5"
                          onClick={handleCancelSelectMembers}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          onClick={handleAddSelectedMembers}
                          className="px-4"
                        >
                          Add
                        </Button>
                      </div>
                    </>
                  )}
                >
                  {filteredAvailableMembers.map((member) => (
                    <Option key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar size="small" src={member.image}>
                          {member.initials}
                        </Avatar>
                        <div>
                          <span>{member.firstName}</span>{" "}
                          <span className="font-medium">{member.lastName}</span>
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                {(selectedGroup &&
                  selectedGroup.members &&
                  selectedGroup?.members?.length > 0) ||
                (newGroup &&
                  newGroup.members &&
                  newGroup?.members?.length > 0) ? (
                  <div className="font-medium mb-0.5">
                    <span>Members</span>
                    <span className="mx-1 text-subtitle">·</span>
                    <span className="text-subtitle">
                      {(selectedGroup?.members?.length ?? 0) +
                        (newGroup?.members?.length ?? 0)}
                    </span>
                  </div>
                ) : null}
                <ul className="divide-y divide-neutral-200/75">
                  {(selectedGroup?.members ?? newGroup?.members ?? []).map(
                    (member) => (
                      <li
                        key={member.id}
                        className="flex items-center py-2 space-x-2 group"
                      >
                        <Avatar size="small" src={member.image && member.image}>
                          {member.initials}
                        </Avatar>
                        <div className="flex-1 min-w-0 text-sm truncate">
                          <span>{member.firstName}</span>{" "}
                          <span>{member.lastName}</span>
                        </div>
                        <Button
                          type="text"
                          size="small"
                          className="ml-px transition-all rounded-full opacity-0 hover:bg-neutral-100 hover:text-neutral-900 text-neutral-500 group-hover:opacity-100"
                          icon={
                            <svg
                              fill-rule="evenodd"
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="close"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-3 h-3"
                            >
                              <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                            </svg>
                          }
                          onClick={() => handleRemoveMember(member.id)}
                        ></Button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="discounts"
            label="Discounts"
            className={selectedSegment === "Discounts" ? "block" : "hidden"}
          >
            <ul className="divide-y divide-neutral-200/75">
              {allDiscounts.map((discount) => (
                <li
                  key={discount.name}
                  className="flex items-center gap-2.5 py-2"
                >
                  <label className="grow flex items-center gap-2.5 cursor-pointer">
                    <div className="grow">{discount.name}</div>
                    <Switch
                      size="small"
                      checked={selectedGroup?.discounts?.includes(
                        discount.name
                      )}
                      onChange={(checked) =>
                        handleDiscountChange(discount.name, checked)
                      }
                    />
                  </label>
                </li>
              ))}
            </ul>
          </Form.Item>

          <Form.Item
            name="roles"
            label="Roles"
            className={selectedSegment === "Roles" ? "block" : "hidden"}
          >
            <ul className="divide-y divide-neutral-200/75 -mt-0.5">
              {allRoles.map((role) => (
                <li key={role.name} className="py-3">
                  <label className="flex justify-between gap-4 cursor-pointer">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {role.name}
                      </div>
                      <div className="mt-0.5 text-sm leading-tight text-subtitle [text-wrap:balance]">
                        {role.description}
                      </div>
                    </div>
                    <Switch
                      size="small"
                      className="relative top-px"
                      checked={selectedGroup?.roles?.includes(role.name)}
                      onChange={(checked) =>
                        handleRoleChange(role.name, checked)
                      }
                    />
                  </label>
                </li>
              ))}
            </ul>
          </Form.Item>

          <Form.Item
            label={
              <div className="flex items-center gap-1">
                <span>Products</span>
                <Tooltip
                  className="mt-px text-neutral-400 hover:text-neutral-500"
                  title="To make a product private, set its status to private in product settings."
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            }
            extra={`To limit access to a product, you can set it as private and then grant access to ${
              selectedGroup?.name || "this group"
            }.`}
            name="privateProducts"
            className={selectedSegment === "Products" ? "block" : "hidden"}
          >
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Select private products..."
              treeCheckable
              allowClear
              multiple
            >
              {renderTreeNodes(swimmingClasses)}
            </TreeSelect>
          </Form.Item>
        </Form>
      </Drawer>
    </Layout>
  );
};

export default SettingsGroups;
