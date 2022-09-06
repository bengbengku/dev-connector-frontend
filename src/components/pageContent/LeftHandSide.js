import { Text } from '@chakra-ui/react';
import React from 'react';
import CreatePostLink from './CreatePostLink';

const LeftHandSide = ({ user }) => {
  return (
    <>
      <CreatePostLink user={user} />
    </>
  );
};

export default LeftHandSide;
