import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormLogin from './FormLogin';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { loginModal } = useSelector(state => ({ ...state }));
  const closeModalHandler = () => {
    dispatch({ type: 'LOGIN_HIDE' });
  };
  return (
    <>
      <Modal isOpen={loginModal} onClose={closeModalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{loginModal && 'Log In'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="full"
            >
              <FormLogin />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
