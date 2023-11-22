import React from "react";
import { Statistic, Button, Input } from "antd";

function Settings(): React.ReactElement {
  return (
    <div className="py-3 sm:max-w-xs">
      <div className="mb-6">
        <div className="relative">
          <Statistic
            title="SMS Credits"
            value={1000}
            precision={0}
            className="px-4 py-3.5 rounded ring-1 ring-inset ring-neutral-950/10 shadow-sm"
          />
          <Button
            type="link"
            size="small"
            className="absolute font-medium !px-0 top-3 right-4 hover:!text-primary-500"
          >
            Top-up
          </Button>
        </div>
      </div>
      <div>
        <label className="block mb-1.5">
          <span>Sender Name</span>
        </label>
        <Input disabled value="LoveAdmin"></Input>
        <div className="mt-2 text-sm text-subtitle">
          Please email{" "}
          <a href="mailto:support@loveadmin.com">support@loveadmin.com</a> to
          change your sender name.
        </div>
      </div>
    </div>
  );
}

export default Settings;
