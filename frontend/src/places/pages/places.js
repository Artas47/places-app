import React, { useState, useContext, useEffect } from 'react';
import PlaceList from '../components/place-list';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Spinner from '../../shared/components/spinner/spinner';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`,
          'GET'
        );
        setPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  console.log('placessssss', places);
  return (
    <div>
      {isLoading ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '60%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner />
        </div>
      ) : (
        ''
      )}
      <PlaceList places={places} />
    </div>
  );
};

export default Places;
