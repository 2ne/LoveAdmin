import { Form, Input, Switch, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

export const CalendarNavigationSettings = () => {
  const [groupByAddress, setGroupByAddress] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const toggleGroupByAddress = () => {
    setGroupByAddress(!groupByAddress);
  };

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <p className="mb-6">
        Timetable displays your products organised by location and name. Only
        products that a schedule will be displayed.
      </p>
      <Form layout="vertical">
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Label</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Personalise the label 'Timetable' to better align with your organisation. Options could include 'Timetable', 'Sessions', etc."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input placeholder="Timetable" />
        </Form.Item>
        <Form.Item
          className="mb-1.5 [&_.ant-form-item-row]:gap-5 [&_.ant-form-item-row]:flex-row [&_.ant-form-item-row]:flex-nowrap [&_.ant-form-item-control]:w-auto [&_.ant-form-item-control]:flex [&_.ant-form-item-control]:items-end"
          label={
            <div className="cursor-pointer" onClick={toggleGroupByAddress}>
              <div>Enable timetable</div>
              <div className="text-sm font-normal text-subtitle">
                Show a link to the timetable in your shop.
              </div>
            </div>
          }
          valuePropName="checked"
        >
          <Switch
            size="small"
            checked={groupByAddress}
            onChange={toggleGroupByAddress}
          />
        </Form.Item>
        <Form.Item
          className="mb-1.5 [&_.ant-form-item-row]:gap-5 [&_.ant-form-item-row]:flex-row [&_.ant-form-item-row]:flex-nowrap [&_.ant-form-item-control]:w-auto [&_.ant-form-item-control]:flex [&_.ant-form-item-control]:items-end"
          label={
            <div className="cursor-pointer" onClick={toggleGroupByAddress}>
              <div>Group by location</div>
              <div className="text-sm font-normal text-subtitle">
                Products will be grouped by location in the menu. Items without
                a location won't be shown.
              </div>
            </div>
          }
          valuePropName="checked"
        >
          <Switch
            size="small"
            checked={groupByAddress}
            onChange={toggleGroupByAddress}
          />
        </Form.Item>
        <Form.Item
          className="mb-1.5 [&_.ant-form-item-row]:gap-5 [&_.ant-form-item-row]:flex-row [&_.ant-form-item-row]:flex-nowrap [&_.ant-form-item-control]:w-auto [&_.ant-form-item-control]:flex [&_.ant-form-item-control]:items-end"
          label={
            <div className="cursor-pointer" onClick={toggleGroupByAddress}>
              <div>View all</div>
              <div className="text-sm font-normal text-subtitle">
                Allow your members to view all products across all locations.
              </div>
            </div>
          }
          valuePropName="checked"
        >
          <Switch
            size="small"
            checked={groupByAddress}
            onChange={toggleGroupByAddress}
          />
        </Form.Item>
        <Form.Item
          className="mb-1.5 [&_.ant-form-item-row]:gap-5 [&_.ant-form-item-row]:flex-row [&_.ant-form-item-row]:flex-nowrap [&_.ant-form-item-control]:w-auto [&_.ant-form-item-control]:flex [&_.ant-form-item-control]:items-end"
          label={
            <div className="cursor-pointer" onClick={toggleGroupByAddress}>
              <div>Hide images in group view</div>
              <div className="text-sm font-normal text-subtitle">
                When viewing groups of products you can hide images to allow
                more space to view events.
              </div>
            </div>
          }
          valuePropName="checked"
        >
          <Switch
            size="small"
            checked={groupByAddress}
            onChange={toggleGroupByAddress}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export const EventsNavigationSettings = () => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <p className="mb-6">
        The events link takes you to see all upcoming and ongoing events in your
        organisation.
      </p>
      <Form layout="vertical">
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Label</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Personalise the label 'Events' to better align with your organisation. Options could include 'Activities', 'Field Trips', etc."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input placeholder="Events" />
        </Form.Item>

        <Form.Item
          className="ant-form-item-switch"
          label={
            <span
              className="flex gap-1.5 cursor-pointer"
              onClick={toggleIsHidden}
            >
              <span>Hidden</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Hide this navigation item from your shop."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          valuePropName="checked"
        >
          <Switch size="small" checked={isHidden} onChange={toggleIsHidden} />
        </Form.Item>
      </Form>
    </div>
  );
};

export const MembershipsNavigationSettings = () => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <p className="mb-6">
        The memberships link takes you to see all membership products in your
        organisation.
      </p>
      <Form layout="vertical">
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Label</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Personalise the label 'Memberships' to better align with your organisation. Options could include 'Subscriptions', 'Teams', etc."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input placeholder="Memberships" />
        </Form.Item>

        <Form.Item
          className="ant-form-item-switch"
          label={
            <span
              className="flex gap-1.5 cursor-pointer"
              onClick={toggleIsHidden}
            >
              <span>Hidden</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Hide this navigation item from your shop."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          valuePropName="checked"
        >
          <Switch size="small" checked={isHidden} onChange={toggleIsHidden} />
        </Form.Item>
      </Form>
    </div>
  );
};

export const ShopNavigationSettings = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <p className="mb-6">
        The shop link takes you to see all merchandise and money products in
        your organisation.
      </p>
      <Form layout="vertical">
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Label</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Personalise the label 'Shop' to better align with your organisation. Options could include 'Merchandise', 'Uniform', etc."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input placeholder="Shop" />
        </Form.Item>

        <Form.Item
          className="ant-form-item-switch"
          label={
            <span
              className="flex gap-1.5 cursor-pointer"
              onClick={toggleIsHidden}
            >
              <span>Hidden</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Hide this navigation item from your shop."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          valuePropName="checked"
        >
          <Switch size="small" checked={isHidden} onChange={toggleIsHidden} />
        </Form.Item>
      </Form>
    </div>
  );
};

export const ClassFinderNavigationSettings = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <p className="mb-6">
        Class Finder is an interactive quiz designed to identify a participant's
        skill level.
      </p>
      <Form layout="vertical">
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Label</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Personalise the label 'Class Finder' to better align with your organisation. Options could include 'Course Finder', 'Find Sessions', etc."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input placeholder="Class Finder" />
        </Form.Item>

        <Form.Item
          className="ant-form-item-switch"
          label={
            <span
              className="flex gap-1.5 cursor-pointer"
              onClick={toggleIsHidden}
            >
              <span>Hidden</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Hide this navigation item from your shop."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          valuePropName="checked"
        >
          <Switch size="small" checked={isHidden} onChange={toggleIsHidden} />
        </Form.Item>
      </Form>
    </div>
  );
};
