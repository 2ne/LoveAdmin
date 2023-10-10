import React, { ReactNode } from "react";
import { Button, Breadcrumb, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const { Header } = Layout;

interface LoveAdminHeaderProps {
  breadcrumbChildren?: ReactNode;
  hideMenuButton?: boolean;
  className?: string;
}

const LoveAdminHeader: React.FC<LoveAdminHeaderProps> = ({
  breadcrumbChildren,
  hideMenuButton,
  className,
}) => {
  return (
    <Header
      className={`h-16 leading-[4rem] flex items-center px-6 border-none shadow-none bg-neutral-800 ${className}`}
    >
      {!hideMenuButton && (
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          className="mr-3 -ml-3 hover:bg-neutral-700 text-neutral-50 hover:text-white"
        />
      )}
      <div className="flex flex-col justify-center gap-2">
        <div className="flex">
          <img
            src="https://pro.loveadmin.com/images/loveadminlogo-reversed-v2.png"
            className="object-contain h-[14px] ml-px logo"
          />
        </div>
        {breadcrumbChildren && (
          <Breadcrumb className="[&_li]:text-neutral-400 [&_li_a]:h-auto [&_li_a]:text-neutral-400 [&_li_a]:hover:text-neutral-400 [&_li:last-child]:text-neutral-50 leading-4">
            {breadcrumbChildren}
          </Breadcrumb>
        )}
      </div>
    </Header>
  );
};

export default LoveAdminHeader;
