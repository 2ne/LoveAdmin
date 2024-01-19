import React, { useEffect, useState } from "react";
import { Tree, Input, Segmented } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { SearchOutlined } from "@ant-design/icons";

const originalTreeData: DataNode[] = [
  {
    title: "Advanced filters",
    key: "0-0",
    disableCheckbox: true,
    selectable: false,
    children: [
      {
        title: "Show account owners",
        key: "0-0-0",
      },
      {
        title: "Show product users",
        key: "0-0-1",
      },
      {
        title: "Show purchasers",
        key: "0-0-2",
      },
      {
        title: "Show current attendees",
        key: "0-0-3",
      },
      {
        title: "Show invitees",
        key: "0-0-4",
      },
    ],
  },
  {
    title: "All Classes",
    key: "0-1",
    children: [
      {
        title: "Monthly Classes",
        key: "0-1-0",
        children: [
          {
            title: "Gym 5-7 years",
            key: "0-1-0-0",
          },
          {
            title: "Gym 8 years +",
            key: "0-1-0-1",
          },
        ],
      },
      {
        title: "Squads (monthly)",
        key: "0-1-1",
        children: [{ title: "Test", key: "0-1-1-0" }],
      },
    ],
  },
];

interface ProductTreeProps {
  showGroups?: boolean;
  hideFilters?: boolean;
}

const ProductTree: React.FC<ProductTreeProps> = ({
  hideFilters = false,
  showGroups,
}) => {
  useEffect(() => {
    let filteredTreeData = [...originalTreeData];
    if (hideFilters) {
      filteredTreeData = filteredTreeData.filter(
        (node) => node.title !== "Advanced filters"
      );
    }
    setTreeData(filteredTreeData);
  }, [hideFilters]);

  const [treeData, setTreeData] = useState(originalTreeData);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <div className="sticky top-0 max-h-screen p-4 overflow-hidden">
      {showGroups && (
        <Segmented options={["Products", "Groups"]} className="mb-4" block />
      )}
      <Input
        placeholder="Search products..."
        prefix={<SearchOutlined className="mr-1" />}
        className="mb-4"
      />
      <Tree
        checkable
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        className="bg-transparent whitespace-nowrap"
      />
    </div>
  );
};

export default ProductTree;
