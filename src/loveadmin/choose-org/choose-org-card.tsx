import { Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface ChooseOrgCardProps {
  logo: string;
  name: string;
  type: string;
  tags: string[];
  link: string;
}

const ChooseOrgCard: React.FC<ChooseOrgCardProps> = ({
  logo,
  name,
  type,
  tags,
  link,
}) => {
  return (
    <Link
      to={link}
      className="flex flex-col p-4 transition bg-white rounded-md shadow group hover:no-underline ring-1 ring-neutral-900 ring-opacity-5 hover:shadow-md"
    >
      <img src={logo} alt={name} className="w-20 m-auto mb-4" />
      <div className="mt-auto">
        <div className="text-title font-medium mb-0.5">{name}</div>
        <div className="text-subtitle">{type}</div>
        <div className="pt-4 mt-4 border-t border-neutral-200/75">
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ChooseOrgCard;
