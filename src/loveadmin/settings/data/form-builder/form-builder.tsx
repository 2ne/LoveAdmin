import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Input,
  DatePicker,
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
  Checkbox,
  Popconfirm,
  Modal,
  InputNumber,
  Menu,
  Dropdown,
} from "antd";
import Sidebar from "../../../../components/sidebar";
import {
  AlignLeftOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FontSizeOutlined,
  HolderOutlined,
  InfoCircleOutlined,
  LineOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningFilled,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tag, { Colours } from "../../../../components/tag";
import { useNavigate } from "react-router-dom";
import FormPreview from "./form-preview";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Content } = Layout;
const { Panel } = Collapse;

type Group = "Customer" | "Internal contact" | "Form";

const mapGroupToColour: Record<NonNullable<Group>, Colours> = {
  Customer: "primary",
  "Internal contact": "pink",
  Form: "neutral",
};

const mapGroupToText: Record<NonNullable<Group>, string> = {
  Customer: "text-primary-600 hover:text-primary-600",
  "Internal contact": "text-pink-600 hover:text-pink-600",
  Form: "",
};

const mapGroupToBorder: Record<NonNullable<Group>, string> = {
  Customer: "border-l-4 border-primary-500 hover:ring-primary-500",
  "Internal contact": "border-l-4 border-pink-500 hover:ring-pink-500",
  Form: "",
};

type InputType =
  | "Text input"
  | "Text area"
  | "Number"
  | "Dropdown"
  | "Radio"
  | "Checkbox"
  | "Date"
  | "Divider";

export interface CustomField {
  id: number;
  dataGroup: Group;
  fieldName: string;
  label: string;
  inputType: InputType;
  value?: string;
  options?: string[];
  originalId?: number;
  isDragged?: boolean;
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
  helpText?: string;
}

interface OptionItem {
  id: string;
  value: string;
}

const fieldData: Record<Group, CustomField[]> = {
  Customer: [
    {
      id: 1,
      label: "Swim club ID",
      fieldName: "Swim Club ID",
      inputType: "Text input",
      dataGroup: "Customer",
    },
    {
      id: 2,
      label: "Additional notes",
      fieldName: "Additional Notes",
      inputType: "Text area",
      dataGroup: "Customer",
    },
    {
      id: 3,
      label: "Years of swimming experience",
      fieldName: "Years of Experience",
      inputType: "Number",
      dataGroup: "Customer",
    },
    {
      id: 4,
      label: "Preferred swim category",
      fieldName: "Preferred Swim Category",
      inputType: "Dropdown",
      options: ["Competitive", "Recreational", "Masters", "Open Water"],
      dataGroup: "Customer",
    },
    {
      id: 5,
      label: "Preferred training time",
      fieldName: "Preferred Training Time",
      inputType: "Radio",
      options: ["Morning", "Afternoon", "Evening"],
      dataGroup: "Customer",
    },
    {
      id: 6,
      label: "Equipment rental",
      fieldName: "Equipment Rental",
      inputType: "Checkbox",
      options: ["Goggles", "Fins", "Kickboard", "Pull Buoy"],
      dataGroup: "Customer",
    },
    {
      id: 7,
      label: "Membership renewal date",
      fieldName: "Membership Renewal Date",
      inputType: "Date",
      dataGroup: "Customer",
    },
  ],
  "Internal contact": [],
  Form: [],
  // "Internal product": [],
};

const groupDescriptions: Record<NonNullable<Group>, string> = {
  Customer:
    "Customer fields allow you to collect more information about the members of your products",
  "Internal contact":
    "Internal contact fields are used to add more information to a contact. This field will not show on Customer Forms and are only viewable by the organisation",
  Form: "",
};

