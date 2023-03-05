import React, { useCallback, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import config from 'config/index.json';
import { useDropzone } from 'react-dropzone';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useFormik } from 'formik';
import SettingSchema from 'utils/SettingValidation';
import settingRequest from 'server/UserRequest/settingRequest';
import { initUser } from 'store/UserSlice';

const { IMAGES_URL } = config;

const Setting: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode();

  const user = useSelector((state: any) => state.User.user);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState<boolean>(false);

  const bioRef = useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: any) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    setSelectedImage(url);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    multiple: false,
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      bio: '',
    },
    validationSchema: SettingSchema,
    onSubmit: (values) => {
      settingRequest(values, acceptedFiles).then((res) => {
        dispatch(initUser(res.data));
        toast({
          title: 'Success',
          description: 'Updated profile information',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        });
      });
    },
  });

  return (
    <Container
      maxW={990}
      sx={{
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        boxShadow: colorMode === 'light' ? 'sm' : 'none',
        border: colorMode === 'light' ? '1px solid #eaeaea' : 'none',
        mt: '5',
        borderRadius: 'md',
      }}
      mb={{ base: '20', md: '5' }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex flexFlow="column" alignItems="center">
          <Heading as="h2" textAlign="center" p="5">
            Setting
          </Heading>
          <Flex
            sx={{
              border: '2px dashed #ccc',
              h: '20rem',
              w: '80%',
              borderRadius: '8px',
              flexFlow: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: '#ccc',
            }}
            {...getRootProps()}
          >
            <Avatar size="2xl" src={selectedImage ? selectedImage : IMAGES_URL + user?.profile} />
            <Heading as="h3" fontSize="lg" textAlign="center">
              Update profile Image
            </Heading>
            <Button>Select from device</Button>
            <input {...getInputProps()} />
          </Flex>
          <Center gap={5} w="80%" flexFlow={{ base: 'column', md: 'row' }}>
            <FormControl my={5}>
              <FormLabel>Name</FormLabel>
              <Input
                type="Text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                defaultValue={user.name}
                placeholder={user.name ? user.name : 'Whats your name?'}
              />
              {formik.errors.name && (
                <Text fontSize="sm" color="red.500" mt="2" position="absolute">
                  {formik.errors.name}
                </Text>
              )}
            </FormControl>
            <FormControl my={5}>
              <FormLabel>Lastname</FormLabel>
              <Input
                type="Text"
                placeholder={user.lastname ? user.lastname : 'Whats your Lastname?'}
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                defaultValue={user.lastname}
              />
              {formik.errors.lastname && (
                <Text fontSize="sm" color="red.500" mt="2" position="absolute">
                  {formik.errors.lastname}
                </Text>
              )}
            </FormControl>
          </Center>
          <FormControl my={5} w="80%" position="relative">
            <Box
              sx={{
                position: 'absolute',
                zIndex: '10',
                top: '20',
              }}
              right={{ base: '-10', md: '0' }}
            >
              {showEmojiPicker && (
                <EmojiPicker
                  theme={colorMode === 'dark' ? Theme.DARK : Theme.LIGHT}
                  lazyLoadEmojis={true}
                  onEmojiClick={({ emoji }) => {
                    formik.values.bio += emoji;
                  }}
                />
              )}
            </Box>
            <FormLabel>Bio</FormLabel>
            <InputGroup size="md">
              <Textarea
                placeholder={user.bio ? user.bio : 'Write something'}
                name="bio"
                resize="none"
                rows={8}
                value={formik.values.bio}
                onChange={formik.handleChange}
                ref={bioRef}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="Emoji"
                  icon={<BsEmojiSmile />}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  bg="inherit"
                />
              </InputRightElement>
            </InputGroup>
            {formik.errors.bio && (
              <Text fontSize="sm" color="red.500" mt="2" position="absolute">
                {formik.errors.bio}
              </Text>
            )}
          </FormControl>
          <Button colorScheme="blue" type="submit" sx={{ w: '60%', my: '5' }}>
            Submit
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default Setting;
