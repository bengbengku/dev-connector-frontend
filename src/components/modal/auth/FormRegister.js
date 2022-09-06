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
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import Cookies from 'js-cookie';

const userInfos = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  gender: '',
};

const FormRegister = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [user, setUser] = useState(userInfos);
  const [confPassword, setConfPassword] = useState('');
  const { first_name, last_name, gender, email, password } = user;
  const errRef = useRef(null);
  const toast = useToast();

  const openLoginModal = () => {
    dispatch({ type: 'LOGIN_SHOW', payload: true });
    dispatch({ type: 'REGISTER_SHOW', payload: false });
  };

  const handleRegisterChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError('');
  };

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      setLoading(true);
      if (password !== confPassword) {
        setLoading(false);
        return setError('Cuy! password tidak cocok.');
      } else {
        setError('');
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          gender,
          email,
          password,
        }
      );

      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      dispatch({ type: 'REGISTER_HIDE' });
      setLoading(false);
      toast({
        title: 'Member cuy connector.',
        description: `Hai👋 selamat bergabung ${data.first_name}.`,
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
              <FormLabel>Nama Depan</FormLabel>
              <Input
                placeholder="Jhon"
                _placeholder={{ color: 'gray.400', fontSize: '12px' }}
                type="text"
                name="first_name"
                required
                onChange={handleRegisterChange}
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
              <FormLabel>Nama Belakang</FormLabel>
              <Input
                placeholder="Doe"
                _placeholder={{ color: 'gray.400', fontSize: '12px' }}
                type="text"
                name="last_name"
                required
                onChange={handleRegisterChange}
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
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="cuy@connector.com"
                _placeholder={{ color: 'gray.400', fontSize: '12px' }}
                type="email"
                name="email"
                required
                onChange={handleRegisterChange}
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
                  onChange={handleRegisterChange}
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
          <GridItem colSpan={colSpan}>
            <Stack
              direction={{ base: 'column-reverse', md: 'row' }}
              w="full"
              gap={2}
            >
              <RadioGroup name="gender" size="sm">
                <Stack
                  direction="row"
                  alignItems={{ base: 'flex-start', md: 'center' }}
                  justifyContent={{ base: 'flex-start', md: 'center' }}
                  mt={{ base: '', md: 3 }}
                >
                  <Radio
                    value="Pria"
                    colorScheme="red"
                    onChange={handleRegisterChange}
                  >
                    Pria
                  </Radio>
                  <Radio
                    value="Wanita"
                    colorScheme="red"
                    onChange={handleRegisterChange}
                  >
                    Wanita
                  </Radio>
                  <Radio
                    value="Privasi"
                    colorScheme="red"
                    onChange={handleRegisterChange}
                  >
                    Privasi
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormControl>
                <InputGroup size="md">
                  <Input
                    name="re_password"
                    required
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="ulangi password"
                    fontSize="10pt"
                    width="100vw"
                    _placeholder={{ color: 'gray.400', fontSize: '12px' }}
                    onChange={e => setConfPassword(e.target.value)}
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
            </Stack>
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
                registerSubmit();
              }}
              isLoading={loading}
            >
              Daftar
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Flex gap={1} justify="center">
              <Text fontSize="sm">Sudah punya akun?</Text>
              <Text
                fontSize="sm"
                color="pink.200"
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={openLoginModal}
              >
                Log In
              </Text>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default FormRegister;
