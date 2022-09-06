import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';

const TabItems = ({ tab, selected, setSelectedTab, keyIndex }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0"
      cursor="pointer"
      fontWeight={700}
      _hover={{
        bg: 'gray.200',
        borderRadius:
          keyIndex === 0 ? '4px 0 0 0' : keyIndex === 2 ? '0 4px 0 0' : '',
      }}
      color={selected ? 'blue.500' : 'gray.500'}
      borderWidth={selected ? '0 1px 3px 0' : '0 1px 1px 0'}
      borderBottomColor={selected ? 'brand.100' : 'gray.200'}
      borderRightColor="gray.300"
      onClick={() => {
        setSelectedTab(tab.title);
      }}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={tab.icon} />
      </Flex>
      <Text color="gray.400" fontSize="10pt">
        {tab.title}
      </Text>
    </Flex>
  );
};

export default TabItems;
