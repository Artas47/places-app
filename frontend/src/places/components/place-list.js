import React from 'react';
import PlaceItem from './place-item';

const PlaceList = ({ places }) => {
  if (places.length === 0) {
    return <div>NOT FOUND</div>;
  }
  console.log('places111111111', places);
  return (
    <div>
      {places.map((place) => {
        return (
          <PlaceItem title={place.title} description={place.description} />
        );
      })}
    </div>
  );
};

export default PlaceList;
