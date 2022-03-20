import { Box } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useUser } from 'reactfire';
import firebase from 'firebase';
// import Button from '@mui/material/Button';
import { UIContext } from '../UIContext';
import app from '../../../common/firebaseApp';
import MenuBtn from './BurgerBtn';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const userInitials = (user: firebase.User): string => {
  if (user.displayName) {
    const userNameArray = user.displayName.toUpperCase().split(' ');
    const firstName = userNameArray[0];
    const lastName = userNameArray[1];
    const nameLetters = firstName.split('');
    let result = nameLetters[0];

    if (lastName) {
      const lastNameLetters = lastName.split('');
      result += lastNameLetters[0];
    }

    return result.toUpperCase();
  }

  return 'U';
};

const AppBar: React.FC = () => {
  const { data: user } = useUser();
  const { setAlert } = useContext(UIContext);

  useEffect(() => {
    setAlert({
      show: true,
      severity: 'info',
      message: 'Welcome on board 🚀',
    });
  }, [setAlert]);

  const LoggingOut = React.useCallback(async () => {
    try {
      await app.auth().signOut();
      clearFirestoreCache();
    } catch (error) {
      setAlert({
        show: true,
        severity: 'warning',
        message: `${error}`,
      });
    }
  }, [setAlert]);
  return (
    <Box>
      <div
        style={{
          height: 60,
          backgroundColor: '#F50057',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <MenuBtn />
          <p
            style={{
              marginLeft: 16,
              color: 'white',
              padding: 0,
            }}
          >
            Project
          </p>
        </div>
        <button
          style={{
            height: 40,
            width: 40,
            padding: 0,
            margin: 0,
            backgroundColor: '#BDBDBD',
            color: 'white',
            border: 'none',
            borderRadius: 20,
          }}
          type="button"
          onClick={LoggingOut}
        >
          {user && userInitials(user)}
        </button>
      </div>
    </Box>
  );
};

export default AppBar;
