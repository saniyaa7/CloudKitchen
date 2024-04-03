// import React from "react";
import {
  VStack,
  Box,
  Text,
  Heading,
  Avatar,
  Flex,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { useGetUsers } from "../../../Hooks/user.hook";
import { IUser } from "../../../Type/type";

const Users = () => {
  const { data: usersData } = useGetUsers();
  return (
    <VStack spacing={6} alignItems="stretch">
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Users
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {usersData?.data.map((user: any) => (
          (user.role==="customer")&&(
          <Box
            key={user.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Flex p={4} alignItems="center">
              <Avatar size="md" name={`${user.firstname} ${user.lastname}`} />
              <VStack ml={4} alignItems="flex-start">
                <Text fontWeight="bold">{`${user.firstname} ${user.lastname}`}</Text>
                <Text>{user.email}</Text>
                <Text>{user.phone}</Text>
              </VStack>
            </Flex>
            <Divider />
          </Box>)
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Users;
