import React from 'react';
import {
  Avatar,
  Box,
  CardHeader,
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import config from 'config/index.json';
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import WarningModal from 'components/Post/Head/Modal';

const { IMAGES_URL } = config;

interface Props {
  post: any;
}

const Head: React.FC<Props> = ({ post }): JSX.Element => {
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');
  const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name={post?.owner?.name} src={IMAGES_URL + post?.owner.profile} loading="lazy" />
          <Box>
            <Text fontSize="md" size="md" fontWeight="bold">
              {post?.owner.name}
            </Text>
            <Text fontSize="sm">{post?.location}</Text>
          </Box>
        </Flex>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<BsThreeDotsVertical />} variant="ghost" />
          <MenuList sx={{ zIndex: '1' }}>
            <MenuItem color="red.500" icon={<FaTrash fontSize={18} />} onClick={onOpen}>
              Delete
            </MenuItem>
            <MenuItem icon={<FiEdit fontSize={18} />}>Edit</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WarningModal onClose={onClose} isOpen={isOpen} id={post._id} />
    </CardHeader>
  );
};

export default Head;
