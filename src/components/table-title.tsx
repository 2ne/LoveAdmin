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
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
}

const Separator: React.FC = () => (
  <span className="mx-1.5 text-subtitle">·</span>
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
    <Title level={5} className="m-0">
      {Array.isArray(title) ? (
        <Select
          defaultValue={title[0]}
          onChange={handleChange}
          bordered={false}
          className="h-7 [&_.ant-select-selection-item]:text-base [&_.ant-select-selection-item]:font-semibold [&_.ant-select-selection-item]:text-primary-600 [&:hover_.ant-select-selection-item]:text-primary-500 [&:hover_.ant-select-selection-item]:underline [&_.ant-select-selector]:!pl-0 [&_.ant-select-selector]:!pr-2.5 -mr-2.5  [&_.ant-select-arrow]:text-primary-700 [&:hover_.ant-select-arrow]:text-primary-600 [&_.ant-select-selection-item]:underline-offset-2"
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
        <span>{title}</span>
      )}
      {!hideCount && (
        <>
          <Separator />
          {noRowsSelected ? (
            <span className="text-subtitle">{`${totalRecords} ${term}`}</span>
          ) : (
            <>
              <span className="font-medium tabular-nums text-subtitle">
                {`${selectedRowKeysLength} of ${totalRecords} selected`}
              </span>
              {!allRowsSelected && <Separator />}
              {!allRowsSelected && (
                <a className="" onClick={onSelectAll}>
                  Select all
                </a>
              )}
              <Separator />
              <a className="" onClick={onUnselectAll}>
                Clear selection
              </a>
            </>
          )}
          {selectable && noRowsSelected && !allRowsSelected && (
            <>
              <Separator />
              <a className="" onClick={onSelectAll}>
                Select all
              </a>
            </>
          )}
        </>
      )}
    </Title>
  );
};

export default TableTitle;
