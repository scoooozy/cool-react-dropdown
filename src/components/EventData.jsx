import React, { useState, useEffect } from "react";

function EventData({ eventCode, apiKey }) {
  const [event, setEvent] = useState("");
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamMap, setTeamMap] = useState({});

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const eventResponse = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventCode}`,
        {
          headers: {
            "X-TBA-Auth-Key": apiKey,
          },
        }
      );
      const eventData = await eventResponse.json();
      setEvent(eventData);

      const matchesResponse = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventCode}/matches`,
        {
          headers: {
            "X-TBA-Auth-Key": apiKey,
          },
        }
      );
      const matchesData = await matchesResponse.json();
      const matches = matchesData
        .sort((a, b) => a.match_number - b.match_number)
        .map((match) => ({
          matchNumber: match.match_number,
          blueTeams: match.alliances.blue.team_keys,
          redTeams: match.alliances.red.team_keys,
          blueScore: match.alliances.blue.score,
          redScore: match.alliances.red.score,
        }));
      setMatches(matches);

      const teamsResponse = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventCode}/teams`,
        {
          headers: {
            "X-TBA-Auth-Key": apiKey,
          },
        }
      );
      const teamsData = await teamsResponse.json();
      setTeams(teamsData);

      const teamMap = {};
      teamsData.forEach((team) => {
        teamMap[team.key] = team.nickname;
      });
      setTeamMap(teamMap);

      setIsLoading(false);
    }

    fetchData();
  }, [eventCode, apiKey]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{teamMap[team.key]}</li>
        ))}
      </ul>
      <h2>Matches</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <p>Match Number: {match.matchNumber}</p>
            <p>
              Blue Alliance:{" "}
              {match.blueTeams.map((team) => teamMap[team]).join(", ")}
            </p>
            <p>
              Blue Score: {match.blueScore} | Red Score: {match.redScore}
            </p>
            <p>
              Red Alliance:{" "}
              {match.redTeams.map((team) => teamMap[team]).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default EventData;
