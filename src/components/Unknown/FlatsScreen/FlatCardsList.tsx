import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from '@mui/material';
import { DocumentData } from '@firebase/firestore-types';
import { UIContext } from '../UIContext';
import { GetFlatsList, GetFlatsListByCity } from './GetFlatsList';
import FlatCard from './FlatCard';

const FlatCardsList: React.FC = () => {
  const [flatsList, setFlatsList] = useState<DocumentData[]>([]);
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('city') ?? '';

  const { setAlert } = useContext(UIContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchParam === '') {
          const snapshot = await GetFlatsList();
          setFlatsList(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          );
        }
        if (searchParam !== '') {
          const snapshot = await GetFlatsListByCity(searchParam);
          setFlatsList(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          );
        }
      } catch (error) {
        setAlert({
          show: true,
          severity: 'warning',
          message: `${error}`,
        });
      }
    };
    fetchData();
  }, [setAlert, searchParam]);

  return (
    <List>
      {flatsList.map(
        ({
          id,
          cityName,
          address,
          latitude,
          longitude,
          description,
          dailyPriceUsd,
          photoUrl,
          publishedAt,
        }) => {
          return (
            <FlatCard
              key={id}
              id={id}
              cityName={cityName}
              address={address}
              latitude={latitude}
              longitude={longitude}
              description={description}
              dailyPriceUsd={dailyPriceUsd}
              photoUrl={photoUrl}
              publishedAt={publishedAt}
            />
          );
        },
      )}
    </List>
  );
};

export default FlatCardsList;
