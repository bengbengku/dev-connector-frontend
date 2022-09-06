import { Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react';

import { useDispatch } from 'react-redux';

const AuthButtons = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch({ type: 'LOGIN_SHOW', payload: true });
  };
  const registerHandler = () => {
    dispatch({ type: 'REGISTER_SHOW', payload: true });
  };
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={loginHandler}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{ base: 'none', sm: 'flex' }}
        width={{ base: '70px', md: '110px' }}
        onClick={registerHandler}
      >
        Daftar
      </Button>
    </>
  );
};

export default AuthButtons;
