import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import FooterContent from '../pageContent/FooterContent';

const RightPostUser = () => {
  return (
    <Box position="sticky" top="45px">
      <Flex
        direction="column"
        bg="white"
        borderRadius={4}
        cursor="pointer"
        p="12px"
        border="1px solid"
        borderColor="gray.300"
        mt={2}
      >
        <Flex mb={2}>
          <Stack spacing={2} fontSize="9pt" pl={2}>
            <Flex align="center">
              <Image
                boxSize="40px"
                display={{ base: 'none', md: 'unset' }}
                objectFit="cover"
                src="../../../images/CUY_CONNECTOR.png"
                alt="Cuy Connector"
                align="center"
                mr={2}
              />
              <Heading as="h3" size="lg" color="gray.600">
                Aturan Diskusi
              </Heading>
            </Flex>
            <Flex gap="5px">
              <Heading as="h1" size="xs" color="gray.600">
                1.
              </Heading>
              <Heading as="h1" size="xs" color="gray.600">
                Penyampaian kata yang sopan
              </Heading>
            </Flex>
            <Flex gap="5px">
              <Heading as="h1" size="xs" color="gray.600">
                2.
              </Heading>
              <Heading as="h1" size="xs" color="gray.600">
                Pembahasan seputar pengembangan website
              </Heading>
            </Flex>
            <Flex gap="5px">
              <Heading as="h1" size="xs" color="gray.600">
                3.
              </Heading>
              <Heading as="h1" size="xs" color="gray.600">
                Cek apakah ada duplikat pembahasan sebelum memposting
              </Heading>
            </Flex>
            <Flex gap="5px">
              <Heading as="h1" size="xs" color="gray.600">
                4.
              </Heading>
              <Heading as="h1" size="xs" color="gray.600">
                Tidak bersinggungan dengan hal-hal yang berbau SARA
              </Heading>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <FooterContent />
    </Box>
  );
};

export default RightPostUser;
