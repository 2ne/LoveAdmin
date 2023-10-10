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
        Calendar displays your classes organised by address and name. Only
        classes that have both a schedule and address will be displayed.
      </p>
      <Form layout="vertical">
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Label</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Personalise the label 'Calendar' to better align with your organisation. Options could include 'Timetable', 'Sessions', etc."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input placeholder="Calendar" />
        </Form.Item>
        <Form.Item
          className="mb-1.5 ant-form-item-switch"
          label={
            <span
              className="flex gap-1.5 cursor-pointer"
              onClick={toggleGroupByAddress}
            >
              <span>Group by address</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Group products by their address to help customers find products easily. Items without an address won't be shown. Addresses are set within schedules."
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
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
