import React, { useMemo, useState } from "react";
import { message, ColorPicker } from "antd";
import type { Color, ColorPickerProps } from "antd/es/color-picker";
import { DownOutlined } from "@ant-design/icons";

export const PrimaryColourSettings = () => {
  const [primary, setPrimary] = useState<Color | string>("#e4f7fb");
  const [primaryText, setPrimaryText] = useState<Color | string>("#005da2");

  const primaryHexString = useMemo(
    () => (typeof primary === "string" ? primary : primary.toHexString()),
    [primary]
  );

  const primaryTextHexString = useMemo(
    () =>
      typeof primaryText === "string" ? primaryText : primaryText.toHexString(),
    [primaryText]
  );

  return (
    <div>
      <div className="mb-6 font-shop">
        <div
          className="flex items-center h-20 px-3 rounded"
          style={{ backgroundColor: primaryHexString }}
        >
          <div className="flex items-center group gap-x-2">
            <img
              src="https://app.joinin.online/services/anonymous/avatar/5f4c473d-aa5e-4beb-a8ba-5ef1869b9de8"
              alt="CG Swim School Logo"
              className="block w-auto max-h-[4rem] max-w-[8rem] rounded"
              loading="lazy"
            />
            <div
              style={{ color: primaryTextHexString }}
              className="font-medium text-lg/5 line-clamp-3"
            >
              CG Swim School
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <ColorPicker
          showText={() => <DownOutlined className="w-3 h-3 text-black/25" />}
          value={primary}
          onChange={setPrimary}
        />
        <label>Background</label>
        <ColorPicker
          showText={() => <DownOutlined className="w-3 h-3 text-black/25" />}
          value={primaryText}
          onChange={setPrimaryText}
        />
        <label>Text</label>
      </div>
    </div>
  );
};

export const SecondaryColourSettings = () => {
  const [secondary, setSecondary] = useState<Color | string>("#005da2");
  const [secondaryText, setSecondaryText] = useState<Color | string>("#ffffff");

  const secondaryHexString = useMemo(
    () => (typeof secondary === "string" ? secondary : secondary.toHexString()),
    [secondary]
  );

  const secondaryTextHexString = useMemo(
    () =>
      typeof secondaryText === "string"
        ? secondaryText
        : secondaryText.toHexString(),
    [secondaryText]
  );

  return (
    <div>
      <nav
        style={{ backgroundColor: secondaryHexString }}
        className="mb-6 overflow-hidden text-sm tracking-normal rounded font-shop"
      >
        <ol
          role="list"
          className="flex items-center h-10 px-4 sm:space-x-0.5 overflow-x-auto"
        >
          <li>
            <div
              style={{ color: secondaryTextHexString }}
              className="flex items-center"
            >
              Home
            </div>
          </li>
          <li>
            <div
              style={{ color: secondaryTextHexString }}
              className="flex items-center opacity-75 sm:gap-x-0.5"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
              </svg>
              <span className="truncate">Shop</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <ColorPicker
          showText={() => <DownOutlined className="w-3 h-3 text-black/25" />}
          value={secondary}
          onChange={setSecondary}
        />
        <label>Background</label>
        <ColorPicker
          showText={() => <DownOutlined className="w-3 h-3 text-black/25" />}
          value={secondaryText}
          onChange={setSecondaryText}
        />
        <label>Text</label>
      </div>
    </div>
  );
};

export const ButtonColourSettings = () => {
  const [button, setButton] = useState<Color | string>("#005da2");

  const buttonHexString = useMemo(
    () => (typeof button === "string" ? button : button.toHexString()),
    [button]
  );

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          style={{ backgroundColor: buttonHexString }}
          type="button"
          className="h-10 px-4 text-base font-medium text-white rounded-md transition-color font-shop hover:opacity-90"
        >
          <span>Button</span>
        </button>
        <button
          style={{ color: buttonHexString }}
          type="button"
          className="h-10 px-4 text-base font-medium rounded-md hover:underline transition-color font-shop hover:opacity-90"
        >
          <span>Link</span>
        </button>
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <ColorPicker
          showText={() => <DownOutlined className="w-3 h-3 text-black/25" />}
          value={button}
          onChange={setButton}
        />
        <label>Button / Links</label>
      </div>
    </div>
  );
};
