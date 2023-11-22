import React from "react";
import { RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Event } from "./events";

export type Colour = keyof typeof colourClasses;
const colourClasses = {
  red: "bg-red-100 text-red-700 ring-red-950/10",
  orange: "bg-orange-100 text-orange-700 ring-orange-950/10",
  amber: "bg-amber-100 text-amber-700 ring-amber-950/10",
  yellow: "bg-yellow-100 text-yellow-700 ring-yellow-950/10",
  lime: "bg-lime-100 text-lime-700 ring-lime-950/10",
  green: "bg-green-100 text-green-700 ring-green-950/10",
  emerald: "bg-emerald-100 text-emerald-700 ring-emerald-950/10",
  teal: "bg-teal-100 text-teal-700 ring-teal-950/10",
  cyan: "bg-cyan-100 text-cyan-700 ring-cyan-950/10",
  sky: "bg-sky-100 text-sky-700 ring-sky-950/10",
  blue: "bg-blue-100 text-blue-700 ring-blue-950/10",
  indigo: "bg-indigo-100 text-indigo-700 ring-indigo-950/10",
  violet: "bg-violet-100 text-violet-700 ring-violet-950/10",
  purple: "bg-purple-100 text-purple-700 ring-purple-950/10",
  fuchsia: "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-950/10",
  pink: "bg-pink-100 text-pink-700 ring-pink-950/10",
  rose: "bg-rose-100 text-rose-700 ring-rose-950/10",
  stone: "bg-stone-100 text-stone-700 ring-stone-950/10",
};

interface TimetableEventProps {
  event: Event;
  index: number;
  firstEventRef: React.RefObject<HTMLButtonElement>;
}

const TimetableEvent: React.FC<TimetableEventProps> = ({
  event,
  index,
  firstEventRef,
}) => {
  const calculateGridValues = (event: Event) => {
    const start = dayjs(event.startTime);
    const end = dayjs(event.endTime);
    const colStart = start.day();
    const dayStart = start.startOf("day");
    const gridRowStart = start.diff(dayStart, "minute") / 5 + 2; // Add 2 to account for the spacer
    const gridRowSpan = end.diff(start, "minute") / 5;
    return { colStart, gridRowStart, gridRowSpan };
  };

  const { colStart, gridRowStart, gridRowSpan } = calculateGridValues(event);

  return (
    <li
      key={index}
      className="relative flex mt-px max-md:col-auto"
      style={{
        gridColumnStart: colStart,
        gridRow: `${gridRowStart} / span ${gridRowSpan}`,
      }}
    >
      <button
        type="button"
        ref={index === 0 ? firstEventRef : null}
        className={`text-left absolute min-h-[3rem] flex flex-col p-2 overflow-y-auto overscroll-y-contain text-sm transition-all rounded-md scrollbar-thin-y overflow-x-clip group inset-1 hover:no-underline ring-0 md:hover:z-10 md:hover:ring-1 focus-within:bg-opacity-90 hover:focus-within:ring-2 focus-within:ring-2 focus-within:shadow-sm focus-within:z-10 focus-within:min-h-[9.425rem] ring-inset ${
          colourClasses[event.colour as Colour]
        }`}
      >
        <div className="-mt-1">
          <time className="flex items-center gap-1">
            <span>{dayjs(event.startTime).format("HH:mm")}</span>
            <RightOutlined className="text-[9.5px] opacity-80" />
            <span>{dayjs(event.endTime).format("HH:mm")}</span>
          </time>
        </div>
        <div className="mt-0.5 font-medium">{event.title}</div>
      </button>
    </li>
  );
};

export default TimetableEvent;
