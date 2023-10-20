import React, { useState } from "react";
import { Button, Popover, DatePicker, Modal } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

interface DateFilterProps {
  defaultFilter: string;
}

const DateFilter: React.FC<DateFilterProps> = ({ defaultFilter }) => {
  const [filter, setFilter] = useState<string>(defaultFilter);
  const [selectedDate, setSelectedDate] = useState<any | null>();
  const [selectedDates, setSelectedDates] = useState<any[] | null>();
  const [mainPopoverVisible, setMainPopoverVisible] = useState<boolean>(false);
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);

  const handleFilterClick = (value: string) => {
    setSelectedDate(null);
    setSelectedDates(null);
    setFilter(value);
    setMainPopoverVisible(false);

    if (["Between", "Equal to", "Before", "After"].includes(value)) {
      setDateModalVisible(true);
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDates(null);
    setSelectedDate(date);
    setDateModalVisible(false);
  };

  const handleDatesChange = (date: any) => {
    setSelectedDate(null);
    setSelectedDates(date);
    setDateModalVisible(false);
  };

  const popoverContent = (
    <div className="-m-3 p-3 w-48 max-h-[calc(95vh-12rem)] overflow-y-auto scrollbar-thin-y">
      {[
        "Today",
        "Yesterday",
        "This week",
        "Last week",
        "This month",
        "Last month",
        "This calendar quarter",
        "Last calendar quarter",
        "This fiscal year",
        "Last fiscal year",
        "Between",
        "Equal to",
        "Before",
        "After",
      ].map((option) => (
        <Button
          key={option}
          onClick={() => handleFilterClick(option)}
          className={`justify-start px-2 ${
            filter === option ? "font-medium bg-primary-50" : ""
          }`}
          block
          type="text"
        >
          {option}
        </Button>
      ))}
    </div>
  );

  return (
    <div>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={popoverContent}
        open={mainPopoverVisible}
        onOpenChange={(visible) => setMainPopoverVisible(visible)}
      >
        <Button icon={<CalendarOutlined />}>
          <span>{filter}</span>
          {selectedDate && (
            <span className="ml-1">
              {new Date(selectedDate).toLocaleDateString()}
            </span>
          )}
          {selectedDates &&
            (selectedDates.length === 1 ? (
              <span className="ml-1">
                {new Date(selectedDates[0]).toLocaleDateString()}
              </span>
            ) : (
              <span className="ml-1">
                {selectedDates
                  .map((date) => new Date(date).toLocaleDateString())
                  .join(" — ")}
              </span>
            ))}
        </Button>
      </Popover>
      <Modal
        title={filter}
        onCancel={() => setDateModalVisible(false)}
        open={dateModalVisible}
        footer={null}
        closeIcon={null}
        destroyOnClose={true}
        className={
          filter === "Between"
            ? " w-80 "
            : ["Equal to", "Before", "After"].includes(filter)
            ? " w-64 "
            : " "
        }
      >
        <div className="mb-2">
          {filter === "Between" && (
            <RangePicker
              format={"DD/MM/YYYY"}
              className="w-full"
              onChange={(dates) => handleDatesChange(dates)}
            />
          )}
          {["Equal to", "Before", "After"].includes(filter) && (
            <DatePicker
              format={"DD/MM/YYYY"}
              className="w-full"
              onChange={(date) => handleDateChange(date)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DateFilter;
