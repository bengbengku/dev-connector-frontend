import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FcDocument, FcAddImage, FcBrokenLink } from 'react-icons/fc';
import ImageUpload from './imageUpload/ImageUpload';
import TabItems from './TabItems';
import TextInputs from './TextInputs';

const formTabs = [
  {
    title: 'Post',
    icon: FcDocument,
  },
  {
    title: 'Upload Photo',
    icon: FcAddImage,
  },
  {
    title: 'Link',
    icon: FcBrokenLink,
  },
];

const FormUser = () => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [picker, setPicker] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handlePostSubmit = async () => {
    try {
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
            setPicker={setPicker}
            picker={picker}
          />
        )}
        {selectedTab === 'Upload Photo' && <ImageUpload />}
      </Flex>
    </Flex>
  );
};

export default FormUser;
