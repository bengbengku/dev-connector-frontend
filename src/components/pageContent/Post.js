import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { VscReactions } from 'react-icons/vsc';
import { IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5';
import './style.css';
import ReactsPopup from '../post/ReactsPopup';
import {
  getReacts,
  getReactsNoUserAuth,
  reactPost,
} from '../../functions/post';
import { useSelector } from 'react-redux';

const Post = ({ post, deleteHandler, postRef }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [isLargerThan409] = useMediaQuery('(max-width: 409px)');

  useEffect(() => {
    if (user) {
      getPostReacts();
    } else {
      getPostReactsNoUser();
    }
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReacts(post?._id, user.token);
    setReacts(res?.reacts);
    setCheck(res?.check);
    setTotal(res?.total);
  };
  const getPostReactsNoUser = async () => {
    const res = await getReactsNoUserAuth(post?._id);
    setReacts(res?.reacts);
    setTotal(res?.total);
  };

  const reactHandler = async type => {
    if (user) {
      reactPost(post?._id, type, user.token);
      if (check == type) {
        setCheck();
        let index = reacts.findIndex(x => x.react == check);
        if (index !== -1) {
          setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
          setTotal(prev => --prev);
        }
      } else {
        setCheck(type);
        let index = reacts.findIndex(x => x.react == type);
        let index1 = reacts.findIndex(x => x.react == check);
        if (index !== -1) {
          setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
          setTotal(prev => ++prev);
        }
        if (index1 !== -1) {
          setReacts([
            ...reacts,
            (reacts[index1].count = --reacts[index1].count),
          ]);
          setTotal(prev => --prev);
        }
      }
    } else {
      return dispatch({ type: 'LOGIN_SHOW', payload: true });
    }
  };

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
      <Flex direction="column" p={2} ref={postRef}>
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
          <Text
            color="gray.600"
            fontSize="12pt"
            textAlign="justify"
            width={`${
              isLargerThan409 && post?.user._id === user?.id ? '95%%' : ''
            }`}
          >
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
            <Flex align="center" gap="4px" mt={1}>
              {reacts &&
                reacts
                  .sort((a, b) => {
                    return b.count - a.count;
                  })
                  .slice(0, 3)
                  .map(
                    (react, i) =>
                      react.count > 0 && (
                        <img
                          key={i}
                          src={`../../../reacts/${react.react}.svg`}
                          alt=""
                          style={{ width: '18px' }}
                        />
                      )
                  )}
            </Flex>
            <Flex align="center">
              <Text color="gray.400" fontSize="9pt">
                {total > 0 && total}
              </Text>
            </Flex>
          </Flex>
        </Stack>
        <Flex ml={1} mb={1.5} color="gray.500" fontWeight={600} flexWrap="wrap">
          <Flex align="center" p="8px 10px" cursor="pointer">
            <ReactsPopup
              visible={visible}
              setVisible={setVisible}
              reactHandler={reactHandler}
            />
            <Flex
              onMouseOver={() => {
                setTimeout(() => {
                  setVisible(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setVisible(false);
                }, 500);
              }}
              onClick={() => reactHandler(check ? check : 'love')}
              alignItems="center"
            >
              <Icon
                as={VscReactions}
                fontSize={24}
                color={
                  check === 'love'
                    ? '#f63459'
                    : check === 'haha'
                    ? '#f7b125'
                    : check === 'sedih'
                    ? '#f7b125'
                    : check === 'wow'
                    ? '#f7b125'
                    : check === 'marah'
                    ? '#e4605a'
                    : 'gray.400'
                }
              />
              {check ? (
                <Text
                  color={
                    check === 'love'
                      ? '#f63459'
                      : check === 'haha'
                      ? '#f7b125'
                      : check === 'sedih'
                      ? '#f7b125'
                      : check === 'wow'
                      ? '#f7b125'
                      : check === 'marah'
                      ? '#e4605a'
                      : 'gray.400'
                  }
                  fontWeight="bold"
                  fontSize="9pt"
                >
                  {check}
                </Text>
              ) : (
                ''
              )}
            </Flex>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            cursor="pointer"
            flex={`${isLargerThan409 ? 'none' : 1}`}
          >
            <Icon as={BsChat} mr={2} _hover={{ color: 'gray.600' }} />
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
              onClick={() => deleteHandler(post?._id)}
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
