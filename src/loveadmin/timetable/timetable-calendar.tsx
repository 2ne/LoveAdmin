import { useCallback } from "react";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import { TimetableEvent } from "./events";
import TimetableCalendarEvent from "./timetable-calendar-event";

interface TimetableCalendarProps {
  events: TimetableEvent[];
  eventRef: React.RefObject<HTMLLIElement>;
  selectedDate: dayjs.Dayjs;
  viewMode: "day" | "week";
  isCapacityColours: boolean;
  capacityLevels: string[];
}

type EventGroups = {
  [key: number]: TimetableEvent[];
};

const TimetableCalendar: React.FC<TimetableCalendarProps> = ({
  events,
  eventRef,
  selectedDate,
  viewMode,
  isCapacityColours,
  capacityLevels,
}) => {
  const calculateGridValues = useCallback((event: TimetableEvent) => {
    const start = dayjs(event.fullStartTime);
    const end = dayjs(event.fullEndTime);
    const eventDay = start.day() === 0 ? 7 : start.day(); // Adjust for week start on Sunday

    const dayStart = start.startOf("day");
    const gridRowStart = start.diff(dayStart, "minute") / 5 + 2; // Add 2 to account for the spacer
    const gridRowSpan = end.diff(start, "minute") / 5;

    const colStart = eventDay; // Use the eventDay variable here

    return { colStart, gridRowStart, gridRowSpan };
  }, []);

  const groupOverlappingEvents = (events: TimetableEvent[]) => {
    // Sort events by start time
    const sortedEvents = events.sort((a, b) =>
      dayjs(a.fullStartTime).diff(dayjs(b.fullStartTime))
    );
    const groups: TimetableEvent[][] = [];
    let currentGroupEnd:
      | string
      | number
      | dayjs.Dayjs
      | Date
      | null
      | undefined = null; // Track the end time of the first event in the current group
    let currentGroup: TimetableEvent[] = []; // Track the current group of events

    sortedEvents.forEach((event) => {
      const eventStart = dayjs(event.fullStartTime);
      const eventEnd = dayjs(event.fullEndTime);

      if (currentGroupEnd === null || eventStart.isAfter(currentGroupEnd)) {
        // This event is either the first in a group, or starts after the last group has ended
        currentGroup = [event];
        groups.push(currentGroup);
        currentGroupEnd = eventEnd;
      } else {
        // Try to place the event in the last group if it overlaps
        const lastGroup = currentGroup;
        if (lastGroup.some((e) => dayjs(e.fullEndTime).isAfter(eventStart))) {
          lastGroup.push(event);
          // Update the currentGroupEnd if this event ends later than the current last event
          if (eventEnd.isAfter(currentGroupEnd)) {
            currentGroupEnd = eventEnd;
          }
        }

        // If the maximum of 4 events in a group is reached, start a new group
        if (currentGroup.length >= 4) {
          currentGroupEnd = null;
        }
      }
    });

    return groups;
  };

  const groupEventsByDay = (events: TimetableEvent[]): EventGroups => {
    const grouped: EventGroups = {};

    events.forEach((event) => {
      const dayOfWeek =
        dayjs(event.fullStartTime).day() === 0
          ? 7
          : dayjs(event.fullStartTime).day();
      if (!grouped[dayOfWeek]) {
        grouped[dayOfWeek] = [];
      }
      grouped[dayOfWeek].push(event);
    });

    // Sort the events within each day group by their start time
    Object.keys(grouped).forEach((key) => {
      const day = parseInt(key);
      grouped[day].sort((a, b) =>
        dayjs(a.fullStartTime).diff(dayjs(b.fullStartTime))
      );
    });

    return grouped;
  };

  const calculateEventStyles = (events: TimetableEvent[]) => {
    const groupedEvents = groupOverlappingEvents(events);
    const styles = new Map();
    const baseZIndex = 9999;

    groupedEvents.forEach((group) => {
      // Sort the events in each group by start time
      group.sort((a, b) => dayjs(a.fullStartTime).diff(dayjs(b.fullStartTime)));

      // Assign zIndex based on the sorted order, but ensure full-width events have a lower zIndex
      group.forEach((event, index) => {
        const eventsToShow = group.length;
        const widthPercentage = eventsToShow > 1 ? 100 / eventsToShow : 100;
        const isFullWidth = widthPercentage === 100;

        // Calculate zIndex. Full-width events get a lower zIndex.
        const zIndex = isFullWidth ? baseZIndex - 1 : baseZIndex + index;

        // Calculate marginLeft based on the index in the group
        const marginLeftPercentage = (100 / eventsToShow) * index;

        styles.set(event.id, {
          marginLeft: `${marginLeftPercentage}%`,
          width: `${widthPercentage}%`,
          zIndex, // Assign the zIndex
        });
      });
    });

    return styles;
  };

  const eventHasEnded = (endTime: Date | undefined) => {
    return endTime ? dayjs().isAfter(dayjs(endTime)) : false;
  };

  const gridClassNames =
    viewMode === "week" ? "grid-cols-7" : "grid-cols-1 [&>li]:!col-start-1";
  const eventStyles = calculateEventStyles(events);

  // Function to calculate the current time position
  const calculateCurrentTimePosition = () => {
    const now = dayjs();
    const dayStart = now.startOf("day");
    const gridRowStart = Math.round(now.diff(dayStart, "minute") / 5) + 2; // Round to the nearest whole number and add 2 to account for the spacer
    return gridRowStart;
  };

  const currentTimePosition = calculateCurrentTimePosition();
  const todayGridColumn = calculateTodayGridColumn();

  function calculateTodayGridColumn() {
    if (viewMode === "week") {
      // Assuming the week starts on Sunday and Sunday is represented as 0
      const todayIndex = dayjs().day();
      // Adjust if your grid starts with Monday as the first column
      return todayIndex === 0 ? 7 : todayIndex;
    } else {
      // For day view mode, it's always 1
      return 1;
    }
  }

  const findEarliestEvent = (
    events: TimetableEvent[]
  ): TimetableEvent | null => {
    let earliestEvent: TimetableEvent | null = null;
    let earliestGridRowStart = Number.MAX_SAFE_INTEGER;

    events.forEach((event) => {
      const { gridRowStart } = calculateGridValues(event);

      if (gridRowStart < earliestGridRowStart) {
        earliestGridRowStart = gridRowStart;
        earliestEvent = event;
      }
    });

    return earliestEvent;
  };

  const isSelectedDayToday = selectedDate.isSame(dayjs(), "day");
  const eventGroupByDay = groupEventsByDay(events);

  const rowsPerHour = 60 / 5;
  const rowHeight = "minmax(0, 1fr)) auto"; // or any other fixed height as needed
  const totalRows = 24 * rowsPerHour;
  const allDayRow = "1.75rem";
  const TimeLabels = () => {
    // Generating 24-hour times with leading zero for hours less than 10
    const times = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, "0"); // Pad with zero if necessary
      return `${hour}:00`;
    });

    return (
      <>
        {times.flatMap((time, index, array) => [
          <div key={index}>
            <div className="text-right tracking-[-0.02em] -ml-9 -mt-2.5 w-9 pr-1.5 text-xs text-neutral-500 tabular-nums">
              {time}
            </div>
          </div>,
          // Add a <div/> after each element except the last one for spacing
          index < array.length - 1 && <div key={`separator-${index}`}></div>,
        ])}
      </>
    );
  };
  const rowSize = 3.5;

  return (
    <div className="flex flex-col flex-none max-w-full md:max-w-none">
      <div className="flex flex-grow">
        <div className="flex-none w-9" />
        <div className="grid flex-grow grid-cols-1 grid-rows-1">
          {/* Grid layout for a 24-hour day, divided into half-hour segments (24*2) */}
          <div
            className="grid col-start-1 col-end-2 row-start-1 divide-y pointer-events-none divide-neutral-200/75"
            style={{
              gridTemplateRows: `repeat(${24 * 2}, minmax(${rowSize}rem, 1fr))`,
            }}
          >
            {/* Alignment spacer for the top row */}
            <div className="row-end-1 h-7"></div>
            <TimeLabels />
            <div />
          </div>

          <ol
            className={`${gridClassNames} gap-x-3 z-10 grid col-start-1 col-end-2 row-start-1`}
            style={{
              gridTemplateRows: `${allDayRow} repeat(${totalRows}, ${rowHeight}`,
            }}
          >
            {Object.keys(eventGroupByDay)
              .sort()
              .map((dayKey) => {
                // Convert dayKey to a number before using it to access the grouped events
                const day = parseInt(dayKey, 10); // Ensure that dayKey is treated as a number
                return eventGroupByDay[day].map((event) => {
                  const dayOfWeek = dayjs(event.fullStartTime).day() || 7; // Ensure Sunday is considered as 7
                  const dayEvents = eventGroupByDay[dayOfWeek] || [];
                  const eventIndex = dayEvents.findIndex(
                    (e) => e.id === event.id
                  );

                  const { colStart, gridRowStart, gridRowSpan } =
                    calculateGridValues(event);

                  const { marginLeft, width, zIndex } = eventStyles.get(
                    event.id
                  ) || {
                    marginLeft: "0",
                    width: "100%",
                    zIndex: 0, // Default zIndex if not found in the map
                  };
                  const eventEnded = eventHasEnded(event.fullEndTime);
                  const earliestEvent = findEarliestEvent(events);
                  const earliestStartTime = earliestEvent
                    ? dayjs(earliestEvent.fullStartTime)
                    : null;

                  return (
                    <TimetableCalendarEvent
                      key={event.id}
                      event={event}
                      index={eventIndex} // Use the eventIndex within the day group here.
                      eventRef={eventRef}
                      earliestStartTime={earliestStartTime}
                      colStart={colStart}
                      gridRowStart={gridRowStart}
                      gridRowSpan={gridRowSpan}
                      zIndex={zIndex}
                      marginLeft={marginLeft}
                      width={width}
                      eventEnded={eventEnded}
                      isCapacityColours={isCapacityColours}
                      capacityLevels={capacityLevels}
                    />
                  );
                });
              })}
            <>
              {/* Current time indicator */}
              {viewMode === "week" && (
                <div
                  className="grid grid-cols-[subgrid] w-[calc(100%-2px)] h-0 z-max relative border-transparent border-b border-dashed ml-px col-span-full [&:where(div:hover)]:border-primary-500 transition-colors"
                  style={{
                    gridRowStart: currentTimePosition,
                  }}
                >
                  <div
                    className="w-[calc(100%-2px)] relative bg-primary-500 h-px ml-px"
                    style={{
                      gridColumnStart: todayGridColumn,
                      gridColumnEnd: todayGridColumn + 1,
                    }}
                  >
                    <Tooltip overlayClassName="tabular-nums">
                      <div className="absolute left-0 w-2 h-2 -ml-1 -translate-y-1/2 rounded-full bg-primary-500 top-1/2"></div>
                    </Tooltip>
                  </div>
                </div>
              )}
              {viewMode === "day" && isSelectedDayToday && (
                <Tooltip overlayClassName="tabular-nums">
                  <div
                    className="w-[calc(100%-2px)] z-max relative bg-primary-500 h-px ml-px"
                    style={{
                      gridColumnStart: viewMode === "day" ? 1 : todayGridColumn,
                      gridColumnEnd:
                        viewMode === "day" ? -1 : todayGridColumn + 1,
                      gridRowStart: currentTimePosition,
                    }}
                  ></div>
                </Tooltip>
              )}
            </>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TimetableCalendar;
