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
import FormRegister from './FormRegister';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const { registerModal } = useSelector(state => ({ ...state }));
  const closeModalHandler = () => {
    dispatch({ type: 'REGISTER_HIDE' });
  };
  return (
    <>
      <Modal isOpen={registerModal} onClose={closeModalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{registerModal && 'Daftar'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="full"
            >
              <FormRegister />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterModal;
