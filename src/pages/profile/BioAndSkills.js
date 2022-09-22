import {
  Badge,
  Box,
  Button,
  Container,
  DarkMode,
  Divider,
  Flex,
  Heading,
  Icon,
  LightMode,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BsDiscord } from 'react-icons/bs';
import React from 'react';
import { useSelector } from 'react-redux';

const BioAndSkills = ({ userName }) => {
  const { user } = useSelector(state => ({ ...state }));

  return (
    <>
      <Flex w="full" justify="center">
        <Flex direction="column" p={4}>
          <Flex align="center" p={2}>
            <Text fontSize="22" fontWeight={600} color="blackAlpha.900">
              Bio dan Keahlian
            </Text>
            <ChevronRightIcon
              fontSize="2xl"
              transform="translateY(3.1px)"
              color="blackAlpha.900"
            />
            <Text fontSize="22" fontWeight={600} color="blackAlpha.900">
              {userName.charAt(0).toUpperCase() + userName.slice(1)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default BioAndSkills;
