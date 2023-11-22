import { useState } from "react";
import { Layout, Breadcrumb, Button, Tooltip, Tabs } from "antd";
import LoveAdminHeader from "../../components/header";
import ProductTree from "../filter-product";
import Sidebar from "../../components/sidebar";
import { CheckCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { TabsProps } from "antd";
import TabSettings from "./tab-settings";
const { Content } = Layout;

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Settings",
    children: <TabSettings />,
  },
  {
    key: "2",
    label: "Customer requirements",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Shop",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Schedules",
    children: "Content of Tab Pane 4",
  },
  {
    key: "5",
    label: "Waiting list",
    children: "Content of Tab Pane 5",
  },
  {
    key: "6",
    label: "Capacity & attendance",
    children: "Content of Tab Pane 6",
  },
  {
    key: "7",
    label: "Permissions",
    children: "Content of Tab Pane 7",
  },
  {
    key: "8",
    label: "Members",
    children: "Content of Tab Pane 8",
  },
];

const ProductSettings = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onTabChange = (key: string) => {
    console.log(key);
  };

  return (
    <Layout className="min-h-screen bg-neutral-900">
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
          <div className="flex items-center gap-2.5 mb-2 -mt-px">
            <div className="flex items-center min-w-0 font-medium">
              <div className="truncate">
                Swimming Lessons - Bubble the Seahorse
              </div>
              <div className="mx-1 text-subtitle">·</div>
              <div className="text-subtitle">Class</div>
              <CheckCircleFilled className="ml-1.5 text-success-500" />
            </div>
            <div className="flex items-center gap-2.5 ml-auto">
              <Button>Settings</Button>
              <Tooltip title="Add product">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onTabChange}
            className="select-none [&_.ant-tabs-nav]:mb-7 [&_.ant-tabs-nav-list]:gap-x-4 [&_.ant-tabs-nav-list]:lg:gap-x-6 [&_.ant-tabs-tab]:pb-4 [&_.ant-tabs-tab]:!mx-0 [&_.ant-tabs-tab:not(.ant-tabs-tab-active)_.ant-tabs-tab-btn]:text-neutral-600 [&_.ant-tabs-tab:not(.ant-tabs-tab-active)_.ant-tabs-tab-btn:hover]:text-neutral-900 [&_.ant-tabs-tab-btn]:rounded-sm"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductSettings;
