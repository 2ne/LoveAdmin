import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Layout,
  Collapse,
  Select,
  Radio,
  Typography,
  Drawer,
  Form,
  Switch,
  Tooltip,
  message,
  Alert,
} from "antd";
import Sidebar from "../../../../components/sidebar";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  HolderOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tag, { Colours } from "../../../../components/tag";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const { Option } = Select;
const { Content } = Layout;
const { Panel } = Collapse;

type Group =
  | "Beneficiary"
  | "Account Owner"
  | "Internal Customer"
  | "Internal Product";

const mapGroupToColour: Record<NonNullable<Group>, Colours> = {
  Beneficiary: "primary",
  "Account Owner": "pink",
  "Internal Customer": "success",
  "Internal Product": "neutral",
};

const mapGroupToText: Record<NonNullable<Group>, string> = {
  Beneficiary: "text-primary-600 hover:text-primary-600",
  "Account Owner": "text-pink-600 hover:text-pink-600",
  "Internal Customer": "text-success-600 hover:text-success-600",
  "Internal Product": "text-neutral-600 hover:text-neutral-600",
};

const mapGroupToBorder: Record<NonNullable<Group>, string> = {
  Beneficiary: "border-primary-500 hover:ring-primary-500",
  "Account Owner": "border-pink-500 hover:ring-pink-500",
  "Internal Customer": "border-success-500 hover:ring-success-500",
  "Internal Product": "border-neutral-400 hover:ring-neutral-400",
};

type InputType = "TextInput" | "Dropdown" | "Textarea" | "Radio";

interface CustomField {
  id: number;
  dataGroup: Group;
  name: string;
  label: string;
  type: InputType;
  options?: string[];
  originalId?: number;
  isDragged?: boolean;
}

interface OptionItem {
  id: string;
  value: string;
}

const fieldData: Record<Group, CustomField[]> = {
  Beneficiary: [
    {
      id: 1,
      label: "Gender",
      name: "Beneficiary Gender",
      type: "Dropdown",
      options: ["Male", "Female", "Other"],
      dataGroup: "Beneficiary",
    },
    {
      id: 2,
      label: "Preferred pronouns",
      name: "Beneficiary preferred pronouns",
      type: "Radio",
      options: ["He/Him", "She/Her", "They/Them", "Other"],
      dataGroup: "Beneficiary",
    },
  ],
  "Account Owner": [
    {
      id: 3,
      label: "Gender",
      name: "Account Owner Gender",
      type: "Radio",
      options: ["Male", "Female", "Other"],
      dataGroup: "Account Owner",
    },
  ],
  "Internal Customer": [
    {
      id: 4,
      label: "Field 4",
      name: "Internal Customer Field 4",
      type: "Radio",
      dataGroup: "Internal Customer",
    },
  ],
  "Internal Product": [
    {
      id: 5,
      label: "Field 5",
      name: "Internal Product Field 5",
      type: "Radio",
      dataGroup: "Internal Product",
    },
  ],
};

