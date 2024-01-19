import { useState } from "react";
import {
  Breadcrumb,
  ConfigProvider,
  Layout,
  Tabs,
  TabsProps,
  theme,
} from "antd";
import LoveAdminHeader from "../../components/header";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import {
  Squad,
  Team,
  Coach,
  teamBgClasses,
  Colour,
  colorHexMap,
  Player,
} from "./data";
import TeamTree from "./teams-tree";
import TeamHome from "./home/teams-home";
import SquadHome from "./home/squad-home";
import Players from "./players/players";
import Header from "./header";
import Coaches from "./coaches/coaches";
import Events from "./events/events";
import TeamSettings from "./settings/settings";
import Payments from "./payments/payments";
const { Content } = Layout;
const { useToken } = theme;

const Teams = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTabKey, setActiveTabKey] = useState("Home");

  const onSquadSelect = (squad: Squad) => {
    setSelectedSquad(squad);
    setSelectedTeam(null);
  };

  const onTeamSelect = (team: Team, squad: Squad) => {
    setSelectedSquad(squad);
    setSelectedTeam(team);
  };

  const getTotalTeams = (squad: Squad): string => {
    const teamCount = squad.teams.length;
    return `${teamCount} ${teamCount === 1 ? "team" : "teams"}`;
  };

  const getCoachesForTeam = (team: Team): Coach[] => {
    return team.coaches;
  };

  const getCoachesForSquad = (squad: Squad): Coach[] => {
    const squadCoaches = squad.coaches ?? [];
    const teamCoaches = squad.teams.flatMap((team) => team.coaches);

    return [...squadCoaches, ...teamCoaches];
  };

  const getTotalCoaches = (squad: Squad): string => {
    const teamCoachCount = squad.teams.reduce(
      (total, team) => total + team.coaches.length,
      0
    );

    const squadCoachCount = squad.coaches?.length || 0;
    const totalCoachCount = teamCoachCount + squadCoachCount;

    return `${totalCoachCount} ${totalCoachCount === 1 ? "coach" : "coaches"}`;
  };

  const getPlayersForTeam = (team: Team): number => {
    return team.players.length;
  };

  const getTotalPlayers = (squad: Squad): string => {
    const teamPlayerCount = squad.teams.reduce(
      (total, team) => total + team.players.length,
      0
    );

    const squadPlayerCount = squad.players?.length || 0;
    const totalPlayerCount = teamPlayerCount + squadPlayerCount;

    return `${totalPlayerCount} ${
      totalPlayerCount === 1 ? "player" : "players"
    }`;
  };

  const getTotalPlayersCount = (squad: Squad): number => {
    const teamPlayerCount = squad.teams.reduce(
      (total, team) => total + team.players.length,
      0
    );

    const squadPlayerCount = squad.players?.length || 0;
    return teamPlayerCount + squadPlayerCount;
  };

  let combinedPlayers: Player[] = [];

  if (selectedSquad) {
    combinedPlayers = [
      ...(selectedSquad.players ?? []), // Include squad-level players
      ...selectedSquad.teams.flatMap((team) =>
        team.players.map((player) => ({
          ...player,
          teamName: team.name,
          teamColour: team.colour,
        }))
      ),
    ];
  }

  let combinedCoaches: Coach[] = [];

  if (selectedSquad) {
    combinedCoaches = [
      ...(selectedSquad.coaches ?? []), // Include squad-level coaches
      ...selectedSquad.teams.flatMap((team) =>
        team.coaches.map((coach) => ({
          ...coach,
          teamName: team.name,
          teamColour: team.colour,
        }))
      ),
    ];
  }

  const selectedTeamColour = selectedTeam?.colour;

  let teamBgClass = "";

  if (selectedTeam) {
    teamBgClass = teamBgClasses[selectedTeam.colour] || "";
  }

  const setActiveTab = (tabName: string) => {
    setActiveTabKey(tabName);
    console.log(tabName);
  };

  const items: TabsProps["items"] = [
    {
      key: "Home",
      label: "Home",
      children: (
        <>
          {!selectedTeam && selectedSquad && (
            <SquadHome
              setActiveTab={setActiveTab}
              selectedSquad={selectedSquad}
              getCoachesForSquad={getCoachesForSquad}
              getTotalPlayersCount={getTotalPlayersCount}
            />
          )}
          {selectedTeam && selectedSquad && (
            <TeamHome
              setActiveTab={setActiveTab}
              selectedTeam={selectedTeam}
              getCoachesForTeam={getCoachesForTeam}
              getPlayersForTeam={getPlayersForTeam}
            />
          )}
        </>
      ),
    },
    {
      key: "Events",
      label: "Events",
      children: (
        <>
          {!selectedTeam && selectedSquad && (
            <Events squad={true} players={combinedPlayers} />
          )}
          {selectedTeam && selectedSquad && (
            <Events
              players={selectedTeam.players.map((player) => ({
                ...player,
                teamName: selectedTeam.name,
              }))}
            />
          )}
        </>
      ),
    },
    {
      key: "Players",
      label: "Players",
      children: (
        <>
          {!selectedTeam && selectedSquad && (
            <Players squad={true} players={combinedPlayers} />
          )}
          {selectedTeam && selectedSquad && (
            <Players
              players={selectedTeam.players.map((player) => ({
                ...player,
                teamName: selectedTeam.name,
              }))}
            />
          )}
        </>
      ),
    },
    {
      key: "Coaches",
      label: "Coaches",
      children: (
        <>
          {!selectedTeam && selectedSquad && (
            <Coaches squad={true} coaches={combinedCoaches} />
          )}
          {selectedTeam && selectedSquad && (
            <Coaches
              coaches={[
                ...selectedTeam.coaches.map((coach) => ({
                  ...coach,
                  teamName: selectedTeam.name,
                })),
                ...(selectedSquad.coaches?.filter((coach) => !coach.teamName) ??
                  []),
              ]}
            />
          )}
        </>
      ),
    },
    {
      key: "Payments",
      label: "Payments",
      children: (
        <>
          {!selectedTeam && selectedSquad && (
            <Payments squad={true} players={combinedPlayers} />
          )}
          {selectedTeam && selectedSquad && (
            <Payments
              players={selectedTeam.players.map((player) => ({
                ...player,
                teamName: selectedTeam.name,
              }))}
            />
          )}
        </>
      ),
    },
    {
      key: "Messages",
      label: "Messages",
      children: <>Messages</>,
    },
    {
      key: "Settings",
      label: "Settings",
      children: (
        <>
          <TeamSettings />
        </>
      ),
    },
  ];

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const { token } = useToken();

  const getHexForColour = (colour: Colour) => {
    return colorHexMap[colour];
  };

  const themeColor = selectedTeamColour
    ? getHexForColour(selectedTeamColour)
    : token.colorPrimary;

  return (
    <Layout
      className={`min-h-screen bg-neutral-950 team-${selectedTeamColour}`}
    >
      <LoveAdminHeader
        breadcrumbChildren={[
          <Breadcrumb.Item key="home">
            <Link to="/Home">Home</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item key="teams">Teams</Breadcrumb.Item>,
        ]}
      />
      <Layout
        className={`bg-white bg-gradient-to-b to-transparent rounded-t-lg ${
          selectedTeam ? teamBgClass : "from-neutral-100"
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          className={`bg-white/90 ${
            !selectedSquad && !selectedTeam
              ? "max-md:!w-full max-md:!max-w-full max-md:!min-w-full max-md:[&_.ant-btn-circle]:hidden"
              : ""
          }`}
        >
          <TeamTree onSquadSelect={onSquadSelect} onTeamSelect={onTeamSelect} />
        </Sidebar>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: themeColor,
            },
          }}
        >
          {selectedSquad && (
            <Content
              className={`md:min-w-0 !pointer-events-auto relative w-full max-w-screen-lg p-4 pb-16 mx-auto ${
                collapsed ? "" : ""
              }`}
            >
              <Header
                selectedSquad={selectedSquad}
                selectedTeam={selectedTeam}
                getTotalTeams={getTotalTeams}
                getTotalPlayers={getTotalPlayers}
                getTotalCoaches={getTotalCoaches}
              />
              <Tabs
                activeKey={activeTabKey}
                items={items}
                onChange={onTabChange}
                className={`[&_.ant-tabs-nav:before]:border-b-black/5 [&_.ant-tabs-nav]:mb-8 ant-tabs-top-custom`}
              />
              {!collapsed && (
                <div
                  className="absolute inset-0 md:hidden"
                  onClick={() => setCollapsed(true)}
                ></div>
              )}
            </Content>
          )}
        </ConfigProvider>
        {!selectedSquad && !selectedTeam && (
          <div className="max-md:hidden max-w-sm mx-auto mt-[25vh] text-center place-content-center">
            <div className="flex w-20 h-20 mx-auto mb-3 border rounded-full place-items-center border-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="w-12 h-12 mx-auto text-neutral-400"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M18.25 5.75H5.75a1 1 0 00-1 1v10.5a1 1 0 001 1h12.5a1 1 0 001-1V6.75a1 1 0 00-1-1z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 9.75h2.25v4.5H5M12 6v3.5M12 15v3M14.25 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM19.25 9.75h-2.5v4.5h2.5"
                ></path>
              </svg>
            </div>
            <div className="mb-1 text-lg font-medium">No team selected</div>
            <p className="">Please select a team from the menu.</p>
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default Teams;
