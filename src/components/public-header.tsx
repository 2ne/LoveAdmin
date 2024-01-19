import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

interface PublicHeaderProps {
  product: "loveadmin" | "joinin";
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ product }) => {
  return (
    <Header className="flex items-center px-8 border-none shadow-none bg-neutral-950">
      {product === "loveadmin" && (
        <h1 className="contents">
          <img
            alt="LoveAdmin logo"
            className="h-[19px] -mt-px"
            src="https://pro.loveadmin.com/images/loveadminlogo-reversed-v2.png"
          />
        </h1>
      )}
      {product === "joinin" && (
        <h1 className="contents">
          <Link to="/LoginJoinin" className="inline-flex">
            <span className="sr-only">JoinIn.online</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="106"
              height="34"
              viewBox="0 0 106 34"
              fill="none"
              className="text-primary-500"
            >
              <path
                d="M8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3Z"
                fill="currentColor"
              />
              <path
                d="M6 9.5V27.5C6 29.7091 4.20914 31.5 2 31.5V31.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
              <path
                d="M35 3C35 4.10457 34.1046 5 33 5C31.8954 5 31 4.10457 31 3C31 1.89543 31.8954 1 33 1C34.1046 1 35 1.89543 35 3Z"
                fill="currentColor"
              />
              <path
                d="M33 10V23"
                stroke="currentColor"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
              <path
                d="M40 23V15.5C40 12.4624 42.4624 10 45.5 10V10C48.5376 10 51 12.4624 51 15.5V23"
                stroke="currentColor"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
              <path
                d="M65 23V15.5C65 12.4624 67.4624 10 70.5 10V10C73.5376 10 76 12.4624 76 15.5V23"
                stroke="#fff"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
              <path
                d="M60 3C60 4.10457 59.1046 5 58 5C56.8954 5 56 4.10457 56 3C56 1.89543 56.8954 1 58 1C59.1046 1 60 1.89543 60 3Z"
                fill="#fff"
              />
              <path
                d="M58 10V23"
                stroke="#fff"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
              <path
                d="M19.5 23C15.9101 23 13 20.0899 13 16.5C13 12.9101 15.9101 10 19.5 10C23.0899 10 26 12.9101 26 16.5C26 20.0899 23.0899 23 19.5 23Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
              <path
                d="M83 9L96.9059 15.0838C97.7048 15.4334 97.7048 16.5666 96.9059 16.9162L83 23"
                stroke="currentColor"
                strokeWidth="4"
                strokeMiterlimit="3.99393"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </h1>
      )}
    </Header>
  );
};

export default PublicHeader;
