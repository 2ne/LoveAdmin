import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

interface TableTitleProps {
  title: string;
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
  const noRowsSelected = selectedRowKeysLength === 0;
  const allRowsSelected = selectedRowKeysLength === totalRecords;
  const term = totalRecords === 1 ? recordsTerm.singular : recordsTerm.plural;

  return (
    <Title level={5} className="m-0">
      <span>{title}</span>
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
