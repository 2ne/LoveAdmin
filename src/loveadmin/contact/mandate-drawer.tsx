import React from "react";
import { Drawer } from "antd";

interface MandateDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const MandateDrawer: React.FC<MandateDrawerProps> = ({ visible, onClose }) => {
  return (
    <Drawer
      title="Mandate history"
      open={visible}
      placement="right"
      footer={null}
      className="[&_.ant-drawer-body]:p-0"
      onClose={onClose}
    >
      <div className="">
        <div className="sticky top-0 z-10 bg-neutral-100/95 px-6 py-1.5 font-medium text-xs">
          Tue 10 Feb
        </div>
        <div className="flow-root px-6">
          <ul className="block p-0" role="list">
            <li className="block p-0 py-2 m-0 border border-t-0 border-solid border-b-neutral-100 border-x-0 last:border-b-0">
              <div className="truncate text-neutral-900">
                GoCardless mandate setup
              </div>
              <div className="truncate text-neutral-400">
                James Toone · 14:59
              </div>
            </li>
            <li className="block p-0 py-2 m-0 border border-t-0 border-solid border-b-neutral-100 border-x-0 last:border-b-0">
              <div className="truncate text-neutral-900">
                GoCardless mandate cancelled
              </div>
              <div className="truncate text-neutral-400">
                James Toone · 10:44
              </div>
            </li>
          </ul>
        </div>
        <div className="sticky top-0 z-10 bg-neutral-100/95 px-6 py-1.5 font-medium text-xs">
          Mon 09 Feb
        </div>
        <div className="flow-root px-6">
          <ul className="block p-0" role="list">
            <li className="block p-0 py-2 m-0 border border-t-0 border-solid border-b-neutral-100 border-x-0 last:border-b-0">
              <div className="truncate text-neutral-900">
                GoCardless mandate cancelled
              </div>
              <div className="truncate text-neutral-400">
                James Toone · 10:44
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default MandateDrawer;
