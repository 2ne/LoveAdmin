import React from "react";
import dayjs from "dayjs";

type WeekDayLabelsProps = {
  viewMode: "day" | "week";
  currentDate: dayjs.Dayjs;
};

const WeekDayLabels: React.FC<WeekDayLabelsProps> = ({
  viewMode,
  currentDate,
}) => {
  const isSelectedDate = (day: dayjs.Dayjs) => day.isSame(currentDate, "day");
  const isToday = (day: dayjs.Dayjs) => day.isSame(dayjs(), "day");

  const getWeekDates = () => {
    const startOfWeek = currentDate.startOf("week");
    return Array.from({ length: 7 }).map((_, index) =>
      startOfWeek.add(index, "day")
    );
  };

  return (
    <>
      {getWeekDates().map((day) => (
        <div
          key={day.format("DD-MM-YYYY")}
          className={`relative flex items-center justify-center ${
            !isSelectedDate(day) && viewMode === "day" ? "hidden" : ""
          }`}
        >
          <span>
            {viewMode === "day" ? day.format("dddd") : day.format("ddd")}
          </span>
          <span
            className={`flex items-center ml-1 transition-colors justify-center h-7 rounded-full ${
              isToday(day)
                ? "bg-primary-500 text-white font-medium w-7"
                : "text-neutral-900 rounded-full w-4"
            }`}
          >
            {day.format("DD")}
          </span>
        </div>
      ))}
    </>
  );
};

export default WeekDayLabels;
