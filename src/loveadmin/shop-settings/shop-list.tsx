import React, { useState } from "react";
import { Button, List, Modal, Popconfirm, Tooltip, message } from "antd";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  HolderOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";
import {
  ButtonColourSettings,
  PrimaryColourSettings,
  SecondaryColourSettings,
} from "./shop-colours";
import {
  ClassFinderNavigationSettings,
  EventsNavigationSettings,
  MembershipsNavigationSettings,
  ShopNavigationSettings,
  CalendarNavigationSettings,
} from "./shop-navigation";
import { AboutSettings } from "./shop-about";
import { BannerSettings } from "./shop-banner";
import { TileSettings } from "./shop-tile";

export interface ShopListItem {
  id: string;
  content: string;
  type: "colour" | "navigation" | "about" | "banner" | "tile";
  hidden?: boolean;
}

interface ShopListProps {
  items: ShopListItem[];
  isDraggable?: boolean;
}

const ShopList: React.FC<ShopListProps> = ({ items, isDraggable = true }) => {
  const [originalData, setOriginalData] = useState(items);
  const [data, setData] = useState(items);
  const [visible, setVisible] = useState(false);
  const [popConfirmVisible, setPopConfirmVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<
    "colour" | "navigation" | "about" | "banner" | "tile" | null
  >(null);

  const showModal = (
    item: string,
    type: "colour" | "navigation" | "about" | "banner" | "tile"
  ) => {
    setSelectedItem(item);
    setSelectedType(type);
    setVisible(true);
  };

  const capitaliseFirstLetter = (string: string | null) => {
    if (string === null) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data);
    const [removed] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, removed);

    const hasOrderChanged = !originalData.every(
      (item, index) => item.id === reorderedData[index].id
    );

    if (hasOrderChanged) {
      setData(reorderedData);
    }
  };

  const handleCancel = () => {
    setData(originalData);
  };

  const handleSave = () => {
    setOriginalData(data);
    message.success(`Shop updated`);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleModalOk = () => {
    message.success(`Shop updated`);
    setVisible(false);
  };

  const deleteConfirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setVisible(false);
    const capitalisedType = capitaliseFirstLetter(selectedType);
    message.success(`${capitalisedType} deleted`);
  };

  const deleteCancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <>
      <DragDropContext onDragEnd={isDraggable ? handleDragEnd : undefined}>
        <Droppable droppableId="droppable" isDropDisabled={!isDraggable}>
          {(provided: DroppableProvided) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <List
                  dataSource={data}
                  renderItem={(item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={!isDraggable}
                    >
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <List.Item className="py-1">
                            <List.Item.Meta
                              avatar={
                                <>
                                  {isDraggable && (
                                    <div {...provided.dragHandleProps}>
                                      <HolderOutlined className="text-neutral-400" />
                                    </div>
                                  )}
                                </>
                              }
                              title={
                                <div className="flex">
                                  <a
                                    className="block truncate transition-none text-title hover:text-primary-600"
                                    onClick={() =>
                                      showModal(item.content, item.type)
                                    }
                                  >
                                    {item.content}
                                  </a>
                                  {item.hidden && (
                                    <Tooltip
                                      title="Item hidden"
                                      placement="right"
                                    >
                                      <EyeInvisibleOutlined className="ml-2 text-neutral-400" />
                                    </Tooltip>
                                  )}
                                </div>
                              }
                            />
                          </List.Item>
                        </div>
                      )}
                    </Draggable>
                  )}
                />
                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
      <Modal
        title={`${selectedItem} ${selectedType}`}
        visible={visible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        okText="Save"
        maskClosable={false}
        className={`max-w-sm ${popConfirmVisible ? "dim" : ""}`}
        footer={[
          <div className="flex justify-between" key="modal-footer">
            {(selectedType === "banner" || selectedType === "tile") && (
              <Popconfirm
                icon={<WarningFilled className="text-danger-500" />}
                title={`Delete ${selectedType}`}
                description={`Are you sure to delete this ${selectedType}?`}
                onConfirm={deleteConfirm}
                onCancel={deleteCancel}
                okText="Delete"
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
            )}
            <div className="ml-auto">
              <Button key="cancel" onClick={handleModalCancel}>
                Cancel
              </Button>
              <Button type="primary" key="update" onClick={handleModalOk}>
                Save
              </Button>
            </div>
          </div>,
        ]}
      >
        {selectedType === "colour" && (
          <div>
            {selectedItem === "Primary" && <PrimaryColourSettings />}
            {selectedItem === "Secondary" && <SecondaryColourSettings />}
            {selectedItem === "Button / Links" && <ButtonColourSettings />}
          </div>
        )}
        {selectedType === "navigation" && (
          <div>
            {selectedItem === "Timetable" && <CalendarNavigationSettings />}
            {selectedItem === "Events" && <EventsNavigationSettings />}
            {selectedItem === "Memberships" && (
              <MembershipsNavigationSettings />
            )}
            {selectedItem === "Shop" && <ShopNavigationSettings />}
            {selectedItem === "Class Finder" && (
              <ClassFinderNavigationSettings />
            )}
          </div>
        )}
        {selectedType === "about" && <AboutSettings />}
        {selectedType === "banner" && (
          <BannerSettings selectedItem={selectedItem} />
        )}
        {selectedType === "tile" && (
          <TileSettings selectedItem={selectedItem} />
        )}
      </Modal>
    </>
  );
};

export default ShopList;
