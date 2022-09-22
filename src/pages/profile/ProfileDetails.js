import { Box, DarkMode, Flex } from '@chakra-ui/react';
import React from 'react';
import BioAndSkills from './BioAndSkills';

const ProfileDetails = ({ userName }) => {
  return (
    <>
      <DarkMode>
        <Flex
          maxWidth="945px"
          width="100%"
          margin="0 auto"
          direction={{ base: 'column', md: 'unset' }}
        >
          <BioAndSkills userName={userName} />
        </Flex>
      </DarkMode>
    </>
  );
};

export default ProfileDetails;
