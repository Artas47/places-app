import React from 'react';
import PlaceItem from './place-item';
import Fade from '../../shared/components/fade-animation/fade';

const PlaceList = ({ places }) => {
  if (places.length === 0) {
    return <div>NOT FOUND</div>;
  }

  return (
    <div>
      {places.map((place) => {
        return (
          <Fade in={true} classNames='fade'>
            <PlaceItem
              title={place.title}
              description={place.description}
              id={place._id}
            />
          </Fade>
        );
      })}
    </div>
  );
};

export default PlaceList;
