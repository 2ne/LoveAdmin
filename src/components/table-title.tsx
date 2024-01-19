import React, { ReactNode, useState } from "react";
import { Select, Typography } from "antd";
const { Title } = Typography;
const { Option } = Select;

interface TableTitleProps {
  title: ReactNode | ReactNode[];
  selectable?: boolean;
  selectedRowKeysLength?: number;
  totalRecords?: number;
  hideCount?: boolean;
  recordsTerm?: { singular: string; plural: string };
  small?: boolean;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
}

const Separator: React.FC<TableTitleProps> = (small) => (
  <span className={`text-subtitle ${small ? "mx-1" : "mx-1.5"}`}>·</span>
);

const TableTitle: React.FC<TableTitleProps> = ({
  title,
  selectable = true,
  selectedRowKeysLength = 0,
  totalRecords = 0,
  hideCount = false,
  recordsTerm = { singular: "record", plural: "records" },
  onSelectAll,
  onUnselectAll,
  small = false,
}) => {
  const [selectedTitle, setSelectedTitle] = useState<ReactNode | null>(
    Array.isArray(title) ? title[0] : title
  );

  const handleChange = (value: ReactNode) => {
    setSelectedTitle(value);
  };

  const noRowsSelected = selectedRowKeysLength === 0;
  const allRowsSelected = selectedRowKeysLength === totalRecords;
  const term = totalRecords === 1 ? recordsTerm.singular : recordsTerm.plural;

  return (
    <Title
      level={5}
      className={`relative flex min-w-0 m-0 top-px ${small ? "text-sm" : ""}`}
    >
      {Array.isArray(title) ? (
        <Select
          defaultValue={title[0]}
          onChange={handleChange}
          bordered={false}
          className="shadow-none h-7 [&_.ant-select-selection-item]:text-base [&_.ant-select-selection-item]:font-medium [&_.ant-select-selection-item]:text-primary-600 [&:hover_.ant-select-selection-item]:text-primary-600 [&:hover_.ant-select-selection-item]:underline [&_.ant-select-selector]:!pl-0 [&_.ant-select-selector]:!pr-2.5 -mr-2.5  [&_.ant-select-arrow]:text-primary-700/90 [&:hover_.ant-select-arrow]:text-primary-600 [&_.ant-select-selection-item]:underline-offset-2 [&_.ant-select-selection-item]:-top-0.5 [&_.ant-select-selection-item]:pr-[17px]"
        >
          {title.map((t, index) => {
            return (
              <Option key={index} value={t}>
                {t}
              </Option>
            );
          })}
        </Select>
      ) : (
        <div className="min-w-0">
          <div className="relative w-full truncate max-w-prose">{title}</div>
        </div>
      )}
      {!hideCount && (
        <div className="hidden sm:contents">
          <Separator />
          {noRowsSelected ? (
            <div className="text-subtitle whitespace-nowrap">{`${totalRecords} ${term}`}</div>
          ) : (
            <>
              <div className="font-medium whitespace-nowrap tabular-nums text-subtitle">
                {`${selectedRowKeysLength} of ${totalRecords} selected`}
              </div>
              {!allRowsSelected && <Separator />}
              {!allRowsSelected && (
                <a className="whitespace-nowrap" onClick={onSelectAll}>
                  Select all
                </a>
              )}
              <Separator />
              <a className="truncate whitespace-nowrap" onClick={onUnselectAll}>
                Clear selection
              </a>
            </>
          )}
          {selectable && noRowsSelected && !allRowsSelected && (
            <>
              <Separator />
              <a className="whitespace-nowrap" onClick={onSelectAll}>
                Select all
              </a>
            </>
          )}
        </div>
      )}
    </Title>
  );
};

export default TableTitle;
