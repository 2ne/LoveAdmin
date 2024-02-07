import {
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  Typography,
  InputNumber,
  Divider,
} from "antd";
import { CustomField } from "./form-builder";
import { Dayjs } from "dayjs";
const { Option } = Select;
const { TextArea } = Input;
const { Paragraph, Title } = Typography;

interface FormPreviewProps {
  fields: CustomField[];
  description?: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ fields, description }) => {
  const visibleFields = fields.filter(
    (field) => field.dataGroup !== "Internal Contact"
  );
  return (
    <Form layout="vertical">
      {description && (
        <Paragraph className="mb-6 text-sm">{description}</Paragraph>
      )}
      <Divider className="bg-neutral-200/75" />
      {visibleFields.length === 0 && (
        <Paragraph className="p-8 text-center border rounded text-subtitle border-neutral-200">
          No fields have been added yet.
        </Paragraph>
      )}
      {visibleFields.map((field) => {
        let disabledDate;

        if (field.inputType === "Date" && field.dateRange) {
          disabledDate = (current: {
            isBefore: (arg0: Dayjs) => any;
            isAfter: (arg0: Dayjs) => any;
          }) => {
            // Can not select days outside the specified range
            return (
              (field.dateRange && current.isBefore(field.dateRange[0])) ||
              (field.dateRange && current.isAfter(field.dateRange[1]))
            );
          };
        }
        switch (field.inputType) {
          case "Text input":
            if (field.label === "form_title") {
              return <Title level={5}>{field?.value}</Title>;
            } else
              return (
                <Form.Item
                  extra={field.helpText}
                  key={field.id}
                  label={field.label}
                >
                  <Input className="w-full" placeholder="Enter here..." />
                </Form.Item>
              );
          case "Text area":
            if (field.label === "form_description") {
              return <Paragraph className="text-sm">{field?.value}</Paragraph>;
            } else
              return (
                <Form.Item
                  extra={field.helpText}
                  key={field.id}
                  label={field.label}
                >
                  <TextArea
                    className="w-full"
                    rows={3}
                    placeholder="Enter here..."
                  />
                </Form.Item>
              );
          case "Number":
            return (
              <Form.Item
                extra={field.helpText}
                key={field.id}
                label={field.label}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Enter number here..."
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            );
          case "Dropdown":
            return (
              <Form.Item
                extra={field.helpText}
                key={field.id}
                label={field.label}
              >
                <Select className="w-full" placeholder="Select...">
                  {field.options?.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            );

          case "Radio":
            return (
              <Form.Item
                extra={field.helpText}
                key={field.id}
                label={field.label}
              >
                <Radio.Group className="flex flex-col gap-0.5">
                  {field.options?.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            );
          case "Checkbox":
            return (
              <Form.Item
                extra={field.helpText}
                key={field.id}
                label={field.label}
              >
                <Checkbox.Group className="flex flex-col gap-0.5">
                  {field.options?.map((option) => (
                    <Checkbox key={option} value={option}>
                      {option}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            );
          case "Date":
            return (
              <Form.Item
                extra={field.helpText}
                key={field.id}
                label={field.label}
              >
                <DatePicker className="w-full" disabledDate={disabledDate} />
              </Form.Item>
            );

          case "Divider":
            return <Divider className="bg-neutral-200/75" />;
          default:
            return null;
        }
      })}
    </Form>
  );
};

export default FormPreview;
