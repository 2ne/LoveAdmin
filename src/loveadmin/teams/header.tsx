import React from "react";
import { Squad, Team } from "./data";
import { Button, Typography } from "antd";
import { CameraOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface HeaderProps {
  selectedSquad: Squad | null;
  selectedTeam: Team | null;
  getTotalTeams: (squad: Squad) => string;
  getTotalPlayers: (squad: Squad) => string;
  getTotalCoaches: (squad: Squad) => string;
}

const Header: React.FC<HeaderProps> = ({
  selectedSquad,
  selectedTeam,
  getTotalTeams,
  getTotalPlayers,
  getTotalCoaches,
}) => {
  if (!selectedSquad) return null;

  let teamBanner;

  if (selectedTeam) {
    const selectedTeamColour = selectedTeam?.colour;
    let borderLeftColor, textColor;

    if (selectedTeamColour === "white") {
      borderLeftColor = `rgba(var(--color-neutral-300), 1)`;
      textColor = `rgba(var(--color-white), .75)`;
    } else if (selectedTeamColour === "black") {
      borderLeftColor = `rgba(var(--color-black), 1)`;
      textColor = `rgba(var(--color-white), .75)`;
    } else {
      borderLeftColor = `rgba(var(--color-${selectedTeamColour}-500), 1)`;
      textColor = `rgba(var(--color-${selectedTeamColour}-300), 1)`;
    }

    teamBanner = {
      borderLeftWidth: "4px",
      borderLeftColor: borderLeftColor,
      color: textColor,
    };
  }

  return (
    <div className="mb-2">
      <div className="relative rounded-lg">
        {selectedSquad.image ? (
          <img
            src={selectedSquad.image}
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
          />
        ) : (
          <Button
            type="text"
            icon={<CameraOutlined />}
            className="absolute z-10 text-white bottom-6 right-6 bg-black/10 hover:bg-black/20"
          >
            Add image
          </Button>
        )}
        <div
          style={teamBanner}
          className={`relative grid content-end aspect-[16/8] sm:aspect-[3/1] p-6 rounded-lg ${
            selectedSquad.image
              ? "bg-gradient-to-tr from-black/75 to-black/10"
              : selectedTeam
              ? "team-bg"
              : "bg-primary-500"
          }`}
        >
          {selectedTeam ? (
            <div>
              <Title level={4} className="mb-0.5 mt-0 text-current">
                {selectedSquad.name}
              </Title>
              <Title level={3} className="mt-0 mb-0 text-white">
                {selectedTeam.name}
              </Title>
            </div>
          ) : (
            <div>
              <Title level={3} className="mb-0.5 mt-0 text-white">
                {selectedSquad.name}
              </Title>
              <div>
                <Title level={4} className="mb-0.5 mt-0 text-white/80">
                  {getTotalTeams(selectedSquad)}
                  <span className="mx-1.5">·</span>
                  {getTotalPlayers(selectedSquad)}
                  <span className="mx-1.5">·</span>
                  {getTotalCoaches(selectedSquad)}
                </Title>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
