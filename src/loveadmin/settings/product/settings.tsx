import { useEffect, useState } from "react";
import { Layout, Breadcrumb, Button, Tabs, Tooltip } from "antd";
import LoveAdminHeader from "../../../components/header";
import ProductTree from "../../filter-product";
import Sidebar from "../../../components/sidebar";
import { CheckCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { TabsProps } from "antd";
import TabSettings from "./tab-settings";
import TabCustomerRequirements from "./tab-customer-requirements";
import Title from "antd/es/typography/Title";
import ProductMembers from "./tab-members";
const { Content } = Layout;

const items: TabsProps["items"] = [
  {
    key: "Settings",
    label: "Settings",
    children: <TabSettings />,
  },
  {
    key: "CustomerRequirements",
    label: "Customer requirements",
    children: <TabCustomerRequirements />,
  },
  {
    key: "Shop",
    label: "Shop",
    children: "Content of Tab Pane 3",
  },
  {
    key: "Schedules",
    label: "Schedules",
    children: "Content of Tab Pane 4",
  },
  {
    key: "Attendance",
    label: "Attendance",
    children: "Content of Tab Pane 5",
  },
  {
    key: "WaitingList",
    label: "Waiting list",
    children: "Content of Tab Pane 6",
  },
  {
    key: "Permissions",
    label: "Permissions",
    children: "Content of Tab Pane 7",
  },
  {
    key: "Members",
    label: "Members",
    children: <ProductMembers />,
  },
];

const ProductSettings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const getDefaultTabKey = () => {
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    return items.some((item) => item.key === lastSegment)
      ? lastSegment
      : "Settings";
  };

  const [activeTabKey, setActiveTabKey] = useState(getDefaultTabKey());

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
    navigate(`/Settings/Products/${key}`);
  };

  useEffect(() => {
    // Update the active tab when the URL changes
    const updateActiveTab = () => {
      const currentTab = getDefaultTabKey();
      if (activeTabKey !== currentTab) {
        setActiveTabKey(currentTab);
      }
    };

    // Call updateActiveTab to ensure the tab is in sync with the URL
    updateActiveTab();

    // Dependency on location.pathname to trigger the effect on URL change
  }, [location.pathname]);

  return (
    <Layout className="min-h-screen bg-neutral-950">
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="settings">
            <Link to="/Settings">Settings</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="products">Products</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <ProductTree hideFilters={true} />
        </Sidebar>
        <Content className="max-w-screen-xl p-4 pb-16 pl-6 mx-auto">
          <div className="flex items-center gap-2.5 mt-0.5 mb-2">
            <Title level={5} className="flex items-center min-w-0 mb-0">
              <div className="flex items-center min-w-0 font-medium">
                <div className="truncate">Bubble the Seahorse 12-18 months</div>
                <div className="mx-1.5 text-subtitle">·</div>
                <div className="text-subtitle">Class</div>
                <CheckCircleFilled className="ml-1.5 relative top-px text-success-500" />
              </div>
            </Title>
            <div className="flex items-center gap-2.5 ml-auto">
              <Tooltip title="Add product" placement="bottomRight">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
          </div>
          <Tabs
            activeKey={activeTabKey}
            items={items}
            onChange={onTabChange}
            className="[&_.ant-tabs-nav]:mb-8 ant-tabs-top-custom"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductSettings;
