import { Avatar, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  getRootProps: any;
  getInputProps: any;
  profilePath: string;
}

const Profile: React.FC<Props> = ({ getRootProps, getInputProps, profilePath }): JSX.Element => {
  return (
    <Flex {...getRootProps()}>
      <input {...getInputProps()} />
      <Avatar w="24" h="24" _hover={{ cursor: 'pointer' }} src={profilePath} />
    </Flex>
  );
};

export default Profile;
