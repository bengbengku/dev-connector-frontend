import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

const SearchInput = ({ user }) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? 'auto' : '600px'} mr={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" mb={1} />}
        />
        <Input
          color="gray.400"
          variant="filled"
          bg="brand.200"
          placeholder="Apa cari?"
          _placeholder={{ color: 'gray.400' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.800',
          }}
          fontSize="10pt"
          _focus={{
            outline: 'none',
            border: '1px solid',
          }}
          height="34px"
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
