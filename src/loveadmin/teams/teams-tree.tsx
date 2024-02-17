import React, { useState } from "react";
import { Input } from "antd";
import { DownOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Squad, Team, updatedSquads } from "./data";

interface TeamTreeProps {
  onSquadSelect: (squad: Squad) => void;
  onTeamSelect: (team: Team, squad: Squad) => void;
}

const TeamTree: React.FC<TeamTreeProps> = ({ onSquadSelect, onTeamSelect }) => {
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [expandedSquads, setExpandedSquads] = useState<{
    [key: string]: boolean;
  }>({});

  const handleSquadSelect = (squad: Squad) => {
    if (selectedSquad !== squad || selectedTeam) {
      setSelectedSquad(squad);
      setSelectedTeam(null); // Deselect the team when a new squad is selected or when re-selecting the squad
      onSquadSelect(squad);

      // Set the current squad to be expanded
      setExpandedSquads((prevExpandedSquads) => ({
        ...prevExpandedSquads,
        [squad.name]: true, // Ensure the selected squad is expanded
      }));
    }
  };

  const handleTeamSelect = (squad: Squad, team: Team) => {
    if (selectedTeam !== team) {
      setSelectedSquad(squad);
      setSelectedTeam(team);
      onTeamSelect(team, squad);
    }
  };

  const toggleSquadExpansion = (squadName: string) => (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the squad selection when toggling expansion
    setExpandedSquads((prevExpandedSquads) => ({
      ...prevExpandedSquads,
      [squadName]: !prevExpandedSquads[squadName],
    }));
  };

  const renderTeams = (squad: Squad) =>
    expandedSquads[squad.name] && (
      <ul className="mb-3 space-y-1 border-l border-neutral-200/75">
        {squad.teams?.map((team, index) => (
          <li key={index}>
            <button
              type="button"
              className={`${
                selectedTeam === team
                  ? "[text-shadow:_0_0_0.1px_currentcolor] text-primary-600 border-primary-500"
                  : "hover:border-neutral-300 border-transparent text-neutral-600 hover:text-neutral-900 hover:underline"
              } border-l w-full pl-4 py-0.5 text-sm/5 -ml-px text-left cursor-pointer`}
              onClick={() => handleTeamSelect(squad, team)}
            >
              {team.name}
            </button>
          </li>
        ))}
      </ul>
    );

  const renderSquads = () => (
    <ul className="space-y-1.5">
      {updatedSquads.map((squad, index) => (
        <li key={index}>
          <div className="flex">
            <button
              type="button"
              className={`${
                selectedSquad === squad && !selectedTeam
                  ? "text-primary-600 [text-shadow:_0_0_0.1px_currentcolor]"
                  : "text-neutral-700 hover:underline hover:text-neutral-900"
              } flex grow items-center pt-1 -mb-0.5 pb-2.5 -ml-px text-sm/5 cursor-pointer`}
              onClick={() => handleSquadSelect(squad)}
            >
              {squad.name}
            </button>
            <button
              type="button"
              onClick={toggleSquadExpansion(squad.name)}
              className="flex items-center justify-center w-6 h-6 ml-auto -mr-1 transition-colors rounded-full hover:bg-neutral-100"
            >
              {expandedSquads[squad.name] ? (
                <DownOutlined className="w-[11px] h-[11px] text-primary-600" />
              ) : (
                <RightOutlined className="w-[11px] h-[11px] text-neutral-400" />
              )}
            </button>
          </div>
          {renderTeams(squad)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sticky top-0 max-h-[calc(100vh-4rem)] p-4 overflow-y-auto scrollbar-thin-y sidebar-height">
      <div className="sticky z-10 p-4 pb-0 mb-3 -m-4 -top-4 bg-white/90">
        <Input
          placeholder="Search teams..."
          prefix={<SearchOutlined className="mr-1" />}
        />
      </div>
      <nav className="pl-px">{renderSquads()}</nav>
    </div>
  );
};

export default TeamTree;
