import {
  ArrowRightOutlined,
  CameraOutlined,
  DeleteOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Switch, Tooltip } from "antd";
import { colorHexMap } from "../data";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Option } = Select;

type Role = "Squad coach" | "Coach";
type Tabs =
  | "Events"
  | "Players"
  | "Coaches"
  | "Payments"
  | "Messages"
  | "Settings";

const initialAccess: Record<Tabs, Role[]> = {
  Events: ["Squad coach", "Coach"],
  Players: ["Squad coach", "Coach"],
  Coaches: ["Squad coach", "Coach"],
  Payments: ["Squad coach"],
  Messages: ["Squad coach"],
  Settings: ["Squad coach"],
};

const TeamSettings: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [confirmName, setConfirmName] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Add your delete logic here
    console.log("Team Deleted");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirmNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmName(e.target.value);
  };

  const colorOptions = Object.entries(colorHexMap).map(([label, color]) => (
    <Option
      key={label}
      value={color}
      label={label.charAt(0).toUpperCase() + label.slice(1)}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-sm ring-1 ring-inset ring-black/10"
          style={{
            backgroundColor: color,
          }}
        ></div>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </div>
    </Option>
  ));

  return (
    <>
      <div className="grid divide-y gap-14 divide-neutral-900/10">
        <div className="grid grid-cols-1 pt-7 max-w-7xl gap-x-12 gap-y-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">Team settings</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Customise the look and feel of your team.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="team-name"
                  className="block text-sm font-medium leading-6"
                >
                  Team name
                </label>
                <div className="mt-2">
                  <Input />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="team-colour"
                  className="block text-sm font-medium leading-6"
                >
                  Team colour
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <Select
                    placement="topRight"
                    style={{ width: "100%" }}
                    rootClassName="[&_.ant-select-selection-item]:flex"
                  >
                    {colorOptions}
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button type="primary">Save</Button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 pt-14 max-w-7xl gap-x-12 gap-y-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">Delete team</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              No longer need this team? All information related to this team
              will be deleted permanently.
            </p>
          </div>

          <div className="mt-8">
            <Button type="primary" danger onClick={showModal}>
              Delete team
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2.5">
            <WarningOutlined className="text-xl text-danger-500" />
            <div>Delete team</div>
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: confirmName !== teamName }}
        width={425}
        maskClosable={false}
        footer={
          <Button
            type="primary"
            danger
            block
            onClick={handleOk}
            className={`${
              confirmName !== "TEAM NAME"
                ? "opacity-40 pointer-events-none"
                : ""
            }`}
          >
            Delete this team
          </Button>
        }
      >
        <p className="mb-6">
          Are you sure you want to delete this team? All information related to
          this team will be deleted permanently. This includes all fixture
          information, payment details, and messages.
        </p>
        <label className="block mb-1 font-medium">
          To confirm, type "TEAM NAME" in the box below
        </label>
        <Input
          onChange={handleConfirmNameChange}
          className="mb-4 border-danger-500 bg-danger-50"
        />
      </Modal>
    </>
  );
};

const SquadSettings: React.FC = () => {
  const [roleAccess, setRoleAccess] =
    useState<Record<Tabs, Role[]>>(initialAccess);

  const handleCheckboxChange = (tab: Tabs, role: Role) => {
    const updatedRoles = roleAccess[tab].includes(role)
      ? roleAccess[tab].filter((r) => r !== role)
      : [...roleAccess[tab], role];

    setRoleAccess({ ...roleAccess, [tab]: updatedRoles });
  };

  const saveChanges = () => {
    console.log("Saved changes:", roleAccess);
  };

  return (
    <>
      <div className="grid divide-y gap-14 divide-neutral-900/10">
        <div className="grid grid-cols-1 max-w-7xl gap-x-12 gap-y-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">
              Squad customisation
            </h2>
            <p className="mt-1 text-sm leading-5 text-gray-400">
              Adjust your squad name and colour.
            </p>
          </div>
          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-y-8 gap-x-14 sm:grid-cols-5">
              <div className="sm:col-span-3">
                <label
                  htmlFor="squad-name"
                  className="block text-sm font-medium leading-6"
                >
                  Squad name
                </label>
                <div className="mt-2">
                  <Input />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="squad-name"
                  className="block text-sm font-medium leading-6"
                >
                  Squad product name
                </label>
                <div className="mt-1.5 sm:mt-2.5">
                  <Link to={"/Settings/Products/"}>
                    Product settings{" "}
                    <ArrowRightOutlined className="ml-1 text-xs" />
                  </Link>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="squad-name"
                  className="block mb-1.5 text-sm font-medium leading-6"
                >
                  Squad cover image
                </label>
                <div className="relative flex items-center group col-span-full gap-x-7">
                  <img
                    src="https://i.ibb.co/dWTrvXQ/ED3-NSn-XWw-AASf-K1.jpg"
                    alt=""
                    className="flex-none object-cover bg-gray-800 rounded-lg"
                  />
                  <div className="absolute inset-0 flex justify-between gap-3 p-3 transition-all group-hover:bg-white/25">
                    <Tooltip
                      title="Upload photo"
                      className="transition-all pointer-events-none group-hover:pointer-events-auto"
                    >
                      <Button
                        className="text-white border-0 bg-black/50"
                        icon={<CameraOutlined />}
                        block
                      ></Button>
                    </Tooltip>
                    <Tooltip
                      title="Remove photo"
                      className="transition-all pointer-events-none group-hover:pointer-events-auto"
                    >
                      <Button
                        className="text-white border-0 bg-black/50"
                        icon={<DeleteOutlined />}
                        block
                      ></Button>
                    </Tooltip>
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="primary">Save</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 pt-14 max-w-7xl gap-x-12 gap-y-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">
              Squad permissions
            </h2>
            <p className="mt-1 text-sm leading-5 text-gray-400">
              Adjust which roles can access the different areas of the squad.
            </p>
          </div>
          <form className="md:col-span-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pb-2 font-normal text-left"></th>
                  {(["Squad coach", "Coach"] as Role[]).map((role) => (
                    <th key={role} className="pb-2 text-center">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(roleAccess).map(([tab, roles]) => (
                  <tr key={tab}>
                    <td className="font-medium border-t border-neutral-200">
                      {tab}
                    </td>
                    {(["Squad coach", "Coach"] as Role[]).map((role) => (
                      <td
                        key={role}
                        className="py-2 text-center border-t border-neutral-200"
                      >
                        <Switch
                          size="small"
                          checked={roles.includes(role)}
                          onChange={() =>
                            handleCheckboxChange(tab as Tabs, role)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <Button type="primary">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { TeamSettings, SquadSettings };
