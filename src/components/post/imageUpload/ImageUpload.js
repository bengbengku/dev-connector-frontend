import { Button, Flex } from '@chakra-ui/react';
import React, { useRef } from 'react';
import ImagesPics from './ImagesPics';

const ImageUpload = ({ images, setImages, setError }) => {
  const imageInputRef = useRef(null);
  const handleChangeImage = e => {
    let files = Array.from(e.target.files);
    files.forEach(img => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp' &&
        img.type !== 'image/gif'
      ) {
        setError(
          `${img.name} format tidak didukung! hanya Jpeg, Png, Webp, Gif yang di izinkan.`
        );
        files = files.filter(item => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} file size terlalu besar (Max 5MB).`);
        files = files.filter(item => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = readerEvent => {
          setImages(images => [...images, readerEvent.target.result]);
        };
      }
    });
  };
  return (
    <Flex justify="center" align="center" width="100%" color="gray.400">
      <Flex
        justify="center"
        align="center"
        p={20}
        border="1px dashed"
        borderColor="gray.300"
        width="100%"
        borderRadius="4px"
      >
        {images && images.length ? (
          <ImagesPics
            setImages={setImages}
            images={images}
            imageInputRef={imageInputRef}
          />
        ) : (
          <Button
            variant="outline"
            height="28px"
            onClick={() => {
              imageInputRef.current.click();
            }}
          >
            Upload
          </Button>
        )}

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          multiple
          onChange={handleChangeImage}
        />
      </Flex>
    </Flex>
  );
};

export default ImageUpload;
