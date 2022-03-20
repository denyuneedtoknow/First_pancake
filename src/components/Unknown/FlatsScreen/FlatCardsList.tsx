import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { List } from '@mui/material';
import { DocumentData } from '@firebase/firestore-types';
import { UIContext } from '../UIContext';
import GetFlatsList from './GetFlatsList';
import FlatCard from './FlatCard';

const FlatCardsList: React.FC = () => {
  const [flatsList, setFlatsList] = useState<DocumentData[]>([]);
  const history = useHistory();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('query') ?? '';

  const { setAlert } = useContext(UIContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await GetFlatsList();
        const allFlatsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(allFlatsList);
        const LowKeyCityName = searchParam.toLowerCase();
        console.log(LowKeyCityName);
        // const filteredFlatsList:Array<number|string> = allFlatsList.filter((availiableFlats) =>
        // availiableFlats.cityName.toLowerCase().includes(LowKeyCityName),
        setFlatsList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error) {
        setAlert({
          show: true,
          severity: 'warning',
          message: `${error}`,
        });
      }
    };
    // const LowKeyCityName = searchParam.toLowerCase();
    // const flatsList = flatsList.filter((availiableFlats) =>
    //   availiableFlats.cityName.toLowerCase().includes(LowKeyCityName),
    // );

    fetchData();
  }, [setAlert, flatsList, searchParam]);

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
