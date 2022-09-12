import { Badge, Flex, Image } from '@chakra-ui/react';
import { IconBadge } from '@tabler/icons';
import { FcTreeStructure } from 'react-icons/fc';
import React from 'react';
import RightContent from './RightContent';
import SearchInput from './SearchInput';
import HomeDirectory from '../logo home/HomeDirectory';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ page }) => {
  const { loginModal, registerModal, user } = useSelector(state => ({
    ...state,
  }));
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: 'space-between' }}
      position="sticky"
      top="0"
      zIndex={99}
    >
      <Link to="/">
        <Image
          boxSize="40px"
          display={{ base: 'none', md: 'unset' }}
          objectFit="cover"
          src="../../../images/CUY_CONNECTOR.png"
          alt="Cuy Connector"
          align="center"
          mr={2}
        />
      </Link>
      {user && <HomeDirectory />}
      <SearchInput user={user} />
      <RightContent
        page={page}
        loginModal={loginModal}
        registerModal={registerModal}
        user={user}
      />
    </Flex>
  );
};

export default Navbar;
