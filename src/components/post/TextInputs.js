import React, { useEffect, useRef, useState } from 'react';
import {
  Stack,
  Input,
  Textarea,
  Flex,
  Button,
  border,
  Icon,
  InputGroup,
  InputRightElement,
  Badge,
  Text,
} from '@chakra-ui/react';
import { VscSmiley } from 'react-icons/vsc';
import Picker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import useClickOutside from '../../helpers/clickOutside';

const TextInputs = ({
  loading,
  setLoading,
  error,
  title,
  text,
  setTitle,
  setText,
  handlePostSubmit,
  setPicker,
  picker,
}) => {
  const textRef = useRef(null);
  const emojiRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const textTemp = start + emoji + end;
    setText(textTemp);
    setCursorPosition(start.length + emoji.length);
  };

  useClickOutside(emojiRef, () => {
    setPicker(false);
  });

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  return (
    <Stack spacing={3} width="100%">
      <InputGroup>
        <Input
          name="title"
          fontSize="10pt"
          borderRadius={4}
          placeholder="Tuliskan judul"
          variant="solid"
          bg="gray.200"
          _placeholder={{ color: 'gray.400', fontSize: '12px' }}
          color="gray.500"
          _hover={{
            bg: 'gray.300',
          }}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Stack direction="row">
            <Badge variant="subtle" color="gray.400">
              0/300
            </Badge>
          </Stack>
        </InputRightElement>
      </InputGroup>
      <Textarea
        name="text"
        ref={textRef}
        fontSize="10pt"
        height="100px"
        borderRadius={4}
        placeholder="Tuliskan postingan"
        variant="solid"
        value={text}
        bg="gray.200"
        _placeholder={{ color: 'gray.400', fontSize: '12px' }}
        color="gray.500"
        _hover={{
          bg: 'gray.300',
        }}
        onChange={e => setText(e.target.value)}
      />
      <Flex justify="flex-end" align="center">
        <Flex _hover={{ cursor: 'pointer', fontWeight: 700 }} ref={emojiRef}>
          <Text
            color="gray.500"
            fontSize="9pt"
            _hover={{ fontWeight: 700 }}
            ml="1rem"
            onClick={() => setPicker(prev => !prev)}
          >
            emoji
          </Text>
          <Icon
            as={VscSmiley}
            color="gray"
            fontSize={20}
            filter="invert(80%)"
            onClick={() => setPicker(prev => !prev)}
          />
          <Flex
            position="relative"
            justify="center"
            zIndex={999}
            right="-0.5rem"
            bottom="0"
          >
            {picker && <Picker onEmojiClick={handleEmoji} />}
          </Flex>
        </Flex>
      </Flex>
      <Flex justify="flex-end">
        <Link to="/">
          <Button
            height="34px"
            padding="0 30px"
            disabled={loading}
            isLoading={loading}
            variant="outline"
            mr={1}
          >
            Cancel
          </Button>
        </Link>
        <Button
          height="34px"
          padding="0 30px"
          disabled={loading}
          isLoading={loading}
          _hover={{ bg: !loading ? 'gray.500' : '' }}
          onClick={() => {
            handlePostSubmit();
          }}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
