import {
  VStack,
  Text,
  Highlight,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Flex,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

const loginInfos = {
  email: '',
  password: '',
};

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const errRef = useRef(null);
  const toast = useToast();

  const openRegisterModal = () => {
    dispatch({ type: 'LOGIN_SHOW', payload: false });
    dispatch({ type: 'REGISTER_SHOW', payload: true });
  };

  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    setError('');
  };

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN_HIDE' });
      toast({
        title: 'Member cuy connector.',
        description: `Hai👋 selamat datang ${data.first_name}.`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    errRef.current.focus();
  }, []);

  return (
    <>
      <VStack w="full" alignItems="flex-start" pb={4}>
        <Text fontSize="xs">
          <Highlight
            query={['Perjanjian Pengguna', 'Kebijakan Privasi']}
            styles={{ color: 'pink.200' }}
          >
            Dengan melanjutkan, Anda menyetujui Perjanjian Pengguna dan
            Kebijakan Privasi kami.
          </Highlight>
        </Text>
        <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="cuy@connector.com"
                _placeholder={{ color: 'gray.400', fontSize: '12px' }}
                type="email"
                name="email"
                required
                onChange={handleLoginChange}
                ref={errRef}
                fontSize="10pt"
                _hover={{
                  bg: 'gray.600',
                  border: '1px solid',
                  borderColor: 'blue.600',
                }}
                _focus={{
                  outline: 'none',
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  required
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="password"
                  fontSize="10pt"
                  _placeholder={{ color: 'gray.400', fontSize: '12px' }}
                  onChange={handleLoginChange}
                  _hover={{
                    bg: 'gray.600',
                    border: '1px solid',
                    borderColor: 'blue.600',
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                />
                <InputRightElement width="2.5rem">
                  <Flex
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    alignItems="center"
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            {error ? (
              <Text fontSize="xs" color="pink.200" w="100%" align="center">
                {error}
              </Text>
            ) : (
              ''
            )}
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              w="full"
              size={{ base: 'md', md: 'lg' }}
              onClick={() => {
                loginSubmit();
              }}
              isLoading={loading}
            >
              Log In
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Flex alignItems="center">
              <Text
                fontSize="sm"
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Lupa password?
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={2}>
            <Flex gap={1}>
              <Text fontSize="sm">Belum punya akun?</Text>
              <Text
                fontSize="sm"
                color="pink.200"
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={openRegisterModal}
              >
                Daftar
              </Text>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default FormLogin;
