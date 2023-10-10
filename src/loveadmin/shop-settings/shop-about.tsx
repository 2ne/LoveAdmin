import { Button, Form, Input, Switch, Tooltip, Upload } from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FC, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { UploadProps } from "antd/lib/upload/interface";

export type RcCustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>["customRequest"], undefined>
>[0]; 

export const AboutSettings: FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [titleValue, setTitleValue] = useState<string | null>(
    "Welcome to CG Swim School"
  );
  const [descriptionValue, setDescriptionValue] = useState<string>(
    "We are a family-run swimming school whose aim is to inspire swimmers to be confident and safe whilst having fun. We strive to provide a friendly, welcoming atmosphere with a personal touch. All swimmers are welcome, from 3 months old to 100 years old, regardless of their previous experience and level of confidence. Our lessons are tailored to each individual need and we keep to a strict ratio of no more than 4 babies, 3 children or 2 adults per lesson. This is to ensure we can give our full attention to each swimmer and help them make as much progress as possible."
  );

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
              <div className="relative mx-auto overflow-hidden border-2 border-white rounded-full shadow w-36 h-36 group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10">
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  className="block object-cover object-center md:mb-8 border-[0.125rem] ring-1 ring-neutral-200 border-white w-full h-full rounded-full group-hover:opacity-90 transition-opacity"
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
            rows={7}
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
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
