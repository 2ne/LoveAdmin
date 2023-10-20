import React, { useState } from "react";
import { Layout, Breadcrumb, Button, Tooltip } from "antd";
import LoveAdminHeader from "../../components/header";
import ProductTree from "../product-tree";
import Sidebar from "../../components/sidebar";
import { CheckCircleFilled, PlusOutlined } from "@ant-design/icons";
import ProductSettingsAmend from "./product-settings-amend";
const { Content } = Layout;

const ProductSettings = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <LoveAdminHeader
        breadcrumbChildren={
          <>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
          </>
        }
      ></LoveAdminHeader>
      <Layout>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <ProductTree hideFilters={true} />
        </Sidebar>
        <Content className="p-4 pb-16 bg-white">
          <div className="flex items-center -mt-px">
            <div className="flex items-center font-medium">
              <div>Swimming Lessons - Bubble the Seahorse</div>
              <div className="mx-1 text-subtitle">·</div>
              <div className="text-subtitle">Class</div>
              <CheckCircleFilled className="ml-1.5 text-success-500" />
            </div>
            <div className="ml-auto">
              <Tooltip title="Add product">
                <Button type="primary" icon={<PlusOutlined />}></Button>
              </Tooltip>
            </div>
          </div>
        </Content>
      </Layout>
      <ProductSettingsAmend />
    </Layout>
  );
};

export default ProductSettings;
