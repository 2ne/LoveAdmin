import { CameraOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const TeamSettings: React.FC = () => {
  return (
    <>
      <div className="divide-y divide-white/5">
        <div className="grid grid-cols-1 max-w-7xl gap-x-8 gap-y-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">Team Settings</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Customise the look and feel of your team.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="flex items-center col-span-full gap-x-8">
                <img
                  src="https://i.ibb.co/dWTrvXQ/ED3-NSn-XWw-AASf-K1.jpg"
                  alt=""
                  className="flex-none object-cover w-24 h-24 bg-gray-800 rounded-lg"
                />
                <div>
                  <Button icon={<CameraOutlined />}>Change photo</Button>
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="team-name"
                  className="block text-sm font-medium leading-6 "
                >
                  Team name
                </label>
                <div className="mt-2">
                  <Input />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 "
                >
                  Team colour
                </label>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  <div>Blue</div>
                </div>
              </div>
            </div>

            <div className="flex mt-8">
              <Button type="primary">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeamSettings;
