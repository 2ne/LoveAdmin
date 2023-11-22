import React, { FC, useMemo, useState, useRef } from "react";
import {
  Modal,
  Button,
  Select,
  Popconfirm,
  message,
  Drawer,
  Tooltip,
} from "antd";
import { HolderOutlined, WarningFilled } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";
import { defaultTransition } from "./framer-motion-custom";

const { Option } = Select;

interface TableManageColumnsProps {
  open: boolean;
  onClose: () => void;
}

type AvailableColumns = {
  [key in string]: string;
};

const defaultColumns = [
  { id: "name", title: "Name", enabled: true },
  { id: "email", title: "Email", enabled: true },
  { id: "address", title: "Address", enabled: true },
  { id: "town", title: "Town", enabled: true },
  { id: "accountOwner", title: "Account owner", enabled: true },
  { id: "group", title: "Group", enabled: true },
];

const defaultAvailableColumns = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  banned: "Banned",
  dob: "Date of birth",
  age: "Age",
  address: "Address",
  town: "Town",
  county: "County",
  postCode: "Post code",
  country: "Country",
  roles: "Roles",
  invitationStatus: "Invitation status",
  accountOwner: "Account owner",
  ownerEmail: "Owner email",
  ownerPhone: "Owner phone",
  ownerVerified: "Owner verified",
  medical: "Medical",
  medicalNotes: "Medical notes",
  groups: "Groups",
  activeMandates: "Active mandates",
  contactSince: "Contact since",
  proofOfAge: "Proof of age",
  organisationIdentificationImage: "Organisation identification image",
  other: "Other",
  consents: "Consents",
  covid: "Covid",
  gdpr: "GDPR",
  photography: "Photography",
  socialMediaPolicy: "Social media policy",
  returnEquipment: "Return equipment",
  accessToMedicalInformation: "Access to medical information",
  termsAndConditions: "Terms and conditions",
  firstAid: "First aid",
  respectCode: "Respect code",
  myShinyNewConsent: "My shiny new consent",
  dataImport: "Data import",
  importTags: "Import tags",
};

const TableManageColumns: FC<TableManageColumnsProps> = ({ open, onClose }) => {
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);
  const [columns, setColumns] = useState(defaultColumns);
  const [availableColumns, setAvailableColumns] = useState<AvailableColumns>(
    defaultAvailableColumns
  );

  const onDragEnd = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumns(items);
  };

  const handleRemove = (id: string) => {
    // Find the removed column
    const removedColumn = columns.find((column) => column.id === id);

    // Ensure that the removed column is defined
    if (removedColumn) {
      // Update the availableColumns to include the removed column
      setAvailableColumns({
        ...availableColumns,
        [id]: removedColumn.title,
      });
    }

    // Filter out the removed column from the columns array
    setColumns(columns.filter((column) => column.id !== id));
  };

  const selectRef = useRef<any>(null);

  const handleAdd = (value: keyof AvailableColumns) => {
    const newColumn = {
      id: value,
      title: availableColumns[value],
      enabled: true,
    };
    setColumns([...columns, newColumn]);
    const { [value]: removed, ...rest } = availableColumns;
    setAvailableColumns(rest);

    // Blur the focus of the Select component
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const availableOptions = Object.keys(availableColumns).filter(
    (key) => !columns.some((column) => column.id === key)
  );

  const handleResetColumns = () => {
    setColumns(defaultColumns);
    setAvailableColumns(defaultAvailableColumns);
  };

  const onOk = () => {
    onClose();
    message.success("Columns updated");
  };

  const onCancel = () => {
    onClose();
  };

  const itemVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto", transition: defaultTransition },
    exit: { opacity: 0, height: 0, transition: defaultTransition },
  };

  // Function to compare current columns with default columns
  const hasColumnsChanged = useMemo(() => {
    if (columns.length !== defaultColumns.length) {
      return true;
    }
    return columns.some(
      (column, index) => column.id !== defaultColumns[index].id
    );
  }, [columns]);

  const resetColumnsConfirm = () => {
    handleResetColumns();
  };

  const resetColumnsCancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <Drawer
      title="Manage columns"
      open={open}
      maskClosable={!hasColumnsChanged}
      onClose={onCancel}
      className={`${popConfirmVisible ? "dim" : ""}`}
      footer={
        <div className="flex justify-between">
          <div className="flex items-center flex-grow">
            <Tooltip title={!hasColumnsChanged ? "No changes" : ""}>
              <Button
                disabled={!hasColumnsChanged}
                key="submit"
                type="primary"
                onClick={hasColumnsChanged ? onOk : undefined}
              >
                Update
              </Button>
            </Tooltip>
            <Button onClick={onCancel} className="ml-3">
              Cancel
            </Button>
          </div>
          <div
            className={`transition-opacity 
              ${!hasColumnsChanged ? "pointer-events-none opacity-0" : ""}
            `}
          >
            <Popconfirm
              icon={<WarningFilled className="text-danger-500" />}
              title="Reset columns"
              description="Are you sure you want to reset columns back to system default?"
              onConfirm={resetColumnsConfirm}
              onCancel={resetColumnsCancel}
              okText="Reset"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              visible={popConfirmVisible}
              onVisibleChange={setPopConfirmVisible}
              placement="topLeft"
            >
              <Button
                type="link"
                className="text-neutral-600 hover:text-danger-500 !px-0"
                key="reset"
              >
                Reset columns
              </Button>
            </Popconfirm>
          </div>
        </div>
      }
    >
      <div className="mb-7">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns">
            {(provided: {
              droppableProps: JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLDivElement> &
                React.HTMLAttributes<HTMLDivElement>;
              innerRef: React.LegacyRef<HTMLDivElement> | undefined;
              placeholder:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="rounded relative before:pointer-events-none before:[background-image:repeating-linear-gradient(rgb(241_245_249_/_0.75),rgb(241_245_249_/_0.75)_38px,white_39px,white_40px)] before:absolute before:inset-0 before:bottom-0.5 before:rounded select-none"
              >
                <AnimatePresence initial={false}>
                  {columns.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                    >
                      {(provided) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          variants={itemVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <div className="relative flex items-center justify-between p-2 rounded group">
                            <span className="flex items-center">
                              <HolderOutlined className="mr-3 text-neutral-400 group-hover:text-neutral-600" />
                              {column.title}
                            </span>
                            <Button
                              type="text"
                              className="text-neutral-400 hover:text-neutral-600"
                              icon={
                                <svg
                                  fillRule="evenodd"
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="close"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  className="w-3 h-3"
                                >
                                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                                </svg>
                              }
                              size="small"
                              onClick={() => handleRemove(column.id)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {availableOptions.length > 0 && (
          <div className="mt-4">
            <Select
              className="w-full text-center [&_.ant-select-selection-item]:text-neutral-900 [&.ant-select-open_.ant-select-selection-item]:!text-primary-500 [&:hover_.ant-select-selection-item]:!text-primary-500"
              onSelect={handleAdd}
              ref={selectRef}
              value="＋ Add column"
              suffixIcon={null}
              dropdownRender={(menu) => <React.Fragment>{menu}</React.Fragment>}
            >
              {availableOptions.map((key) => (
                <Option key={key} value={key}>
                  {availableColumns[key]}
                </Option>
              ))}
            </Select>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default TableManageColumns;
