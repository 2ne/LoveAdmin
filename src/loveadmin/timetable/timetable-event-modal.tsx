import { Modal, Tooltip } from "antd";
import { BgColour, TimetableEvent, bgColourClasses } from "./events";
import dayjs from "dayjs";

interface TimetableEventModalProps {
  event: TimetableEvent | null;
  isVisible: boolean;
  handleOk: () => void;
  onClose: () => void;
}

const TimetableEventModal: React.FC<TimetableEventModalProps> = ({
  event,
  isVisible,
  handleOk,
  onClose,
}) => {
  const formatEventTimes = (
    start: string | number | Date | dayjs.Dayjs | null | undefined,
    end: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    return `${dayjs(start).format("dddd D MMMM")} ⋅ ${dayjs(start).format(
      "HH:mm"
    )} – ${dayjs(end).format("HH:mm")}`;
  };

  if (!event) {
    return null;
  }

  return (
    <Modal
      open={isVisible}
      onOk={handleOk}
      onCancel={onClose}
      title={
        <div className="flex items-center gap-4">
          <div
            className={`h-3.5 w-3.5 rounded-full mt-1 ${
              bgColourClasses[event.bgColour as BgColour]
            }`}
          ></div>
          <div>
            <div>{event.description}</div>
            {event.isAllDay ? (
              <div className="mt-0.5 text-sm text-subtitle">All day</div>
            ) : (
              event.fullStartTime &&
              event.fullEndTime && (
                <div className="mt-0.5 text-sm text-subtitle">
                  {formatEventTimes(event.fullStartTime, event.fullEndTime)}
                </div>
              )
            )}
          </div>
        </div>
      }
      footer={null}
      centered={true}
      className="w-[26rem] [&_.ant-modal-content]:overflow-hidden"
    >
      <dl className="text-sm divide-y divide-neutral-100 [&>div]:grid [&>div]:grid-cols-5 [&>div]:py-2.5 [&>div]:gap-x-4 [&_dt]:text-subtitle [&_dt]:col-span-2 [&_dd]:text-right [&_dd]:col-span-3 [&_dd]:first-letter:uppercase [&_dd]:text-neutral-700">
        {event.maxCapacity !== null && (
          <div>
            <dt>Attending</dt>
            <dd>
              <div>
                <Tooltip
                  placement="right"
                  title={`${Math.round(
                    ((event.signedUp || 0) / event.maxCapacity) * 100
                  )}% attendance`}
                  className="cursor-default inline-flex items-center justify-end gap-2.5"
                >
                  <div
                    className={`font-medium ${
                      event.signedUp / event.maxCapacity >= 0.75
                        ? "text-success-600"
                        : event.signedUp / event.maxCapacity <= 0.25
                        ? "text-danger-600"
                        : "text-warning-600"
                    }`}
                  >
                    {(event.signedUp || 0) + " / " + event.maxCapacity}
                  </div>
                  <div className="space-y-0.5 relative">
                    <div
                      className={`h-[3px] w-3 rounded-sm ${
                        event.signedUp / event.maxCapacity >= 0.75
                          ? "bg-success-500"
                          : event.signedUp / event.maxCapacity <= 0.25
                          ? "bg-neutral-300"
                          : "bg-neutral-300"
                      }`}
                    ></div>
                    <div
                      className={`h-[3px] w-3 rounded-sm ${
                        event.signedUp / event.maxCapacity >= 0.75
                          ? "bg-success-500"
                          : event.signedUp / event.maxCapacity <= 0.25
                          ? "bg-neutral-300"
                          : "bg-warning-500"
                      }`}
                    ></div>
                    <div
                      className={`h-[3px] w-3 rounded-sm ${
                        event.signedUp / event.maxCapacity >= 0.75
                          ? "bg-success-500"
                          : event.signedUp / event.maxCapacity <= 0.25
                          ? "bg-danger-500"
                          : "bg-warning-500"
                      }`}
                    ></div>
                  </div>
                </Tooltip>
              </div>
            </dd>
          </div>
        )}
        {event.maxCapacity === null && (
          <div>
            <dt>Attending</dt>
            <dd>{event.signedUp || 0}</dd>
          </div>
        )}
        {event.address && (
          <div>
            <dt>Address</dt>
            <dd>
              {event.location && <>${event.location} — </>} {event.address}
            </dd>
          </div>
        )}
        {event.numCoaches !== null && event.assignedCoaches !== null && (
          <div>
            <dt>{event.numCoaches === 1 ? "Coach" : "Coaches"}</dt>
            <dd className="[text-wrap:balance;]">{event.assignedCoaches}</dd>
          </div>
        )}
        {event.parentDescription && (
          <div>
            <dt>Group</dt>
            <dd>{event.parentDescription}</dd>
          </div>
        )}
        {event.isCancelled !== null && (
          <div>
            <dt>Is Cancelled</dt>
            <dd>{event.isCancelled ? "Yes" : "No"}</dd>
          </div>
        )}
      </dl>
    </Modal>
  );
};

export default TimetableEventModal;
