import React from "react";
import { events } from "./events";
import TimetableEvent from "./timetable-event";
import dayjs from "dayjs";

interface TimetableEventsProps {
  firstEventRef: React.RefObject<HTMLButtonElement>;
  selectedDate: dayjs.Dayjs;
}

const TimetableEvents: React.FC<TimetableEventsProps> = ({
  firstEventRef,
  selectedDate,
}) => {
  const rowsPerHour = 60 / 5;
  const totalRows = 24 * rowsPerHour;

  // Calculate start and end of the week
  const startOfWeek = selectedDate.startOf("week");
  const endOfWeek = startOfWeek.add(1, "week");

  // Filter events based on the selected week
  const weekEvents = events.filter((event) => {
    const eventStart = dayjs(event.startTime);
    return eventStart.isAfter(startOfWeek) && eventStart.isBefore(endOfWeek);
  });

  return (
    <ol
      className="grid grid-cols-1 col-start-1 col-end-2 row-start-1 md:grid-cols-7"
      style={{
        gridTemplateRows: `1.75rem repeat(${totalRows}, minmax(0, 1fr)) auto`,
      }}
    >
      {weekEvents.map((event, index) => (
        <TimetableEvent
          key={index}
          event={event}
          index={index}
          firstEventRef={firstEventRef}
        />
      ))}
    </ol>
  );
};

export default TimetableEvents;
