import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const OldCover = ({
  photo,
  isOpen,
  onClose,
  setCoverPicture,
  coverPicture,
}) => {
  const { user } = useSelector(state => ({ ...state }));
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.400"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Pilih Photo Cover</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed" isFitted>
              <TabList>
                <Tab fontWeight={600} borderBottom="none">
                  Photo Cover
                </Tab>
                <Tab fontWeight={600} borderBottom="none">
                  Photo Lainnya
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel display="flex" overflowY="auto" className="scrollbar">
                  <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    height="242px"
                    p={4}
                    ml={3}
                  >
                    {photo
                      ?.filter(
                        img => img.folder === `${user.username}/cover_pictures`
                      )
                      .map(pCover => (
                        <Image
                          src={pCover.secure_url}
                          key={pCover.public_id}
                          alt=""
                          w="100px"
                          height="100px"
                          objectFit="cover"
                          borderRadius={8}
                          cursor="pointer"
                          _hover={{ filter: 'brightness(110%)' }}
                          onClick={() => {
                            setCoverPicture(pCover.secure_url);
                            return onClose();
                          }}
                        />
                      ))}
                  </Box>
                </TabPanel>
                <TabPanel display="flex" overflowY="auto" className="scrollbar">
                  <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    height="242px"
                    p={4}
                    ml={3.3}
                  >
                    {photo
                      ?.filter(
                        img => img.folder !== `${user.username}/post_images`
                      )
                      .map(pCover => (
                        <Image
                          src={pCover.secure_url}
                          key={pCover.public_id}
                          alt=""
                          w="100px"
                          height="100px"
                          objectFit="cover"
                          borderRadius={8}
                          cursor="pointer"
                          _hover={{ filter: 'brightness(110%)' }}
                          onClick={() => {
                            setCoverPicture(pCover.secure_url);
                            return onClose();
                          }}
                        />
                      ))}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Button variant="ghost">Simpan</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OldCover;
