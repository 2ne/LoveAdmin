import { Breadcrumb, Layout } from "antd";
import LoveAdminHeader from "../../components/header";
import { Link } from "react-router-dom";
import { Typography } from "antd";
const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
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
      <Layout className="bg-white rounded-t-lg">
        <Content className="p-4 px-5 pb-16">
          <Title>Dashboard</Title>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
