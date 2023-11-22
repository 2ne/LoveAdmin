import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Scrollbar from "perfect-scrollbar";
import TimetableEvents from "./timetable-events";
import RowSizeControls from "./row-size-controls";

const monthYearFormat = "MMMM YYYY";

export default function TimetableWeek() {
  const [datepicker, setDatepicker] = useState(dayjs());
  const [openDatepicker, setOpenDatepicker] = useState(false);

  const firstEventRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to first event on load to avoid showing 00:00 where there are probably no events, pass datepicker in if you want that effect when changing the date
  useEffect(() => {
    if (firstEventRef.current) {
      firstEventRef.current.scrollIntoView();
    }
  }, []);

  // Use perfectScroll for better UI
  useEffect(() => {
    if (scrollRef.current) {
      const ps = new Scrollbar(scrollRef.current);
      return () => {
        ps.destroy();
      };
    }
  }, []);

  const WeekDayLabels = ({ currentDate }: { currentDate: dayjs.Dayjs }) => {
    const isToday = (day: dayjs.Dayjs) => day.isSame(dayjs(), "day");

    const getWeekDates = () => {
      // Set Monday as the first day of the week
      let startOfWeek = currentDate.startOf("week");

      // Day.js considers Sunday as the start of the week.
      // If the current day is Sunday, startOfWeek will be the previous week's Sunday.
      // So, we add 1 day to make Monday the start of the week.
      if (startOfWeek.day() === 0) {
        startOfWeek = startOfWeek.add(1, "day");
      }

      return Array.from({ length: 7 }).map((_, index) =>
        startOfWeek.add(index, "day")
      );
    };

    return (
      <>
        {getWeekDates().map((day) => (
          <button
            type="button"
            key={day.format("DD-MM-YYYY")}
            className="flex items-center justify-center font-medium group max-md:gap-y-2 max-md:flex-col"
          >
            <span className="text-xs md:hidden">
              {day.format("ddd").charAt(0)}
            </span>
            <span className="max-md:hidden">{day.format("ddd")}</span>
            <span
              className={`flex items-center md:ml-1.5 transition-colors justify-center h-7 w-7 rounded-full ${
                isToday(day)
                  ? " bg-primary-500 text-white font-semibold"
                  : "font-medium text-neutral-900 group-hover:bg-neutral-100 rounded-full"
              }`}
            >
              {day.format("DD")}
            </span>
          </button>
        ))}
      </>
    );
  };

  const TimeLabels = () => {
    const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    return (
      <>
        {times.flatMap((time, index, array) => [
          <div key={index}>
            <div className="sticky text-right left-0 z-20 tracking-normal -ml-14 -mt-2.5 w-9 pr-1.5 text-xs text-neutral-500 tabular-nums">
              {time}
            </div>
          </div>,
          // Add a <div/> after each element except the last one for spacing
          index < array.length - 1 && <div key={`separator-${index}`}></div>,
        ])}
      </>
    );
  };

  const handleDateChange = (value: dayjs.Dayjs | null, dateString: string) => {
    if (value) {
      setDatepicker(value);
    }
    setOpenDatepicker(false);
  };

  const handlePrevDay = () => {
    setDatepicker((prevDate) => prevDate.subtract(1, "week"));
  };

  const handleNextDay = () => {
    setDatepicker((prevDate) => prevDate.add(1, "week"));
  };

  const onDatePickerOpen = (open: boolean) => {
    setOpenDatepicker(open);
  };

  const initialRowSize = 3.5;
  const [rowSize, setRowSize] = useState(initialRowSize);

  const lastScrollRatio = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current && lastScrollRatio.current !== null) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop =
        scrollContainer.scrollHeight * lastScrollRatio.current;
    }
  }, [rowSize]);

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
    <div className="flex flex-col h-[calc(100vh-8.25rem)]">
      <header className="flex items-center justify-between flex-none pb-4">
        <div className="relative h-8">
          <DatePicker
            value={datepicker}
            format={monthYearFormat}
            picker="date"
            allowClear={false}
            open={openDatepicker}
            onOpenChange={onDatePickerOpen}
            onChange={handleDateChange}
            className="absolute inset-0 opacity-0 pointer-events-none"
          />
          <Button
            type="text"
            className="relative px-2 -ml-1 text-base font-medium hover"
            onClick={() => setOpenDatepicker(true)}
          >
            <div className="relative mr-2 -top-px">
              {formatWeekSpan(datepicker)}
            </div>
            <DownOutlined className="relative text-xs -top-0.5 -mr-0.5 text-neutral-600" />
          </Button>
        </div>
        <div className="flex items-center">
          <div className="relative flex items-center gap-2 md:items-stretch">
            <Button icon={<LeftOutlined />} onClick={handlePrevDay} />
            <Button icon={<RightOutlined />} onClick={handleNextDay} />
          </div>
        </div>
      </header>
      <div
        ref={scrollRef}
        className="relative flex flex-col flex-grow px-4 -mx-4 overflow-hidden scroll-pt-20 isolate"
      >
        <div className="flex flex-col flex-none max-w-full md:max-w-none">
          <div className="sticky top-0 z-30 flex-none px-4 pb-2 -mx-4 bg-white border-b shadow-sm border-neutral-200 shadow-neutral-950/5">
            <div className="grid grid-cols-7 text-sm text-neutral-500">
              {/* Alignment spacer for the first column for @media (min-width: 768px) */}
              <div className="hidden col-end-1 md:block w-9" />
              <WeekDayLabels currentDate={datepicker} />
            </div>
          </div>
          <div className="flex flex-grow">
            <div className="sticky left-0 z-10 flex-none w-9 bg-white/90" />
            <div className="grid flex-grow grid-cols-1 grid-rows-1">
              {/* Grid layout for a 24-hour day, divided into half-hour segments (24*2) */}
              <div
                className="grid col-start-1 col-end-2 row-start-1 divide-y divide-neutral-200/75"
                style={{
                  gridTemplateRows: `repeat(${
                    24 * 2
                  }, minmax(${rowSize}rem, 1fr))`,
                }}
              >
                {/* Alignment spacer for the top row */}
                <div className="row-end-1 h-7"></div>

                <TimeLabels />

                {/* End-of-grid spacer */}
                <div />
              </div>
              <TimetableEvents
                firstEventRef={firstEventRef}
                selectedDate={datepicker}
              />
              <RowSizeControls scrollRef={scrollRef} setRowSize={setRowSize} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
