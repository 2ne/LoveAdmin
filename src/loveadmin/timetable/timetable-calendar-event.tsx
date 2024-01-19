import React from "react";
import { RightOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { EventColour, TimetableEvent, eventColourClasses } from "./events";

interface TimetableCalendarEventProps {
  event: TimetableEvent;
  index: number;
  eventRef: React.RefObject<HTMLLIElement> | null;
  earliestStartTime: dayjs.Dayjs | null;
  colStart: number;
  gridRowStart: number;
  gridRowSpan: number;
  zIndex: number;
  marginLeft: string;
  width: string;
  eventEnded: boolean;
  isCapacityColours: boolean;
  capacityLevels: string[];
}

const TimetableCalendarEvent: React.FC<TimetableCalendarEventProps> = ({
  event,
  index,
  eventRef,
  earliestStartTime,
  colStart,
  gridRowStart,
  gridRowSpan,
  zIndex,
  marginLeft,
  width,
  isCapacityColours,
  capacityLevels,
}) => {
  const isEarliestEvent = dayjs(event.fullStartTime).isSame(earliestStartTime);

  const getCapacityColourClasses = () => {
    if (event.maxCapacity === null || event.signedUp === null) {
      return "bg-neutral-300 text-neutral-950";
    }

    const capacityPercentage = event.signedUp / event.maxCapacity;
    if (capacityPercentage >= 0.75) {
      return "bg-success-400 text-success-950 !ring-0 border border-white";
    } else if (capacityPercentage <= 0.25) {
      return "bg-danger-400 text-danger-950 !ring-0 border border-white";
    } else {
      return "bg-warning-400 text-warning-950 !ring-0 border border-white";
    }
  };

  const shouldRenderEvent = () => {
    if (event.maxCapacity === null || event.signedUp === null) {
      return capacityLevels.includes("grey");
    }

    const capacityPercentage = event.signedUp / event.maxCapacity;

    if (capacityPercentage >= 0.75) {
      return capacityLevels.includes("green");
    } else if (capacityPercentage >= 0.25) {
      return capacityLevels.includes("amber");
    } else {
      return capacityLevels.includes("red");
    }
  };

  const renderCondition = isCapacityColours ? shouldRenderEvent() : true;

  return (
    <>
      {renderCondition && (
        <>
          {isEarliestEvent && (
            <li
              ref={eventRef}
              className="pointer-events-none"
              style={{
                gridColumnStart: colStart,
                gridRow: `${gridRowStart} / span ${gridRowSpan}`,
                marginLeft: marginLeft,
                marginTop: -20,
                width: width,
              }}
            ></li>
          )}
          <li
            key={index}
            className="relative flex mt-px overflow-hidden"
            style={{
              gridColumnStart: colStart,
              gridRow: `${gridRowStart} / span ${gridRowSpan}`,
              marginLeft: marginLeft,
              width: width,
            }}
          >
            <button
              tabIndex={0}
              style={{ zIndex: zIndex }}
              type="button"
              className={`${
                isCapacityColours
                  ? getCapacityColourClasses()
                  : eventColourClasses[event.eventColour as EventColour]
              } outline-none text-left absolute flex flex-col px-2 py-1.5 text-sm rounded-md group inset-0 hover:no-underline ring-1 ring-inset ring-white [-webkit-tap-highlight-color:transparent;]`}
            >
              <div
                className={`w-full relative flex-grow text-[0.99em] tracking-[-0.02em] leading-4`}
              >
                <div className="mb-1 font-medium line-clamp-2">
                  {event.description}
                </div>
                <div>
                  <time className="flex items-center gap-1">
                    <span>{dayjs(event.fullStartTime).format("HH:mm")}</span>
                    <RightOutlined className="text-[8.25px] opacity-80 -mr-px" />
                    <span className="truncate">
                      {dayjs(event.fullEndTime).format("HH:mm")}
                    </span>
                  </time>
                </div>
                {isCapacityColours && (
                  <div className="@container">
                    {event.maxCapacity !== null && (
                      <div className="mt-1 hidden @[4rem]:flex items-center gap-1">
                        <dt className="hidden @[4rem]:block">
                          <TeamOutlined className="[&_svg]:w-3.5" />
                        </dt>
                        <dd className="flex items-center">
                          {(event.signedUp || 0) + " / " + event.maxCapacity}
                        </dd>
                      </div>
                    )}
                    {event.maxCapacity === null && (
                      <div className="mt-1 hidden @[4rem]:flex items-center gap-1">
                        <dt className="hidden @[4rem]:block">
                          <TeamOutlined className="[&_svg]:w-3.5" />
                        </dt>
                        <dd>{event.signedUp || 0}</dd>
                      </div>
                    )}
                    {event.numCoaches !== null &&
                      event.assignedCoaches !== null && (
                        <div className="mt-1 hidden @[4rem]:flex items-center gap-1">
                          <dt className="hidden @[4rem]:block">
                            <UserOutlined className="[&_svg]:w-3.5" />
                          </dt>
                          <dd>
                            {event.numCoaches}
                            {event.numCoaches === 1 ? " Coach" : " Coaches"}
                          </dd>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </button>
          </li>
        </>
      )}
    </>
  );
};

export default TimetableCalendarEvent;
