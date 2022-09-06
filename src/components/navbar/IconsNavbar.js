import { Flex, Icon } from '@chakra-ui/react';
import {
  FcCollaboration,
  FcFaq,
  FcAdvertising,
  FcStart,
  FcSms,
} from 'react-icons/fc';
import { IoIosAddCircleOutline } from 'react-icons/io';
import React from 'react';

const IconsNavbar = ({ user }) => {
  return (
    <Flex alignItems="center">
      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.300"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.300' }}
        >
          <Icon as={FcCollaboration} color="tomato" fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.300' }}
        >
          <Icon as={FcFaq} color="tomato" fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.300' }}
        >
          <Icon as={FcStart} color="tomato" fontSize={20} />
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.300' }}
        >
          <Icon as={FcSms} color="tomato" fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.300' }}
        >
          <Icon as={FcAdvertising} color="tomato" fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.300' }}
          display={{ base: 'none', md: 'flex' }}
        >
          <Icon as={IoIosAddCircleOutline} color="gray.500" fontSize={22} />
        </Flex>
      </>
    </Flex>
  );
};

export default IconsNavbar;
