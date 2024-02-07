import { FilterOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, DatePicker, Segmented, Tooltip } from "antd";
import dayjs from "dayjs";
import { SegmentedValue } from "antd/es/segmented";
import WeekDayLabels from "./week-day-labels";
import { Dispatch, SetStateAction } from "react";
import CapacityButton from "./capacity-button";

const monthYearFormat = "MMMM YYYY";

type TimetableHeaderProps = {
  datepicker: dayjs.Dayjs;
  viewMode: "day" | "week";
  isMobile: boolean;
  isCapacityColours: boolean;
  openDatepicker: boolean;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  onPrevDay: () => void;
  onNextDay: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onTodayClick: () => void;
  onDatePickerOpen: (open: boolean) => void;
  onDateChange: (value: dayjs.Dayjs | null) => void;
  onToggleCapacityColours: () => void;
  onViewModeChange: (value: SegmentedValue) => void;
  onCapacityLevelsChange: (levels: string[]) => void;
  selectedview: SegmentedValue;
};

const TimetableHeader: React.FC<TimetableHeaderProps> = ({
  datepicker,
  viewMode,
  isMobile,
  isCapacityColours,
  openDatepicker,
  collapsed,
  setCollapsed,
  onPrevDay,
  onNextDay,
  onPrevWeek,
  onNextWeek,
  onTodayClick,
  onDatePickerOpen,
  onDateChange,
  onToggleCapacityColours,
  onViewModeChange,
  onCapacityLevelsChange,
  selectedview,
}) => {
  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const formatWeekSpan = (currentDate: dayjs.Dayjs) => {
    // Start and end of the week
    let startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");

    // Adjust for weeks starting on Sunday
    if (startOfWeek.day() === 0) {
      startOfWeek = startOfWeek.add(1, "day");
    }

    // Check if the week spans two months
    if (startOfWeek.month() !== endOfWeek.month()) {
      return `${startOfWeek.format("MMM")} — ${endOfWeek.format("MMM YYYY")}`;
    } else {
      return currentDate.format(monthYearFormat);
    }
  };

  return (
    <header>
      <div className="flex items-center justify-center gap-3 pb-4 md:justify-between">
        <div className="max-md:hidden">
          <Button
            onClick={handleToggleSidebar}
            icon={<FilterOutlined />}
            className={
              !collapsed
                ? "border-primary-500 text-primary-600 bg-primary-50/75"
                : ""
            }
          />
        </div>
        <div className="md:hidden">
          <Button
            icon={<LeftOutlined className="text-xs" />}
            onClick={onPrevDay}
          />
        </div>
        <div className="flex items-center flex-grow gap-3">
          <div className="max-md:flex-grow flex items-center bg-white border border-neutral-950/[0.125] rounded shadow-sm shadow-neutral-950/5">
            <Tooltip
              title={viewMode === "day" ? "Previous day" : "Previous week"}
              placement="bottom"
              className="max-md:hidden"
            >
              <Button
                type="text"
                className="border-0 h-[30px] rounded-[3px] rounded-r-none text-neutral-500 hover:text-neutral-700"
                icon={<LeftOutlined className="text-xs" />}
                onClick={viewMode === "day" ? onPrevDay : onPrevWeek}
              />
            </Tooltip>
            <div className="relative flex-grow">
              <DatePicker
                value={datepicker}
                format={monthYearFormat}
                picker="date"
                allowClear={false}
                open={openDatepicker}
                onOpenChange={onDatePickerOpen}
                onChange={onDateChange}
                showToday={isMobile}
                placement="bottomLeft"
                className="absolute inset-0 opacity-0 pointer-events-none"
                popupClassName="max-md:left-1/2 max-md:-translate-x-1/2 max-md:ml-3 [&.ant-slide-up-enter]:supports-[-webkit-touch-callout:none]:!duration-[1ms] [&.ant-slide-up-enter]:supports-[-webkit-touch-callout:none]:!opactiy-0 [&.ant-slide-up-leave]:supports-[-webkit-touch-callout:none]:!duration-[1ms] [&.ant-slide-up-leave]:supports-[-webkit-touch-callout:none]:!opacity-0 !top-[115px]"
              />
              <Button
                type="text"
                onClick={() => onDatePickerOpen(true)}
                className={`${
                  viewMode === "day" ? "w-full lg:w-[9rem]" : "w-[7.5rem]"
                } border-0 h-[30px] px-2 md:rounded-none`}
              >
                <div>
                  {viewMode === "day" ? (
                    <span className="">{datepicker.format("dddd D MMMM")}</span>
                  ) : (
                    <span className="">{formatWeekSpan(datepicker)}</span>
                  )}
                </div>
              </Button>
            </div>
            <Tooltip
              title={viewMode === "day" ? "Next day" : "Next week"}
              placement="bottom"
              className="max-md:hidden"
            >
              <Button
                type="text"
                className="max-md:hidden border-0 h-[30px] rounded-[3px] rounded-l-none text-neutral-500 hover:text-neutral-700"
                icon={<RightOutlined className="text-xs" />}
                onClick={viewMode === "day" ? onNextDay : onNextWeek}
              />
            </Tooltip>
          </div>
          <Button onClick={onTodayClick} className="max-md:hidden">
            Today
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            icon={<RightOutlined className="text-xs" />}
            onClick={onNextDay}
          />
        </div>
        <div className="items-center hidden gap-3 md:flex">
          <CapacityButton
            isCapacityColours={isCapacityColours}
            onToggleCapacityColours={onToggleCapacityColours}
            onCapacityLevelsChange={onCapacityLevelsChange}
          />
          <div className="max-md:hidden">
            <Segmented
              options={[
                { label: "Week", value: "week", className: "w-[4.5rem]" },
                { label: "Day", value: "day", className: "w-[4.5rem]" },
              ]}
              value={viewMode}
              onChange={onViewModeChange}
            />
          </div>
        </div>
      </div>
      {selectedview !== "List" && (
        <div className="flex-none px-4 -mx-4 bg-white border-b shadow-sm md:pb-2 border-neutral-200 shadow-neutral-950/5">
          <div
            className={`hidden md:grid text-sm text-neutral-500 pr-[var(--scrollbar-width)] ${
              viewMode === "week" ? "grid-cols-7  gap-x-3" : "grid-cols-1"
            }`}
          >
            <WeekDayLabels viewMode={viewMode} currentDate={datepicker} />
          </div>
        </div>
      )}
    </header>
  );
};

export default TimetableHeader;
