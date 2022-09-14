import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Image,
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
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import getCroppedImg from '../../helpers/getCroppedImg';
import UpdateProfilePicture from './UpdateProfilePicture';
import { uploadImages } from '../../functions/uploadImages';
import { updateprofilePicture } from '../../functions/user';
import Cookies from 'js-cookie';
import './style.css';

const ProfilePicture = ({
  profilePictureRef,
  isOpen,
  onClose,
  pRef,
  photos,
  getProfile,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => ({ ...state }));
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const refInput = useRef(null);
  const slider = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async show => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfileImage = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then(b => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      const res = await uploadImages(formData, path, user.token);
      const update_picture = await updateprofilePicture(res[0].url, user.token);
      if (update_picture === 'ok') {
        setLoading(false);
        setImage('');
        pRef.current.style.backgroundImage = `url(${res[0].url})`;
        Cookies.set(
          'user',
          JSON.stringify({
            ...user,
            picture: res[0].url,
          })
        );
        dispatch({
          type: 'UPDATEPICTURE',
          payload: res[0].url,
        });
        getProfile();
        onClose();
      } else {
        setLoading(false);
        setError(update_picture);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleImage = e => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(
        `${
          file.name.length < 50
            ? `${file.name.substring(
                0,
                50
              )}. Format tidak didukung! hanya Jpeg, Png, Webp, Gif yang di izinkan.`
            : ` ${file.name.substring(
                0,
                50
              )}... format tidak didukung! hanya Jpeg, Png, Webp, Gif yang di izinkan.`
        } `
      );
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(
        `${
          file.name.length < 50
            ? `${file.name.substring(
                0,
                50
              )}. File size terlalu besar (Max 5MB).`
            : ` ${file.name.substring(
                0,
                50
              )}... file size terlalu besar (Max 5MB).`
        } `
      );

      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      setImage(event.target.result);
    };
  };
  return (
    <>
      <input
        type="file"
        hidden
        ref={refInput}
        onChange={handleImage}
        accept="image/jpeg,image/png,image/gif,image/webp"
      />
      <Modal
        finalFocusRef={profilePictureRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Photo Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {image ? (
              <UpdateProfilePicture
                image={image}
                setImage={setImage}
                setZoom={setZoom}
                slider={slider}
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                onCropComplete={onCropComplete}
                getCroppedImage={getCroppedImage}
              />
            ) : (
              <>
                {error && (
                  <>
                    <Alert status="error" textAlign="justify">
                      <AlertIcon />
                      {error}
                    </Alert>
                  </>
                )}
                <Box
                  mb={4}
                  p={1}
                  cursor="pointer"
                  align="center"
                  gap={1}
                  border="1px solid"
                  borderColor="#4C5563"
                  justify="center"
                  borderRadius={4}
                  _hover={{ bg: 'rgba(27, 26, 26, 0.475)' }}
                  onClick={() => {
                    refInput.current.click();
                    setError('');
                  }}
                >
                  <Flex align="center" gap={1} justify="center">
                    <BsCloudUpload fontSize={12} />
                    <Text fontWeight={600}>Upload Photo</Text>
                  </Flex>
                </Box>
                <Tabs variant="enclosed" isFitted>
                  <TabList>
                    <Tab fontWeight={600} borderBottom="none">
                      Photo Profile
                    </Tab>
                    <Tab fontWeight={600} borderBottom="none">
                      Photo Lainnya
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel
                      display="flex"
                      overflowY="auto"
                      className="scrollbar"
                    >
                      <Box
                        display="flex"
                        gap={2}
                        flexWrap="wrap"
                        height="242px"
                        p={4}
                        ml={3}
                      >
                        {photos
                          ?.filter(
                            img =>
                              img.folder === `${user.username}/profile_pictures`
                          )
                          .map(photo => (
                            <Image
                              src={photo.secure_url}
                              key={photo.public_id}
                              alt=""
                              w="100px"
                              height="100px"
                              objectFit="cover"
                              borderRadius={8}
                              cursor="pointer"
                              _hover={{ filter: 'brightness(110%)' }}
                              onClick={() => setImage(photo.secure_url)}
                            />
                          ))}
                      </Box>
                    </TabPanel>
                    <TabPanel
                      display="flex"
                      overflowY="auto"
                      className="scrollbar"
                    >
                      <Box
                        display="flex"
                        gap={2}
                        flexWrap="wrap"
                        height="242px"
                        p={4}
                        ml={3.3}
                      >
                        {photos
                          ?.filter(
                            img =>
                              img.folder !== `${user.username}/profile_pictures`
                          )
                          .map(photo => (
                            <Image
                              src={photo.secure_url}
                              key={photo.public_id}
                              alt=""
                              w="100px"
                              height="100px"
                              objectFit="cover"
                              borderRadius={8}
                              cursor="pointer"
                              _hover={{ filter: 'brightness(110%)' }}
                              onClick={() => setImage(photo.secure_url)}
                            />
                          ))}
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setImage('');
                setError('');
                onClose();
              }}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              variant="ghost"
              onClick={() => updateProfileImage()}
              isLoading={loading}
              disabled={image === '' && true}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePicture;
