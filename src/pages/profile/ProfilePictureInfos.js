import {
  Avatar,
  AvatarGroup,
  Badge,
  Flex,
  Icon,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { BsCameraFill, BsHandIndexThumbFill } from 'react-icons/bs';

const ProfilePictureInfos = ({ profile }) => {
  return (
    //profile-img-wrap
    <Flex
      align="center"
      position="relative"
      justify="space-between"
      p="0 1rem"
      zIndex={99}
      w="full"
    >
      {/* profile-w-left */}
      <Flex
        gap="1rem"
        p="1rem 13px 0 13px"
        w="full"
        direction={{ base: 'column', md: 'row' }}
      >
        {/* profile-w-img */}
        <Flex
          position="relative"
          top="-5rem"
          justify={{ base: 'center', md: '' }}
          transform={{ base: 'translateX(18px)' }}
        >
          {/* profile-w-bg */}
          <Flex
            backgroundSize="cover"
            bgImage={`${profile.picture}`}
            width="180px"
            height="180px"
            borderRadius="50%"
            backgroundRepeat="no-repeat"
            border="2px solid"
            borderColor="white"
            cursor="pointer"
            _hover={{ filter: 'brightness(95%)' }}
          ></Flex>

          <Flex
            w="36px"
            h="36px"
            transform="translate(-30px, 120px)"
            align="center"
            justify="center"
            bg="#e4e6eb"
            borderRadius="50%"
            cursor="pointer"
            border="2px solid"
            borderColor="white"
            _hover={{ filter: 'brightness(95%)' }}
          >
            <Icon as={BsCameraFill} color="#111" fontSize={22} />
          </Flex>
        </Flex>
        {/* profile-w-col */}
        <Flex
          transform={{ base: 'translateY(-72px)' }}
          align={{ base: 'center', md: 'flex-start' }}
        >
          {/* profile-name */}
          <Flex
            w="full"
            direction="column"
            align={{ base: 'center', md: 'flex-start' }}
          >
            <Text color="gray.800" fontWeight={600}>
              {profile.first_name} {profile.last_name}
            </Text>
            <Flex align="center" gap="3px">
              <Text>(Frontend Developer)</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* profile-w-left */}
    </Flex>
  );
};

export default ProfilePictureInfos;
