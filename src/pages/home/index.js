import React from 'react';
import PageContent from '../../components/pageContent';
import Navbar from '../../components/navbar';

const Home = ({ posts, getAllPosts }) => {
  return (
    <>
      <Navbar />
      <PageContent posts={posts} getAllPosts={getAllPosts} />
    </>
  );
};

export default Home;
