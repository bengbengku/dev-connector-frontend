import {
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import './style.css';

const ImagesPics = ({ images, setImages, imageInputRef }) => {
  return (
    <div className="add_pics_inside1 p0 scrollbar">
      <div className="action_wrapper">
        <div className="preview_actions">
          <ButtonGroup
            size="sm"
            isAttached
            variant="outline"
            onClick={() => {
              imageInputRef.current.click();
            }}
          >
            <Button>Tambahkan Photo</Button>
            <IconButton aria-label="Add to friends" icon={<AddIcon />} />
          </ButtonGroup>
        </div>
        <CloseButton
          size="sm"
          color="gray.600"
          bg="gray.300"
          _hover={{ bg: 'gray.300', color: 'gray.800' }}
          mt="3px"
          alignItems="center"
          onClick={() => setImages([])}
          zIndex={999}
          mr={1}
        />
      </div>
      <div
        className={
          images.length === 1
            ? 'preview1'
            : images.length === 2
            ? 'preview2'
            : images.length === 3
            ? 'preview3'
            : images.length === 4
            ? 'preview4 '
            : images.length === 5
            ? 'preview5'
            : images.length % 2 === 0
            ? 'preview6'
            : 'preview6 singular_grid'
        }
      >
        {images?.map((img, i) => (
          <img src={img} key={i} alt="Upload Gambar" />
        ))}
      </div>
    </div>
  );
};

export default ImagesPics;
