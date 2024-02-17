import React from "react";
import { Typography } from "antd";
import classNames from "classnames";
const { Title } = Typography;

interface PublicFormTemplateProps {
  title: string;
  subtitle?: string;
  divider?: boolean;
  center?: boolean;
}

const PublicFormTemplate: React.FC<PublicFormTemplateProps> = ({
  title,
  subtitle,
  children,
  divider = true,
  center,
}) => {
  return (
    <div
      className={classNames(
        "col-span-1 lg:col-span-2 z-10 xl:col-span-1 bg-white p-12 basis-full rounded-lg",
        {
          "sm:pt-[10vh]": !center,
          "grid place-items-center": center,
        }
      )}
    >
      <div className="w-full max-w-xs mx-auto space-y-6">
        <div>
          <Title level={4} className="my-0">
            {title}
          </Title>
          {subtitle && (
            <Title level={5} className="my-1 text-subtitle">
              {subtitle}
            </Title>
          )}
        </div>
        {divider && <div className="h-px bg-neutral-200"></div>}
        {children}
      </div>
    </div>
  );
};

export default PublicFormTemplate;
