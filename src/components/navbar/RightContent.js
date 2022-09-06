import { Flex } from '@chakra-ui/react';
import React from 'react';
import LoginModal from '../modal/auth/LoginModal';
import RegisterModal from '../modal/auth/RegisterModal';
import AuthButtons from './AuthButtons';
import IconsNavbar from './IconsNavbar';
import UserMenu from './UserMenu';

const RightContent = ({ loginModal, registerModal, user }) => {
  return (
    <>
      {loginModal && <LoginModal />}
      {registerModal && <RegisterModal />}
      <Flex justify="center" align="center">
        {user ? <IconsNavbar /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
