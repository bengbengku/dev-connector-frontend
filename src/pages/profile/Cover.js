import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Icon,
  Image,
  LightMode,
  Text,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { BsCameraFill, BsCloudUpload } from 'react-icons/bs';
import { MdOutlinePublic } from 'react-icons/md';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { uploadImages } from '../../functions/uploadImages';
import { updateCover } from '../../functions/user';
import useClickOutside from '../../helpers/clickOutside';
import getCroppedImg from '../../helpers/getCroppedImg';
import './style.css';

const Cover = ({ cover, profile, dispatch }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [isMaxWidth448px] = useMediaQuery('(max-width: 448px)');
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const menuRef = useRef(null);
  const refInput = useRef(null);
  const coverRef = useRef(null);
  useClickOutside(menuRef, () => {
    setShowCoverMenu(false);
  });

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
      setCoverPicture(event.target.result);
    };
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [widthCover, setWidthCover] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async show => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  useEffect(() => {
    setWidthCover(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const updateCoverImage = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then(b => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      const res = await uploadImages(formData, path, user.token);
      const update_picture = await updateCover(res[0].url, user.token);

      if (update_picture === 'ok') {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: { ...profile, cover: res[0].url },
        });
        setLoading(false);
        setCoverPicture('');
      } else {
        setLoading(false);
        setError(update_picture);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    /* profile-cover */
    <Flex
      position="relative"
      height="350px"
      w="100%"
      borderBottomLeftRadius="8px"
      borderBottomRightRadius="8px"
      ref={coverRef}
    >
      {coverPicture && (
        <LightMode>
          <Box
            display="flex"
            align="center"
            zIndex={9999}
            p={4}
            justifyContent="space-between"
            w="100%"
            background="rgba(0, 0, 0, 0.7)"
            height="60px"
            position="fixed"
            left="0"
          >
            <Box display="flex" gap={1} align="center">
              <MdOutlinePublic fontSize={22} color="white" />
              <Text
                color="white"
                fontSize={{ base: 'sm', md: 'md' }}
                transform={
                  isMaxWidth448px ? 'translateY(-1px)' : 'translateY(1px)'
                }
              >
                Cover photo anda berstatus public
              </Text>
            </Box>
            <Box display="flex" gap={2} ml={2}>
              <Button
                bg="#111"
                _hover={{ bg: '#1117' }}
                variant="solid"
                height="30px"
                onClick={() => setCoverPicture('')}
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                isLoading={loading}
                variant="solid"
                height="30px"
                onClick={() => updateCoverImage()}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </LightMode>
      )}
      {error && (
        <>
          <LightMode>
            <Alert
              status="error"
              textAlign="justify"
              colorScheme="red"
              margin="0 auto"
            >
              <AlertIcon />
              {error}
            </Alert>
          </LightMode>
        </>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleImage}
      />

      {coverPicture && (
        <Box className="cover_cropper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={widthCover / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </Box>
      )}
      {cover && !coverPicture && (
        <Box
          backgroundSize="cover"
          bgImage={`${cover}`}
          alt=""
          width="100%"
          borderBottomLeftRadius="8px"
          borderBottomRightRadius="8px"
          objectFit="cover"
        ></Box>
      )}

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
        ref={menuRef}
      >
        {/* open-cover-update */}
        <Flex
          onClick={() => setShowCoverMenu(prev => !prev)}
          cursor="pointer"
          w="200px"
          align="center"
          gap="5px"
          transform={{ base: 'translateY(-45px)', md: 'translateY(-15px)' }}
          p="5px"
          mr="8px"
          bg="white"
          borderRadius={8}
        >
          <Box display="flex" alignItems="center" pl="1rem" gap="2px">
            <Icon
              as={BsCameraFill}
              color="#111"
              fontSize={22}
              transform="scale(0.9)"
            />
            <Text color="gray.900" fontSize="10pt" fontWeight={600}>
              Tambah Cover Photo
            </Text>
          </Box>
        </Flex>
        {showCoverMenu && (
          // open-cover-menu
          <Flex
            direction="column"
            position="absolute"
            top={{ base: '-2px', md: '28px' }}
            right="1.8rem"
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
                onClick={() => {
                  setError('');
                  refInput.current.click();
                }}
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
