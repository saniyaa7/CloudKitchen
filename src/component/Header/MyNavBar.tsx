import React, { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Input,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCategory from "../Pages/Form/AddCategory";
import AddFood from "../Pages/Form/AddFood";
import { useFetchUser } from "../../Hooks/register.hook";
import MySpinner from "../Pages/MySpinner";
import WalkthroughPopover from "../Pages/AddToCart";

const Links = ["home"];

const NavLink = (props: any) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={`/${children}`}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isFoodPage = location.pathname.includes("/food");
  const isHomePage = location.pathname.includes("/home");
  const isUserPage = location.pathname.includes("/user");

  const {data:userData,isLoading}=useFetchUser();
  const isAdmin = useMemo(()=>{
    if(userData)
  return userData?.data.role==="admin"?true:false;

  },[userData])
  
  const id = userData?.data.id
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  };


  const handleSearch = () => {
    // Implement search functionality here
    console.log("Searching for:", searchQuery);

    navigate(`${location.pathname}?search=${searchQuery}`);
  };
  console.log(isAdmin);
  if(isLoading)
  {
  return(  <MySpinner/>);
  }

  return (
    <>
    {!isLoading &&
      <Box bg={"gray.100"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={<HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {(isFoodPage || isHomePage) && (
            <>
              {" "}
              <Input
                variant="outline"
                placeholder="Search..."
                size="md" // You can adjust the size here (sm, md, lg)
                width="600px" // You can adjust the width here
                mr={4}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="white"
                borderColor="gray.300"
                borderRadius="md"
                _focus={{
                  borderColor: "teal.500",
                  boxShadow: "outline",
                }}
              />
              <Button
                variant={"solid"}
                colorScheme={"blue"}
                bgSize={"sm"}
                size={"sm"}
                mr={80}
                onClick={handleSearch}
              >
                Search
              </Button>
            </>
          )}

          <Flex alignItems={"center"}>
            {(isFoodPage || isHomePage) && isAdmin && (
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={handleAddCategoryClick}
              >
                {isFoodPage ? "ADD Food" : "ADD Category"}
              </Button>
            )}
           {
              !isAdmin && (
                <Button
                variant={"solid"}
                colorScheme={"yellow"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={()=>navigate('/cart')}
              
              >
                CART
              </Button>
              )
            }

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                  <Avatar size="md" name={`${userData?.data.firstname} ${userData?.data.lastname}`} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate(`/user/${id}`)}>
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      
      </Box>}

      {isAdmin && !isFoodPage ? (
        <AddCategory
          isOpen={showAddCategory}
          onClose={() => setShowAddCategory(false)}
        />
      ) : (
        <AddFood
          isOpen={showAddCategory}
          onClose={() => setShowAddCategory(false)}
        />
      )}
      
    </>
  );
}
