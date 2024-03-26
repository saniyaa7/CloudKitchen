import React from "react";
import {
  Avatar,
  Box,
  Center,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFetchUser } from "../../Hooks/register.hook";

const Profile = () => {
  const { data, isLoading } = useFetchUser();
  const user = data?.data;

  if (isLoading) {
    // If user data is not available yet, you can return a loading indicator or null
    return (
      <Center>
        {" "}
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Center>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        p={8}
        bg="white"
        boxShadow="lg"
      >
        <Avatar size="xl" name={`${user.firstname} ${user.lastname}`} />
        <VStack spacing={4} align="stretch" mt={6}>
          <Heading
            size="xl"
            color="blue.500"
          >{`${user.firstname} ${user.lastname}`}</Heading>
          <Text fontSize="sm" color="gray.700">
            Email: {user.email}
          </Text>
          <Text fontSize="sm" color="gray.700">
            Phone Number: {user.phone}
          </Text>
          <Text fontSize="sm" color="gray.700">
            Role: {user.role}
          </Text>
          {/* Add more profile details as needed */}
        </VStack>
      </Box>
    </Center>
  );
};

export default Profile;
