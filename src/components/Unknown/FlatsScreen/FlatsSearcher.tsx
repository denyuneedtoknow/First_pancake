import React, { useState, useContext, useRef, useEffect } from 'react';
import Input from '@mui/material/Input';

import { UIContext } from '../UIContext';

interface FlatsSearcherProps {
  onSubmit: any;
}

const FlatsSearcher: React.FC<FlatsSearcherProps> = ({ onSubmit }) => {
  const { setAlert } = useContext(UIContext);
  const refAutocomplete = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (refAutocomplete && refAutocomplete.current) {
      const autocomplete: any = new google.maps.places.Autocomplete(
        refAutocomplete.current,
        {
          types: ['geocode'],
        },
      );
      // document.addEventListener('DOMContentLoaded', autocomplete);
      const fillInAddress = () => {
        try {
          const place = autocomplete.getPlace();
          onSubmit(place?.address_components[0].long_name);
        } catch (error) {
          setAlert({
            show: true,
            severity: 'warning',
            message: `${error}`,
          });
        }
      };

      autocomplete.addListener('place_changed', fillInAddress);
    }
  }, [setAlert, onSubmit]);

  return (
    <Input
      inputRef={refAutocomplete}
      type="text"
      fullWidth
      size="small"
      margin="none"
      color="info"
    />
  );
};

export default FlatsSearcher;
