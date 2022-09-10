import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../navbar';
import LeftFormUser from './LeftFormUser';

const PageFormUser = ({ posts, dispatch }) => {
  return (
    <>
      <Navbar />
      <Flex justify="center" p="16px 0">
        <Flex width="95%" justify="center" maxWidth="960px">
          {/* left-side */}
          <Flex
            direction="column"
            w={{ base: '100%', md: '75%' }}
            mr={{ base: 0, md: 6 }}
          >
            <LeftFormUser posts={posts} dispatch={dispatch} />
          </Flex>
          {/* right-side */}
          <Flex
            direction="column"
            display={{ base: 'none', md: 'flex' }}
            flexGrow={1}
          >
            Hello
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default PageFormUser;
