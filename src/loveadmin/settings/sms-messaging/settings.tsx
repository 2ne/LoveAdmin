import React from "react";
import { Statistic, Button, Input } from "antd";

const Settings = () => {
  return (
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
          <a className="inline-block mt-1" href="mailto:support@loveadmin.com">
            Request change
          </a>
        </label>
        <Input disabled value="LoveAdmin"></Input>
      </div>
    </div>
  );
};

export default Settings;
