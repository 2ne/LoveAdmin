import React from "react";
import classNames from "classnames";

export type Colours =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "red"
  | "orange"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink";

interface TagProps {
  colour: Colours;
  children?: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ colour, children, className }) => {
  const colours: Record<Colours, string> = {
    primary: "text-primary-700 bg-primary-50 ring-primary-600/10",
    success: "text-success-700 bg-success-50 ring-success-600/10",
    warning: "text-warning-700 bg-warning-50 ring-warning-600/10",
    danger: "text-danger-700 bg-danger-50 ring-danger-600/10",
    neutral: "text-neutral-700 bg-neutral-50 ring-neutral-600/10",
    red: "text-red-700 bg-red-50 ring-red-600/10",
    orange: "text-orange-700 bg-orange-50 ring-orange-600/10",
    yellow: "text-yellow-700 bg-yellow-50 ring-yellow-600/10",
    lime: "text-lime-700 bg-lime-50 ring-lime-600/10",
    green: "text-green-700 bg-green-50 ring-green-600/10",
    teal: "text-teal-700 bg-teal-50 ring-teal-600/10",
    sky: "text-sky-700 bg-sky-50 ring-sky-600/10",
    blue: "text-blue-700 bg-blue-50 ring-blue-600/10",
    indigo: "text-indigo-700 bg-indigo-50 ring-indigo-600/10",
    violet: "text-violet-700 bg-violet-50 ring-violet-600/10",
    purple: "text-purple-700 bg-purple-50 ring-purple-600/10",
    fuchsia: "text-fuchsia-700 bg-fuchsia-50 ring-fuchsia-600/10",
    pink: "text-pink-700 bg-pink-50 ring-pink-600/10",
  };

  return (
    <div
      className={classNames(
        colours[colour],
        "rounded-full py-1 px-2.5 text-xs font-medium ring-1 ring-inset inline-flex",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
