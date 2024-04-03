import React from "react";
import {
  Box,
  Text,
  Divider,
  VStack,
  Center,
  Spinner,
  SimpleGrid,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useGetCart, useGetOrder} from "../../../Hooks/order.hook";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../../Hooks/user.hook";


function Order() {
  const { data, isLoading, isError } = useGetOrder();
  const {data:userData}=useGetUser();
  ;
  const navigate = useNavigate();
  

  return (
    <Center h="100vh">
      
      <Box
        p={5}
        borderWidth="0.5px"
        borderRadius="md"
        boxShadow="md"
        maxW="600px"
        maxH="600px"
        h="100%"
        w="100%"
        overflowY="auto"
        // Add margin top to create space from the top
      >

<IconButton
              aria-label="Back"
              icon={<ArrowBackIcon />}
              colorScheme="white"
              variant="outline"
              onClick={() => window.history.back()}
            />
        <VStack spacing={6} align="stretch" >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Your Orders
          </Text>
          {isLoading ? (
            <Spinner
              size="xl"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
          ) : isError ? (
            <Box p={4} bg="blue.700" borderRadius="md">
              <Text fontWeight="bold" color="red.400" textAlign="center">
                No Order Placed Yet
              </Text>
            </Box>
          ) : (
            <>
              <SimpleGrid columns={1} spacing={4} maxH="600px" overflowY="auto">
                {data  &&
                  data.data.map((item: any, index: number) => (
                    // <Box key={index} p={4} bg="blue.700" borderRadius="md">
                      
                    //   <Text fontSize="xl" fontWeight="bold" color="white">
                    //   {new Date(item.created_at).toLocaleString()}
                    //   </Text>
                    //   <Text color="white">
                    //     Total Amount: {item.total_amount}
                    //   </Text>
                    //   <Text color="white">Location: {item.location}</Text>
                    //   {index !== data.data.length - 1 && <Divider />}
                    // </Box>
                    <Stack spacing='4' >
                    <Card align='center' size={'sm'} variant={'filled'} bg="blue.700" borderRadius="md" color={"white"}>
                      <CardHeader>
                        <Heading size='sm' mr={60}>{new Date(item.created_at).toLocaleString()}</Heading>
                      </CardHeader>
                      <CardBody display="flex" justifyContent="space-between" alignItems="center">
                        <Text>Total Amount: {item.total_amount}</Text>
                        <Button ml={40} variant="solid" colorScheme="blue" onClick={()=>navigate(`/order/${item.id}`)}>View Details</Button>
                      </CardBody>
                    </Card>
                  </Stack>
                    
                  ))}
              </SimpleGrid>
              
              
            </>
          )}
        </VStack>
      </Box>
    </Center>
  );
}

export default Order;
