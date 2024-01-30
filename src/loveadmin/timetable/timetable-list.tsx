import dayjs from "dayjs";
import { TimetableEvent } from "./events";
import { Dropdown, Menu, Table, Tooltip } from "antd";
import {
  CheckSquareOutlined,
  CreditCardOutlined,
  DownOutlined,
  MailOutlined,
  PlusOutlined,
  RightOutlined,
  SwapOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import TableActions from "../../components/table-actions";

const formatEventDate = (date?: Date) => {
  if (!date) return null;

  const dayjsDate = dayjs(date);
  const yearFormat =
    dayjsDate.year() === dayjs().year()
      ? "DD MMMM, dddd"
      : "DD MMMM YYYY, dddd";
  const formattedDate = dayjsDate.format(yearFormat);

  // Extract the day and the rest of the date
  const day = formattedDate.split(" ")[0];
  const restOfDate = formattedDate.substring(day.length);

  return (
    <>
      <span className="font-medium">{day}</span>
      <span className="">{restOfDate}</span>
    </>
  );
};

const formatEventKey = (date?: Date) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};

interface TimetableListProps {
  events: TimetableEvent[];
  eventRef: React.RefObject<HTMLLIElement>;
  selectedDate: dayjs.Dayjs;
  viewMode: "day" | "week";
  isCapacityColours: boolean;
  capacityLevels: string[];
}

