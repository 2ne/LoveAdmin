import React, { ReactElement } from "react";
import {
  RightOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Typography, Button, Tabs, TabsProps, Alert } from "antd";
import DateFilter from "../../components/date-filter";
import Tag from "../../components/tag";
const { Title } = Typography;

function ContactDashboard(): ReactElement {
  const activeProducts: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          All
          <span className="text-subtitle">
            <span className="mx-1.5">·</span>4
          </span>
        </div>
      ),
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 @2xl:pt-2 [&>*:not(:last-child)]:pb-4 [&>*:not(:last-child)]:border-b [[&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Parent and Child</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-subtitle">
                  <CalendarOutlined className="" />
                  <span>
                    Fridays at 14:00 - 14:45
                    <span className="mx-1.5">·</span>
                    <span className="link text-primary-600">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519311726-5cced7383240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Bubble the Seahorse</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-subtitle">
                  <CalendarOutlined className="" />
                  <span>
                    Tuesdays at 10:00 - 11:00
                    <span className="mx-1.5">·</span>
                    <span className="link text-primary-600">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Swimming Annual</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-subtitle">
                  <CalendarOutlined className="" />
                  <span>
                    Membership
                    <span className="mx-1.5">·</span>
                    <span>May 2023 - May 2024</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5 bg-warning-50 -mx-6 px-6 -top-4 py-4 -mb-10 relative">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-warning-700">Swim Training 18+</span>
                <Tag colour="warning" className="absolute top-4 right-6">
                  Waiting list
                </Tag>
              </div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-warning-700">
                  <CalendarOutlined className="" />
                  <span>
                    Tuesdays at 10:00 - 11:00
                    <span className="mx-1.5">·</span>
                    <span className="link text-warning-700">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-warning-700">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-warning-700">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Classes
          <span className="text-subtitle">
            <span className="mx-1.5">·</span>2
          </span>
        </div>
      ),
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 @2xl:pt-2 [&>*:not(:last-child)]:pb-4 [&>*:not(:last-child)]:border-b [[&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Parent and Child</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-subtitle">
                  <CalendarOutlined className="" />
                  <span>
                    Fridays at 14:00 - 14:45
                    <span className="mx-1.5">·</span>
                    <span className="link text-primary-600">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1519311726-5cced7383240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Bubble the Seahorse</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-subtitle">
                  <CalendarOutlined className="" />
                  <span>
                    Tuesdays at 10:00 - 11:00
                    <span className="mx-1.5">·</span>
                    <span className="link text-primary-600">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          Memberships
          <span className="text-subtitle">
            <span className="mx-1.5">·</span>1
          </span>
        </div>
      ),
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 @2xl:pt-2 [&>*:not(:last-child)]:pb-4 [&>*:not(:last-child)]:border-b [[&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              />
            </div>
            <div className="flex-grow">
              <div className="font-medium">Swimming Annual</div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-subtitle">
                  <CalendarOutlined className="" />
                  <span>
                    Membership
                    <span className="mx-1.5">·</span>
                    <span>May 2023 - May 2024</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-subtitle">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: `Events`,
      children: (
        <div className="p-6 pb-12 text-subtitle">No events purchased</div>
      ),
    },
    {
      key: "5",
      label: (
        <div>
          Waiting list
          <span className="text-subtitle">
            <span className="mx-1.5">·</span>1
          </span>
        </div>
      ),
      children: (
        <div className="p-4 @2xl:p-6 pt-2 [&>*:not(:first-child)]:mt-4 @2xl:pt-2 [&>*:not(:last-child)]:pb-4 [&>*:not(:last-child)]:border-b [[&>*:not(:last-child)]:border-solid [&>*]:border-0 [&>*:not(:last-child)]:border-b-neutral-100">
          <div className="flex gap-3.5 bg-warning-50 -mx-6 px-6 -top-4 py-4 -mb-10 relative">
            <div>
              <img
                className="object-cover object-center w-20 mt-0.5 rounded aspect-square"
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-warning-700">Swim Training 18+</span>
                <Tag colour="warning" className="absolute top-4 right-6">
                  Waiting list
                </Tag>
              </div>
              <div className="mt-0.5 space-y-px">
                <div className="flex gap-1.5 text-warning-700">
                  <CalendarOutlined className="" />
                  <span>
                    Tuesdays at 10:00 - 11:00
                    <span className="mx-1.5">·</span>
                    <span className="link text-warning-700">View dates</span>
                  </span>
                </div>
                <div className="flex gap-1.5 text-warning-700">
                  <EnvironmentOutlined className="" />
                  <span>Quaterway House, Ely Road, Little Thetford</span>
                </div>
                <div className="flex gap-1.5 text-warning-700">
                  <UserOutlined className="" />
                  <span>Jacob Toone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="pt-2 pb-6">
      <div className="mb-4 empty:mb-0">
        <Alert
          message="Mandate has been cancelled"
          type="error"
          showIcon
          icon={<WarningFilled />}
          closable
          className="mb-3"
          action={
            <Button size="small" type="text">
              View details
            </Button>
          }
        />
        <Alert
          message="2 products awaiting approval"
          type="error"
          showIcon
          icon={<WarningFilled />}
          closable
          className="mb-3"
          action={
            <Button size="small" type="text">
              View details
            </Button>
          }
        />
      </div>
      <section className="flex items-end justify-between mb-4">
        <div>
          <Title level={5} className="!mb-0">
            Overview
          </Title>
        </div>
        <div>
          <DateFilter defaultFilter="Last month" />
        </div>
      </section>
      <div className="space-y-8">
        <section>
          <div className="text-base grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-2 @2xl:gap-3">
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">
                  Outstanding
                </div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none text-danger-600">
                <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-danger-50 place-items-center">
                  <span>£</span>
                </div>
                <div className="">-100.00</div>
              </div>
            </div>
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">
                  Pending
                </div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                  <span>£</span>
                </div>
                <div className="">100.00</div>
              </div>
            </div>
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">
                  Invoiced
                </div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                  <span>£</span>
                </div>
                <div className="">520.00</div>
              </div>
            </div>
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">Paid</div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                <div className="grid w-8 h-8 pb-0.5 text-center rounded-full bg-neutral-100 place-items-center">
                  <span>£</span>
                </div>
                <div className="">420.00</div>
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <div>
            <Title level={5}>Invoices</Title>
          </div>
          <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-2 @2xl:gap-3">
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">
                  Upcoming renewals
                </div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                <div className="">2</div>
              </div>
            </div>
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">
                  Awaiting approval
                </div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                <div className="">0</div>
              </div>
            </div>
            <div className="grid gap-3 p-4 @2xl:p-6 @2xl:gap-3 transition-all bg-white shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950 cursor-pointer hover:shadow-md hover:shadow-neutral-950/10 group rounded">
              <div className="flex min-w-0 gap-2 font-medium transition-all text-subtitle group-hover:text-neutral-800 group-hover:underline underline-offset-2">
                <div className="truncate max-w-[calc(100%-1.25rem)]">
                  Scheduled orders
                </div>
                <div className="transition-all text-neutral-400 -mt-px group-hover:text-neutral-800 -ml-1.5 group-hover:ml-0 h-6 w-6 rounded-full pl-px grid place-items-center group-hover:bg-neutral-100">
                  <RightOutlined className="w-3 h-3" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-8 text-xl font-medium leading-none">
                <div className="">1</div>
              </div>
            </div>
          </div>
        </section> */}
        <section>
          <div>
            <Title level={5} className="mb-4">
              Products
            </Title>
          </div>
          <div className="grid gap-4 transition-all bg-white rounded shadow-sm shadow-neutral-950/10 ring-inset ring-opacity-10 ring-neutral-950">
            <Tabs
              defaultActiveKey="1"
              items={activeProducts}
              onChange={onChange}
              className="min-w-0"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactDashboard;
