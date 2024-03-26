import React, { useState } from 'react'; // Import React and useState hook
import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddCategory from '../Pages/Form/AddCategory'; // Import AddCategory component
import AddFood from '../Pages/Form/AddFood';

const Links = ['home', ];

const NavLink = (props:any) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={`/${children}`}
    >
      {children}
    </Box>
  );
}

export default function WithAction() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const isFoodPage = location.pathname.includes('/food');
  const isHomePage = location.pathname.includes('/home');
  const isUserPage=location.pathname.includes('/user');

  
  const id=localStorage.getItem("user_id");
  const handleSignOut = () => {
    localStorage.clear();
    navigate('/signin');
  }

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={<HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
          {(isFoodPage||isHomePage) && <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={handleAddCategoryClick}
            >
            { isFoodPage?  "ADD Food":"ADD Category" }
            </Button>}   
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar bg='red.500' />
              </MenuButton>
              <MenuList>
            <MenuItem onClick={()=>navigate(`/user/${id}`)} >Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      </Box>
    
    { !isFoodPage? <AddCategory isOpen={showAddCategory} onClose={() => setShowAddCategory(false)} /> :<AddFood isOpen={showAddCategory} onClose={() => setShowAddCategory(false)} /> }
    </>
  );
}
