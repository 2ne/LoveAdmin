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
    <div className="sticky top-0 hidden max-h-screen overflow-hidden rounded-l-lg basis-full lg:block">
      <img
        className="absolute inset-0 object-cover w-full h-full"
        src={imgSrc}
        alt={imgAlt}
      />
      <div className="absolute inset-0 grid w-full h-full p-8 bg-primary-500/75 place-items-center">
        <div className="relative w-full mx-auto leading-normal text-white max-w-prose">
          <div className="flex items-center mb-6 text-3xl tracking-tight">
            <Title
              level={2}
              className="my-0 font-medium text-white font-display"
            >
              {messageTitle}
            </Title>
          </div>
          <div className="my-0 font-medium text-xl/8 text-primary-50">
            {messageBody}
          </div>
        </div>
      </div>
    </div>
  );
};

PublicMarketingColumn.defaultProps = {
  imgSrc: "./src/assets/about-hero.webp",
  imgAlt: "Background image showing a club photo in a gym",
  messageTitle: "Ready to take part?",
  messageBody:
    "You're here because your club or organisation uses joinin's software. Sign in to your account to register for classes, renew memberships, buy merchandise, and so much more!",
};

export default PublicMarketingColumn;