const TimetableList: React.FC<TimetableListProps> = ({
  events,
  eventRef,
  selectedDate,
  viewMode,
  isCapacityColours,
  capacityLevels,
}) => {
  const [pageSize, setPageSize] = useState<number>(16);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onRowSelectionChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onRowSelectionChange,
  };

  const handleWindowResize = () => {
    // Calculate the number of rows that can fit in the viewport
    const viewportHeight = window.innerHeight - 290;
    const rowHeight = 39; // Height of each row
    let newPageSize = Math.floor(viewportHeight / rowHeight);

    // Ensure the minimum pageSize is 5
    newPageSize = Math.max(newPageSize, 5);

    // Update the pageSize based on the calculation
    setPageSize(newPageSize);
  };

  useEffect(() => {
    // Initial calculation on component mount
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const filterEvents = (event: TimetableEvent) => {
    if (!isCapacityColours) {
      return true;
    }

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

  const sortedEvents = events
    .filter((event) => event.fullStartTime && filterEvents(event))
    .sort(
      (a, b) => dayjs(a.fullStartTime).unix() - dayjs(b.fullStartTime).unix()
    );

  // Group events by date
  const groupedEvents: Record<string, TimetableEvent[]> = {};
  for (const event of sortedEvents) {
    if (event.fullStartTime) {
      const dateKey = formatEventKey(event.fullStartTime);
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    }
  }

  const dataSource = Object.entries(groupedEvents).flatMap(
    ([dateKey, events]) => {
      return events.map((event, index) => ({
        ...event,
        // Ensure date is always a string. Use an empty string or a placeholder if date is null
        date: index === 0 ? dayjs(new Date(dateKey)).format("YYYY-MM-DD") : "",
        key: event.id,
      }));
    }
  );

  // Generate a map of date keys to odd/even classes
  const groupClasses: Record<string, string> = {};
  let isOdd = true;
  Object.keys(groupedEvents).forEach((dateKey) => {
    groupClasses[dateKey] = isOdd ? "[&>td]:bg-neutral-100/75" : "";
    isOdd = !isOdd; // Alternate for the next group
  });

  // Function to generate a class name based on the group (odd/even)
  const getRowClassName = (record: TimetableEvent): string => {
    if (record.fullStartTime) {
      const dateKey = formatEventKey(record.fullStartTime);
      return groupClasses[dateKey] || "";
    }
    return "";
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: Date) => (date ? formatEventDate(date) : ""),
      width: 175,
      fixed: true,
    },
    {
      title: " ",
      key: "time",
      width: 130,
      render: (record: TimetableEvent) => (
        <time className="flex items-center gap-1.5 tracking-tight tabular-nums">
          <span>{dayjs(record.fullStartTime).format("HH:mm")}</span>
          <RightOutlined className="text-[8.25px] opacity-60" />
          <span className="truncate">
            {dayjs(record.fullEndTime).format("HH:mm")}
          </span>
        </time>
      ),
    },
    {
      title: "Name",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Attending",
      key: "signedUp",
      width: 150,
      render: (record: TimetableEvent) => {
        return (
          <div className="flex items-center tracking-tight tabular-nums">
            {record.maxCapacity !== null
              ? `${record.signedUp || 0} / ${record.maxCapacity}`
              : record.signedUp || 0}
          </div>
        );
      },
    },
    isCapacityColours && {
      title: "Capacity level",
      key: "capacity",
      width: 150,
      render: (record: TimetableEvent) => {
        const percentage = record.maxCapacity
          ? (record.signedUp / record.maxCapacity) * 100
          : 0;
        let colour = "";
        if (percentage >= 75) {
          colour = "bg-success-500";
        } else if (percentage >= 25) {
          colour = "bg-warning-500";
        } else if (percentage > 0) {
          colour = "bg-danger-500";
        } else {
          colour = "bg-neutral-400";
        }

        return (
          <div className="flex items-center tracking-tight tabular-nums">
            {isCapacityColours && (
              <div className={`w-2 h-2 rounded-full mr-2 ${colour}`}></div>
            )}
            <div className="">{percentage.toFixed()}%</div>
          </div>
        );
      },
    },
    {
      title: "Coaches",
      key: "coaches",
      width: 150,
      render: (record: TimetableEvent) => {
        if (record.numCoaches !== null && record.assignedCoaches !== null) {
          return (
            <div className="tracking-tight tabular-nums">
              {record.numCoaches}
              {record.numCoaches === 1 ? " Coach" : " Coaches"}
            </div>
          );
        } else {
          return <div className="text-subtitle"></div>; // Display an empty div if there's no coach information
        }
      },
    },
    {
      title: "Waiting list",
      key: "waitingList",
      width: 150,
      render: (record: TimetableEvent) => {
        if (record.waitingListType !== "no waiting list") {
          return (
            <div className="tracking-tight tabular-nums">
              Waiting List: {record.waitingListSize} /{" "}
              {record.waitingListMaxSize}
            </div>
          );
        } else {
          return <div className="text-subtitle"></div>; // If there's no waiting list, display an empty div
        }
      },
    },
    {
      title: "Address",
      dataIndex: "addressName",
      key: "addressName",
      width: 150,
      render: (text: string, record: TimetableEvent) => (
        <Tooltip title={record.address}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
  ].filter(Boolean); // Filters out any undefined or false values from the array

  return (
    <div className="relative @container">
      <TableActions
        isVisible={selectedRowKeys.length > 0}
        className="ml-[2.15rem] @[1200px]:ml-[2.68%] !top-px !from-white !to-white/50 [&>div]:bg-white [&>div:after]:from-white [&>div:after]:via-white/95"
      >
        <div className="font-medium whitespace-nowrap ml-[-3px]">
          {selectedRowKeys.length} selected
        </div>
        <div className="text-neutral-400">|</div>
        <div className="flex items-center gap-4">
          <Dropdown
            placement="bottomLeft"
            getPopupContainer={() => document.body}
            overlayStyle={{ position: "fixed" }}
            overlay={
              <Menu>
                <Menu.Item key="1">Email</Menu.Item>
                <Menu.Item key="2">SMS</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="flex gap-2 font-medium text-neutral-900"
            >
              <MailOutlined />
              <span>Message class</span>
            </a>
          </Dropdown>
          <a
            onClick={(e) => e.preventDefault()}
            className="flex gap-2 font-medium text-neutral-900"
          >
            <CheckSquareOutlined />
            <span>Attendance</span>
          </a>
        </div>
      </TableActions>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        size="small"
        pagination={{ pageSize }}
        className="[&_.ant-table-selection-column]:!p-0.5 [&_.ant-table-container]:border [&_.ant-table-container]:rounded-md ant-table-sticky [&_td]:border-0 [&_thead_th]:bg-white [&_thead_td]:bg-white [&_.ant-table-container]:border-neutral-200 [&_th]:px-3 [&_td]:px-3 [&_.ant-table-row.ant-table-row-selected>.ant-table-cell]:!bg-primary-100/75"
        sticky={true}
        scroll={{ x: 800 }}
        rowClassName={getRowClassName}
      />
    </div>
  );
};

export default TimetableList;
