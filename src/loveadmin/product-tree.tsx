import React, { useState } from "react";
import { Tree, Input, Segmented } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

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
  showSegmented?: boolean;
}

const ProductTree: React.FC<ProductTreeProps> = ({ showSegmented = false }) => {
  const [searchValue, setSearchValue] = useState("");
  const [treeData, setTreeData] = useState(originalTreeData);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  const onSearch = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchValue(value);
    const filteredData = filterTree(originalTreeData, value);
    setTreeData(filteredData);
  };

  const filterTree = (data: any[], value: string) => {
    return data.reduce((acc, item) => {
      const children = item.children ? filterTree(item.children, value) : [];

      if (
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        children.length > 0
      ) {
        const highlightIndex = item.title
          .toLowerCase()
          .indexOf(value.toLowerCase());
        const beforeStr = item.title.substr(0, highlightIndex);
        const matchStr = item.title.substr(highlightIndex, value.length);
        const afterStr = item.title.substr(highlightIndex + value.length);

        const title =
          highlightIndex > -1 ? (
            <span>
              {beforeStr}
              <span className="font-medium underline">{matchStr}</span>
              {afterStr}
            </span>
          ) : (
            item.title
          );

        acc.push({ ...item, title, children });
      }
      return acc;
    }, []);
  };

  return (
    <div className="sticky top-0 max-h-screen p-4 overflow-auto">
      {showSegmented && (
        <Segmented
          block
          options={["Products", "Groups"]}
          className="mb-4 bg-neutral-200/75"
        />
      )}
      <Input.Search
        placeholder="Search products..."
        onChange={onSearch}
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
