import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface PublicMarketingColumnProps {
  imgSrc?: string;
  imgAlt?: string;
  messageTitle?: string;
  messageBody?: string;
}

const PublicMarketingColumn: React.FC<PublicMarketingColumnProps> = ({
  imgSrc,
  imgAlt,
  messageTitle,
  messageBody,
}) => {
  return (
    <div className="sticky top-0 flex-1 hidden max-h-screen lg:block">
      <img
        className="absolute inset-0 object-cover w-full h-full"
        src={imgSrc}
        alt={imgAlt}
      />
      <div className="absolute inset-0 grid w-full h-full p-8 bg-primary-500/70 place-items-center">
        <div className="relative w-full mx-auto leading-normal text-white max-w-prose">
          <div className="flex items-center mb-6 text-3xl tracking-tight">
            <Title level={2} className="my-0 text-white">
              {messageTitle}
            </Title>
          </div>
          <Title level={4} className="my-0 text-primary-50">
            {messageBody}
          </Title>
        </div>
      </div>
    </div>
  );
};

PublicMarketingColumn.defaultProps = {
  imgSrc: "https://app.joinin.online/images/about-hero.jpeg",
  imgAlt: "Background image showing a club photo in a gym",
  messageTitle: "Ready to take part?",
  messageBody:
    "You're here because your club or organisation uses joinin's software. Sign in to your account to register for classes, renew memberships, buy merchandise, and so much more!",
};

export default PublicMarketingColumn;
