import React, { useEffect, useState } from "react";
import { Select, Input, Button, Table, Segmented, Layout, Tooltip } from "antd";
import ChooseOrgCard from "./choose-org-card";
import {
  AppstoreOutlined,
  BarsOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import LoveAdminHeader from "../../components/header";
import TableTitle from "../../components/table-title";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Motion } from "../../components/framer-motion-custom";
const { Content } = Layout;
const { Option } = Select;

interface Organisation {
  logo: string;
  name: string;
  type: string;
  tags: string[];
  link: string;
}

const organisations: Organisation[] = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/180px-Arsenal_FC.svg.png",
    name: "Arsenal FC",
    type: "Football club",
    tags: ["Football", "Sports"],
    link: "/Home",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/SussexCCCLogo.svg/200px-SussexCCCLogo.svg.png",
    name: "Sussex County Cricket Club",
    type: "Cricket Team",
    tags: ["Cricket", "Sports"],
    link: "/Home",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b5/London_Lions_logo_%282021%29.png",
    name: "The London Lions Basketball",
    type: "Basketball College",
    tags: ["Basketball", "Sports"],
    link: "/Home",
  },
  {
    logo: "https://pro.loveadmin.com/services/anonymous/avatar/5f4c473d-aa5e-4beb-a8ba-5ef1869b9de8",
    name: "CG Swim School",
    type: "Classes & Courses",
    tags: ["Swimming", "Sports"],
    link: "/Home",
  },
];

const ChooseOrg = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [organisationsState, setOrganisations] = useState<Organisation[]>([]);
  const [filteredOrganisations, setFilteredOrganisations] = useState<
    Organisation[]
  >([]);

  useEffect(() => {
    setOrganisations(organisations);
    setFilteredOrganisations(organisations);
  }, []);

  const filterCards = (searchTerm: string, tag: string) => {
    let filtered = organisationsState;

    if (searchTerm) {
      filtered = filtered.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (tag) {
      filtered = filtered.filter((org) => org.tags.includes(tag));
    }

    setFilteredOrganisations(filtered);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Organisation) => (
        <Link to={record.link}>{text}</Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => tags.join(", "),
    },
  ];

  const allTags = Array.from(
    new Set(organisationsState.flatMap((org) => org.tags))
  );

  return (
    <Layout className="min-h-screen bg-neutral-900">
      <LoveAdminHeader compact={true} hideMenuButton={true}></LoveAdminHeader>
      <Layout className="bg-white rounded-t-lg">
        <Content className="w-full px-6 mx-auto py-7 max-w-screen-2xl">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <TableTitle title={"Choose organisation"} hideCount={true} />
              <div className="flex gap-2 ml-auto">
                <Input
                  className="w-[13rem]"
                  placeholder="Search organisations..."
                  onChange={(e) => filterCards(e.target.value, "")}
                  prefix={<SearchOutlined className="mr-1" />}
                />
                <Select
                  suffixIcon={<FilterOutlined />}
                  className="w-[8.5rem]"
                  placeholder="Filter by tags"
                  allowClear={true}
                  onChange={(value) => filterCards("", value as string)}
                >
                  {allTags.map((tag, index) => (
                    <Option key={index} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
                <Tooltip title="New organisation" placement="topRight">
                  <Button type="primary" icon={<PlusOutlined />}></Button>
                </Tooltip>
              </div>
            </div>
            <div className="mb-6">
              <AnimatePresence>
                {isGridView && (
                  <Motion animation="heightInOut" overflowHidden={false}>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
                      {filteredOrganisations.map((org, index) => (
                        <ChooseOrgCard key={index} {...org} />
                      ))}
                    </div>
                  </Motion>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!isGridView && (
                  <Motion animation="heightInOut" overflowHidden={false}>
                    <Table
                      size="small"
                      pagination={false}
                      dataSource={filteredOrganisations}
                      columns={columns}
                      rowKey="title"
                    />
                  </Motion>
                )}
              </AnimatePresence>
            </div>
            <footer className="h-14 fixed gap-2 bottom-0 justify-center flex items-center transition-all right-0 z-30 py-2.5 px-4 bg-white border-t border-b-0 border-solid border-x-0 border-neutral-200 left-0">
              <Segmented
                options={[
                  {
                    label: "Grid",
                    value: "Grid",
                    icon: <AppstoreOutlined />,
                    className: "w-24",
                  },
                  {
                    label: "List",
                    value: "List",
                    icon: <BarsOutlined />,
                    className: "w-24",
                  },
                ]}
                onChange={(value) => setIsGridView(value === "Grid")}
              />
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChooseOrg;
