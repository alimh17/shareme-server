import React, { useState } from 'react';
import { Container, Heading, useColorMode } from '@chakra-ui/react';

import Files from './Files';
import Display from './Display';
import Form from './Form';
import Gourd from 'HOC/Guard';

interface InitialData {
  Files: [];
  Description: string;
  Location: string;
}

const AddPost: React.FC = (): JSX.Element => {
  const [active, setActive] = useState<string>('Files');
  const { colorMode } = useColorMode();

  //! This state hold URL for dispaly files
  const [filePaths, setFilePaths] = useState<{}[]>([]);

  //! This state hold data for send Request
  const [data, setData] = useState<InitialData>({
    Files: [],
    Description: '',
    Location: '',
  });

  const handleSetFilePaths = (file: []) => {
    //! Here set Data State for send Request
    const cpData = { ...data };
    cpData.Files = file;
    setData(cpData);

    //! Here create URl for display selected files
    const paths: any = {};
    file.forEach((item: any, index: number) => {
      const type = item.type.split('/')[0];
      if (type === 'image') {
        let path = URL.createObjectURL(item);
        paths[`image${index}`] = path;
      } else {
        let path = URL.createObjectURL(item);
        paths[`video${index}`] = path;
      }
    });

    setFilePaths([paths]);
  };

  const renderSwitch = () => {
    switch (active) {
      case 'File':
        return <Files onFilePaths={handleSetFilePaths} onAcitve={setActive} />;
      case 'Display':
        return <Display paths={filePaths} onAcitve={setActive} />;
      case 'Form':
        //? In this component request send
        return <Form onAcitve={setActive} onData={setData} data={data} />;
      default:
        return <Files onFilePaths={handleSetFilePaths} onAcitve={setActive} />;
    }
  };

  return (
    <Gourd>
      <Container
        sx={{
          maxWidth: 776,
          mt: 3,
          bg: colorMode === 'dark' ? 'dark800' : 'white',
          border: colorMode === 'light' && '1px solid #eaeaea',
          borderRadius: '8px',
          position: 'relative',
        }}
        centerContent
      >
        <Heading as="h2" p="5" fontSize="3xl">
          Add New Post
        </Heading>
        {renderSwitch()}
      </Container>
    </Gourd>
  );
};

export default AddPost;
