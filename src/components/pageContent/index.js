import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import LeftHandSide from './LeftHandSide';
import RightHandSide from './RightHandSide';

const PageContent = () => {
  const { user } = useSelector(state => ({ ...state }));
  return (
    <Flex justify="center" p="16px 0">
      <Flex width="95%" justify="center" maxWidth="960px">
        {/* left-side */}
        <Flex
          direction="column"
          w={{ base: '100%', md: '75%' }}
          mr={{ base: 0, md: 6 }}
        >
          <LeftHandSide user={user} />
        </Flex>
        {/* right-side */}
        <Flex
          direction="column"
          display={{ base: 'none', md: 'flex' }}
          flexGrow={1}
        >
          <RightHandSide />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
