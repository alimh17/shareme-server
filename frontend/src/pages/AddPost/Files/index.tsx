import React, { useCallback } from 'react';
import { Box, Button, Flex, Heading, List, ListIcon, ListItem } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { MdCheckCircle, MdOutlinePermMedia } from 'react-icons/md';

interface FilesProps {
  onFilePaths: (file: []) => void;
  onAcitve: (active: string) => void;
}

const Files: React.FC<FilesProps> = ({ onFilePaths, onAcitve }) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    onFilePaths(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'video/mp4': [],
    },
  });

  return (
    <Flex
      sx={{
        h: '100%',
        w: '100%',
        m: 'auto',
        flexFlow: 'column',
        alignItems: 'center',
        my: '5',
        position: 'relative',
      }}
    >
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
        <MdOutlinePermMedia fontSize={35} />
        <Heading as="h3" fontSize="lg" textAlign="center">
          Drag photos and videos here
        </Heading>
        <Button>Select from device</Button>
        <input {...getInputProps()} />
      </Flex>
      <List spacing={3} mt="12" w="100%" p="5">
        {acceptedFiles.map((file: any) => (
          <ListItem key={file.path}>
            <ListIcon as={MdCheckCircle} color="green.500" />
            {file.name}
          </ListItem>
        ))}
      </List>
      <Button
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
        colorScheme="blue"
        isDisabled={acceptedFiles.length === 0 && true}
        onClick={() => onAcitve('Display')}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Files;
