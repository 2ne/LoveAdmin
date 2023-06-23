import { CheckOutlined } from "@ant-design/icons";
import { Popover, Button, Form, Input, message } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;
const Notes: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [note, setNote] = useState(
    "This is some note text. I am not sure how long a note would be but this is just a guess."
  );

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpen(open);
  };

  const onFinish = (values: { note: React.SetStateAction<string> }) => {
    setNote(values.note);
    hide();
    message.success("Note updated");
  };

  const editDetailContent = (
    <div className="p-1 pb-2 min-w-[19.5rem]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="flex items-end gap-2 [&_.ant-form-item-has-error+.ant-form-item_.ant-btn]:top-[-1.375rem]"
        requiredMark={false}
      >
        <Form.Item
          name="note"
          initialValue={note}
          label="Note"
          className="!mb-0 flex-grow"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
          ></Button>
        </Form.Item>
      </Form>
    </div>
  );
  return (
    <div className="-mx-3 -my-2">
      <Popover
        content={editDetailContent}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="right"
      >
        <div className="[&>*:not(:last-child)]:mb-5 mb-2 hover:bg-neutral-100 transition-colors px-3 py-2 rounded-md cursor-pointer">
          <div className="space-y-1.5">
            <div>{note}</div>
            <div className="text-neutral-400">James Toone · 7 Feb 09:59</div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Notes;
