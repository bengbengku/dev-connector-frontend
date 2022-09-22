import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsersReducer } from '../../functions/reducers';
import FooterContent from './FooterContent';
import RightDiscord from './RightDiscord';
const RightHandSide = ({ user }) => {
  const dispatchLink = useDispatch();
  const [{ loading, error, users }, dispatch] = useReducer(getUsersReducer, {
    loading: false,
    users: [],
    error: '',
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      dispatch({
        type: 'USERS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllUsers`,
        {}
      );
      dispatch({
        type: 'USERS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'USERS_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  const handleLinkUser = () => {
    if (!user) {
      return dispatchLink({
        type: 'LOGIN_SHOW',
        payload: true,
      });
    }
  };

  return (
    <Flex borderRadius={4} direction="column" position="sticky" top="-20.2rem">
      <Flex
        p="6px 10px"
        align="flex-end"
        borderRadius="4px 4px 0 0"
        height="70px"
        w="full"
        fontWeight={700}
        bgImage="url(../../../images/CUY_BANNER.jpg)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.70)), url(../../../images/CUY_BANNER.jpg)"
      >
        Cuy Connector
      </Flex>
      <Flex direction="column" bg="white" borderRadius={4}>
        {users?.slice(0, 5).map((cuy, i, arr) => (
          <Link
            to={`/profile/${cuy?.username}`}
            key={cuy?._id}
            onClick={() => handleLinkUser()}
          >
            <Flex
              align="center"
              fontSize="10pt"
              borderBottom="1px solid"
              borderColor={arr.length - 1 === i ? '' : 'gray.300'}
              p="10px 12px"
              _hover={{ bg: 'gray.200' }}
            >
              <Flex align="center" width="80%">
                <Flex width="15%">
                  <Text color="gray.600" fontWeight={600}>
                    {i + 1}
                  </Text>
                </Flex>
                <Flex align="center" width="80%" flex={1}>
                  <Image
                    src={cuy?.picture}
                    borderRadius="full"
                    boxSize="28px"
                    mr={2}
                  />
                  <Text
                    color="gray.600"
                    fontWeight={600}
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {`cuy/${cuy?.username}`}
                  </Text>
                </Flex>
              </Flex>
              <Box ml={4}>
                <Icon
                  as={BsBoxArrowUpRight}
                  fontSize={18}
                  mr={4}
                  color="gray.500"
                  cursor="pointer"
                  w="full"
                />
              </Box>
            </Flex>
          </Link>
        ))}
        <Box p="10px 20px">
          <Button height="30px" width="100%">
            Lihat Semua
          </Button>
        </Box>
      </Flex>
      <RightDiscord />
      <FooterContent />
    </Flex>
  );
};

export default RightHandSide;
