import { Button, Flex, Icon, Stack, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { BsDiscord } from 'react-icons/bs';

const RightDiscord = () => {
  return (
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
        <Icon as={BsDiscord} fontSize={26} color="blue.600" mt={2} mr={1} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600} color="gray.600">
            Discord
          </Text>
          <Text color="gray.600" textAlign="justify">
            Tempat untuk berbagi tips, pengalaman dan apapun itu yang ada
            didalam dunia programming dengan anggota komunitas sebanyak 12K+
          </Text>
        </Stack>
      </Flex>
      <Link
        href="https://discord.gg/qzJ3YxeQ"
        style={{ width: '100%' }}
        isExternal
        _hover={{ textDecoration: 'none' }}
      >
        <Button height="30px" variant="solid" w="full">
          Yuk, Gabung
        </Button>
      </Link>
    </Flex>
  );
};

export default RightDiscord;
