import React from 'react';
import { FormControl, FormLabel, Input, Box, IconButton, Button, useToast } from '@chakra-ui/react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { postRequest } from 'server/PostRequest/postRequest';
import { validationPost } from 'utils/PostValidation';
import { useNavigate } from 'react-router-dom';

import Emoji from './Emoji';
import Description from './Description';

interface FormProps {
  onAcitve: (active: string) => void;
  onData: any;
  data: any;
}

const Form: React.FC<FormProps> = ({ onAcitve, onData, data }): JSX.Element => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState<boolean>(false);
  const [descriptionValue, setDescriptionValue] = React.useState<string>('');

  const toast = useToast();
  const navigate = useNavigate();

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const cpData = { ...data };
    setDescriptionValue(event.target.value);
    cpData.Description = descriptionValue;
    onData(cpData);
  };

  const handleClickEmoji = (selected: any) => {
    const cpData = { ...data };
    setDescriptionValue((current) => current + selected.emoji);
    cpData.Description = descriptionValue;
    onData(cpData);
  };

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const cpData = { ...data };
    cpData.Location = event.target.value;
    onData(cpData);
  };

  const handleSendRequest = async () => {
    const valid: any = await validationPost(data, toast);
    if (valid) {
      const res = await postRequest(data, toast, navigate);
    }
  };
  return (
    <>
      <Box
        sx={{ position: 'relative', display: 'flex', flexFlow: 'column', alignItems: 'center' }}
        w={{ base: '90%', md: '60%' }}
      >
        <Description toggle={handleToggleEmojiPicker} value={descriptionValue} onChange={handleChangeDescription} />
        <FormControl my={5}>
          <FormLabel>Location</FormLabel>
          <Input type="Text" placeholder="Write your location" name="Location" onChange={handleChangeLocation} />
        </FormControl>
        <Button colorScheme="blue" w="100%" my="5" onClick={handleSendRequest}>
          Share
        </Button>
        <Emoji show={showEmojiPicker} onClick={handleClickEmoji} />
      </Box>
      <IconButton
        aria-label="Prev"
        icon={<HiOutlineArrowLeft />}
        sx={{ position: 'absolute', top: '2', left: '2' }}
        onClick={() => onAcitve('Display')}
      />
    </>
  );
};

export default Form;
