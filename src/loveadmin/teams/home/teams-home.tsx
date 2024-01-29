import React, { useState } from "react";
import { Coach, Team } from "../data";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined,
} from "@ant-design/icons";
import HomeWidget from "./widget-home";
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

type TeamHomeProps = {
  selectedTeam: Team | null;
  getCoachesForTeam: (team: Team) => Coach[];
  getPlayersForTeam: (team: Team) => number;
  setActiveTab?: (tabName: string) => void;
};

const TeamHome: React.FC<TeamHomeProps> = ({
  selectedTeam,
  getCoachesForTeam,
  getPlayersForTeam,
  setActiveTab,
}) => {
  const selectedTeamColour = selectedTeam?.colour;
  let textColor;

  if (selectedTeamColour === "white") {
    textColor = `rgba(var(--color-neutral-600), 1)`;
  } else if (selectedTeamColour === "black") {
    textColor = `rgba(var(--color-neutral-600), 1)`;
  } else {
    textColor = `rgba(var(--color-${selectedTeamColour}-600), 1)`;
  }

  const teamColour = {
    color: textColor,
  };

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

  const sortedEvents = events.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="grid auto-rows-[9rem] grid-cols-2 md:grid-cols-4 gap-4">
      <div className="col-span-2 row-span-2 p-5 overflow-y-auto bg-white rounded-lg shadow-sm scrollbar-thin-y md:row-span-3 ring-1 ring-black/5">
        <div className="relative flex flex-col justify-between h-full">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("Events")}
            style={teamColour}
            className={`hover:underline flex items-center cursor-pointer gap-1 mb-4 group -mt-1.5 text-xl font-medium`}
          >
            <div>Events</div>
            <RightOutlined className="mt-1 text-base opacity-50" />
          </button>
          <div className="m-auto text-center text-neutral-400">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="mx-auto -mt-14 w-14 h-14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M4.75 8.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM8 4.75v3.5M16 4.75v3.5M7.75 10.75h8.5"
              ></path>
            </svg>
            <div className="text-lg font-medium">No events</div>
            {/*    {sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative flex items-center py-4 bg-white border-t cursor-pointer group border-neutral-200/75"
                >
                  <div>
                    <div className="space-y-1.5">
                      <h2 className="flex items-center gap-2 mb-1 -mt-1 text-base font-medium">
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
                    <div className="space-y-0.5">
                      <p className="text-neutral-500">
                        <ClockCircleOutlined className="mr-1.5 text-xs text-neutral-400" />
                        {event.date.toLocaleDateString("en-GB")},{" "}
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
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 ml-auto w-12 h-12">
                    <PieChart
                      data={[
                        { title: "One", value: 8, color: "#10b981" },
                        { title: "Two", value: 2, color: "#f43f5e" },
                        { title: "Three", value: 4, color: "#94a3b8" },
                      ]}
                      lineWidth={16}
                      paddingAngle={17}
                      rounded
                    />
                  </div>
                </div>
              ))} */}
          </div>
          <div>
            {/*   {sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative flex items-center py-4 bg-white border-t cursor-pointer group border-neutral-200/75"
                >
                  <div>
                    <div className="space-y-1.5">
                      <h2 className="flex items-center gap-2 mb-1 -mt-1 text-base font-medium">
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
                    <div className="space-y-0.5">
                      <p className="text-neutral-500">
                        <ClockCircleOutlined className="mr-1.5 text-xs text-neutral-400" />
                        {event.date.toLocaleDateString("en-GB")},{" "}
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
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 ml-auto w-12 h-12">
                    <PieChart
                      data={[
                        { title: "One", value: 8, color: "#10b981" },
                        { title: "Two", value: 2, color: "#f43f5e" },
                        { title: "Three", value: 4, color: "#94a3b8" },
                      ]}
                      lineWidth={16}
                      paddingAngle={17}
                      rounded
                    />
                  </div>
                </div>
              ))} */}
          </div>
        </div>
      </div>
      <HomeWidget
        teamColour={teamColour}
        title="Due payments"
        setActiveTab={() => setActiveTab && setActiveTab("Payments")}
        value="£55.00"
        icon={
          <svg
            style={teamColour}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className={`w-12 h-12 -mb-1.5 -mr-2 opacity-40`}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
            ></path>
          </svg>
        }
      />
      <HomeWidget
        teamColour={teamColour}
        title="Players"
        setActiveTab={() => setActiveTab && setActiveTab("Players")}
        value={selectedTeam && getPlayersForTeam(selectedTeam)}
        icon={
          <svg
            style={teamColour}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className={`w-12 h-12 -mb-1.5 -mr-2 opacity-40`}
          >
            <circle
              cx="7"
              cy="14"
              r="1.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="12"
              cy="14"
              r="1.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="9"
              cy="10"
              r="1.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="15"
              cy="10"
              r="1.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="12"
              cy="6"
              r="1.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="17"
              cy="14"
              r="1.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></circle>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.5 19.25s-.25-2.5-2.5-2.5-2.25 2.5-2.25 2.5M14.5 19.25s-.25-2.5-2.5-2.5-2.5 2.5-2.5 2.5M19.25 19.25s0-2.5-2.25-2.5-2.5 2.5-2.5 2.5"
            ></path>
          </svg>
        }
      />
      <HomeWidget
        teamColour={teamColour}
        title="Coaches"
        setActiveTab={() => setActiveTab && setActiveTab("Coaches")}
        className="col-span-2"
        value={
          selectedTeam && (
            <>
              {getCoachesForTeam(selectedTeam)
                .slice(0, 4)
                .map((coach, index, array) => (
                  <span key={coach.name}>
                    {coach.name}
                    {index < array.length - 1 ? ", " : ""}
                  </span>
                ))}
              {selectedTeam && getCoachesForTeam(selectedTeam).length > 4 && (
                <span className="inline">
                  {" "}
                  + {getCoachesForTeam(selectedTeam).length - 4} more.
                </span>
              )}
            </>
          )
        }
        extra={
          <>
            {selectedTeam &&
              getCoachesForTeam(selectedTeam)
                .slice(0, 4)
                .map((coach) => (
                  <div className="shrink-0" key={coach.name}>
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-8 h-8 rounded-full ring-2 ring-white"
                    />
                  </div>
                ))}
            {selectedTeam && getCoachesForTeam(selectedTeam).length > 4 && (
              <div className="shrink-0">
                <div className="flex items-center justify-center w-8 h-8 text-xs rounded-full text-primary-500 bg-primary-50 ring-2 ring-white">
                  <span>+{getCoachesForTeam(selectedTeam).length - 4}</span>
                </div>
              </div>
            )}
          </>
        }
      />
      <button
        type="button"
        className="col-span-1 row-span-1 p-5 text-left border rounded-lg shadow-sm group team-bg border-black/10"
      >
        <div className="relative flex flex-col justify-between h-full">
          <div className="-mt-1.5 text-xl font-bold text-white group-hover:underline">
            Invite players
          </div>
          <div className="-ml-2 -mb-1.5 flex items-center">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="w-14 h-14 text-white/75"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.782 19.25h7.436c.565 0 1.009-.468.896-1.021C13.804 16.7 12.79 14 9.5 14s-4.304 2.701-4.615 4.229c-.112.553.332 1.021.897 1.021zM15.75 14c2.079 0 2.93 2.148 3.274 3.696.185.836-.49 1.554-1.347 1.554h-.927"
              ></path>
              <circle
                cx="9.5"
                cy="7.5"
                r="2.75"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.75 10.25c1.519 0 2.5-1.231 2.5-2.75s-.981-2.75-2.5-2.75"
              ></path>
            </svg>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="-ml-3 w-7 h-7 -mt-0.5 text-white/75"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 5.75V18.25"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M18.25 12L5.75 12"
              ></path>
            </svg>
          </div>
        </div>
      </button>
      <button
        type="button"
        className="col-span-1 row-span-1 p-5 text-left border rounded-lg shadow-sm group team-bg border-black/10"
      >
        <div className="relative flex flex-col justify-between h-full">
          <div className="-mt-1.5 text-xl font-bold text-white group-hover:underline">
            Send message
          </div>
          <div className="-ml-2 -mb-1.5 flex items-center">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="w-14 h-14 text-white/75"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 18.25c3.5 0 7.25-1.75 7.25-6.25S15.5 5.75 12 5.75 4.75 7.5 4.75 12c0 1.03.196 1.916.541 2.67.215.47.336.987.24 1.495l-.262 1.399a1 1 0 001.168 1.167l3.207-.602a2.24 2.24 0 01.764-.003c.527.084 1.062.124 1.592.124z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.5 12a.5.5 0 11-1 0 .5.5 0 011 0zM12.5 12a.5.5 0 11-1 0 .5.5 0 011 0zM15.5 12a.5.5 0 11-1 0 .5.5 0 011 0z"
              ></path>
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};

export default TeamHome;
