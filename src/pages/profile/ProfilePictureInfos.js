import { Box, Button, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { MdOutlineEditNote } from 'react-icons/md';
import ProfilePicture from '../../components/profilePicture';

const ProfilePictureInfos = ({ profile, photos, getProfile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profilePictureRef = React.useRef();
  const pRef = useRef(null);
  return (
    //profile-img-wrap
    <Flex
      align="center"
      position="relative"
      justify="space-between"
      p="0 1rem"
      zIndex={99}
      w="full"
      direction={{ base: 'column', md: 'row' }}
    >
      <ProfilePicture
        profilePictureRef={profilePictureRef}
        isOpen={isOpen}
        onClose={onClose}
        pRef={pRef}
        photos={photos}
        getProfile={getProfile}
      />
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
          transform={{ base: 'translateX(15px)' }}
        >
          {/* profile-w-bg */}
          <Flex
            ref={pRef}
            backgroundSize="cover"
            bgImage={`${profile.picture}`}
            width="180px"
            height="180px"
            borderRadius="50%"
            backgroundRepeat="no-repeat"
            border="3px solid"
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
            onClick={onOpen}
          >
            <Icon as={BsCameraFill} color="#111" fontSize={22} />
          </Flex>
        </Flex>
        {/* profile-w-col */}
        <Flex transform={{ base: 'translateY(-72px)' }} align="center">
          {/* profile-name */}
          <Flex w="full" direction="column" align={{ base: 'center', md: '' }}>
            <Text color="gray.800" fontWeight={600}>
              {profile.first_name} {profile.last_name}
            </Text>
            <Flex align="center" gap="3px">
              <Text>(Frontend Developer)</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* profile-w-right */}
      <Box
        display={{ base: 'column', md: 'flex' }}
        transform={{ base: 'translateY(-60px)', md: '' }}
      >
        <Button h="30px" leftIcon={<MdOutlineEditNote fontSize={22} />}>
          Edit Detail
        </Button>
      </Box>
    </Flex>
  );
};

export default ProfilePictureInfos;
