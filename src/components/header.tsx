import React, { ReactNode, useState } from "react";
import { Button, Breadcrumb, Layout, Tooltip, Popover, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import LatestNews from "./latest-news";
import { Link } from "react-router-dom";
import { useNavigationContext } from "./navigation-context";
const { Header } = Layout;

interface LoveAdminHeaderProps {
  breadcrumbChildren?: ReactNode[];
  hideMenuButton?: boolean;
  className?: string;
  compact?: boolean;
  breadcrumbCollapsed?: boolean;
}

const LoveAdminHeader: React.FC<LoveAdminHeaderProps> = ({
  breadcrumbChildren = [],
  hideMenuButton,
  className,
  compact,
  breadcrumbCollapsed = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(breadcrumbCollapsed);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const { toggleNavigation } = useNavigationContext();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const showNews = () => {
    setIsNewsOpen(true);
  };

  const newsCancel = () => {
    setIsNewsOpen(false);
  };

  const renderBreadcrumbs = () => {
    if (!breadcrumbChildren) {
      return null;
    }

    if (breadcrumbChildren.length <= 3 || !isCollapsed) {
      return breadcrumbChildren;
    }

    const first = breadcrumbChildren[0];
    const last = breadcrumbChildren[breadcrumbChildren.length - 1];

    return [
      first,
      <Breadcrumb.Item key="ellipsis">
        <button
          type="button"
          onClick={toggleCollapse}
          className="grid items-center transition-colors justify-center h-3.5 relative top-px px-1 rounded-full bg-neutral-700/75 hover:bg-neutral-600"
        >
          <EllipsisOutlined className="text-white" />
        </button>
      </Breadcrumb.Item>,
      last,
    ];
  };

  return (
    <Header
      className={`p-0 border-none shadow-none bg-neutral-950 ${className}`}
    >
      <div
        className={`w-full h-16 leading-[4rem] px-4 flex items-center ${
          compact ? "max-w-screen-2xl mx-auto" : " "
        }`}
      >
        {!hideMenuButton && (
          <Button
            type="text"
            shape="circle"
            onClick={toggleNavigation}
            icon={
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.75 5.75h14.5M4.75 18.25h14.5M4.75 12h14.5"
                ></path>
              </svg>
            }
            className="w-10 h-10 mr-2 -ml-2.5 shrink-0 hover:bg-neutral-800 text-neutral-200 hover:text-neutral-100"
          />
        )}
        <div className="min-w-0">
          <Link to="/Home" className="flex">
            <img
              src="https://pro.loveadmin.com/images/loveadminlogo-reversed-v2.png"
              className={`object-contain ml-px mr-3 ${
                breadcrumbChildren.length > 1
                  ? "h-[14px] mb-2"
                  : "h-[19px] -mt-px"
              }`}
            />
          </Link>
          {breadcrumbChildren && (
            <Breadcrumb className="[&_li]:text-neutral-400 [&_li_a]:h-auto [&_li_a]:text-neutral-400 [&_li_a]:hover:text-neutral-400 [&_li:last-child]:text-neutral-50 text-sm/4">
              {renderBreadcrumbs()}
            </Breadcrumb>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2.5 ml-auto xl:gap-4">
          <Tooltip title="Search contacts" placement="bottom">
            <Button
              type="text"
              shape="circle"
              className="flex items-center justify-center border border-transparent w-9 h-9 group bg-neutral-800 text-neutral-200 hover:border-primary-500"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.25 19.25L15.5 15.5M4.75 11a6.25 6.25 0 1112.5 0 6.25 6.25 0 01-12.5 0z"
                ></path>
              </svg>
            </Button>
          </Tooltip>
          <div className="hidden md:contents">
            <Tooltip title="Lastest news..." placement="bottom">
              <Button
                onClick={showNews}
                type="text"
                shape="circle"
                className="flex items-center justify-center border border-transparent xl:hidden w-9 h-9 group bg-neutral-800 text-neutral-200 hover:border-primary-500"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M19.25 10c0 2.729-1.4 5.25-2.75 5.25s-2.75-2.521-2.75-5.25 1.4-5.25 2.75-5.25 2.75 2.521 2.75 5.25z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M16.5 15.25S8 13.5 7 13.25 4.75 11.69 4.75 10 6 7 7 6.75s9.5-2 9.5-2M6.75 13.5v3.75a2 2 0 002 2h.5a2 2 0 002-2V14.5"
                  ></path>
                </svg>
              </Button>
            </Tooltip>
            <Tooltip title="Help" placement="bottom">
              <Button
                type="text"
                shape="circle"
                className="flex items-center justify-center border border-transparent w-9 h-9 group bg-neutral-800 text-neutral-200 hover:border-primary-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.249 7a4.25 4.25 0 115.678 5.789C12.943 13.29 12 14.145 12 15.25M12 19v.25"
                  ></path>
                </svg>
              </Button>
            </Tooltip>
          </div>
          <Popover
            className="max-xl:ml-2"
            rootClassName="[&_.ant-popover-inner]:rounded-md"
            content={
              <div className="w-56 px-1 pt-3">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://pbs.twimg.com/profile_images/1602218293997322241/1uMPF_WC_400x400.jpg"
                    className="w-16 h-16 mb-2 rounded-full"
                  />
                  <div className="font-display">James Toone</div>
                  <div className="-mt-px font-display text-subtitle">
                    CG Swim School
                  </div>
                </div>
                <div className="mt-3 font-medium border-t border-neutral-200/75">
                  <div className="pt-3 space-y-1">
                    <div>
                      <Link
                        to="/ChooseOrg"
                        className="inline-flex gap-3 py-1 text-title"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="text-neutral-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8.25 11.25L4.75 8l3.5-3.25M4.75 8h10.5M15.75 12.75l3.5 3.25-3.5 3.25M19.25 16H8.75"
                          ></path>
                        </svg>
                        <span className="relative">Switch organisation</span>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="#"
                        className="inline-flex gap-3 py-1 text-title"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="text-neutral-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M5.621 14.963l1.101.172c.813.127 1.393.872 1.333 1.71l-.081 1.137a.811.811 0 00.445.787l.814.4c.292.145.641.09.88-.134l.818-.773a1.55 1.55 0 012.138 0l.818.773a.776.776 0 00.88.135l.815-.402a.808.808 0 00.443-.785l-.08-1.138c-.06-.838.52-1.583 1.332-1.71l1.101-.172a.798.798 0 00.651-.62l.201-.9a.816.816 0 00-.324-.847l-.918-.643a1.634 1.634 0 01-.476-2.132l.555-.988a.824.824 0 00-.068-.907l-.563-.723a.78.78 0 00-.85-.269l-1.064.334a1.567 1.567 0 01-1.928-.949l-.407-1.058a.791.791 0 00-.737-.511l-.903.002a.791.791 0 00-.734.516l-.398 1.045a1.566 1.566 0 01-1.93.956l-1.11-.348a.78.78 0 00-.851.27l-.56.724a.823.823 0 00-.062.91l.568.99c.418.73.213 1.666-.469 2.144l-.907.636a.817.817 0 00-.324.847l.2.9c.072.325.33.57.651.62z"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13.591 10.409a2.25 2.25 0 11-3.183 3.182 2.25 2.25 0 013.183-3.182z"
                          ></path>
                        </svg>
                        <span className="relative top-px">
                          Account settings
                        </span>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="#"
                        className="inline-flex gap-3 py-1 text-danger-500"
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M15.75 8.75l3.5 3.25-3.5 3.25M19 12h-8.25M15.25 4.75h-8.5a2 2 0 00-2 2v10.5a2 2 0 002 2h8.5"
                          ></path>
                        </svg>
                        <span className="relative top-px">Log out</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
            trigger="click"
          >
            <Button
              type="text"
              shape="circle"
              className="flex items-center justify-center w-10 h-10 group"
            >
              <img
                src="https://pbs.twimg.com/profile_images/1602218293997322241/1uMPF_WC_400x400.jpg"
                className="transition-all rounded-full w-9 h-[2.175rem] ring-1 ring-neutral-900 border-neutral-900 group-hover:ring-primary-500"
              />
            </Button>
          </Popover>
        </div>
      </div>
      <Modal open={isNewsOpen} onCancel={newsCancel} footer={false} width={400}>
        <LatestNews />
      </Modal>
    </Header>
  );
};

export default LoveAdminHeader;
