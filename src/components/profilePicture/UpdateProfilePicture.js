import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowGoBackFill, RiCrop2Line } from 'react-icons/ri';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import Cropper from 'react-easy-crop';

const UpdateProfilePicture = ({
  image,
  setImage,
  setZoom,
  slider,
  crop,
  zoom,
  setCrop,
  onCropComplete,
  getCroppedImage,
}) => {
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  return (
    <>
      <Box
        mb={4}
        p={1}
        cursor="pointer"
        align="center"
        gap={1}
        justify="flex-start"
        borderRadius={4}
        onClick={() => {
          setImage('');
          //   refInput.current.click();
        }}
      >
        <Flex align="center" gap={1}>
          <RiArrowGoBackFill fontSize={12} />
          <Text fontWeight={600}>Kembali</Text>
        </Flex>
      </Box>
      <Box
        display="flex"
        position="relative"
        h="400px"
        w="100%"
        align="center"
        justify="center"
      >
        <Box
          position="relative"
          display="flex"
          justify="center"
          h="300px"
          w="100%"
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
            cropShape="round"
          />
          <Box
            display="flex"
            position="absolute"
            w="100%"
            gap={1}
            bottom="-35px"
            alignItems="center"
          >
            <Box p={1} onClick={() => zoomOut()} cursor="pointer">
              <AiFillMinusSquare fontSize={24} />
            </Box>
            <input
              type="range"
              min={1}
              max={3}
              step={0.2}
              ref={slider}
              value={zoom}
              onChange={e => setZoom(e.target.value)}
              style={{ width: '100%' }}
            />
            <Box p={1} onClick={() => zoomIn()} cursor="pointer">
              <AiFillPlusSquare fontSize={24} />
            </Box>
          </Box>
          <Box
            display="flex"
            gap={1}
            alignItems="flex-end"
            p={2}
            justifyContent="flex-end"
          >
            <Button
              color="white"
              variant="outline"
              height="30px"
              borderColor="white"
              leftIcon={<RiCrop2Line />}
              borderRadius={8}
              border="none"
              onClick={() => getCroppedImage('show')}
            >
              Crop Photo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProfilePicture;
