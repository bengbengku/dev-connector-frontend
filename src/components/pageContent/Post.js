import { Flex, Icon, Stack, Text, Image } from '@chakra-ui/react';
import Moment from 'react-moment';
import React, { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat, BsDot } from 'react-icons/bs';
import { IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5';
import './style.css';

const Post = ({ post, user }) => {
  return (
    <Flex
      border="1px solid"
      borderColor="gray.400"
      bg="white"
      mb={2}
      borderRadius={4}
      _hover={{ borderColor: 'gray.500' }}
      cursor="pointer"
    >
      <Flex direction="column" p={2}>
        <Stack spacing={1} p="10px" w="100%">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            <Text color="gray.400">
              Di posting oleh cuy/{post?.user?.username}{' '}
              <Moment fromNow interval={30} local>
                {post?.createdAt}
              </Moment>
            </Text>
          </Stack>
          <Text color="gray.600" fontSize="12pt" fontWeight={600}>
            {post?.title}
          </Text>
          <Text color="gray.600" fontSize="12pt" textAlign="justify">
            {post?.text.length > 160
              ? `${post?.text.substring(0, 160)}...`
              : post?.text}
          </Text>
          {post?.images && post?.images?.length && (
            <Flex direction="column" justify="center" align="center">
              <div
                className={
                  post.images.length === 1
                    ? 'grid_1'
                    : post.images.length === 2
                    ? 'grid_2'
                    : post.images.length === 3
                    ? 'grid_3'
                    : post.images.length === 4
                    ? 'grid_4'
                    : post.images.length >= 5 && 'grid_5'
                }
              >
                {post.images.slice(0, 5).map((img, i) => (
                  <img
                    src={img.url}
                    alt="Posting Gambar"
                    key={i}
                    className={`img-${i}`}
                  />
                ))}
                {post.images.length > 5 && (
                  <div className="more-pics-shadow">
                    +{post.images.length - 5}
                  </div>
                )}
              </div>
            </Flex>
          )}
          <Flex align="center" gap="5px" justify="flex-end">
            <Flex align="center" gap="1px">
              Hel
            </Flex>
          </Flex>
        </Stack>
        <Flex ml={1} mb={1.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text color="gray.400" fontWeight="normal" fontSize="10pt">
              100
            </Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text color="gray.400" fontWeight="normal" fontSize="10pt">
              Bagikan
            </Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text color="gray.400" fontWeight="normal" fontSize="10pt">
              Simpan
            </Text>
          </Flex>
          {user?.id === post?.user?._id && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: 'gray.200' }}
              cursor="pointer"
            >
              <Icon as={AiOutlineDelete} mr={2} />
              <Text color="gray.400" fontWeight="normal" fontSize="10pt">
                Hapus
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
