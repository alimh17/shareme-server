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
import { IoIosShareAlt } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import WarningModal from 'components/Post/Head/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { IMAGES_URL } = config;

interface Props {
  post: any;
}

const Head: React.FC<Props> = ({ post }): JSX.Element => {
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');
  const { onClose, isOpen, onOpen } = useDisclosure();

  const user = useSelector((state: any) => state.User.user);

  return (
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Link to={`/${post?.owner.name}`}>
            <Avatar
              name={post?.owner?.name}
              src={post?.owner.profile.slice(0, 4) === 'http' ? post?.owner.profile : IMAGES_URL + post?.owner.profile}
              loading="lazy"
            />
          </Link>
          <Box>
            <Link to={`/${post?.owner.name}`}>
              <Text fontSize="md" size="md" fontWeight="bold">
                {post?.owner.name}
              </Text>
              <Text fontSize="sm">{post?.location}</Text>
            </Link>
          </Box>
        </Flex>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<BsThreeDotsVertical />} variant="ghost" />
          <MenuList sx={{ zIndex: '1' }}>
            {user.username === post?.owner.name && (
              <MenuItem color="red.500" icon={<FaTrash fontSize={18} />} onClick={onOpen}>
                Delete
              </MenuItem>
            )}
            <MenuItem icon={<IoIosShareAlt fontSize={18} />}>Share</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WarningModal onClose={onClose} isOpen={isOpen} id={post._id} />
    </CardHeader>
  );
};

export default Head;
