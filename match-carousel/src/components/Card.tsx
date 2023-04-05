import React from 'react';
import './Card.css';
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
      <div className="card">
        <div className="card-header">
          <h2>
            {tournamentName} - {tournamentSeason}
          </h2>
          <h3>{leagueName}</h3>
        </div>
        <div className="card-body">
          <div className="card-team">
            <img className="team-flag" />
            <h2>{matchData.teams.home.name}</h2>
          </div>
          <div className="card-result">
            <h1>
              {matchData.result.home}:{matchData.result.away}
            </h1>
          </div>
          <div className="card-team">
            <img className="team-flag" />
            <h2>{matchData.teams.away.name}</h2>
          </div>
        </div>
        <div className="card-status">
          <p>{matchData.status.name}</p>
        </div>
        <p>Date: {matchData._dt.date}</p>
        <p>Time: {matchData._dt.time}</p>
      </div>
    </div>
  );
};

export default Card;
