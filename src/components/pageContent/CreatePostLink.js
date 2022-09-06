import { Avatar, Flex, Icon, Input } from '@chakra-ui/react';
import React from 'react';
import { FcAddImage } from 'react-icons/fc';
import { BsLink45Deg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePostLink = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerToCreatePost = () => {
    if (!user) {
      dispatch({ type: 'LOGIN_SHOW', payload: true });
      return;
    }
    navigate(`/cuy/${user.username}/submit`);
  };
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      <Avatar
        size="sm"
        name={user ? user.username : 'Cuy Connector'}
        src={user ? user.picture : ''}
        mr={4}
        bg="gray.300"
      />
      <Input
        placeholder="Buat Postingan"
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'gray.400',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={handlerToCreatePost}
      />
      <Icon
        as={FcAddImage}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};

export default CreatePostLink;
