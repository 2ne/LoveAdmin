import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;

interface InviteModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  coach: boolean;
}

interface Member {
  id: string;
  initials: string;
  firstName: string;
  lastName: string;
  image?: string;
}

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

const InviteModal: React.FC<InviteModalProps> = ({
  isVisible,
  onOk,
  onCancel,
  coach,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [listHeight, setListHeight] = useState<number | undefined>(undefined);

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSelectMembers = (selectedIds: string[]) => {
    setSelectedMembers(selectedIds);
  };

  const filteredAvailableMembers = allMembers.filter((member) =>
    (
      member.firstName.toLowerCase() +
      " " +
      member.lastName.toLowerCase()
    ).includes(searchTerm.toLowerCase())
  );

  const handleCancelSelectMembers = () => {
    setIsSelectOpen(false); // Close the Select dropdown
    setSearchTerm("");
  };

  const handleAddSelectedMembers = () => {
    setIsSelectOpen(false); // Close the Select dropdown
    setSearchTerm("");
  };

  return (
    <Modal
      title={`Invite ${coach ? "coaches" : "players"}`}
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Invite"
      width={440}
    >
      <div className="mb-6">
        <Select
          className="w-full"
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
          rootClassName="[&_.ant-select-selection-item-content_.ant-avatar-sm]:h-4 [&_.ant-select-selection-item-content_.ant-avatar-sm]:w-4 [&_.ant-select-selection-item-content_.ant-avatar-sm]:-mr-0.5 [&_.ant-select-selection-item-content_.ant-avatar-sm]:leading-tight [&_.ant-select-selection-item-content_.font-medium]:font-normal [&_.ant-select-item-option-selected:not(.ant-select-item-option-disabled)]:font-normal"
          dropdownRender={(menu) => (
            <>
              {menu}
              <div className="flex justify-end gap-1.5 pt-2 m-1 mt-2 border-t border-neutral-200">
                <Button
                  onClick={handleCancelSelectMembers}
                  size="small"
                  className="px-2.5"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSelectedMembers}
                  size="small"
                  type="primary"
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
    </Modal>
  );
};

export default InviteModal;
