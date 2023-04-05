import React, { FC, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import './MatchCarousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

interface MatchCard {
  matchData: any;
  tournamentName: string;
  tournamentSeason: string;
  leagueName: string;
}

const MatchCarousel: FC<CarouselProps> = ({ max, sportId }: CarouselProps) => {
  const [sportData, setSportData] = useState<SportData[]>();
  const matchCards: MatchCard[] = [];

  const carouselSettings = { 
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
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

  sportData?.forEach((sport) =>
    sport.realcategories.forEach((league) =>
      league.tournaments.forEach((tournament) =>
        tournament.matches.forEach((match) => {
          if (matchCards.length < (max || 10)) {
            matchCards.push({
              matchData: match,
              tournamentName: tournament.name,
              tournamentSeason: tournament.seasontypename,
              leagueName: league.name,
            });
          }
        }),
      ),
    ),
  );

  return (
    <>
      <div className="carousel">
        <Slider {...carouselSettings}>
          {matchCards.map((matchCard) => (
            // eslint-disable-next-line react/jsx-key
            <Card {...matchCard} />
          ))}
        </Slider>
      </div>
    </>
  );
};

MatchCarousel.defaultProps = {
  max: 10,
  sportId: undefined,
};

export default MatchCarousel;
