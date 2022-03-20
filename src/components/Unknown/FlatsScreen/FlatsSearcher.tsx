import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { UIContext } from '../UIContext';

interface FlatsSearcherProps {
  onSubmit: any;
}

declare const google: any;
let autocomplete: any;
const FlatsSearcher: React.FC<FlatsSearcherProps> = ({ onSubmit }) => {
  const { setAlert } = useContext(UIContext);
  const [city, setCity] = useState('');
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    { types: ['geocode'] },
  );
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
    <TextField
      type="text"
      id="autocomplete"
      fullWidth
      size="small"
      margin="normal"
      color="info"
    />
  );
};

export default FlatsSearcher;
