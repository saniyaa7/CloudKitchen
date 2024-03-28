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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useFetchCart } from "../../Hooks/order.hook";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { data, isLoading, isError } = useFetchCart();
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
       // Add margin top to create space from the top
      >
        <VStack spacing={6} align="stretch">
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Your Cart
          </Text>
          {isLoading ? (
 <Spinner size="xl" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />           ) : isError ? (
            <Box p={4} bg="blue.700" borderRadius="md">
              <Text fontWeight="bold"  color="red.400" textAlign="center">
                CART IS EMPTY
              </Text>
            </Box>
          ) : (
            <>
              <SimpleGrid columns={1} spacing={4} maxH="600px" overflowY="auto">
                {data &&
                  data.data.map((item, index) => (
                    <Box key={index} p={4} bg="blue.700" borderRadius="md">
                      <Text fontSize="xl" fontWeight="bold" color="white">
                        {item.foodname}
                      </Text>
                      <Text color="white">Quantity: {item.quantity}</Text>
                      <Text color="white">Price: ${item.price}</Text>
                      {index !== data.data.length - 1 && <Divider />}
                    </Box>
                  ))}
              </SimpleGrid>
              <Button
                colorScheme="green"
                mt={8}
                size="lg"
                onClick={() => navigate("/payment")}
                disabled={isLoading || isError}
                alignSelf="center"
              >
                Proceed to Payment
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Center>
  );
}

export default CartPage;