const FormBuilder = () => {
  const addFormRef = useRef<any>();
  const editFormRef = useRef<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldsDataSet, setFieldsDataSet] =
    useState<Record<Group, CustomField[]>>(fieldData);

  const [activePanels, setActivePanels] = useState<string[]>([
    Object.keys(fieldsDataSet)[0],
  ]);
  const [showDescription, setShowDescription] = useState(false);
  const [formFields, setFormFields] = useState<CustomField[]>([]);
  const [clonedFields, setClonedFields] = useState<Record<number, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [optionIdCounter, setOptionIdCounter] = useState(100); // Starting from 1000 for example
  const [fieldIdCounter, setFieldIdCounter] = useState(1000); // Starting from 1000 for example
  const [editFieldId, setEditFieldId] = useState<number | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [isAddDrawerTitle, setIsAddDrawerTitle] = useState<Group>("Customer");
  const [newInputType, setNewInputType] = useState<string>("");
  const [newOption, setNewOption] = useState<string>("");
  const [showAddOption, setShowAddOption] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [form] = Form.useForm();
  const [isFromSubmitted, setIsFromSubmitted] = useState<boolean>(false);
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [formName, setFormName] = useState<string>("Form name 1");
  const [formDescription, setFormDescription] = useState<string>("");

  const openPreview = () => {
    setIsPreviewVisible(true);
  };

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
    // if (newOption && !options.find((option) => option.value === newOption)) {
    // if (newOption) {
    const newOptionId = optionIdCounter;
    setOptionIdCounter((prevId) => prevId + 1); // Increment the counter for next use
    const updatedOptions = [
      ...options,
      { id: `option-${newOptionId}`, value: newOption },
    ];
    setOptions(updatedOptions);
    setNewOption("");
    setShowAddOption(false);
    // }
    if (isFromSubmitted == true) form.validateFields(["options"]);
  };

  const handleDeleteOption = (id: string) => {
    if (options.length == 1) {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.id === id ? { ...option, value: "" } : option
        )
      );
    } else {
      const updatedOptions = options.filter((option) => option.id !== id);
      setOptions(updatedOptions);
    }
  };

  const navigate = useNavigate();

  const gotoCustomerForms = () => {
    navigate("/Settings/Data/Forms/CustomerForms");
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      // Open panels that have fields matching the search term
      setActivePanels(
        Object.keys(fieldsDataSet).filter((type) =>
          fieldsDataSet[type as Group].some((field) =>
            field.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    } else {
      // Default panel state when there is no search term
      setActivePanels([Object.keys(fieldsDataSet)[0]]);
    }
  }, [searchTerm]);

  const handlePanelChange = (keys: string | string[]) => {
    const newActivePanels = Array.isArray(keys) ? keys : [keys];
    setActivePanels(newActivePanels);
  };

  const shouldDisplayPanel = (type: Group) => {
    if (searchTerm.length === 0) return true; // Show all panels if no search term
    return fieldsDataSet[type].some((field) =>
      field.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Combine all fields into a single array for filtering
  const allFields = Object.values(fieldsDataSet).flat();

  const filteredFields = allFields.filter((field) =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderFieldsByType = (type: Group) => {
    const filteredFieldsByType = fieldsDataSet[type].filter((field) =>
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
                className={`flex items-center mb-2 gap-2 px-2.5 py-2 text-sm bg-white rounded shadow cursor-grab ring-1 ring-neutral-950/5 ${
                  mapGroupToBorder[field.dataGroup]
                } ${
                  clonedFields[field.id] ? "opacity-50 pointer-events-none" : ""
                } `}
              >
                <HolderOutlined className="text-neutral-400" />
                <div className="flex items-center justify-between flex-grow min-w-0 gap-2">
                  <div className="truncate">{field.label}</div>
                  {field.inputType === "Text input" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="w-4 h-4 text-neutral-400 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H576c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm184 32c9.5 0 18.1 5.6 21.9 14.3l64 144c5.4 12.1-.1 26.3-12.2 31.7s-26.3-.1-31.7-12.2l-4.3-9.7H146.3l-4.3 9.7c-5.4 12.1-19.6 17.6-31.7 12.2s-17.6-19.6-12.2-31.7l64-144c3.9-8.7 12.4-14.3 21.9-14.3zm0 83.1L167.6 280h32.8L184 243.1zM304 184c0-13.3 10.7-24 24-24h52c33.1 0 60 26.9 60 60c0 9.2-2.1 17.9-5.8 25.7c13.3 11 21.8 27.6 21.8 46.3c0 33.1-26.9 60-60 60H328c-13.3 0-24-10.7-24-24v-8V256 192v-8zm48 24v24h28c6.6 0 12-5.4 12-12s-5.4-12-12-12H352zm0 96h44c6.6 0 12-5.4 12-12s-5.4-12-12-12H380 352v24z"
                      />
                    </svg>
                  )}
                  {field.inputType === "Dropdown" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 text-neutral-400 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241L239 345c9.4 9.4 24.6 9.4 33.9 0L377 241c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87-87-87c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
                      />
                    </svg>
                  )}
                  {field.inputType === "Text area" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 text-neutral-400 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"
                      />
                    </svg>
                  )}
                  {field.inputType === "Number" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="w-4 h-4 text-neutral-400 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M576 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H576zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm40 120c0 13.3 10.7 24 24 24h8v96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H184V184c0-13.3-10.7-24-24-24H128c-13.3 0-24 10.7-24 24zm190.6 30.4c5.7-8 17.5-8.6 24-1.2c5.2 5.9 5 14.7-.3 20.5l-72 78c-6.5 7-8.2 17.2-4.3 25.9s12.5 14.4 22 14.4h88c13.3 0 24-10.7 24-24s-10.7-24-24-24H318.8l34.8-37.7c22-23.8 22.4-60.3 1.1-84.7c-26.9-30.7-75.4-28.4-99.2 4.9l-11.1 15.6c-7.7 10.8-5.2 25.8 5.6 33.5s25.8 5.2 33.5-5.6l11.1-15.6z"
                      />
                    </svg>
                  )}
                  {field.inputType === "Radio" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 text-neutral-400 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M64 32a64 64 0 1 0 0 128A64 64 0 1 0 64 32zM184 72c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zM64 280a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm0-88a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM40 416a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z"
                      />
                    </svg>
                  )}
                  {field.inputType === "Checkbox" && (
                    <svg
                      className="w-4 h-4 text-neutral-400 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      />
                    </svg>
                  )}
                  {field.inputType === "Date" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 text-neutral-400 shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                      />
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
          onClick={() => openAddDrawer(type)}
        >
          {type} field
        </Button>
      </>
    );
  };

  const generateMenuItems = () => {
    return Object.entries(fieldsDataSet)
      .map(([group, fields]) => {
        if (group === "Form") return null;

        return (
          <Menu.SubMenu key={group} title={group}>
            {fields.length > 0 ? (
              fields.map((field) => (
                <Menu.Item
                  onClick={({ key }) => handleAddField(key)}
                  key={field.id.toString()}
                  disabled={clonedFields[field.id]}
                >
                  {field.label}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item key={`${group}-empty`} disabled>
                No fields
              </Menu.Item>
            )}
          </Menu.SubMenu>
        );
      })
      .filter((menuItem) => menuItem !== null); // Filter out any nulls resulting from skipped groups
  };

  const addAdditionalFieldToFrom = (type: string) => {
    const newFieldId = fieldIdCounter;
    setFieldIdCounter((prevId) => prevId + 1); // Increment the counter for next use

    if (type === "Header") {
      const fieldToAdd: CustomField = {
        id: 111,
        dataGroup: "Form",
        label: "form_title",
        value: "",
        fieldName: "Header",
        inputType: "Text input",
      };
      setFormFields((prevFields) => [
        ...prevFields,
        {
          ...fieldToAdd,
          id: newFieldId,
          originalId: fieldToAdd?.id,
        },
      ]);
    } else if (type === "Description") {
      const fieldToAdd: CustomField = {
        id: 112,
        dataGroup: "Form",
        label: "form_description",
        value: "",
        fieldName: "Description",
        inputType: "Text area",
      };
      setFormFields((prevFields) => [
        ...prevFields,
        {
          ...fieldToAdd,
          id: newFieldId,
          originalId: fieldToAdd?.id,
        },
      ]);
    } else if (type === "Divider") {
      const fieldToAdd: CustomField = {
        id: 113,
        dataGroup: "Form",
        label: "form_divider",
        fieldName: "Divider",
        inputType: "Divider",
      };

      // Add the new field to the formFields state
      setFormFields((prevFields) => [
        ...prevFields,
        {
          ...fieldToAdd,
          id: newFieldId,
          originalId: fieldToAdd?.id,
        },
      ]);
    }
  };

  const handleUpdateAdditionalField = (editFieldId: number, value: string) => {
    setFormFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === editFieldId) {
          return {
            ...field,
            value: value,
          };
        }
        return field;
      })
    );
  };

  // Cascading Dropdown Menu
  const menu = (
    <Menu>
      {generateMenuItems()}

      <Menu.Divider />
      <Menu.Item
        onClick={() => addAdditionalFieldToFrom("Header")}
        key={997}
        icon={<FontSizeOutlined />}
      >
        Header
      </Menu.Item>
      <Menu.Item
        onClick={() => addAdditionalFieldToFrom("Description")}
        key={998}
        icon={<AlignLeftOutlined />}
      >
        Description
      </Menu.Item>
      <Menu.Item
        onClick={() => addAdditionalFieldToFrom("Divider")}
        key={999}
        icon={<LineOutlined />}
      >
        Divider
      </Menu.Item>
    </Menu>
  );

  // Adjust the handleAddField function if necessary to accommodate the cascading menu structure
  const handleAddField = (fieldId: React.Key) => {
    const numericFieldId = Number(fieldId);
    const fieldToAdd = Object.values(fieldsDataSet)
      .flat()
      .find((field) => field.id === numericFieldId);

    if (fieldToAdd) {
      // Assign a new unique ID for the formFields array
      const newFieldId = fieldIdCounter;
      setFieldIdCounter((prevId) => prevId + 1); // Increment the counter for next use

      const newField = {
        ...fieldToAdd,
        id: newFieldId,
        originalId: fieldToAdd.id,
      };

      // Add the new field to the formFields state
      setFormFields((prevFields) => [...prevFields, newField]);

      // Mark the original field as cloned
      setClonedFields((prev) => ({ ...prev, [fieldToAdd.id]: true }));
    }
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

  const deleteFieldCompletely = (fieldId: number) => {
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

    // delete from the original fields data set
    const id = formFields.find((field) => field.id === fieldId)?.originalId;
    setFieldsDataSet((prevFieldsDataSet) => ({
      ...prevFieldsDataSet,
      [isAddDrawerTitle]: prevFieldsDataSet[isAddDrawerTitle].filter(
        (field) => field.id !== id
      ),
    }));
  };

  const openDrawer = (fieldId: number, Group: Group) => {
    setIsAddDrawerTitle(Group);
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

      // Set initial values for the form
      form.setFieldsValue({
        label: field.label,
        dateRange: field.dateRange,
      });
    }
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEditFieldId(null);
    setIsFromSubmitted(false);
  };

  const openAddDrawer = (type: Group) => {
    setIsAddDrawerTitle(type);
    setIsAddDrawerVisible(true);
  };

  const closeAddDrawer = () => {
    setIsFromSubmitted(false);
    setIsAddDrawerTitle("Customer");

    // Reset the form fields
    form.resetFields();
    setNewInputType("");
    setOptions([]);

    setIsAddDrawerVisible(false);
  };

  const updateFieldsDateSet = (
    groupId: Group,
    fieldId: any,
    updatedField: Partial<CustomField>
  ) => {
    setFieldsDataSet((prevFieldsDataSet) => {
      return {
        ...prevFieldsDataSet,
        [groupId]: prevFieldsDataSet[groupId].map((field) =>
          field.id === fieldId ? { ...field, ...updatedField } : field
        ),
      };
    });
  };

  const onDrawerFormFinish = (values: any) => {
    message.success(
      `${
        formFields.find((field) => field.id === editFieldId)?.fieldName
      } field updated`
    );

    setFormFields((prevFields) =>
      prevFields.map((field) => {
        if (field.id === editFieldId) {
          return {
            ...field,
            ...values,
            options: options.map((option) => option.value),
            dateRange:
              field.inputType === "Date" ? values.dateRange : field.dateRange,
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
      const fieldId = formFields.find(
        (field) => field.id === editFieldId
      )?.originalId;

      updateFieldsDateSet(isAddDrawerTitle, fieldId, values);
    }
    closeDrawer();
  };

  const onDrawerAddFormFinish = (values: any) => {
    const newField = {
      ...values,
      options: options.map((option) => option.value),
      id: allFields.length + 1,
      fieldName: values.label,
      dataGroup: isAddDrawerTitle,
      dateRange: values.inputType === "Date" ? values.dateRange : undefined,
    };

    message.success(`${values.label} field created`);

    setFieldsDataSet((prevFieldsDataSet) => ({
      ...prevFieldsDataSet,
      [isAddDrawerTitle]: [...prevFieldsDataSet[isAddDrawerTitle], newField],
    }));

    const newFieldId = fieldIdCounter;
    setFieldIdCounter((prevId) => prevId + 1);

    setFormFields((prevFields) => [
      ...prevFields,
      {
        ...newField,
        id: newFieldId,
        originalId: allFields.length + 1,
      },
    ]);

    // Mark the original field as cloned
    setClonedFields((prev) => ({ ...prev, [allFields.length + 1]: true }));

    // Reset the form fields
    form.resetFields();
    closeAddDrawer();
  };

  const handleInputTypeChange = (event: any) => {
    setNewInputType(event);
    if (event !== "Dropdown" || event !== "Radio" || event !== "Checkbox") {
      const newOptionId = optionIdCounter;
      setOptionIdCounter((prevId) => prevId + 1); // Increment the counter for next use
      setOptions([{ id: `option-${newOptionId}`, value: "" }]);
      setNewOption("");
    }
  };

  const optionValidator = (value: any) => {
    const uniqueOptions = [...new Set(options.map((item) => item.value))];
    const checkEmptyOption = options.filter(
      (item: any) => item.value === ""
    ).length;

    if (checkEmptyOption !== 0) {
      return Promise.reject("Options must not be empty");
    } else if (uniqueOptions.length !== options.length) {
      return Promise.reject("Options must be unique");
    } else if (newInputType === "Dropdown" && options?.length < 2) {
      return Promise.reject("You must add at least two options");
    } else if (newInputType === "Radio" && options?.length < 2) {
      return Promise.reject("You must add at least two options");
    } else if (newInputType === "Checkbox" && options?.length < 1) {
      return Promise.reject("You must add at least one option");
    }
    return Promise.resolve();
  };

  const optionValidatorEdit = (value: any) => {
    const uniqueOptions = [...new Set(options.map((item) => item.value))];
    const checkEmptyOption = options.filter(
      (item: any) => item.value === ""
    ).length;
    if (checkEmptyOption !== 0) {
      return Promise.reject("Options must not be empty");
    } else if (uniqueOptions.length !== options.length) {
      return Promise.reject("Options must be unique");
    } else if (
      formFields.find((field) => field.id === editFieldId)?.inputType ===
        "Dropdown" &&
      options?.length < 2
    ) {
      return Promise.reject("You must add at least two options");
    } else if (
      formFields.find((field) => field.id === editFieldId)?.inputType ===
        "Radio" &&
      options?.length < 2
    ) {
      return Promise.reject("You must add at least two options");
    } else if (
      formFields.find((field) => field.id === editFieldId)?.inputType ===
        "Checkbox" &&
      options?.length < 1
    ) {
      return Promise.reject("You must add at least one options");
    }
    return Promise.resolve();
  };

  const handleOptionChange = (optionId: string, newValue: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId ? { ...option, value: newValue } : option
      )
    );
    if (isFromSubmitted == true) form.validateFields(["options"]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 px-4 border-b h-14 bg-white/95 border-neutral-200">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="relative -ml-1 rounded-full top-px shrink-0"
          onClick={gotoCustomerForms}
        />
        <div className="-space-y-0.5 -mt-px min-w-0">
          <Title level={5} className="mb-0 truncate">
            {formName}
          </Title>
          <Text className="block truncate text-subtitle">Customer Forms</Text>
        </div>
        <div className="flex gap-3 ml-auto">
          <Button onClick={openPreview} className="max-md:hidden">
            Preview
          </Button>
          <Button
            onClick={openPreview}
            icon={<EyeOutlined />}
            className="md:hidden"
          ></Button>
          <Button type="primary" className="px-5">
            Save
          </Button>
        </div>
      </header>

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Layout className="flex-grow rounded-t-lg bg-neutral-50">
          <Sidebar hideButton={true} className="bg-white max-md:hidden">
            <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-y-auto scrollbar-thin-y">
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
                        defaultActiveKey={[Object.keys(fieldsDataSet)[0]]}
                        activeKey={activePanels}
                        onChange={handlePanelChange}
                        bordered={false}
                        className="!bg-transparent [&_.ant-collapse-header]:flex-row-reverse [&_.ant-collapse-expand-icon]:p-0 [&_.ant-collapse-expand-icon]:text-subtitle [&_.ant-collapse-item-active_.ant-collapse-expand-icon]:text-title [&_.ant-collapse-item]:border-neutral-200"
                      >
                        {Object.entries(fieldsDataSet).map(([type, fields]) => {
                          if (
                            !shouldDisplayPanel(type as Group) ||
                            type === "Form"
                          )
                            return null;

                          return (
                            <Panel
                              key={type}
                              header={
                                <span>
                                  <span>{type}</span>
                                  <>
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
                                    <Tooltip
                                      rootClassName="pointer-events-auto"
                                      className="ml-2 text-neutral-400 hover:text-neutral-500"
                                      title={
                                        <span>
                                          {groupDescriptions[type as Group]}.
                                        </span>
                                      }
                                    >
                                      <InfoCircleOutlined className="mt-px" />
                                    </Tooltip>
                                  </>
                                </span>
                              }
                            >
                              {renderFieldsByType(type as Group)}
                            </Panel>
                          );
                        })}
                      </Collapse>
                    ) : (
                      <>
                        {searchTerm && (
                          <div className="px-4 py-2 text-subtitle">
                            No fields found matching your search.
                          </div>
                        )}
                        {!searchTerm && (
                          <Collapse
                            defaultActiveKey={1}
                            bordered={false}
                            className="!bg-transparent [&_.ant-collapse-header]:flex-row-reverse [&_.ant-collapse-expand-icon]:p-0 [&_.ant-collapse-expand-icon]:text-subtitle [&_.ant-collapse-item-active_.ant-collapse-expand-icon]:text-title [&_.ant-collapse-item]:border-neutral-200"
                          >
                            <Panel
                              key={1}
                              header={
                                <span>
                                  <span>Contact</span>
                                  <Tooltip
                                    rootClassName="pointer-events-auto"
                                    className="ml-2 text-neutral-400 hover:text-neutral-500"
                                    title={
                                      <span>
                                        {groupDescriptions["Customer" as Group]}
                                        .
                                      </span>
                                    }
                                  >
                                    <InfoCircleOutlined className="mt-px" />
                                  </Tooltip>
                                </span>
                              }
                            >
                              <Button
                                type="link"
                                className={`px-0`}
                                icon={<PlusOutlined />}
                                onClick={() => openAddDrawer("Customer")}
                              >
                                Contact field
                              </Button>
                            </Panel>
                            <Panel
                              key={2}
                              header={
                                <span>
                                  <span>Internal contact</span>
                                  <Tooltip
                                    rootClassName="pointer-events-auto"
                                    className="ml-2 text-neutral-400 hover:text-neutral-500"
                                    title={
                                      <span>
                                        {
                                          groupDescriptions[
                                            "Internal contact" as Group
                                          ]
                                        }
                                        .
                                      </span>
                                    }
                                  >
                                    <InfoCircleOutlined className="mt-px" />
                                  </Tooltip>
                                </span>
                              }
                            >
                              <Button
                                type="link"
                                className={`px-0 text-pink-600`}
                                icon={<PlusOutlined />}
                                onClick={() =>
                                  openAddDrawer("Internal contact")
                                }
                              >
                                Internal contact field
                              </Button>
                            </Panel>
                          </Collapse>
                        )}
                      </>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </Sidebar>
          <Content className="max-w-xl px-4 py-6 pb-16 mx-auto opacity-100 pointer-events-auto md:p-6">
            <div className="mb-4">
              <Input
                size="large"
                placeholder="Enter a form name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
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
                <ReactQuill
                  theme="snow"
                  value={formDescription}
                  onChange={(value) => setFormDescription(value)}
                  className="prose [&_.ql-editor]:cursor-text [&_.ql-editor.ql-blank:before]:not-italic bg-white [&_.ql-container]:rounded-b [&_.ql-editor]:rounded-b"
                />
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
                      Drag and drop your form fields here or{" "}
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type="link" className="!px-0 font-medium">
                          select a field.
                        </Button>
                      </Dropdown>
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
                            className={`mb-4 flex gap-6 pl-3 pr-4 text-sm bg-white rounded shadow cursor-grab ring-1 ring-neutral-950/5 w-full md:max-w-[524px] select-none ${
                              mapGroupToBorder[field.dataGroup]
                            }`}
                          >
                            <HolderOutlined className="text-neutral-400 max-sm:hidden" />
                            {field.label == "form_title" ||
                            field.label === "form_description" ||
                            field.label === "form_divider" ? (
                              <div className="flex items-center justify-center w-full gap-4 my-3 md:my-5">
                                {/* Additional Field */}
                                {field.inputType === "Text input" && (
                                  <div className="w-full ">
                                    <Input
                                      className="w-full"
                                      placeholder="Enter header here..."
                                      value={field?.value}
                                      onChange={(e) =>
                                        handleUpdateAdditionalField(
                                          field?.id,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                )}

                                {field.inputType === "Text area" && (
                                  <div className="w-full">
                                    <ReactQuill
                                      theme="snow"
                                      value={field?.value}
                                      className="prose [&_.ql-editor]:cursor-text [&_.ql-editor.ql-blank:before]:not-italic bg-white [&_.ql-container]:rounded-b [&_.ql-editor]:rounded-b"
                                      placeholder="Enter description here..."
                                      onChange={(value) =>
                                        handleUpdateAdditionalField(
                                          field?.id,
                                          value
                                        )
                                      }
                                    />
                                  </div>
                                )}

                                {field.inputType === "Divider" && (
                                  <div className="relative w-full text-center">
                                    <div className="w-full h-px mt-px bg-neutral-300/75"></div>
                                    <div className="absolute m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                      <div className="relative px-3 text-xs font-medium bg-white -top-px text-neutral-400">
                                        Divider
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <Tooltip title="Remove field">
                                  <Button
                                    type="text"
                                    icon={
                                      <svg
                                        fillRule="evenodd"
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
                            ) : (
                              <div className="flex-grow">
                                <div className="mt-4 mb-5 md:mt-5 md:mb-6">
                                  <div className="mb-2.5">
                                    <div className="flex items-center gap-2">
                                      <div className="font-medium">
                                        {field.label}
                                      </div>
                                      <Tag
                                        colour={
                                          mapGroupToColour[field.dataGroup]
                                        }
                                      >
                                        {field.dataGroup}
                                      </Tag>

                                      {field.dataGroup ===
                                        "Internal contact" && (
                                        <Tag colour="neutral">Hidden</Tag>
                                      )}
                                    </div>
                                    <div className="text-subtitle">
                                      {field.helpText}
                                    </div>
                                  </div>
                                  {field.inputType === "Text input" && (
                                    <div className="pointer-events-none">
                                      <Input
                                        className="w-72"
                                        placeholder="Enter here..."
                                      />
                                    </div>
                                  )}
                                  {field.inputType === "Dropdown" && (
                                    <Select
                                      className="pointer-events-none"
                                      style={{ width: 150 }}
                                      placeholder={`Select...`}
                                    >
                                      {field.options?.map((option) => (
                                        <Option key={option} value={option}>
                                          {option}
                                        </Option>
                                      ))}
                                    </Select>
                                  )}
                                  {field.inputType === "Text area" && (
                                    <div className="pointer-events-none">
                                      <TextArea
                                        rows={3}
                                        className="w-72"
                                        placeholder="Enter here..."
                                      />
                                    </div>
                                  )}
                                  {field.inputType === "Number" && (
                                    <div className="pointer-events-none">
                                      <InputNumber
                                        className="w-40"
                                        placeholder="Enter here..."
                                        onKeyPress={(event) => {
                                          if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                          }
                                        }}
                                      />
                                    </div>
                                  )}
                                  {field.inputType === "Radio" && (
                                    <div className="flex flex-col gap-0.5 -mt-0.5 pointer-events-none">
                                      {field.options?.map(
                                        (option, optionIndex) => (
                                          <Radio.Group key={optionIndex}>
                                            <Radio value={option}>
                                              {option}
                                            </Radio>
                                          </Radio.Group>
                                        )
                                      )}
                                    </div>
                                  )}
                                  {field.inputType === "Checkbox" && (
                                    <div className="flex flex-col gap-0.5 -mt-0.5 pointer-events-none">
                                      {field.options?.map(
                                        (option, optionIndex) => (
                                          <Checkbox.Group key={optionIndex}>
                                            <Checkbox value={option}>
                                              {option}
                                            </Checkbox>
                                          </Checkbox.Group>
                                        )
                                      )}
                                    </div>
                                  )}
                                  {field.inputType === "Date" && (
                                    <div className="pointer-events-none">
                                      <DatePicker className="w-40" />
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
                                        onClick={() =>
                                          openDrawer(field.id, field.dataGroup)
                                        }
                                      />
                                    </Tooltip>
                                    <Tooltip title="Remove field">
                                      <Button
                                        type="text"
                                        icon={
                                          <svg
                                            fillRule="evenodd"
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
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                  {formFields.length > 0 && (
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button
                        className="mt-1 mb-4"
                        type="primary"
                        icon={<PlusOutlined />}
                      >
                        Add
                      </Button>
                    </Dropdown>
                  )}
                </div>
              )}
            </Droppable>
          </Content>
        </Layout>
      </DragDropContext>

      {/* drawer to edit field */}
      <Drawer
        destroyOnClose
        title={`Edit ${
          formFields.find((field) => field.id === editFieldId)?.fieldName
        }`}
        placement="right"
        className={`${popConfirmVisible ? "dim" : ""}`}
        onClose={closeDrawer}
        open={isDrawerVisible}
        footer={
          <div className="flex">
            <Button
              onClick={() => editFormRef?.current?.submit()}
              type="primary"
            >
              Save
            </Button>
            <Button className="ml-3" onClick={closeDrawer}>
              Cancel
            </Button>
            <div className="ml-auto">
              <Tooltip title="Archive field" placement="left">
                <Popconfirm
                  icon={<WarningFilled className="text-danger-500" />}
                  title="Sure you want to archive this field?"
                  description="This will remove this field from all other forms."
                  onConfirm={() => {
                    if (editFieldId) {
                      deleteFieldCompletely(editFieldId);
                      closeDrawer();

                      message.success("Field archived");
                    }
                  }}
                  okText="Archive"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                  visible={popConfirmVisible}
                  onVisibleChange={setPopConfirmVisible}
                >
                  <Button
                    className="hover:text-danger-500 hover:border-danger-500"
                    icon={<DeleteOutlined />}
                  ></Button>
                </Popconfirm>
              </Tooltip>
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
          ref={editFormRef}
          form={form}
          layout="horizontal"
          initialValues={getInitialValues()}
          onFinish={onDrawerFormFinish}
          onFinishFailed={() => setIsFromSubmitted(true)}
          requiredMark={false}
          className="[&_.ant-form-item-label]:w-[68px] [&_.ant-form-item-label>label]:text-subtitle [&_.ant-form-item-label>label]:font-normal"
        >
          <Form.Item label="Group" className="!mb-4">
            <div>{isAddDrawerTitle}</div>
          </Form.Item>

          {editFieldId && (
            <Form.Item label="Type" className="!mb-4">
              <div className="flex items-center gap-2">
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Text input" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H576c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm184 32c9.5 0 18.1 5.6 21.9 14.3l64 144c5.4 12.1-.1 26.3-12.2 31.7s-26.3-.1-31.7-12.2l-4.3-9.7H146.3l-4.3 9.7c-5.4 12.1-19.6 17.6-31.7 12.2s-17.6-19.6-12.2-31.7l64-144c3.9-8.7 12.4-14.3 21.9-14.3zm0 83.1L167.6 280h32.8L184 243.1zM304 184c0-13.3 10.7-24 24-24h52c33.1 0 60 26.9 60 60c0 9.2-2.1 17.9-5.8 25.7c13.3 11 21.8 27.6 21.8 46.3c0 33.1-26.9 60-60 60H328c-13.3 0-24-10.7-24-24v-8V256 192v-8zm48 24v24h28c6.6 0 12-5.4 12-12s-5.4-12-12-12H352zm0 96h44c6.6 0 12-5.4 12-12s-5.4-12-12-12H380 352v24z"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Dropdown" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241L239 345c9.4 9.4 24.6 9.4 33.9 0L377 241c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87-87-87c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Text area" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Number" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M576 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H576zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm40 120c0 13.3 10.7 24 24 24h8v96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H184V184c0-13.3-10.7-24-24-24H128c-13.3 0-24 10.7-24 24zm190.6 30.4c5.7-8 17.5-8.6 24-1.2c5.2 5.9 5 14.7-.3 20.5l-72 78c-6.5 7-8.2 17.2-4.3 25.9s12.5 14.4 22 14.4h88c13.3 0 24-10.7 24-24s-10.7-24-24-24H318.8l34.8-37.7c22-23.8 22.4-60.3 1.1-84.7c-26.9-30.7-75.4-28.4-99.2 4.9l-11.1 15.6c-7.7 10.8-5.2 25.8 5.6 33.5s25.8 5.2 33.5-5.6l11.1-15.6z"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Radio" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M64 32a64 64 0 1 0 0 128A64 64 0 1 0 64 32zM184 72c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zM64 280a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm0-88a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM40 416a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Checkbox" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                )}
                {formFields.find((field) => field.id === editFieldId)
                  ?.inputType === "Date" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                    />
                  </svg>
                )}
                {
                  formFields.find((field) => field.id === editFieldId)
                    ?.inputType
                }
              </div>
            </Form.Item>
          )}

          {editFieldId && (
            <Form.Item label="Field name">
              <div>
                {
                  formFields.find((field) => field.id === editFieldId)
                    ?.fieldName
                }
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

          <Form.Item label="Help text" name="helpText">
            <Input />
          </Form.Item>

          {formFields.find((field) => field.id === editFieldId)?.inputType ===
            "Radio" ||
          formFields.find((field) => field.id === editFieldId)?.inputType ===
            "Checkbox" ||
          formFields.find((field) => field.id === editFieldId)?.inputType ===
            "Dropdown" ? (
            <Form.Item
              label="Options"
              name={"options"}
              dependencies={["inputType"]}
              className="!-mb-1"
              rules={[{ required: true, validator: optionValidatorEdit }]}
            >
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
                            innerRef:
                              | React.LegacyRef<HTMLDivElement>
                              | undefined;
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
                              tabIndex={-1}
                            >
                              <div className="flex items-center gap-2">
                                <HolderOutlined className="absolute left-0 z-20 w-8 h-8 pl-2 text-neutral-500" />
                                <Input
                                  placeholder="Enter option..."
                                  value={option.value}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      option.id,
                                      e.target.value
                                    )
                                  }
                                  className="flex-grow pl-8 remove-validation-style"
                                />
                                <Tooltip title="Delete" className="shrink-0">
                                  <Button
                                    type="text"
                                    className="hover:bg-danger-50 hover:text-danger-600"
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                      handleDeleteOption(option.id)
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
            </Form.Item>
          ) : null}
          {formFields.find((field) => field.id === editFieldId)?.inputType ===
            "Radio" ||
          formFields.find((field) => field.id === editFieldId)?.inputType ===
            "Checkbox" ||
          formFields.find((field) => field.id === editFieldId)?.inputType ===
            "Dropdown" ? (
            <div>
              <Button
                type="link"
                className={`px-0 ml-[90px]`}
                icon={<PlusOutlined />}
                onClick={handleAddOption}
              >
                Add new option
              </Button>
            </div>
          ) : null}
          {editFieldId &&
            formFields.find((field) => field.id === editFieldId)?.inputType ===
              "Date" && (
              <Form.Item
                label="Range"
                name="dateRange"
                rules={[
                  { required: false, message: "Please enter a date range" },
                ]}
                extra="To restrict the dates that can be selected set a start and end date."
              >
                <RangePicker className="w-full" />
              </Form.Item>
            )}
        </Form>
      </Drawer>

      {/* drawer to add new field */}
      <Drawer
        destroyOnClose
        title={`Create ${isAddDrawerTitle.toLocaleLowerCase()} field`}
        placement="right"
        onClose={closeAddDrawer}
        open={isAddDrawerVisible}
        footer={
          <div className="flex justify-between">
            <div className="flex items-center flex-grow">
              <Button
                onClick={() => addFormRef.current.submit()}
                type="primary"
              >
                Add
              </Button>
              <Button className="ml-3" onClick={closeAddDrawer}>
                Cancel
              </Button>
            </div>
          </div>
        }
      >
        <Form
          ref={addFormRef}
          form={form}
          layout="horizontal"
          initialValues={getInitialValues()}
          onFinish={onDrawerAddFormFinish}
          onFinishFailed={() => setIsFromSubmitted(true)}
          requiredMark={false}
          className="[&_.ant-form-item-label]:w-[68px] [&_.ant-form-item-label>label]:text-subtitle [&_.ant-form-item-label>label]:font-normal"
        >
          <Form.Item label="Group">
            <div>{isAddDrawerTitle}</div>
          </Form.Item>

          <Form.Item
            name="inputType"
            label={
              <div className="flex items-center gap-1.5">
                <div>Type</div>
                <Tooltip
                  rootClassName="pointer-events-auto"
                  className="text-neutral-400 hover:text-neutral-500"
                  title={
                    <span>
                      Select how you want to capture information. Visit our{" "}
                      <a
                        href="https://www.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline hover:text-primary-300"
                      >
                        help guide
                      </a>{" "}
                      for more information.
                    </span>
                  }
                >
                  <InfoCircleOutlined className="mt-px" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please select a field type" }]}
          >
            <Select
              onChange={handleInputTypeChange}
              placeholder="Select a field type..."
              className="[&_.ant-select-selection-item_*]:contents [&_.ant-select-selection-item_.text-subtitle]:hidden [&_.ant-select-selection-item_svg]:hidden"
              virtual={false}
              listHeight={350}
            >
              <Option value="Text input">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H576c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm184 32c9.5 0 18.1 5.6 21.9 14.3l64 144c5.4 12.1-.1 26.3-12.2 31.7s-26.3-.1-31.7-12.2l-4.3-9.7H146.3l-4.3 9.7c-5.4 12.1-19.6 17.6-31.7 12.2s-17.6-19.6-12.2-31.7l64-144c3.9-8.7 12.4-14.3 21.9-14.3zm0 83.1L167.6 280h32.8L184 243.1zM304 184c0-13.3 10.7-24 24-24h52c33.1 0 60 26.9 60 60c0 9.2-2.1 17.9-5.8 25.7c13.3 11 21.8 27.6 21.8 46.3c0 33.1-26.9 60-60 60H328c-13.3 0-24-10.7-24-24v-8V256 192v-8zm48 24v24h28c6.6 0 12-5.4 12-12s-5.4-12-12-12H352zm0 96h44c6.6 0 12-5.4 12-12s-5.4-12-12-12H380 352v24z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Text input</div>
                    <div className="text-sm text-subtitle">
                      Short text answer
                    </div>
                  </div>
                </div>
              </Option>
              <Option value="Text area">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Text area</div>
                    <div className="text-sm text-subtitle">
                      Long text answer
                    </div>
                  </div>
                </div>
              </Option>
              <Option value="Number">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M576 112c8.8 0 16 7.2 16 16V384c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H576zM64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm40 120c0 13.3 10.7 24 24 24h8v96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H184V184c0-13.3-10.7-24-24-24H128c-13.3 0-24 10.7-24 24zm190.6 30.4c5.7-8 17.5-8.6 24-1.2c5.2 5.9 5 14.7-.3 20.5l-72 78c-6.5 7-8.2 17.2-4.3 25.9s12.5 14.4 22 14.4h88c13.3 0 24-10.7 24-24s-10.7-24-24-24H318.8l34.8-37.7c22-23.8 22.4-60.3 1.1-84.7c-26.9-30.7-75.4-28.4-99.2 4.9l-11.1 15.6c-7.7 10.8-5.2 25.8 5.6 33.5s25.8 5.2 33.5-5.6l11.1-15.6z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Number</div>
                    <div className="text-sm text-subtitle">
                      Only allows a number input
                    </div>
                  </div>
                </div>
              </Option>
              <Option value="Dropdown">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241L239 345c9.4 9.4 24.6 9.4 33.9 0L377 241c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87-87-87c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Dropdown</div>
                    <div className="text-sm text-subtitle">
                      Single selection menu
                    </div>
                  </div>
                </div>
              </Option>
              <Option value="Radio">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M64 32a64 64 0 1 0 0 128A64 64 0 1 0 64 32zM184 72c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H184zM64 280a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm0-88a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM40 416a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Radio</div>
                    <div className="text-sm text-subtitle">Multiple choice</div>
                  </div>
                </div>
              </Option>
              <Option value="Checkbox">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Checkbox</div>
                    <div className="text-sm text-subtitle">
                      Select one or multiple options
                    </div>
                  </div>
                </div>
              </Option>
              <Option value="Date">
                <div className="flex items-center gap-4 leading-tight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 text-neutral-400 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                    />
                  </svg>
                  <div className="space-y-0.5">
                    <div>Date</div>
                    <div className="text-sm text-subtitle">Select a date</div>
                  </div>
                </div>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: "Please enter a field label" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Help text" name="helpText">
            <Input />
          </Form.Item>

          {newInputType === "Dropdown" ||
          newInputType === "Radio" ||
          newInputType === "Checkbox" ? (
            <Form.Item
              label="Options"
              name={"options"}
              dependencies={["inputType"]}
              rules={[{ required: true, validator: optionValidator }]}
              className="!-mb-1"
            >
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
                            innerRef:
                              | React.LegacyRef<HTMLDivElement>
                              | undefined;
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
                              tabIndex={-1}
                            >
                              <div className="flex items-center gap-2">
                                <HolderOutlined className="absolute left-0 z-20 w-8 h-8 pl-2 text-neutral-500" />
                                <Input
                                  placeholder="Enter option..."
                                  value={option.value}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      option.id,
                                      e.target.value
                                    )
                                  }
                                  className="flex-grow pl-8 remove-validation-style"
                                />
                                <Tooltip title="Delete" className="shrink-0">
                                  <Button
                                    type="text"
                                    className="hover:bg-danger-50 hover:text-danger-600"
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                      handleDeleteOption(option.id)
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
            </Form.Item>
          ) : (
            ""
          )}

          {newInputType === "Dropdown" ||
          newInputType === "Radio" ||
          newInputType === "Checkbox" ? (
            <div>
              <Button
                type="link"
                className={`px-0 ml-[90px]`}
                icon={<PlusOutlined />}
                onClick={handleAddOption}
              >
                Add new option
              </Button>
            </div>
          ) : null}

          {newInputType === "Date" && (
            <Form.Item
              label="Range"
              name="dateRange"
              extra="To restrict the dates that can be selected set a start and end date."
            >
              <RangePicker />
            </Form.Item>
          )}
        </Form>
      </Drawer>
      <Modal
        title={formName}
        visible={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
        footer={null}
        width={450}
      >
        <FormPreview fields={formFields} description={formDescription} />
      </Modal>
    </div>
  );
};

export default FormBuilder;
