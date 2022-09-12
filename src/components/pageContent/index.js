import { Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { deletePost } from '../../functions/post';
import LeftHandSide from './LeftHandSide';
import Post from './Post';
import RightHandSide from './RightHandSide';

const PageContent = ({ posts, getAllPosts }) => {
  const { user } = useSelector(state => ({ ...state }));
  const postRef = useRef(null);
  useEffect(() => {
    getAllPosts();
  }, []);

  const deleteHandler = async post_id => {
    const res = await deletePost(post_id, user.token);
    if (res.status === 'ok') {
      postRef.current.remove();
    }
    getAllPosts();
  };

  return (
    <Flex justify="center" p="16px 0">
      <Flex width="95%" justify="center" maxWidth="960px">
        {/* left-side */}
        <Flex
          direction="column"
          w={{ base: '100%', md: '75%' }}
          mr={{ base: 0, md: 6 }}
        >
          <LeftHandSide user={user} />
          {posts?.map((post, i) => (
            <Post
              key={i}
              post={post}
              deleteHandler={deleteHandler}
              postRef={postRef}
            />
          ))}
        </Flex>
        {/* right-side */}
        <Flex
          direction="column"
          display={{ base: 'none', md: 'flex' }}
          width="350px"
        >
          <RightHandSide user={user} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
