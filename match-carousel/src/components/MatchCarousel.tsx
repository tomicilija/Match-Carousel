import React, { FC, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import './MatchCarousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

interface CarouselProps {
  max?: number | 10;
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

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
      <div className="carousel">
        <Slider {...carouselSettings}>
          {sportData?.map((sport) =>
            sport.realcategories.map((league) =>
              league.tournaments.map((tournament) =>
                tournament.matches.map((match, idx) => {
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
                }),
              ),
            ),
          )}
        </Slider>
      </div>
    </>
  );
};

export default MatchCarousel;
