import { Flex, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const FooterContent = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      p="12px"
      border="1px solid"
      borderColor="gray.300"
      mt={2}
    >
      <Flex borderBottom="1px solid" borderColor="gray.200">
        <Stack spacing={2} fontSize="9pt" p={2}>
          <Link _hover={{ textDecoration: 'none' }} color="gray.500">
            Perjanjian Pengguna
          </Link>
          <Link _hover={{ textDecoration: 'none' }} color="gray.500">
            Kebijakan Konten
          </Link>
        </Stack>
        <Stack spacing={2} fontSize="9pt" p={2} marginLeft={6}>
          <Link _hover={{ textDecoration: 'none' }} color="gray.500">
            Kebijakan Pribadi
          </Link>
          <Link _hover={{ textDecoration: 'none' }} color="gray.500">
            Kode Etik
          </Link>
        </Stack>
      </Flex>
      <Text color="gray.500" mt={3} fontSize="9pt" textAlign="center">
        Cuy Connector © 2022. <br />
        Developed by - Anggiat Benget Napitupulu
      </Text>
    </Flex>
  );
};

export default FooterContent;
