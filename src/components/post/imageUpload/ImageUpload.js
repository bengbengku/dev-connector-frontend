import { Button, Flex } from '@chakra-ui/react';
import React, { useRef } from 'react';

const ImageUpload = () => {
  const inputRef = useRef(null);
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
        <Button variant="outline" height="28px">
          Upload
        </Button>
        <input ref={inputRef} type="file" hidden onChange={() => {}} />
      </Flex>
    </Flex>
  );
};

export default ImageUpload;
