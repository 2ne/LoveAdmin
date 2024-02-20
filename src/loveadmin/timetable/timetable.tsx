import { Breadcrumb, Button, Layout, Segmented } from "antd";
import dayjs from "dayjs";
import LoveAdminHeader from "../../components/header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect, useRef, useState } from "react";
import ClassTree from "../filter-class-events";
import {
  BarsOutlined,
  BuildOutlined,
  CalendarOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { SegmentedValue } from "antd/es/segmented";
import TimetableCalendar from "./timetable-calendar";
import TimetableHeader from "./timetable-header";
import TimetableAgenda from "./timetable-agenda";
import { TimetableEvent, events } from "./events";
import TimetableList from "./timetable-list";

const { Content } = Layout;

const Timetable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [datepicker, setDatepicker] = useState(dayjs());
  const [openDatepicker, setOpenDatepicker] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [viewMode, setViewMode] = useState<"day" | "week">(
    window.innerWidth >= 768 ? "week" : "day"
  );
  const eventRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCapacityColours, setIsCapacityColours] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const initialView = location.pathname.includes("Calendar")
    ? "Calendar"
    : location.pathname.includes("List") // Check if the URL includes "List"
    ? "List" // Set the initial view to "List" if true
    : "Agenda"; // Default to "Agenda" if neither "Calendar" nor "List" is in the URL
  const [selectedview, setSelectedView] = useState<SegmentedValue>(initialView);
  const isCalendarView = selectedview === "Calendar";
  const isAgendaView = selectedview === "Agenda";
  const isListView = selectedview === "List";
  const [capacityLevels, setCapacityLevels] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimetableEvent[]>([]);

  const handleCapacityLevelsChange = (levels: string[]) => {
    setCapacityLevels(levels);
  };

  const fetchEvents = () => {
    return new Promise((resolve) => {
      resolve(events);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchEvents()
      .then((fetchedEvents) => {
        const castedEvents = fetchedEvents as TimetableEvent[];
        setFilteredEvents(castedEvents);
        filterAndSortEvents(castedEvents, viewMode);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
        setIsLoading(false);
      });
  }, [datepicker, viewMode]);

  useEffect(() => {
    if (selectedview) {
      navigate(`/Timetable/${selectedview}`, { replace: true });
    } else {
      navigate(`/Timetable`, { replace: true });
    }
  }, [selectedview, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setViewMode(width >= 768 ? "week" : "day");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollToFirstEvent();
  }, [!isLoading]);

  const filterAndSortEvents = (
    castedEvents: TimetableEvent[],
    viewMode: "day" | "week"
  ) => {
    setIsLoading(true);
    setFilteredEvents([]);

    const startOfWeek = datepicker.startOf("week");
    const endOfWeek = datepicker.endOf("week");

    const filtered = castedEvents.filter((event) => {
      const eventDate = dayjs(event.fullStartTime);
      return viewMode === "day"
        ? eventDate.isSame(datepicker, "day")
        : eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek);
    });

    const sorted = filtered.sort((a, b) =>
      dayjs(a.fullStartTime).diff(dayjs(b.fullStartTime))
    );

    setFilteredEvents(sorted);
    setIsLoading(false);
  };

  function scrollToFirstEvent() {
    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (eventRef.current) {
            eventRef.current.scrollIntoView();
          }
        });
      });
    }, 0);
  }

  const handleToggleCapacityColours = () => {
    setIsCapacityColours(!isCapacityColours);
  };

  const handleViewModeChange = (value: SegmentedValue) => {
    const mode = value as "day" | "week";
    setViewMode(mode);
    scrollToFirstEvent();
  };

  const handleTodayClick = () => {
    setDatepicker(dayjs());
    scrollToFirstEvent();
  };

  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setDatepicker(value);
      scrollToFirstEvent();
    }
    setOpenDatepicker(false);
  };

  const handlePrevDay = () => {
    setDatepicker((prevDate) => prevDate.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setDatepicker((prevDate) => prevDate.add(1, "day"));
  };

  const handlePrevWeek = () => {
    setDatepicker((prevDate) => prevDate.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setDatepicker((prevDate) => prevDate.add(1, "week"));
  };

  const onDatePickerOpen = (open: boolean) => {
    setOpenDatepicker(open);
  };

  const handleViewChange = (value: SegmentedValue) => {
    if (typeof value === "string") {
      setSelectedView(value);
      scrollToFirstEvent();
    }
  };

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="dashboard">Timetable</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Sidebar
          hiddenWhenCollapsed={!isMobile}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        >
          <ClassTree />
        </Sidebar>
        <Content className="relative p-4 pb-0 !pointer-events-auto">
          <div className="flex flex-col max-md:h-[calc(100dvh-5rem)] h-[calc(100vh-8.25rem)]">
            <TimetableHeader
              datepicker={datepicker}
              viewMode={viewMode}
              isMobile={isMobile}
              isCapacityColours={isCapacityColours}
              openDatepicker={openDatepicker}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              onPrevDay={handlePrevDay}
              onNextDay={handleNextDay}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              onTodayClick={handleTodayClick}
              onDatePickerOpen={onDatePickerOpen}
              onDateChange={handleDateChange}
              onToggleCapacityColours={handleToggleCapacityColours}
              onViewModeChange={handleViewModeChange}
              onCapacityLevelsChange={handleCapacityLevelsChange}
              selectedview={selectedview}
            />
            {isAgendaView && (
              <div className="flex-grow min-w-0 px-4 -mx-4 overflow-y-auto overscroll-y-contain">
                <TimetableAgenda
                  currentDate={datepicker.toDate()}
                  events={filteredEvents}
                  viewMode={viewMode}
                  isLoading={isLoading}
                  isCapacityColours={isCapacityColours}
                  capacityLevels={capacityLevels}
                />
              </div>
            )}
            {isCalendarView && (
              <div
                ref={scrollRef}
                className="relative flex flex-col flex-grow min-w-0 px-4 -mx-4 overflow-y-scroll overscroll-y-contain"
              >
                <TimetableCalendar
                  events={filteredEvents}
                  eventRef={eventRef}
                  selectedDate={datepicker}
                  viewMode={viewMode}
                  isCapacityColours={isCapacityColours}
                  capacityLevels={capacityLevels}
                />
              </div>
            )}
            {isListView && (
              <div className="flex-grow min-w-0 px-4 -mx-4 overflow-y-auto overscroll-y-contain">
                <TimetableList
                  events={filteredEvents}
                  eventRef={eventRef}
                  selectedDate={datepicker}
                  viewMode={viewMode}
                  isCapacityColours={isCapacityColours}
                  capacityLevels={capacityLevels}
                />
              </div>
            )}
            {!collapsed && (
              <div
                className="absolute inset-0 z-50 md:hidden"
                onClick={() => setCollapsed(true)}
              ></div>
            )}
          </div>
          <div className="max-md:hidden md:contents">
            <footer
              className={`@container font-body fixed gap-2 flex items-center justify-between bottom-0 transition-all right-0 z-10 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 ${
                collapsed ? "left-0" : "left-[280px]"
              }`}
            >
              <div className="items-center justify-start flex-grow hidden w-full gap-2 sm:flex"></div>
              <div className="mx-auto">
                <Segmented
                  value={selectedview}
                  onChange={handleViewChange}
                  className="-ml-1.5 [&_.ant-segmented-item-label>span:last-child]:hidden @2xl:[&_.ant-segmented-item-label>span:last-child]:inline"
                  options={[
                    {
                      label: "Agenda",
                      value: "Agenda",
                      icon: <BuildOutlined className="ml-px @2xl:-ml-px" />,
                      className: "@2xl:w-28",
                    },
                    {
                      label: "Calendar",
                      value: "Calendar",
                      icon: <CalendarOutlined className="ml-px @2xl:-ml-px" />,
                      className: "@2xl:w-28",
                    },
                    {
                      label: "List",
                      value: "List",
                      icon: <BarsOutlined />,
                      className: "@2xl:w-28 w-auto ml-px @2xl:-ml-px",
                    },
                  ]}
                />
              </div>
              <div className="items-center justify-end flex-grow hidden w-full gap-2 sm:flex">
                <Button
                  className="[&_.ant-btn-icon]:mr-0 @5xl:[&_.ant-btn-icon]:mr-2 w-8 @5xl:w-auto"
                  icon={<DownloadOutlined />}
                >
                  <span className="hidden @5xl:contents">Export</span>
                </Button>
              </div>
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Timetable;
