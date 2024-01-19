import React, { useEffect, useRef, useState } from "react";
import { Button, Select } from "antd";
const { Option } = Select;
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Player } from "../data";
import { PieChart } from "react-minimal-pie-chart";

interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamColor: string;
  awayTeamColor: string;
  type: "All" | "Fixtures" | "Training" | "Events";
}

interface EventsProps {
  squad?: boolean;
  players: Player[];
}

const Events: React.FC<EventsProps> = ({ squad, players }) => {
  const [activeMonthButton, setActiveMonthButton] =
    useState<HTMLButtonElement | null>(null);
  const generateMonths = () => {
    const currentMonth = new Date();
    currentMonth.setDate(1); // Set to the first day of the month
    const months = [];

    for (let i = -12; i <= 12; i++) {
      const month = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + i,
        1
      );
      months.push(month);
    }

    return months;
  };

  const [months, setMonths] = useState<Date[]>(generateMonths());
  const [activeMonth, setActiveMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth())
  );

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Development vs Juniors",
      date: new Date("2024-01-15T20:00:00"),
      location: "Old Trafford, Manchester",
      homeTeam: "Development",
      awayTeam: "Juniors",
      homeTeamColor: "#9333ea", // Red for Development
      awayTeamColor: "#ea580c", // Blue for Juniors
      type: "Fixtures",
    },
    {
      id: 2,
      title: "Development vs Arsenal",
      date: new Date("2023-12-10T18:00:00"),
      location: "Anfield, Development",
      homeTeam: "Development",
      awayTeam: "Arsenal",
      homeTeamColor: "#9333ea", // Red for Development
      awayTeamColor: "#EF0107", // Red for Arsenal
      type: "Fixtures",
    },
    {
      id: 3,
      title: "Tottenham Hotspur vs Juniors",
      date: new Date("2023-12-22T20:00:00"),
      location: "Tottenham Hotspur Stadium, London",
      homeTeam: "Tottenham Hotspur",
      awayTeam: "Juniors",
      homeTeamColor: "#132257", // Navy for Tottenham Hotspur
      awayTeamColor: "#ea580c", // Sky Blue for Juniors
      type: "Fixtures",
    },
    {
      id: 4,
      title: "Juniors vs West Ham United",
      date: new Date("2023-11-05T16:30:00"),
      location: "Stamford Bridge, London",
      homeTeam: "Juniors",
      awayTeam: "West Ham United",
      homeTeamColor: "#ea580c", // Blue for Juniors
      awayTeamColor: "#7A263A", // Maroon for West Ham United
      type: "Fixtures",
    },
    {
      id: 5,
      title: "Leicester City vs Juniors",
      date: new Date("2023-11-19T15:00:00"),
      location: "King Power Stadium, Leicester",
      homeTeam: "Leicester City",
      awayTeam: "Juniors",
      homeTeamColor: "#0053A0", // Blue for Leicester City
      awayTeamColor: "#ea580c", // Royal Blue for Juniors
      type: "Fixtures",
    },
    {
      id: 6,
      title: "Development Training Session",
      date: new Date("2024-01-10T10:00:00"),
      location: "Carrington Training Ground",
      homeTeam: "Development",
      awayTeam: "N/A",
      homeTeamColor: "#9333ea",
      awayTeamColor: "#FFFFFF",
      type: "Training",
    },
    {
      id: 7,
      title: "Juniors Training Session",
      date: new Date("2024-01-12T11:00:00"),
      location: "Cobham Training Centre",
      homeTeam: "Juniors",
      awayTeam: "N/A",
      homeTeamColor: "#ea580c",
      awayTeamColor: "#FFFFFF",
      type: "Training",
    },
  ]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalScrollWidth, setTotalScrollWidth] = useState(0);

  const handleEventTypeChange = (value: string) => {
    let eventTypeValue: "All" | "Fixtures" | "Training" | "Events";
    switch (value) {
      case "All events":
        eventTypeValue = "All";
        break;
      case "Fixtures":
        eventTypeValue = "Fixtures";
        break;
      case "Training":
        eventTypeValue = "Training";
        break;
      case "Events":
        eventTypeValue = "Events";
        break;
      default:
        eventTypeValue = "All";
    }
    setEventType(eventTypeValue);
  };

  const [eventType, setEventType] = useState<
    "All" | "Fixtures" | "Training" | "Events"
  >("All");

  const filteredEvents = events
    .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sort events by date
    .filter(
      (event) =>
        (eventType === "All" || event.type === eventType) &&
        event.date.getMonth() === activeMonth.getMonth() &&
        event.date.getFullYear() === activeMonth.getFullYear()
    );

  const groupEventsByDate = (events: Event[]): Record<string, Event[]> => {
    return events.reduce((groups, event) => {
      const dateKey = event.date.toISOString().split("T")[0]; // Get the date part of the ISO string
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
      return groups;
    }, {} as Record<string, Event[]>);
  };

  const groupedEvents = groupEventsByDate(filteredEvents);

  const handleMonthClick = (month: Date) => {
    setActiveMonth(month);
  };

  const isSameMonthAndYear = (d1: Date, d2: Date) => {
    return (
      d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
    );
  };

  const monthsRef = useRef<HTMLDivElement>(null);

  const scrollMonths = (direction: "left" | "right") => {
    if (monthsRef.current) {
      const currentScroll = monthsRef.current.scrollLeft;
      const scrollAmount = 285; // Adjust this value as needed
      monthsRef.current.scrollTo({
        left:
          direction === "right"
            ? currentScroll + scrollAmount
            : currentScroll - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollValues = () => {
    if (monthsRef.current) {
      setScrollPosition(monthsRef.current.scrollLeft);
      setTotalScrollWidth(
        monthsRef.current.scrollWidth - monthsRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    if (monthsRef.current) {
      const handleResize = () => {
        updateScrollValues();
        if (activeMonthButton) {
          activeMonthButton.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      };

      // Add event listeners
      window.addEventListener("resize", handleResize);
      monthsRef.current.addEventListener("scroll", updateScrollValues);

      // Initial setup
      handleResize();

      return () => {
        // Remove event listeners
        window.removeEventListener("resize", handleResize);
        if (monthsRef.current) {
          monthsRef.current.removeEventListener("scroll", updateScrollValues);
        }
      };
    }
  }, [activeMonthButton]);

  return (
    <>
      {/*       <div className="flex items-center justify-between mb-4 -mt-2.5">
        <div className="text-lg">
          <Select
            defaultValue="All events"
            onChange={handleEventTypeChange}
            popupMatchSelectWidth={false}
          >
            {["All events", "Fixtures", "Training", "Events"].map(
              (type, index) => (
                <Option key={index} value={type}>
                  {type}
                </Option>
              )
            )}
          </Select>
        </div>
        <div className="flex items-center space-x-3">
          <Button type="primary" className={!squad ? "team-bg" : ""}>
            Add event
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6 whitespace-nowrap">
        <div className="relative z-10 -mr-px shrink-0">
          <Button
            disabled={scrollPosition <= 0}
            className="text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
            icon={<LeftOutlined className="text-sm" />}
            onClick={() => scrollMonths("left")}
          />
        </div>
        <div
          ref={monthsRef}
          className="overflow-x-scroll overscroll-x-contain no-scrollbar [mask-image:_linear-gradient(to_right,_rgba(0,_0,_0,_0)_0,_rgba(0,_0,_0,_1)_7%,_rgba(0,_0,_0,_1)_93%,_rgba(0,_0,_0,_0)_100%)]"
        >
          {months.map((month, index) => (
            <Button
              ref={(el) => {
                if (
                  isSameMonthAndYear(month, activeMonth) &&
                  el instanceof HTMLButtonElement
                ) {
                  setActiveMonthButton(el);
                }
              }}
              key={index}
              className={
                isSameMonthAndYear(month, activeMonth)
                  ? `pointer-events-none w-[95px] [text-shadow:_0_0_0.1px_currentcolor] ${
                      !squad ? "team-text" : "text-primary-500"
                    }`
                  : "text-neutral-500 w-[95px]"
              }
              type={isSameMonthAndYear(month, activeMonth) ? "default" : "text"}
              onClick={() => handleMonthClick(month)}
            >
              {month.toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })}
            </Button>
          ))}
        </div>
        <div className="relative z-10 shrink-0">
          <Button
            disabled={scrollPosition >= totalScrollWidth}
            className="text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
            icon={<RightOutlined className="text-sm" />}
            onClick={() => scrollMonths("right")}
          />
        </div>
      </div>
      <div className="min-h-[50vh] space-y-5">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="py-6 text-center text-neutral-400/75">
            <div className="inline-flex w-12 h-12 mb-2.5 border rounded-full place-content-center border-neutral-300/75">
              <CalendarOutlined className="text-xl" />
            </div>
            <p className="text-base text-neutral-500">No events this month</p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([dateKey, eventsForDay]) => (
            <div key={dateKey}>
              <div className="mb-2.5 text-base font-medium">
                {new Date(dateKey).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
              {eventsForDay.map((event) => (
                <div
                  key={event.id}
                  className="relative flex bg-white rounded-md shadow-sm cursor-pointer group ring-1 ring-black/5"
                >
                  <div>
                    <div className="space-y-1.5 p-4 pb-0">
                      <h2 className="flex items-center mb-1.5 -mt-1 gap-2 text-base font-medium">
                        <div
                          className="relative inline-block w-2 h-2 rounded-full top-px"
                          style={{ backgroundColor: event.homeTeamColor }}
                        ></div>
                        <div className="group-hover:underline">
                          {event.homeTeam}{" "}
                          {event.type === "Training" && "Training"}
                        </div>
                        {event.type === "Fixtures" && (
                          <>
                            <div className="font-normal text-neutral-500">
                              vs
                            </div>
                            <div className="group-hover:underline">
                              {event.awayTeam}
                            </div>
                          </>
                        )}
                        <div
                          className="relative inline-block w-2 h-2 rounded-full top-px"
                          style={{ backgroundColor: event.awayTeamColor }}
                        ></div>
                      </h2>
                    </div>
                    <div className="p-4 pt-0 space-y-0.5">
                      <p className="text-neutral-500">
                        <ClockCircleOutlined className="mr-1.5 text-xs text-neutral-400" />

                        {new Date(event.date).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-neutral-500">
                        <EnvironmentOutlined className="mr-1.5 text-xs text-neutral-400" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pr-4 ml-auto w-20 h-20">
                    <PieChart
                      data={[
                        { title: "One", value: 8, color: "#10b981" },
                        { title: "Two", value: 2, color: "#f43f5e" },
                        { title: "Three", value: 4, color: "#94a3b8" },
                      ]}
                      lineWidth={14}
                      paddingAngle={16}
                      rounded
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div> */}
    </>
  );
};

export default Events;
