import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BsCameraFill, BsCloudUpload } from 'react-icons/bs';
import { MdAddPhotoAlternate } from 'react-icons/md';
import useClickOutside from '../../helpers/clickOutside';

const Cover = ({ cover }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setShowCoverMenu(false);
  });

  return (
    /* profile-cover */
    <Flex
      position="relative"
      height="350px"
      w="100%"
      borderBottomLeftRadius="8px"
      borderBottomRightRadius="8px"
      ref={menuRef}
    >
      {cover && <Image src={cover} alt="" />}

      {/* update-cover-wrapper */}
      <Flex
        direction="column"
        p="7px 15px"
        align="flex-end"
        gap="10px"
        bottom="1rem"
        left="1rem"
        position="absolute"
        w="full"
      >
        {/* open-cover-update */}
        <Flex
          onClick={() => setShowCoverMenu(prev => !prev)}
          cursor="pointer"
          w="200px"
          align="center"
          gap="5px"
          transform={{ base: 'translateY(-45px)', md: '' }}
        >
          <Icon
            as={BsCameraFill}
            color="#111"
            fontSize={22}
            transform="scale(0.9)"
          />
          <Text color="gray.900" fontSize="10pt" fontWeight={600}>
            Tambah Cover Photo
          </Text>
        </Flex>
        {showCoverMenu && (
          // open-cover-menu
          <Flex
            direction="column"
            position="absolute"
            top={{ base: '-7px', md: '-10px' }}
            right="2rem"
            w="190px"
            bg="white"
            px={2}
            boxShadow="0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)"
            zIndex={9999}
            borderRadius={4}
          >
            {/* open-cover-menu-item */}
            <Flex gap="5px" p={1} cursor="pointer">
              <Icon as={MdAddPhotoAlternate} color="gray.500" fontSize={22} />
              <Text
                color="gray.500"
                fontSize="10pt"
                fontWeight={600}
                transform="translateX(1.2px)"
                _hover={{ color: 'gray.700' }}
              >
                Pilih Photo
              </Text>
            </Flex>
            <Flex gap="5px" p={1} cursor="pointer">
              <Icon as={BsCloudUpload} color="gray.500" fontSize={22} />
              <Text
                color="gray.500"
                fontSize="10pt"
                fontWeight={600}
                transform="translateX(1.2px)"
                _hover={{ color: 'gray.700' }}
              >
                Upload Photo
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Cover;
