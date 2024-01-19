import React from "react";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { EventColour, TimetableEvent, eventColourClasses } from "./events";

interface TimetableAgendaEventProps {
  key: number;
  event: TimetableEvent;
  index: number;
  isCapacityColours: boolean;
  capacityLevels: string[];
}

const TimetableAgendaEvent: React.FC<TimetableAgendaEventProps> = ({
  event,
  index,
  isCapacityColours,
  capacityLevels,
}) => {
  const getCapacityColourClasses = () => {
    if (event.maxCapacity === null || event.signedUp === null) {
      return "bg-neutral-300 text-neutral-950 ring-neutral-300";
    }

    const aapacityPercentage = event.signedUp / event.maxCapacity;
    if (aapacityPercentage >= 0.75) {
      return "bg-success-400 text-success-950 ring-success-400";
    } else if (aapacityPercentage <= 0.25) {
      return "bg-danger-400 text-danger-950 ring-danger-400";
    } else {
      return "bg-warning-400 text-warning-950 ring-warning-400";
    }
  };

  const getTimePeriod = (timeString: string) => {
    const time = parseInt(timeString.substring(0, 2), 10);
    let timePeriod = "";
    let timeJSX;

    if (time >= 0 && time < 12) {
      timePeriod = "morning";
      timeJSX = (
        <label className="flex items-center justify-center gap-1.5 text-sm text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M2.66683 7.99984H1.3335M4.20957 4.20925L3.26676 3.26644M11.7907 4.20925L12.7335 3.26644M14.6668 7.99984H13.3335M4.66683 7.99984C4.66683 6.15889 6.15921 4.6665 8.00016 4.6665C9.84111 4.6665 11.3335 6.15889 11.3335 7.99984M14.6668 10.6665H1.3335M8.00016 0.666504V1.99984"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="truncate">Morning</div>
        </label>
      );
    } else if (time >= 12 && time < 18) {
      timePeriod = "afternoon";
      timeJSX = (
        <label className="flex items-center justify-center gap-1.5 text-sm text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M7.66667 1.3335V2.66683M7.66667 13.3335V14.6668M2.33333 8.00016H1M3.87608 4.20957L2.93327 3.26676M11.4573 4.20957L12.4001 3.26676M3.87608 11.7935L2.93327 12.7363M11.4573 11.7935L12.4001 12.7363M14.3333 8.00016H13M11 8.00016C11 9.84111 9.50762 11.3335 7.66667 11.3335C5.82572 11.3335 4.33333 9.84111 4.33333 8.00016C4.33333 6.15921 5.82572 4.66683 7.66667 4.66683C9.50762 4.66683 11 6.15921 11 8.00016Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="truncate">Afternoon</div>
        </label>
      );
    } else if (time >= 18 && time < 24) {
      timePeriod = "evening";
      timeJSX = (
        <label className="flex items-center justify-center gap-1.5 text-sm text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M13.1667 9.2423C12.4005 9.58879 11.55 9.78166 10.6545 9.78166C7.28392 9.78166 4.55151 7.04925 4.55151 3.67865C4.55151 2.78313 4.74439 1.93265 5.09087 1.1665C2.97336 2.12412 1.5 4.25508 1.5 6.73016C1.5 10.1008 4.23241 12.8332 7.60302 12.8332C10.0781 12.8332 12.209 11.3598 13.1667 9.2423Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="truncate">Evening</div>
        </label>
      );
    } else {
      timePeriod = "allDay";
      timeJSX = (
        <label className="flex items-center justify-center gap-1.5 text-sm text-neutral-400">
          <CalendarOutlined className="shrink-0" />
          <div className="truncate">All day</div>
        </label>
      );
    }
    return { timePeriod, timeJSX };
  };

  const shouldRenderEvent = () => {
    if (event.maxCapacity === null || event.signedUp === null) {
      return capacityLevels.includes("grey");
    }

    const aapacityPercentage = event.signedUp / event.maxCapacity;

    if (aapacityPercentage >= 0.75) {
      return capacityLevels.includes("green");
    } else if (aapacityPercentage >= 0.25) {
      return capacityLevels.includes("amber");
    } else {
      return capacityLevels.includes("red");
    }
  };

  const renderCondition = isCapacityColours ? shouldRenderEvent() : true;
  const { timePeriod, timeJSX } = getTimePeriod(
    dayjs(event.fullStartTime).format("HH:mm")
  );

  return (
    <>
      {renderCondition && (
        <li key={index} className={`overflow-hidden ${timePeriod}`}>
          <div className={`time-period`}>{timeJSX}</div>
          <button
            tabIndex={0}
            type="button"
            className={`${
              isCapacityColours
                ? getCapacityColourClasses()
                : eventColourClasses[event.eventColour as EventColour]
            } outline-none text-left w-full flex min-h-[7.5rem] flex-col px-2 py-1.5 text-sm rounded-md hover:no-underline [-webkit-tap-highlight-color:transparent;] `}
          >
            <div
              className={`w-full relative flex-grow text-[0.99em] tracking-[-0.02em] leading-4`}
            >
              <div className="mb-1 font-medium line-clamp-2">
                {event.description}
              </div>
              <div className="@container flex items-center gap-1.5 mt-2">
                <ClockCircleOutlined className="[&_svg]:w-3.5" />
                <time className="flex items-center gap-1">
                  <span>{dayjs(event.fullStartTime).format("HH:mm")}</span>
                  <span className="hidden @[6.5rem]:contents">
                    <RightOutlined className="text-[8.25px] opacity-80 -mr-px" />
                    <span className="truncate">
                      {dayjs(event.fullEndTime).format("HH:mm")}
                    </span>
                  </span>
                </time>
              </div>
              <div>
                {event.maxCapacity !== null && (
                  <div className="flex items-center mt-1.5 gap-1.5">
                    <dt>
                      <TeamOutlined className="[&_svg]:w-3.5" />
                    </dt>
                    <dd className="flex items-center">
                      {(event.signedUp || 0) + " / " + event.maxCapacity}
                    </dd>
                  </div>
                )}
                {event.maxCapacity === null && (
                  <div className="flex items-center mt-1.5 gap-1.5">
                    <dt>
                      <TeamOutlined className="[&_svg]:w-3.5" />
                    </dt>
                    <dd>{event.signedUp || 0}</dd>
                  </div>
                )}
                {event.numCoaches !== null &&
                  event.assignedCoaches !== null && (
                    <div className="flex items-center mt-1.5 gap-1.5">
                      <dt>
                        <UserOutlined className="[&_svg]:w-3.5" />
                      </dt>
                      <dd>
                        {event.numCoaches}
                        {event.numCoaches === 1 ? " Coach" : " Coaches"}
                      </dd>
                    </div>
                  )}
                {event.addressName && (
                  <div className="flex items-center mt-1.5 gap-1.5">
                    <dt>
                      <EnvironmentOutlined className="[&_svg]:w-3.5" />
                    </dt>
                    <dd>{event.addressName}</dd>
                  </div>
                )}
              </div>
            </div>
          </button>
        </li>
      )}
    </>
  );
};

export default TimetableAgendaEvent;
