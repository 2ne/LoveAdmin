import {
  Layout,
  Breadcrumb,
  Collapse,
  Button,
  Tooltip,
  Segmented,
  Popconfirm,
  message,
} from "antd";
import LoveAdminHeader from "../../components/header";
import ShopList, { ShopListItem } from "./shop-list";
import {
  EditOutlined,
  GlobalOutlined,
  PlusOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Panel } = Collapse;

const ShopSettings = () => {
  const [segmentOption, setSegmentOption] = useState("Desktop");
  const [orderChanged, setOrderChanged] = useState(false);
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);

  const resetConfirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success("Changes reset");
    refreshPage();
  };

  const resetCancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  useEffect(() => {
    const handleClick = () => {
      setTimeout(() => {
        setOrderChanged(true);
      }, 1000);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const iframeClasses =
    segmentOption === "Mobile"
      ? "border border-neutral-200 inset-6 mx-auto rounded-md h-[calc(100%-6.5rem)] w-[calc(100%-3rem)]"
      : "border border-neutral-200 inset-6 mx-auto rounded-md h-[calc(100%-6.5rem)] w-[calc(100%-3rem)]";

  const colourSettings: ShopListItem[] = [
    { id: "1", content: "Primary", type: "colour" },
    { id: "2", content: "Secondary", type: "colour" },
    { id: "3", content: "Button / Links", type: "colour" },
  ];

  const navigationSettings: ShopListItem[] = [
    { id: "1", content: "Calendar", type: "navigation" },
    { id: "2", content: "Events", type: "navigation", hidden: true },
    { id: "3", content: "Memberships", type: "navigation", hidden: true },
    { id: "4", content: "Shop", type: "navigation" },
    { id: "5", content: "Class Finder", type: "navigation" },
  ];

  const aboutSettings: ShopListItem[] = [
    { id: "1", content: "Settings", type: "about" },
  ];

  const bannerSettings: ShopListItem[] = [
    { id: "1", content: "Crash Course", type: "banner" },
    {
      id: "2",
      content: "24th May - English County Championships",
      type: "banner",
    },
    { id: "3", content: "Buy your swimming gear today!", type: "banner" },
  ];

  const tileSettings: ShopListItem[] = [
    { id: "1", content: "Adult and Child Lessons", type: "tile" },
    { id: "2", content: "Independent Children's Lessons", type: "tile" },
    { id: "3", content: "Adult Lessons", type: "tile" },
    { id: "4", content: "Private Lessons", type: "tile" },
    { id: "5", content: "Adult and Child Lessons", type: "tile" },
    { id: "6", content: "Independent Children's Lessons", type: "tile" },
    { id: "7", content: "Adult Lessons", type: "tile" },
    { id: "8", content: "Private Lessons", type: "tile" },
    { id: "9", content: "Crash Courses", type: "tile" },
  ];

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
          <Breadcrumb.Item key="shop">Shop</Breadcrumb.Item>,
        ]}
      ></LoveAdminHeader>
      <Content className="relative grid grid-cols-[21.25rem_1fr] bg-white rounded-t-lg">
        <aside className="h-[calc(100vh-4rem)] overflow-y-auto border-r overflow-x-clip border-neutral-200 select-none">
          <div className="px-5 pt-[1.1rem] pb-[1.342rem]">
            <div className="mb-2 font-medium">Design shop</div>
            <p>
              Personalise your shop with the settings below. Drag and drop
              reorganise your items. Click 'Publish' to update your shop.
            </p>
            <div className="flex justify-end gap-3 mt-3">
              {orderChanged && (
                <Popconfirm
                  icon={<WarningFilled className="text-danger-500" />}
                  title="Reset changes"
                  description="Are you sure you want to reset your changes?"
                  onConfirm={resetConfirm}
                  onCancel={resetCancel}
                  okText="Reset"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                  visible={popConfirmVisible}
                  onVisibleChange={(visible) => {
                    setPopConfirmVisible(visible);
                    if (visible) {
                      document.body.classList.add("dim-body");
                    } else {
                      document.body.classList.remove("dim-body");
                    }
                  }}
                >
                  <Button
                    size={"middle"}
                    type="link"
                    className="text-neutral-600 hover:text-danger-500"
                  >
                    Reset changes
                  </Button>
                </Popconfirm>
              )}
              <Tooltip
                placement="topRight"
                title={
                  !orderChanged
                    ? "No changes to publish"
                    : "Publish changes to your shop"
                }
              >
                <motion.div layout>
                  <Button
                    type="primary"
                    disabled={!orderChanged}
                    onClick={orderChanged ? refreshPage : undefined}
                    className={` ${
                      orderChanged ? "!bg-success-500 hover:bg-success-600" : ""
                    }`}
                  >
                    Publish
                  </Button>
                </motion.div>
              </Tooltip>
            </div>
          </div>
          <Collapse
            defaultActiveKey={["1"]}
            className="-m-px rounded-none !border-neutral-200 bg-transparent"
          >
            <Panel
              header="Navigation"
              key="1"
              className="[&_.ant-collapse-content-box]:pt-1 [&_.ant-collapse-content-box]:pb-3 px-1 bg-transparent rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
            >
              <ShopList items={navigationSettings} />
            </Panel>
            <Panel
              header="Banners"
              key="2"
              className="[&_.ant-collapse-content-box]:pt-1 [&_.ant-collapse-content-box]:pb-3 px-1 bg-transparent rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
              extra={
                <>
                  <Tooltip title="Add banner">
                    <Button
                      type="link"
                      size="small"
                      className="-mr-1.5 hover:bg-primary-100 hover:text-primary-600"
                      icon={<PlusOutlined />}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    ></Button>
                  </Tooltip>
                </>
              }
            >
              <ShopList items={bannerSettings} />
            </Panel>
            <Panel
              header="Tiles"
              key="3"
              className="[&_.ant-collapse-content-box]:pt-1 [&_.ant-collapse-content-box]:pb-3 px-1 bg-transparent rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
              extra={
                <>
                  <Tooltip title="Add tile">
                    <Button
                      type="link"
                      size="small"
                      className="-mr-1.5 hover:bg-primary-100 hover:text-primary-600"
                      icon={<PlusOutlined />}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    ></Button>
                  </Tooltip>
                </>
              }
            >
              <ShopList items={tileSettings} />
            </Panel>
            <Panel
              header="About"
              key="4"
              className="[&_.ant-collapse-content-box]:pt-1 [&_.ant-collapse-content-box]:pb-3 px-1 bg-transparent rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
            >
              <ShopList isDraggable={false} items={aboutSettings} />
            </Panel>
            <Panel
              header="Colours"
              key="5"
              className="[&_.ant-collapse-content-box]:pt-1 [&_.ant-collapse-content-box]:pb-3 px-1 bg-transparent rounded-none !border-neutral-200 [&_.ant-collapse-content]:-mx-3 [&_.ant-collapse-content]:px-3 [&_.ant-collapse-content]:bg-transparent [&_.ant-collapse-content]:border-t-0"
            >
              <ShopList isDraggable={false} items={colourSettings} />
            </Panel>
          </Collapse>
        </aside>
        <div className="absolute inset-0 col-start-2 col-end-2 row-span-1 overflow-hidden rounded-t-lg bg-neutral-50">
          <iframe
            className={`absolute inset-0 h-full w-full`}
            title="Shop"
            src="http://localhost:5173/Shop"
          />
          <div className="absolute top-0 right-0 w-16 h-16">
            {segmentOption === "Desktop" ? (
              <div className="shadow-lg absolute transform rotate-45 bg-gradient-to-t from-neutral-800 to-neutral-700 text-center text-white font-medium py-1 right-[-34px] top-[32px] w-[170px]">
                <EditOutlined className="mr-1" /> Design mode
              </div>
            ) : (
              <div className="shadow-lg absolute transform rotate-45 bg-gradient-to-t from-success-600 to-success-500 text-center text-white font-medium py-1 right-[-34px] top-[32px] w-[170px]">
                <GlobalOutlined className="mr-1" /> Live shop
              </div>
            )}
          </div>
          <footer className="h-14 fixed gap-2 bottom-0 justify-center flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 left-[21.25rem]">
            <Segmented
              options={[
                {
                  label: "Design",
                  value: "Desktop",
                  icon: <EditOutlined className="relative top-px" />,
                },
                {
                  label: "Shop",
                  value: "Mobile",
                  icon: <GlobalOutlined className="relative top-px" />,
                },
              ]}
              onChange={(segmentedValue) => {
                const value = (segmentedValue as any).value || segmentedValue;
                setSegmentOption(value);
              }}
            />
          </footer>
        </div>
      </Content>
    </Layout>
  );
};

export default ShopSettings;
