import {
  Button,
  Form,
  Input,
  Segmented,
  Switch,
  Tooltip,
  TreeSelect,
  Upload,
} from "antd";
import {
  CloudUploadOutlined,
  CopyOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { UploadProps } from "antd/lib/upload/interface";

export type RcCustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>["customRequest"], undefined>
>[0];

interface BannerSettingsProps {
  selectedItem: string | null;
}

export const BannerSettings: FC<BannerSettingsProps> = ({ selectedItem }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [titleValue, setTitleValue] = useState<string | null>(null);
  const [descriptionValue, setDescriptionValue] = useState<string>(
    "Suitable for swimmers of any level, we concentrate on improving confidence and technique. Prices start from £30 a session."
  );
  const [selectedSegment, setSelectedSegment] = useState<string | null>(
    "timetable"
  );
  const [selectedProduct, setSelectedProduct] = useState<string[] | null>(null);

  useEffect(() => {
    setTitleValue(selectedItem);
  }, [selectedItem]);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  const dummyRequest = (options: RcCustomRequestOptions) => {
    const { file, onSuccess } = options;
    setTimeout(() => {
      if (file instanceof File) {
        setUploadedImage(file);
      } else {
        console.warn("Uploaded item is not a File object:", file);
      }
      if (onSuccess) {
        onSuccess("ok", new XMLHttpRequest());
      }
    }, 0);
  };

  const removeImage = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setUploadedImage(null);
  };

  const classData = [
    {
      title: "Classes",
      value: "1",
      key: "1",
      children: [
        {
          title: "Adult and Child Lessons",
          value: "1-1",
          key: "1-1",
        },
        {
          title: "Independent Children's Lessons",
          value: "1-2",
          key: "1-2",
        },
        {
          title: "Adult Lessons",
          value: "1-3",
          key: "1-3",
        },
        {
          title: "Private Lessons",
          value: "1-4",
          key: "1-4",
        },
      ],
    },
    {
      title: "Events",
      value: "2",
      key: "2",
      children: [
        {
          title: "Swimming Championships",
          value: "2-1",
          key: "2-1",
        },
      ],
    },
  ];

  const merchData = [
    {
      title: "Merchandise",
      value: "1",
      key: "1",
      children: [
        {
          title: "Swimming cap",
          value: "1-1",
          key: "1-1",
        },
        {
          title: "Goggles",
          value: "1-2",
          key: "1-2",
        },
      ],
    },
    {
      title: "Subscriptions",
      value: "2",
      key: "2",
      children: [
        {
          title: "Annual Membership",
          value: "2-1",
          key: "2-1",
        },
      ],
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <Form layout="vertical" className="mb-7">
        <Form.Item label={uploadedImage ? "" : "Image"} className="mb-0 group">
          {!uploadedImage ? (
            <Upload customRequest={dummyRequest} showUploadList={false}>
              <Button className="mb-4" icon={<CloudUploadOutlined />}>
                Upload
              </Button>
            </Upload>
          ) : (
            <div className="relative flex mb-4">
              <div className="relative overflow-hidden border-2 border-white rounded shadow group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10">
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  className="block object-cover object-center aspect-[5/3] w-full h-full rounded-[3px] group-hover:opacity-90 transition-opacity"
                  alt="Uploaded content"
                />
              </div>
              <Upload customRequest={dummyRequest} showUploadList={false}>
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <Tooltip title="Upload image">
                    <Button
                      icon={<CloudUploadOutlined />}
                      size="large"
                      className="text-white border-0 rounded-full bg-black/75 hover:bg-black"
                    ></Button>
                  </Tooltip>
                  <Tooltip title="Remove image">
                    <Button
                      icon={<DeleteOutlined />}
                      size="large"
                      className="text-white border-0 rounded-full bg-black/75 hover:bg-black"
                      onClick={(event) => removeImage(event)}
                    ></Button>
                  </Tooltip>
                </div>
              </Upload>
            </div>
          )}
        </Form.Item>
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Title</span>
            </span>
          }
        >
          <Input
            value={titleValue ?? ""}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Description</span>
            </span>
          }
        >
          <TextArea
            rows={3}
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="mb-4"
          label={
            <span className="flex gap-1.5">
              <span>Link</span>
              <Tooltip
                className="text-neutral-400 hover:text-neutral-500"
                title="Choose where this banner links to"
              >
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          {selectedProduct && selectedProduct.length > 0 && (
            <Tooltip title="Copy link to clipboard">
              <Button
                type="text"
                icon={<CopyOutlined />}
                size="small"
                className="absolute right-0 -top-7 text-neutral-500 hover:text-neutral-600"
                onClick={() => copyToClipboard("https://example.com")}
              />
            </Tooltip>
          )}
          <Segmented
            className="p-1.5 rounded rounded-b-none [&_*]:!rounded"
            block
            options={[
              {
                label: (
                  <Tooltip
                    title="Select the classes and events you would like to
                        show on a timetable page"
                  >
                    <div>timetable</div>
                  </Tooltip>
                ),
                value: "timetable",
              },
              {
                label: (
                  <Tooltip title="Select the merchandise and memberships you would like to show on a product listings page">
                    <div>Items</div>
                  </Tooltip>
                ),
                value: "items",
              },
              {
                label: (
                  <Tooltip title="Enter the web page address of a site you would like to link to">
                    <div>Web page</div>
                  </Tooltip>
                ),
                value: "webpage",
              },
            ]}
            onChange={(selectedValue) => {
              setSelectedSegment(selectedValue as string);
            }}
          />
          {selectedSegment === "timetable" && (
            <div className="p-1.5 pt-0.5 rounded-b bg-neutral-100">
              <TreeSelect
                className="rounded-full [&_.ant-select-selection-item-remove]:hidden [&_.ant-select-selection-item]:bg-transparent [&_.ant-select-selection-item]:p-0 [&_.ant-select-selection-item]:pl-1 [&_.ant-select-selection-item]:mr-0 [&_.ant-select-selection-item-content]:m-0 [&_.ant-select-selection-item-content]:font-medium [&_.ant-select-selection-item-content]:cursor-pointer"
                multiple={true}
                treeCheckable={true}
                value={selectedProduct || []}
                treeData={classData}
                placeholder="Select classes & events..."
                onChange={(value) => setSelectedProduct(value as string[])}
                virtual={false}
                maxTagCount={1}
                showSearch={false}
                allowClear={true}
                placement="topLeft"
              />
            </div>
          )}
          {selectedSegment === "items" && (
            <div className="p-1.5 pt-0.5 rounded-b bg-neutral-100">
              <TreeSelect
                className="[&_.ant-select-selection-item-remove]:hidden [&_.ant-select-selection-item]:bg-transparent [&_.ant-select-selection-item]:p-0 [&_.ant-select-selection-item]:pl-1 [&_.ant-select-selection-item]:mr-0 [&_.ant-select-selection-item-content]:m-0 [&_.ant-select-selection-item-content]:font-medium [&_.ant-select-selection-item-content]:cursor-pointer"
                multiple={true}
                treeCheckable={true}
                value={selectedProduct || []}
                treeData={merchData}
                placeholder="Select merchandise & memberships..."
                onChange={(value) => setSelectedProduct(value as string[])}
                virtual={false}
                maxTagCount={1}
                showSearch={false}
                allowClear={true}
                placement="topLeft"
              />
            </div>
          )}
          {selectedSegment === "webpage" && (
            <div className="p-1.5 pt-0.5 rounded-b bg-neutral-100">
              <Input placeholder="http://www.google.com" />
            </div>
          )}
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
                title="Hide this banner from your shop."
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
