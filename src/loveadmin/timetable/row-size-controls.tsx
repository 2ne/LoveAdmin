// REMOVED THIS AS IT WASN'T THAT USEFUL

import { Tooltip, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";

interface RowSizeControlsProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  setRowSize: React.Dispatch<React.SetStateAction<number>>;
}

const RowSizeControls: React.FC<RowSizeControlsProps> = ({
  scrollRef,
  setRowSize,
}) => {
  const initialRowSize = 3.5;
  const [rowSize, setInternalRowSize] = useState(initialRowSize);
  const minRowSize = 2;
  const maxRowSize = 5;
  const lastScrollRatio = useRef<number | null>(null);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const adjustScrollPosition = useCallback(
    (newRowSize: number) => {
      if (scrollRef.current) {
        const scrollContainer = scrollRef.current;
        const scrollRatio =
          scrollContainer.scrollTop / scrollContainer.scrollHeight;

        setInternalRowSize(newRowSize);
        setRowSize(newRowSize);

        lastScrollRatio.current = scrollRatio;
      }
    },
    [scrollRef, setRowSize]
  );

  useEffect(() => {
    if (scrollRef.current && lastScrollRatio.current !== null) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop =
        scrollContainer.scrollHeight * lastScrollRatio.current;
    }
  }, [rowSize, scrollRef]);

  const increaseRowSize = () => {
    const newSize = clamp(rowSize + 0.75, minRowSize, maxRowSize);
    adjustScrollPosition(newSize);
  };

  const decreaseRowSize = () => {
    const newSize = clamp(rowSize - 0.75, minRowSize, maxRowSize);
    adjustScrollPosition(newSize);
  };

  return (
    <div className="fixed z-50 hidden md:flex flex-col p-0.5 bg-white rounded-[3px] shadow-md bottom-[4.5rem] right-4 ring-1 ring-neutral-950/5">
      <Tooltip title="Increase size" placement="left">
        <Button
          size="small"
          type="text"
          onClick={increaseRowSize}
          icon={<PlusOutlined />}
          className={
            rowSize >= maxRowSize ? "pointer-events-none text-neutral-400" : ""
          }
        />
      </Tooltip>
      <div className="mx-0.5 my-1 border-b border-neutral-200/75"></div>
      <Tooltip title="Decrease size" placement="left">
        <Button
          size="small"
          type="text"
          onClick={decreaseRowSize}
          icon={<MinusOutlined />}
          className={
            rowSize <= minRowSize ? "pointer-events-none text-neutral-400" : ""
          }
        />
      </Tooltip>
    </div>
  );
};

export default RowSizeControls;
