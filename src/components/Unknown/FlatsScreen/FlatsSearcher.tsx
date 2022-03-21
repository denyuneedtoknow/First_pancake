import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import { UIContext } from '../UIContext';

interface FlatsSearcherProps {
  onSubmit: any;
}

// declare const google: google;
let autocomplete: any;
const FlatsSearcher: React.FC<FlatsSearcherProps> = ({ onSubmit }) => {
  const { setAlert } = useContext(UIContext);
  const [city, setCity] = useState('');
  const inputValue = document.getElementById(
    'autocomplete',
  ) as HTMLInputElement;
  autocomplete = new google.maps.places.Autocomplete(inputValue, {
    types: ['geocode'],
  });
  const fillInAddress = async () => {
    try {
      const place = await autocomplete.getPlace();
      setCity(place.address_components[0].long_name);
    } catch (error) {
      setAlert({
        show: true,
        severity: 'warning',
        message: `${error}`,
      });
    }
  };
  autocomplete.addListener('place_changed', fillInAddress);
  onSubmit(city);

  return (
    <Input
      type="text"
      id="autocomplete"
      fullWidth
      size="small"
      margin="none"
      color="info"
    />
  );
};

export default FlatsSearcher;
