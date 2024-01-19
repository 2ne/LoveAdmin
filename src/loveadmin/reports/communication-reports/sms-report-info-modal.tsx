import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Tooltip, Input, Dropdown } from "antd";
import Tag, { Colours } from "../../../components/tag";
import { formatDate } from "../../../components/date-formatter";
import {
  SMSReportType,
  PresetTypes,
  ContactDetails,
  notSentReasonDescriptions,
} from "./sms-report";
import TableActions from "../../../components/table-actions";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MobileOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableTitle from "../../../components/table-title";
import TableFooter from "../../../components/table-footer";

interface SMSReportInfoModalProps {
  visible: boolean;
  closeModal: () => void;
  handleCancel: () => void;
  modalData: SMSReportType | null;
  activePresetType: PresetTypes;
}

const statusTitles = {
  Invalid: "Invalid contacts",
  Delivered: "SMS delivered",
  Failed: "SMS failed",
} as Record<string, string | undefined>;

const statusDescriptions = {
  Invalid: "Contacts who could not be sent SMS, reasons listed below.",
  Delivered: "Contacts who have been sent the SMS",
  Failed: "Contacts where SMS provider failed",
} as Record<string, string | undefined>;

const SMSReportInfoModal: React.FC<SMSReportInfoModalProps> = ({
  visible,
  closeModal,
  handleCancel,
  modalData,
  activePresetType,
}) => {
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const filteredAndMappedRecipients = modalData?.contacts
      .filter((recipient) => {
        if (activePresetType === null) return true;
        return recipient.status === activePresetType;
      })
      .map((recipient, index) => ({
        ...recipient,
        key: index.toString(),
      }));

    setTotalRecords(filteredAndMappedRecipients?.length || 0);
  }, [modalData, activePresetType]);

  const dataSource = modalData?.contacts
    .filter((recipient) => {
      if (activePresetType === null) return true;
      return recipient.status === activePresetType;
    })
    .map((recipient, index) => ({
      ...recipient,
      key: index.toString(),
    }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const onSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys as string[]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleSelectAll = () => {
    if (dataSource) {
      const allRowKeys = dataSource.map((item) => item.key);
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };
  const handleUnselectAll = () => {
    setSelectedRowKeys([]);
  };

  const actionItems = [
    {
      key: "1",
      label: "Send email",
      icon: <MailOutlined className="text-neutral-500" />,
    },
    {
      key: "2",
      label: "Send SMS",
      icon: <MobileOutlined className="text-neutral-500" />,
    },
    {
      key: "3",
      type: "divider",
    },
    {
      key: "4",
      label: "Resend SMS",
      icon: <RedoOutlined className="text-neutral-500" />,
    },
  ];

  const baseColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <a className="link">{name}</a>,
    },
    {
      title: "Mobile number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (mobileNumber: string | undefined) =>
        mobileNumber && mobileNumber.length > 0 ? (
          <span>{mobileNumber}</span>
        ) : (
          <div className="text-subtitle-light">-</div>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters:
        activePresetType === null
          ? [
              { text: "Sending", value: "Sending" },
              { text: "Delivered", value: "Delivered" },
              { text: "Invalid", value: "Invalid" },
              { text: "Failed", value: "Failed" },
            ]
          : undefined,
      onFilter: (value: string | number | boolean, record: ContactDetails) => {
        if (typeof value === "string") {
          return record.status === value;
        }
        return false;
      },
      render: (status: PresetTypes, record: ContactDetails) => {
        const mapStatusToColour: Record<NonNullable<PresetTypes>, Colours> = {
          Sending: "primary",
          Delivered: "success",
          Invalid: "neutral",
          Failed: "danger",
        };

        const reasonDescription = record.notSentReason
          ? notSentReasonDescriptions[record.notSentReason]
          : null;

        return status ? (
          status === "Invalid" && reasonDescription ? (
            <Tooltip
              title={
                <div>
                  <span className="font-medium">{reasonDescription.title}</span>
                  <span className="mx-1.5">·</span>
                  <span>{reasonDescription.description}</span>
                </div>
              }
            >
              <div className="inline-flex">
                <Tag colour={mapStatusToColour[status]}>{status}</Tag>
              </div>
            </Tooltip>
          ) : (
            <Tag colour={mapStatusToColour[status]}>{status}</Tag>
          )
        ) : null;
      },
    },
  ];

  const additionalColumns = [];

  if (activePresetType === "Invalid") {
    additionalColumns.push({
      title: "Reason",
      dataIndex: "notSentReason",
      key: "notSentReason",
      filters: Object.keys(notSentReasonDescriptions).map((reasonKey) => ({
        text: notSentReasonDescriptions[
          reasonKey as keyof typeof notSentReasonDescriptions
        ].title,
        value: reasonKey,
      })),
      onFilter: (value: string | number | boolean, record: ContactDetails) => {
        if (typeof value === "string") {
          return record.notSentReason === value;
        }
        return false;
      },
      render: (reasonKey: keyof typeof notSentReasonDescriptions) => {
        const reason = notSentReasonDescriptions[reasonKey];
        if (reason) {
          return (
            <Tooltip
              title={reason.description}
              className="inline-flex items-center gap-1.5"
            >
              <span>{reason.title}</span>
              <InfoCircleOutlined className="mt-px text-neutral-500" />
            </Tooltip>
          );
        }
        return null;
      },
    });
  } else if (activePresetType !== "Failed") {
    additionalColumns.push({
      title: "Delivered",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      align: "right" as const,

      render: (deliveryDate: Date | undefined) =>
        deliveryDate ? (
          <div className="text-subtitle">
            {formatDate(deliveryDate, "full")}
          </div>
        ) : (
          ""
        ),
    });
  }

  const columns = [...baseColumns, ...additionalColumns];

  columns.push({
    title: "Actions",
    dataIndex: "",
    key: "action",
    align: "right",
    render: () => (
      <Dropdown
        menu={{ items: actionItems }}
        trigger={["click"]}
        rootClassName="w-40"
      >
        <Button
          className="absolute right-[3px] top-[4px]"
          type="text"
          icon={<EllipsisOutlined className="rotate-90 text-neutral-600" />}
          onClick={(e) => e.preventDefault()}
        ></Button>
      </Dropdown>
    ),
  });

  return (
    <Modal
      title={
        <>
          <div className="flex items-center gap-2">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="rounded-full shrink-0"
              onClick={handleCancel}
            />
            <div className="-mt-1.5">
              <TableTitle
                title={
                  activePresetType === null
                    ? "Total contacts"
                    : statusTitles[activePresetType]
                }
                totalRecords={totalRecords}
                onSelectAll={handleSelectAll}
                onUnselectAll={handleUnselectAll}
                selectedRowKeysLength={selectedRowKeys.length}
              />
            </div>
            <div className="ml-auto font-normal">
              <Input
                className="w-[15rem]"
                placeholder="Search name, mobile number..."
                prefix={<SearchOutlined className="mr-1" />}
              />
            </div>
          </div>
          <Tooltip title={modalData?.message}>
            <div className="ml-[2.65rem] -mt-0.5 text-sm font-normal truncate text-subtitle max-w-[42vw]">
              {modalData?.message}
            </div>
          </Tooltip>
        </>
      }
      visible={visible}
      onCancel={closeModal}
      footer={null}
      wrapClassName="[&_.ant-modal-content]:rounded-none [&_.ant-modal-content]:min-h-screen [&>*]:w-full [&>*]:max-w-full"
      centered
      closeIcon={null}
    >
      {modalData && (
        <div className="relative">
          <TableActions isVisible={selectedRowKeys.length > 0}>
            <div className="flex items-center gap-3 -ml-0.5">
              <Button
                size="small"
                type="text"
                className="px-0 hover:bg-transparent hover:underline"
              >
                <div className="flex items-center gap-1.5">
                  <MailOutlined className="text-neutral-600" />
                  <span className="font-medium">Send email</span>
                </div>
              </Button>
              <Button
                size="small"
                type="text"
                className="px-0 hover:bg-transparent hover:underline"
              >
                <div className="flex items-center gap-1.5">
                  <MobileOutlined className="text-neutral-600" />
                  <span className="font-medium">Send SMS</span>
                </div>
              </Button>
            </div>
            <div className="text-neutral-400">|</div>
            <div className="flex items-center gap-3">
              <Button
                size="small"
                type="text"
                className="px-0 hover:bg-transparent hover:underline"
              >
                <div className="flex items-center gap-1.5">
                  <RedoOutlined className="text-neutral-600" />
                  <span className="font-medium">Resend SMS</span>
                </div>
              </Button>
            </div>
            <div className="text-neutral-400">|</div>
            <Button
              size="small"
              type="text"
              className="px-0 hover:bg-transparent hover:underline"
            >
              <div className="flex items-center gap-1.5">
                <DownloadOutlined className="text-neutral-600" />
                <span className="font-medium">Export</span>
              </div>
            </Button>
          </TableActions>
          <Table
            rowKey="key"
            size="small"
            pagination={false}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      )}
      <TableFooter hideManageColumns={true} />
    </Modal>
  );
};

export default SMSReportInfoModal;
