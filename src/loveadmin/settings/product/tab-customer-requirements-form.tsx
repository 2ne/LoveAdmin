import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Checkbox,
  Button,
  Tooltip,
  Modal,
  message,
  Radio,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import {
  CheckCircleFilled,
  CompassOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

interface RegistrationForm {
  key: string;
  name: string;
  required: boolean;
}

const initialFormData: RegistrationForm[] = [
  {
    key: "1",
    name: "Adult Registration Form",
    required: false,
  },
  {
    key: "2",
    name: "Child Registration Form",
    required: true,
  },
  {
    key: "3",
    name: "Birthday Parties Form",
    required: false,
  },
  {
    key: "4",
    name: "Standard Class Registration Form",
    required: false,
  },
];

const CustomerFormsComponent: React.FC = () => {
  const [forms, setForms] = useState<RegistrationForm[]>(initialFormData);
  const [isChanged, setIsChanged] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [popConfirmOpen, setPopConfirmOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const initialFormStateRef = useRef(initialFormData);
  const initialRequiredCountRef = useRef(
    initialFormData.filter((form) => form.required).length
  );

  useEffect(() => {
    setIsChanged(
      forms.some(
        (form, index) =>
          form.required !== initialFormStateRef.current[index].required
      )
    );
  }, [forms]);

  const toggleRequiredStatus = (checked: boolean, form: RegistrationForm) => {
    const updatedForms = forms.map((f) =>
      f.key === form.key ? { ...f, required: checked } : f
    );
    setForms(updatedForms);
  };

  const closeChangeModal = () => {
    setSelectedOption("");
    setPopConfirmOpen(false);
    setShowChangeModal(false);
  };

  const handleSaveClick = () => {
    const currentRequiredCount = forms.filter((form) => form.required).length;
    if (currentRequiredCount > initialRequiredCountRef.current) {
      setShowChangeModal(true);
    } else {
      confirmSave();
    }
  };

  const confirmSave = () => {
    setSelectedOption("");
    setPopConfirmOpen(false);
    setIsChanged(false);
    setShowChangeModal(false);
    // Update the initial form state reference to the current state
    initialFormStateRef.current = [...forms];

    // Update the initial required count reference to the current count
    initialRequiredCountRef.current = forms.filter(
      (form) => form.required
    ).length;

    message.success("Forms updated");
  };

  const getNewRequiredForms = () => {
    return forms
      .filter(
        (form) =>
          form.required &&
          !initialFormStateRef.current.some(
            (initialForm) =>
              initialForm.key === form.key && initialForm.required
          )
      )
      .map((form) => form.name);
  };

  const columns: ColumnsType<RegistrationForm> = [
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
      width: 100,
      render: (_, form) => (
        <Checkbox
          checked={form.required}
          onChange={(e) => toggleRequiredStatus(e.target.checked, form)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <div className="-mt-1 space-y-6">
        <div className="flex items-center gap-4">
          <div>
            <Title level={5} className="mb-0.5">
              Forms
            </Title>
            <div className="text-subtitle">
              Select the forms would you like people to complete when purchasing
              this product.
            </div>
          </div>
          <Tooltip title="View history" className="ml-auto shrink-0">
            <Button size="small" icon={<CompassOutlined />} />
          </Tooltip>
        </div>
        <Table
          size="small"
          dataSource={forms}
          columns={columns}
          pagination={false}
          className="overflow-hidden border rounded-md border-neutral-200/75 [&_th:first-child]:rounded-tl [&_th:last-child]:rounded-tr [&_th:first-child]:pl-3 [&_td:first-child]:pl-3 [&_tr:last-child_td]:border-0"
        />
        <Tooltip title={!isChanged ? "No changes" : ""}>
          <Button
            onClick={isChanged ? handleSaveClick : undefined}
            type="primary"
            disabled={!isChanged}
          >
            Save
          </Button>
        </Tooltip>
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2.5 -mt-px">
            <InfoCircleOutlined className="mt-px text-lg text-primary-500" />
            <div>Customer requirement changes</div>
          </div>
        }
        open={showChangeModal}
        onOk={confirmSave}
        okText="Confirm"
        onCancel={closeChangeModal}
        className={`${popConfirmOpen ? "dim" : ""} w-[28rem]`}
        destroyOnClose={true}
        footer={
          <div className="flex justify-end">
            <Button onClick={closeChangeModal}>Cancel</Button>
            {!selectedOption ? (
              <Tooltip title="Select a renewal option">
                <Button
                  className="ml-3"
                  type="primary"
                  disabled={!selectedOption}
                >
                  Confirm
                </Button>
              </Tooltip>
            ) : (
              <Popconfirm
                icon={<CheckCircleFilled className="text-primary-500" />}
                title="Confirm requirement changes"
                description={
                  <>
                    Are you sure you want to{" "}
                    <span className="lowercase ">{selectedOption}</span> for 20
                    customers?
                  </>
                }
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={confirmSave}
                open={popConfirmOpen}
                onOpenChange={setPopConfirmOpen}
              >
                <Button type="primary">Confirm</Button>
              </Popconfirm>
            )}
          </div>
        }
      >
        <div className="mb-5">
          {getNewRequiredForms().length < 2 ? (
            <div className="mb-5 space-y-2">
              <p>
                {getNewRequiredForms().map((name) => (
                  <span key={name} className="font-medium">
                    {name}{" "}
                  </span>
                ))}
                will need to be completed by existing customers. They will be
                notified by email and when logging into JoinIn.
              </p>
            </div>
          ) : (
            <div className="mb-5 space-y-2">
              <div>
                The following forms will now be required by existing customers
                upon renewal:
              </div>
              <ul className="list-disc list-inside space-y-px ml-0.5">
                {getNewRequiredForms().map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="pt-5 border-t border-neutral-200 space-y-0.5">
            <div className="font-medium text-title">Renewal options</div>
            <div className="text-subtitle">
              Select how to handle renewals for existing customers.
            </div>
          </div>
          <Radio.Group
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
            className="mt-3 space-y-2.5"
          >
            <Radio
              value="Pause renewals"
              className="border border-neutral-200 rounded-md px-3 pt-2 pb-3 m-0 [&_.ant-radio]:self-start [&_.ant-radio]:mt-1.5"
            >
              <div className="ml-1 space-y-1">
                <div className="mt-0.5 font-medium">Pause renewals</div>
                <p className="text-subtitle [text-wrap:pretty;]">
                  Existing customers won't be able to renew until they complete
                  the new requirements.
                </p>
              </div>
            </Radio>
            <Radio
              value="Force renewals"
              className="border border-neutral-200 rounded-md px-3 pt-2 pb-3 m-0 [&_.ant-radio]:self-start [&_.ant-radio]:mt-1.5"
            >
              <div className="ml-1 space-y-1">
                <div className="mt-0.5 font-medium">Force renewals</div>
                <p className="text-subtitle [text-wrap:pretty;]">
                  Customers who have not completed the new requirements will
                  still renew.
                </p>
              </div>
            </Radio>
          </Radio.Group>
        </div>
      </Modal>
    </>
  );
};

export default CustomerFormsComponent;
