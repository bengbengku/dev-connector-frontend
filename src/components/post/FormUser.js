import { Flex, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FcDocument, FcAddImage, FcBrokenLink } from 'react-icons/fc';
import { createPost } from '../../functions/post';
import ImageUpload from './imageUpload/ImageUpload';
import TabItems from './TabItems';
import TextInputs from './TextInputs';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { useSelector } from 'react-redux';
import { uploadImages } from '../../functions/uploadImages';
import PostError from './PostError';
import { useNavigate } from 'react-router-dom';

const formTabs = [
  {
    title: 'Post',
    icon: FcDocument,
  },
  {
    title: 'Upload Photo',
    icon: FcAddImage,
  },
];

const FormUser = ({ posts, dispatch }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => ({ ...state }));
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [picker, setPicker] = useState(false);
  const [title, setTitle] = useState('');
  const [titleRemaining, setTitleRemaining] = useState(100);
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const toast = useToast();

  const handleTitleChange = e => {
    if (e.target.value.length > 100) return;
    setTitle(e.target.value);
    setTitleRemaining(100 - e.target.value.length);
  };

  const handlePostSubmit = async () => {
    try {
      if (images && images.length) {
        setLoading(true);
        const postImages = images.map(img => {
          return dataURItoBlob(img);
        });
        const path = `${user.username}/post_images`;
        let formData = new FormData();
        formData.append('path', path);
        postImages.forEach(image => {
          formData.append('file', image);
        });
        const response = await uploadImages(formData, path, user.token);
        const res = await createPost(
          title,
          text,
          response,
          null,
          user.id,
          user.token
        );
        setLoading(false);
        if (res.status === 'ok') {
          dispatch({
            type: 'POSTS_SUCCESS',
            payload: [response.data, ...posts],
          });
          setText('');
          setTitle('');
          setImages([]);
          toast({
            title: 'Postingan cuy connector.',
            description: `Hai👋 ${res.data.user.username} postingan kamu berhasil ditambahkan.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
          navigate('/');
        } else {
          setError(res);
        }
      } else if (title && text) {
        setLoading(true);
        const res = await createPost(
          title,
          text,
          null,
          null,
          user.id,
          user.token
        );
        setLoading(false);
        if (res.status === 'ok') {
          dispatch({
            type: 'POSTS_SUCCESS',
            payload: [res.data, ...posts],
          });
          setText('');
          setTitle('');
          toast({
            title: 'Postingan cuy connector.',
            description: `Hai👋 ${res.data.user.username} postingan kamu berhasil ditambahkan.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
          navigate('/');
        } else {
          setLoading(false);
          setError(res);
        }
      } else {
        console.log('Nothing!');
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, i) => (
          <TabItems
            tab={item}
            key={i}
            keyIndex={i}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      {error && <PostError error={error} setError={setError} />}
      <Flex p={4}>
        {selectedTab === 'Post' && (
          <TextInputs
            loading={loading}
            setLoading={setLoading}
            error={error}
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            handlePostSubmit={handlePostSubmit}
            handleTitleChange={handleTitleChange}
            titleRemaining={titleRemaining}
            setPicker={setPicker}
            picker={picker}
          />
        )}
        {selectedTab === 'Upload Photo' && (
          <ImageUpload
            images={images}
            setImages={setImages}
            setError={setError}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default FormUser;
