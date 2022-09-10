import React from 'react';
import PageFormUser from '../../components/post/PageFormUser';

const CreatePost = ({ posts, dispatch }) => {
  return <PageFormUser posts={posts} dispatch={dispatch} />;
};

export default CreatePost;