const FormBuilder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanels, setActivePanels] = useState<string[]>([
    Object.keys(fieldData)[0],
  ]);
  const [showDescription, setShowDescription] = useState(false);
  const [formFields, setFormFields] = useState<CustomField[]>([]);
  const [clonedFields, setClonedFields] = useState<Record<number, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [fieldIdCounter, setFieldIdCounter] = useState(1000); // Starting from 1000 for example
  const [editFieldId, setEditFieldId] = useState<number | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [newOption, setNewOption] = useState<string>("");
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Whenever editFieldId changes, set the form values accordingly
    if (editFieldId !== null) {
      const currentField = formFields.find((field) => field.id === editFieldId);
      if (currentField) {
        form.setFieldsValue({ label: currentField.label });
      }
    } else {
      form.resetFields();
    }
  }, [editFieldId, formFields, form]);

  const getInitialValues = (): Partial<CustomField> => {
    return formFields.find((field) => field.id === editFieldId) || {};
  };

  const handleAddOption = () => {
    if (newOption && !options.find((option) => option.value === newOption)) {
      const updatedOptions = [
        ...options,
        { id: `option-${options.length + 1}`, value: newOption },
      ];
      setOptions(updatedOptions);
      setNewOption("");
    }
  };

  const handleDeleteOption = (value: string) => {
    const updatedOptions = options.filter((option) => option.value !== value);
    setOptions(updatedOptions);
  };

  const updateFieldOptions = (updatedOptions: string[]) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === editFieldId ? { ...field, options: updatedOptions } : field
      )
    );
  };

  const navigate = useNavigate();

  const gotoCustomerForms = () => {
    navigate("/Settings/Data/CustomerForms");
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      // Open panels that have fields matching the search term
      setActivePanels(
        Object.keys(fieldData).filter((type) =>
          fieldData[type as Group].some((field) =>
            field.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    } else {
      // Default panel state when there is no search term
      setActivePanels([Object.keys(fieldData)[0]]);
    }
  }, [searchTerm]);

  const handlePanelChange = (keys: string | string[]) => {
    const newActivePanels = Array.isArray(keys) ? keys : [keys];
    setActivePanels(newActivePanels);
  };

  const shouldDisplayPanel = (type: Group) => {
    if (searchTerm.length === 0) return true; // Show all panels if no search term
    return fieldData[type].some((field) =>
      field.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Combine all fields into a single array for filtering
  const allFields = Object.values(fieldData).flat();

  const filteredFields = allFields.filter((field) =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderFieldsByType = (type: Group) => {
    const filteredFieldsByType = fieldData[type].filter((field) =>
      field.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        {filteredFieldsByType.map((field, index) => (
          <Draggable
            key={field.id}
            draggableId={field.id.toString()}
            index={index}
          >
            {(provided: {
              innerRef: React.LegacyRef<HTMLDivElement> | undefined;
              draggableProps: JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLDivElement> &
                React.HTMLAttributes<HTMLDivElement>;
              dragHandleProps: JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLDivElement> &
                React.HTMLAttributes<HTMLDivElement>;
            }) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`flex items-center mb-2 gap-2 px-2.5 py-2 text-sm bg-white border-l-4 rounded shadow cursor-grab ring-1 ring-neutral-950/5 ${
                  mapGroupToBorder[field.dataGroup]
                } ${
                  clonedFields[field.id] ? "opacity-50 pointer-events-none" : ""
                } `}
              >
                <HolderOutlined className="text-neutral-400" />
                <div className="flex items-center justify-between flex-grow min-w-0">
                  <div className="truncate">{field.label}</div>
                  {field.type === "Dropdown" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="relative w-4 h-4 left-px text-neutral-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {field.type === "Radio" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-neutral-400"
                    >
                      <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </Draggable>
        ))}
        <Button
          type="link"
          className={`px-0 ${mapGroupToText[type]}`}
          icon={<PlusOutlined />}
        >
          {type} field
        </Button>
      </>
    );
  };

  const hasFilteredFields = filteredFields.length > 0;

  const onDragStart = (start: { draggableId: string }) => {
    setIsDragging(true);
    const fieldId = parseInt(start.draggableId);
    setClonedFields((prev) => ({ ...prev, [fieldId]: true }));
  };

  const onDragEnd = (result: {
    draggableId: string;
    source: { droppableId: string; index: number };
    destination?: { droppableId: string; index: number };
  }) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      setIsDragging(false);
      // If dropped outside any droppable area, reset the clonedFields state for the dragged item
      const fieldId = parseInt(draggableId);
      if (source.droppableId !== "formBuilder") {
        setClonedFields((prev) => ({ ...prev, [fieldId]: false }));
      }
      return;
    }

    const fieldId = parseInt(draggableId);

    if (destination.droppableId === "formBuilder") {
      if (source.droppableId !== "formBuilder") {
        // Adding a new field to the FormBuilder from the sidebar
        const fieldToClone = allFields.find((field) => field.id === fieldId);
        if (fieldToClone) {
          const newFieldId = fieldIdCounter;
          setFieldIdCounter((prevId) => prevId + 1); // Increment the counter

          const clonedField = {
            ...fieldToClone,
            id: newFieldId,
            originalId: fieldToClone.id, // Set originalId for the cloned field
          };
          setFormFields((prevFormFields) => [
            ...prevFormFields.slice(0, destination.index),
            clonedField,
            ...prevFormFields.slice(destination.index),
          ]);
          // Mark the field as cloned
          setClonedFields((prev) => ({ ...prev, [fieldId]: true }));
        }
      } else {
        // Reordering within the FormBuilder
        const reorderedFields = Array.from(formFields);
        const [removed] = reorderedFields.splice(source.index, 1);
        reorderedFields.splice(destination.index, 0, removed);
        setFormFields(reorderedFields);
      }
    }

    setIsDragging(false);
  };

  const deleteField = (fieldId: number) => {
    // Find and remove the field from formFields
    const fieldToDelete = formFields.find((field) => field.id === fieldId);
    setFormFields((prevFormFields) =>
      prevFormFields.filter((field) => field.id !== fieldId)
    );

    // Update clonedFields based on whether the field is a clone
    if (fieldToDelete && fieldToDelete.originalId !== undefined) {
      const originalFieldId = fieldToDelete.originalId;
      setClonedFields((prev) => ({ ...prev, [originalFieldId]: false }));
    }
  };

  const openDrawer = (fieldId: number) => {
    const field = formFields.find((field) => field.id === fieldId);
    if (field) {
      const optionItems: OptionItem[] = field.options
        ? field.options.map((option, index) => ({
            id: `option-${fieldId}-${index}`,
            value: option,
          }))
        : [];
      setOptions(optionItems);
      setEditFieldId(fieldId);
    }
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEditFieldId(null);
  };

  const onDrawerFormFinish = (values: any) => {
    message.success(
      `${
        formFields.find((field) => field.id === editFieldId)?.name
      } field updated`
    );

    setFormFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === editFieldId) {
          return {
            ...field,
            ...values, // Update other values of the field
            options: options.map((option) => option.value), // Update options order
          };
        }
        return field;
      })
    );

    // If the field is a clone, update the original in the sidebar as well
    if (
      editFieldId &&
      formFields.find((field) => field.id === editFieldId)?.originalId
    ) {
      const originalId = formFields.find(
        (field) => field.id === editFieldId
      )?.originalId;
      Object.keys(fieldData).forEach((group) => {
        fieldData[group as Group] = fieldData[group as Group].map((field) =>
          field.id === originalId
            ? {
                ...field,
                ...values,
                options: options.map((option) => option.value),
              }
            : field
        );
      });
    }
    closeDrawer();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex items-center gap-3 px-4 border-b h-14 border-neutral-200">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="relative -ml-1 rounded-full top-px"
          onClick={gotoCustomerForms}
        />
        <div className="-space-y-0.5 -mt-px">
          <Title level={5} className="mb-0">
            Form name 1
          </Title>
          <Text className="flex items-center text-subtitle">
            Customer Forms
          </Text>
        </div>
        <div className="flex gap-3 ml-auto">
          <Button>Preview</Button>
          <Button type="primary" className="px-5">
            Save
          </Button>
        </div>
      </header>

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Layout className="flex-grow rounded-t-lg bg-neutral-50">
          <Sidebar hideButton={true} className="bg-white">
            <div className="p-4 pb-1.5">
              <Input
                placeholder="Search custom fields..."
                prefix={<SearchOutlined className="mr-2" />}
                className="border-transparent shadow-none bg-neutral-200/50 focus-within:bg-white focus-within:border-primary-500 [&_.ant-input]:bg-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </div>
            <Droppable droppableId="sidebar" isDropDisabled={true}>
              {(provided: {
                innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                droppableProps: JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLDivElement> &
                  React.HTMLAttributes<HTMLDivElement>;
                placeholder:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {hasFilteredFields ? (
                    <Collapse
                      defaultActiveKey={[Object.keys(fieldData)[0]]}
                      activeKey={activePanels}
                      onChange={handlePanelChange}
                      bordered={false}
                      className="!bg-transparent [&_.ant-collapse-header]:flex-row-reverse [&_.ant-collapse-expand-icon]:p-0 [&_.ant-collapse-expand-icon]:text-subtitle [&_.ant-collapse-item-active_.ant-collapse-expand-icon]:text-title [&_.ant-collapse-item]:border-neutral-200"
                    >
                      {Object.entries(fieldData).map(([type, fields]) => {
                        if (!shouldDisplayPanel(type as Group)) return null;
                        return (
                          <Panel
                            key={type}
                            header={
                              <span>
                                <span>{type}</span>
                                {fields.length > 0 && (
                                  <>
                                    <span className="text-subtitle mx-1.5">
                                      ·
                                    </span>
                                    <span className="text-subtitle">
                                      {fields.length}
                                    </span>
                                  </>
                                )}
                              </span>
                            }
                          >
                            {renderFieldsByType(type as Group)}
                          </Panel>
                        );
                      })}
                    </Collapse>
                  ) : (
                    <div className="px-4 py-2 text-subtitle">
                      No fields found matching your search.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Sidebar>
          <Content className="max-w-xl p-6 pb-16 mx-auto opacity-100 pointer-events-auto">
            <div className="mb-4">
              <Input
                size="large"
                placeholder="Enter a form name"
                value="Form name 1"
              ></Input>
            </div>
            {!showDescription && (
              <Button
                type="link"
                className="px-0 -mt-3 -mb-4"
                onClick={() => setShowDescription(true)}
              >
                Add description
              </Button>
            )}
            {showDescription && (
              <div>
                <TextArea
                  size="large"
                  placeholder="Enter a form description..."
                  rows={3}
                ></TextArea>
              </div>
            )}
            <div className="mt-6 border-b border-neutral-200" />

            <Droppable droppableId="formBuilder">
              {(
                provided: {
                  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                  droppableProps: JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLDivElement> &
                    React.HTMLAttributes<HTMLDivElement>;
                  placeholder:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                snapshot: { isDraggingOver: any }
              ) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`mt-2 pt-4 pb-px px-4 -mx-4 rounded transition-all ${
                    formFields.length > 0 && isDragging
                      ? "bg-neutral-200/50"
                      : ""
                  }`}
                >
                  {formFields.length === 0 ? (
                    <div
                      className={`p-8 font-medium text-center border-2 border-dashed rounded text-neutral-500 border-neutral-300 ${
                        snapshot.isDraggingOver
                          ? "bg-primary-100 border-primary-300"
                          : ""
                      }`}
                    >
                      Drag and drop your form fields here...
                    </div>
                  ) : (
                    formFields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id.toString()}
                        index={index}
                      >
                        {(provided: {
                          innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                          draggableProps: JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLDivElement> &
                            React.HTMLAttributes<HTMLDivElement>;
                          dragHandleProps: JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLDivElement> &
                            React.HTMLAttributes<HTMLDivElement>;
                        }) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-4 flex gap-6 pl-3 pr-4 text-sm bg-white border-l-4 rounded shadow cursor-grab ring-1 ring-neutral-950/5 w-full max-w-[524px] select-none ${
                              mapGroupToBorder[field.dataGroup]
                            }`}
                          >
                            <HolderOutlined className="text-neutral-400" />
                            <div className="flex-grow">
                              <div className="mt-5 mb-6">
                                <div className="flex items-center gap-2 mb-2.5">
                                  <div className="font-medium">
                                    {field.label}
                                  </div>
                                  <Tag
                                    colour={mapGroupToColour[field.dataGroup]}
                                  >
                                    {field.dataGroup}
                                  </Tag>
                                </div>
                                {field.type === "Dropdown" && (
                                  <Select
                                    style={{ width: 150 }}
                                    placeholder={`Select ${field.label.toLowerCase()}...`}
                                  >
                                    {field.options?.map((option) => (
                                      <Option key={option} value={option}>
                                        {option}
                                      </Option>
                                    ))}
                                  </Select>
                                )}
                                {field.type === "Radio" && (
                                  <div className="flex flex-col gap-0.5 -mt-0.5 pointer-events-none">
                                    {field.options?.map(
                                      (option, optionIndex) => (
                                        <Radio.Group key={optionIndex}>
                                          <Radio value={option}>{option}</Radio>
                                        </Radio.Group>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2 py-2.5 transition-opacity border-t border-neutral-200">
                                <div className="flex items-center min-w-0">
                                  <Switch size="small"></Switch>
                                  <div className="flex items-center min-w-0 cursor-default">
                                    <div className="ml-2 mr-1.5 cursor-pointer truncate text-neutral-700 relative -top-px">
                                      Required
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-auto">
                                  <Tooltip title="Edit field">
                                    <Button
                                      type="text"
                                      icon={<EditOutlined />}
                                      onClick={() => openDrawer(field.id)}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Remove field">
                                    <Button
                                      type="text"
                                      icon={
                                        <svg
                                          fill-rule="evenodd"
                                          viewBox="64 64 896 896"
                                          focusable="false"
                                          data-icon="close"
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                        >
                                          <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                                        </svg>
                                      }
                                      onClick={() => deleteField(field.id)}
                                    ></Button>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Content>
        </Layout>
      </DragDropContext>
      <Drawer
        destroyOnClose
        title={`Edit ${
          formFields.find((field) => field.id === editFieldId)?.name
        } field`}
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        footer={
          <div className="flex justify-between">
            <div className="flex items-center flex-grow">
              <Button onClick={onDrawerFormFinish} type="primary">
                Save
              </Button>
              <Button className="ml-3" onClick={closeDrawer}>
                Cancel
              </Button>
            </div>
          </div>
        }
      >
        <Alert
          message="This field is used on 2 other forms, all changes will be reflected on those forms."
          type="info"
          showIcon
          className="mb-4"
        />
        <Form
          form={form}
          layout="horizontal"
          initialValues={getInitialValues()}
          onFinish={onDrawerFormFinish}
          requiredMark={false}
          className="[&_.ant-form-item-label]:w-[48px] [&_.ant-form-item-label>label]:text-subtitle [&_.ant-form-item-label>label]:font-normal"
        >
          {editFieldId && (
            <Form.Item label="Name">
              <div>
                {formFields.find((field) => field.id === editFieldId)?.name}
              </div>
            </Form.Item>
          )}

          {editFieldId && (
            <Form.Item label="Type" className="-mt-1">
              <div className="flex items-center gap-2">
                {formFields.find((field) => field.id === editFieldId)?.type ===
                  "Dropdown" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="relative w-4 h-4 left-px text-neutral-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)?.type ===
                  "Radio" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 text-neutral-400"
                  >
                    <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)?.type}
              </div>
            </Form.Item>
          )}

          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: "Please enter a field label" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Options">
            <DragDropContext
              onDragEnd={(result: { source: any; destination: any }) => {
                const { source, destination } = result;
                if (!destination) {
                  return;
                }
                const reorderedOptions = Array.from(options);
                const [removed] = reorderedOptions.splice(source.index, 1);
                reorderedOptions.splice(destination.index, 0, removed);
                setOptions(reorderedOptions);
              }}
            >
              <Droppable droppableId="optionsDroppable">
                {(provided: {
                  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                  droppableProps: JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLDivElement> &
                    React.HTMLAttributes<HTMLDivElement>;
                  placeholder:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {options.map((option, index) => (
                      <Draggable
                        key={option.id}
                        draggableId={option.id}
                        index={index}
                      >
                        {(provided: {
                          innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                          draggableProps: JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLDivElement> &
                            React.HTMLAttributes<HTMLDivElement>;
                          dragHandleProps: JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLDivElement> &
                            React.HTMLAttributes<HTMLDivElement>;
                        }) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <div className="flex items-center gap-2">
                              <HolderOutlined className="absolute left-0 z-20 w-8 h-8 pl-2 text-neutral-500" />
                              <Input
                                value={option.value}
                                className="flex-grow pl-8"
                              />
                              <Tooltip title="Delete" className="shrink-0">
                                <Button
                                  type="text"
                                  className="hover:bg-danger-50 hover:text-danger-600"
                                  icon={<DeleteOutlined />}
                                  onClick={() =>
                                    handleDeleteOption(option.value)
                                  }
                                />
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex items-center gap-2">
              <Input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
                className="flex-grow"
              />
              <Tooltip title="Add option" className="shrink-0">
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={handleAddOption}
                />
              </Tooltip>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default FormBuilder;