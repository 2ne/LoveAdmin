import React, { useState } from "react";
import { Tree, Input } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

const originalTreeData: DataNode[] = [
  {
    title: "All Classes",
    key: "0-0",
    children: [
      {
        title: "Monthly Classes",
        key: "0-0-0",
        children: [
          {
            title: "Gym 5-7 years",
            key: "0-0-0-0",
          },
          {
            title: "Gym 8 years +",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "Squads (monthly)",
        key: "0-0-1",
        children: [{ title: "Test", key: "0-0-1-0" }],
      },
    ],
  },
];

const ProductTree: React.FC = () => {
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
    <>
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
    </>
  );
};

export default ProductTree;
