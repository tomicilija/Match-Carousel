import React from 'react';
interface MatchProps {
  matchData: {
    _dt: {
      time: string;
      date: string;
      tz: string;
    };
    status: {
      _id: number;
      name: string;
    };
    result: {
      home: number;
      away: number;
    };
    teams: {
      home: {
        uid: number;
        name: string;
        abbr: string;
      };
      away: {
        uid: number;
        name: string;
        abbr: string;
      };
    };
  };
  tournamentName: string;
  tournamentSeason: string;
  leagueName: string;
}

const Card: React.FC<MatchProps> = ({
  matchData,
  tournamentName,
  tournamentSeason,
  leagueName,
}) => {
  return (
    <div>
      <h2>
        {tournamentName} - {tournamentSeason}
      </h2>
      <h3>{leagueName}</h3>
      <p>Date: {matchData._dt.date}</p>
      <p>Time: {matchData._dt.time}</p>
      <p>Home Team: {matchData.teams.home.name}</p>
      <p>Away Team: {matchData.teams.away.name}</p>
      <p>
        Result: {matchData.result.home} - {matchData.result.away}
      </p>
      <p>Status: {matchData.status.name}</p>
    </div>
  );
};

export default Card;
