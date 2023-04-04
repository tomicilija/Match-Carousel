import React, { FC } from 'react';
import Card from './Card';

export interface CarouselProps {
    max?: number;
    sportId?: number;
  }

const MatchCarousel: FC<CarouselProps> = ({ max, sportId }: CarouselProps) => {
  return (
    <>
      <Card />
      {max}
      {sportId}
    </>
  );
};

export default MatchCarousel;
