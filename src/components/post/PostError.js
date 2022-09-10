import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

const PostError = ({ error, setError }) => {
  return (
    <Flex width="100%">
      <Alert status="error" color="gray.400" width="100%">
        <AlertIcon />
        <Box flexGrow={1}>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={() => setError('')}
          bg="gray.200"
          _hover={{ bg: 'gray.200' }}
        />
      </Alert>
    </Flex>
  );
};

export default PostError;
