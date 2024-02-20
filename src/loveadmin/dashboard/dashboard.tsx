import { Breadcrumb, Layout } from "antd";
import LoveAdminHeader from "../../components/header";
import { Link } from "react-router-dom";
import LineChart from "./line-chart";
import DateFilter from "../../components/date-filter";
import BarChart from "./bar-chart";
const { Content } = Layout;

const Dashboard = () => {
  const now = new Date();
  const hours = now.getHours();
  let greeting;

  if (hours < 12) {
    greeting = "Morning";
  } else if (hours >= 12 && hours <= 17) {
    greeting = "Afternoon";
  } else {
    greeting = "Evening";
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const lineChartData = [
    {
      id: "Previous",
      data: [
        { x: "Jan 1", y: 89 },
        { x: "8", y: 41 },
        { x: "15", y: 42 },
        { x: "22", y: 56 },
        { x: "Jan 29", y: 84 },
      ],
    },
    {
      id: "Current",
      data: [
        { x: "Jan 1", y: 99 },
        { x: "8", y: 73 },
        { x: "15", y: 57 },
        { x: "22", y: 81 },
        { x: "Jan 29", y: 77 },
      ],
    },
  ];

  const barChartData = [
    { name: "Jan 1", last_month: 111, previous_month: 99 },
    { name: "8", last_month: 157, previous_month: 87 },
    { name: "15", last_month: 129, previous_month: 89 },
    { name: "22", last_month: 187, previous_month: 151 },
    { name: "Jan 29", last_month: 119, previous_month: 127 },
  ];

  const barChartkeys = ["last_month", "previous_month"];

  const chartColors = [
    "rgba(var(--color-primary-500),1)",
    "rgba(var(--color-neutral-300),1)",
  ];

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="dashboard">Dashboard</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="rounded-t-lg bg-neutral-50">
        <Content className="p-4 pb-16 md:px-6">
          <div className="w-full mx-auto max-w-screen-2xl">
            <div className="flex items-center justify-between pt-4 pb-5 mb-8 -mt-4 border-b border-neutral-200/75">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://pbs.twimg.com/profile_images/1602218293997322241/1uMPF_WC_400x400.jpg"
                  className="relative block w-10 h-10 rounded-full top-0.5"
                />
                <div>
                  <div className="text-lg font-medium text-title">
                    {greeting}, James
                  </div>
                  <div className="-mt-px text-subtitle">{formatDate(now)}</div>
                </div>
              </div>
              <DateFilter defaultFilter="Last month" />
            </div>
            <div className="grid mb-8 bg-white rounded-lg py-7 xl:divide-x gap-y-8 xl:divide-neutral-200 ring-1 ring-neutral-900 ring-opacity-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="px-6">
                <div className="flex">
                  <div className="text-base grow text-subtitle">
                    Total sales
                  </div>
                  <div className="flex items-center gap-1.5 bg-success-50 text-success-600 rounded-full font-medium leading-4 tracking-[-0.001em] py-2 px-3 tabular-nums">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>25%</div>
                  </div>
                </div>
                <div className="mt-1 text-2xl font-semibold text-title">
                  500
                </div>
              </div>
              <div className="px-6">
                <div className="flex">
                  <div className="text-base grow text-subtitle">
                    Total revenue
                  </div>
                  <div className="flex items-center gap-1.5 bg-success-50 text-success-600 rounded-full font-medium leading-4 tracking-[-0.001em] py-2 px-3 tabular-nums">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>19%</div>
                  </div>
                </div>
                <div className="mt-1 text-2xl font-semibold text-title">
                  £11,498
                </div>
              </div>
              <div className="px-6">
                <div className="flex">
                  <div className="text-base grow text-subtitle">
                    New members
                  </div>
                  <div className="flex items-center gap-1.5 bg-danger-50 text-danger-600 rounded-full font-medium leading-4 tracking-[-0.001em] py-2 px-3 tabular-nums">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>5%</div>
                  </div>
                </div>
                <div className="mt-1 text-2xl font-semibold text-title">20</div>
              </div>
              <div className="px-6">
                <div className="flex">
                  <div className="text-base grow text-subtitle">
                    Upcoming renewals
                  </div>
                  <div className="flex items-center gap-1.5 bg-success-50 text-success-600 rounded-full font-medium leading-4 tracking-[-0.001em] py-2 px-3 tabular-nums">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>5%</div>
                  </div>
                </div>
                <div className="mt-1 text-2xl font-semibold text-title">
                  £5,741
                </div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 bg-white rounded-md ring-1 ring-neutral-900 ring-opacity-5">
                <LineChart
                  className="aspect-[2/1]"
                  data={lineChartData}
                  colors={chartColors}
                />
              </div>
              <div className="p-4 bg-white rounded-md ring-1 ring-neutral-900 ring-opacity-5">
                <BarChart
                  className="aspect-[2/1]"
                  data={barChartData}
                  colors={chartColors}
                  keys={barChartkeys}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
