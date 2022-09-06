import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Box,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { FcDecision, FcFlashOn } from 'react-icons/fc';
import { CgProfile, CgEnter } from 'react-icons/cg';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT',
    });
  };

  const signOrRegister = () => {
    dispatch({ type: 'LOGIN_SHOW', payload: true });
  };
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0 6px"
        borderRadius={4}
        _hover={{
          outline: `${user ? '1px solid' : 'none'}`,
          outlineColor: `${user ? 'gray.300' : ''}`,
        }}
      >
        <Flex align="center">
          <Flex align="center" ml={1}>
            {user ? (
              <>
                <Avatar
                  size="xs"
                  name={user.first_name}
                  src={user.picture}
                  mr={1}
                />
                <Box
                  display={{ base: 'none', lg: 'flex' }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={2}
                >
                  <Text fontWeight={700} color="brand.100">
                    {user?.username}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={FcFlashOn} color="brand.100" />
                    <Text color="gray.400">1 contrib</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.500" />
            )}
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'gray.500' }}
            >
              <Flex align="center">
                <Icon as={CgProfile} mr={2} fontSize={20} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'gray.500' }}
              onClick={() => {
                logout();
              }}
            >
              <Flex align="center">
                <Icon as={CgEnter} mr={2} fontSize={20} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'gray.500' }}
              onClick={() => {
                signOrRegister();
              }}
            >
              <Flex align="center">
                <Icon as={CgEnter} mr={2} fontSize={20} />
                Login / Daftar
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;