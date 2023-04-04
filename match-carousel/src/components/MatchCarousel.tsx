import React, { FC, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

interface CarouselProps {
  max?: number;
  sportId?: number;
}

interface MatchInfo {
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
}

interface Tournaments {
  _id: number;
  name: string;
  year: string;
  seasontypename: string;
  matches: MatchInfo[];
}

interface League {
  _id: number;
  name: string;
  tournaments: Tournaments[];
}
interface SportData {
  _id: number;
  name: string;
  realcategories: League[];
}

const MatchCarousel: FC<CarouselProps> = ({ max, sportId }: CarouselProps) => {
  const [sportData, setSportData] = useState<SportData[]>();
  let matchCounter = 0;

  const fetchMatches = (): Promise<SportData[]> => {
    return axios
      .get(
        'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074',
      )
      .then((res) => {
        return res.data.doc[0].data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchMatches().then((sportsData) => {
      if (sportId) {
        const sport = sportsData.filter((sport) => sport._id === sportId);
        setSportData(sport);
      } else {
        setSportData(sportsData);
      }
    });
  }, []);

  return (
    <>
      <div>
        {sportData?.map((sport) =>
          sport.realcategories.map((league) => (
            <div key={league._id}>
              {league.tournaments.map((tournament) => (
                <div key={tournament._id}>
                  {tournament.matches.map((match, idx) => {
                    if (matchCounter < (max || 10)) {
                      matchCounter++;
                      return (
                        <Card
                          key={idx}
                          matchData={match}
                          tournamentName={tournament.name}
                          tournamentSeason={tournament.seasontypename}
                          leagueName={league.name}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              ))}
            </div>
          )),
        )}
      </div>
      <br />
    </>
  );
};

MatchCarousel.defaultProps = {
  max: 10,
  sportId: undefined,
};

export default MatchCarousel;
