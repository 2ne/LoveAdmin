import { Breadcrumb, Layout } from "antd";
import LoveAdminHeader from "../../components/header";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useState } from "react";
import TimetableWeek from "./timetable-week";
import ClassTree from "../filter-class-events";
import TableFooter from "../../components/table-footer";
const { Content } = Layout;

const Timetable = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen bg-neutral-900">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="dashboard">Timetable</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <ClassTree />
        </Sidebar>
        <Content className="p-4">
          <TimetableWeek />
          <TableFooter hideEditColumns collapsed={collapsed} sidebar={true} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Timetable;
