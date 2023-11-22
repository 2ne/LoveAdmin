import { Colour } from "./timetable-event";

export interface Event {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  colour: Colour;
}

export const events: Event[] = [
  // Events for the previous week
  {
    id: 1,
    title: "Team Lunch",
    startTime: new Date("2023-11-15T12:00:00"),
    endTime: new Date("2023-11-15T13:00:00"),
    colour: "yellow",
  },
  {
    id: 2,
    title: "Client Presentation",
    startTime: new Date("2023-11-16T09:00:00"),
    endTime: new Date("2023-11-16T10:00:00"),
    colour: "orange",
  },
  {
    id: 3,
    title: "Webinar on Design Trends",
    startTime: new Date("2023-11-17T15:00:00"),
    endTime: new Date("2023-11-17T16:30:00"),
    colour: "purple",
  },
  // Events for this week
  {
    id: 4,
    title: "Breakfast",
    startTime: new Date("2023-11-22T06:00:00"),
    endTime: new Date("2023-11-22T07:00:00"),
    colour: "blue",
  },
  {
    id: 5,
    title: "Flight to Paris",
    startTime: new Date("2023-11-22T07:30:00"),
    endTime: new Date("2023-11-22T08:30:00"),
    colour: "pink",
  },
  {
    id: 6,
    title: "Meeting with design team at Disney",
    startTime: new Date("2023-11-23T10:00:00"),
    endTime: new Date("2023-11-23T11:00:00"),
    colour: "green",
  },
  // Events for the next week
  {
    id: 7,
    title: "Project Kick-off",
    startTime: new Date("2023-11-29T09:30:00"),
    endTime: new Date("2023-11-29T10:30:00"),
    colour: "red",
  },
  {
    id: 8,
    title: "Software Training",
    startTime: new Date("2023-11-30T14:00:00"),
    endTime: new Date("2023-11-30T16:00:00"),
    colour: "teal",
  },
  {
    id: 9,
    title: "Year-end Review Meeting",
    startTime: new Date("2023-12-01T11:00:00"),
    endTime: new Date("2023-12-01T12:00:00"),
    colour: "amber",
  },
];
