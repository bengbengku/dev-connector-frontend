import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import FormUser from './FormUser';

const LeftFormUser = () => {
  return (
    <>
      <Box p="14px 0" borderBottom="1px solid" borderColor="white">
        <Text color="brand.100">Buat Postingan</Text>
      </Box>
      <FormUser />
    </>
  );
};

export default LeftFormUser;
