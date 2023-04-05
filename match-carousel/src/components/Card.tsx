import React, { useState } from 'react';
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
  const condition = false;

  /* 
  if (matchData.status._id === 0) {
    setMatchStatus('not-started');
  }
  if (matchData.status._id === 100) {
    setMatchStatus('ended');
  }
  if (matchData.status._id > 0 && matchData.status._id < 100) {
    setMatchStatus('live');
  }
 */
  return (
    <div>
      <div
        className={`card ${
          matchData.status._id === 0
            ? 'not-started-bg'
            : matchData.status._id === 100
            ? 'ended-bg'
            : 'live-bg'
        }`}
      >
        <div className="card-header">
          <h2>
            {tournamentName} - {tournamentSeason}
          </h2>
          <h3>{leagueName}</h3>
        </div>
        <div className="card-body">
          <div className="card-team">
            <img
              className="team-flag"
              src={`http://ls.betradar.com/ls/crest/big/${matchData.teams.home.uid}.png`}
            />
            <h2>{matchData.teams.home.name}</h2>
          </div>

          {matchData.status._id === 0 ? (
            <div className="card-result">
              <h3>VS</h3>
              <h3>{matchData._dt.time}</h3>
              <p>{matchData._dt.date}</p>
            </div>
          ) : (
            <div className="card-result">
              <h1>
                {matchData.result.home}:{matchData.result.away}
              </h1>
            </div>
          )}
          <div className="card-team">
            <img
              className="team-flag"
              src={`http://ls.betradar.com/ls/crest/big/${matchData.teams.home.uid}.png`}
            />
            <h2>{matchData.teams.away.name}</h2>
          </div>
        </div>
        <div
          className={`card-status ${
            matchData.status._id === 0
              ? 'not-started-status'
              : matchData.status._id === 100
              ? 'ended-status'
              : 'live-status'
          }`}
        >
          <p>{matchData.status.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
