import React from "react";
import dayjs from "dayjs";
import { TimetableEvent } from "./events";
import TimetableAgendaEvent from "./timetable-agenda-event";
import { CalendarOutlined } from "@ant-design/icons";

interface TimetableAgendaProps {
  events: TimetableEvent[];
  viewMode: "day" | "week";
  currentDate: Date;
  isLoading: boolean;
  isCapacityColours: boolean;
  capacityLevels: string[];
}

const TimetableAgenda: React.FC<TimetableAgendaProps> = ({
  events,
  viewMode,
  isCapacityColours,
  currentDate,
  isLoading,
  capacityLevels,
}) => {
  const groupEventsByDay = (): { [key: string]: TimetableEvent[] } => {
    const groups: { [key: string]: TimetableEvent[] } = {};

    // Initialize groups for each day of the week or the single day in 'day' viewMode
    if (viewMode === "week") {
      for (let i = 0; i < 7; i++) {
        const day = dayjs(currentDate)
          .startOf("week")
          .add(i, "day")
          .format("YYYY-MM-DD");
        groups[day] = [];
      }
    } else if (viewMode === "day") {
      const day = dayjs(currentDate).format("YYYY-MM-DD");
      groups[day] = [];
    }

    // Populate groups with events
    events.forEach((event) => {
      const eventDay = dayjs(event.fullStartTime).format("YYYY-MM-DD");
      if (groups[eventDay]) {
        groups[eventDay].push(event);
      }
    });

    return groups;
  };

  const eventGroups = groupEventsByDay();

  return (
    <div
      className={`relative pt-1.5 pb-9 ${
        viewMode === "week" ? "grid grid-cols-7 gap-x-3" : ""
      }`}
    >
      {isLoading ? (
        <>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
          <ol className="grid py-2 auto-rows-max gap-x-3 gap-y-1 animate-fade-in-long">
            <li className="w-24 h-4 mx-auto mb-1 rounded bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
            <li className="min-h-[7.5rem] rounded-md bg-neutral-100"></li>
          </ol>
        </>
      ) : (
        <>
          {Object.keys(eventGroups).map((day) => {
            const dayEvents = eventGroups[day];
            return (
              <ol key={day} className="grid auto-rows-max gap-x-3 gap-y-1">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, index) => (
                    <TimetableAgendaEvent
                      key={event.id}
                      event={event}
                      index={index}
                      isCapacityColours={isCapacityColours}
                      capacityLevels={capacityLevels}
                    />
                  ))
                ) : (
                  <></>
                )}
                <li className="hidden text-center only:block text-neutral-500">
                  <div className="mt-2.5 space-y-1 text-sm text-center cursor-default text-neutral-400">
                    <div>
                      <CalendarOutlined className="text-xl" />
                    </div>
                    <div>No events</div>
                  </div>
                </li>
              </ol>
            );
          })}
        </>
      )}
    </div>
  );
};

export default TimetableAgenda;
