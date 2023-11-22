import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import TableManageColumns from "./table-manage-columns";

interface TableFooterProps {
  hideExport?: boolean;
  hideEditColumns?: boolean;
  collapsed?: boolean;
  sidebar?: boolean;
}

const TableFooter: React.FC<TableFooterProps> = ({
  hideExport,
  hideEditColumns,
  collapsed,
  sidebar,
}) => {
  const [isManageColumnsOpen, setIsManageColumnsOpen] = useState(false);

  const showManageColumnsModal = () => {
    setIsManageColumnsOpen(true);
  };

  const hideManageColumnsModal = () => {
    setIsManageColumnsOpen(false);
  };

  return (
    <>
      <footer
        className={`fixed gap-2 flex items-center bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white/90 border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
          !sidebar ? "left-0" : collapsed ? "left-[20px]" : "left-[280px]"
        }`}
      >
        <div className="flex items-center gap-2 ml-auto">
          {!hideEditColumns && (
            <Button onClick={showManageColumnsModal} icon={<HolderOutlined />}>
              Manage columns
            </Button>
          )}
          {!hideExport && (
            <Dropdown
              placement="topRight"
              overlay={
                <Menu>
                  <Menu.Item
                    key="1"
                    onClick={() => console.log("Export PDF clicked")}
                  >
                    <div className="flex items-center gap-2">
                      <FilePdfOutlined />
                      <span>PDF</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    onClick={() => console.log("Export Excel clicked")}
                  >
                    <div className="flex items-center gap-2">
                      <FileExcelOutlined />
                      <span>Excel</span>
                    </div>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button icon={<DownloadOutlined />}>Export</Button>
            </Dropdown>
          )}
        </div>
      </footer>
      <TableManageColumns
        open={isManageColumnsOpen}
        onClose={hideManageColumnsModal}
      />
    </>
  );
};

export default TableFooter;
