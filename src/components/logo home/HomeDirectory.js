import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { FcHome } from 'react-icons/fc';

const HomeDirectory = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0 6px"
        borderRadius={4}
        outline="1px solid"
        outlineColor="gray.300"
        mr={2}
        ml={{ base: 0, md: 2 }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: 'auto', lg: '200px' }}
        >
          <Flex align={{ base: 'flex-start', lg: 'center' }}>
            <Icon
              fontSize={24}
              mr={{ base: 1, md: 2 }}
              color="gray.500"
              as={FcHome}
            />
            <Flex display={{ base: 'none', lg: 'flex' }}>
              <Text color="brand.100" fontSize="10pt" fontWeight={600}>
                Beranda
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
    </Menu>
  );
};

export default HomeDirectory;
