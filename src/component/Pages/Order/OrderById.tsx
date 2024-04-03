import { Center, Box, Text, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Spinner, IconButton } from "@chakra-ui/react";
import { useFetchInvoice, useGetOrderFood } from "../../../Hooks/order.hook";
import { useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

function OrderById() {
  const { id } = useParams();

  const { data: foodItemData, isLoading: foodItemLoading } = useGetOrderFood(id);
  // const{data:invoiceData,isLoading:invoiceLoading}=useFetchInvoice(id);

  return (
    <Center mt={10}>
      <Card bg="gray.50" borderWidth="1px" borderRadius="lg" boxShadow="lg" maxW="md" w="100%">
        <CardHeader bg="blue.700" color="white" py={4} px={6} borderBottomWidth="1px">
          <Stack direction="row" align="center">
            <IconButton
              aria-label="Back"
              icon={<ArrowBackIcon />}
              colorScheme="white"
              variant="outline"
              onClick={() => window.history.back()}
            />
            <Heading size="md" ml={2}>Order Details</Heading>
          </Stack>
        </CardHeader>
        <CardBody py={6} px={6}>
          {foodItemLoading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : (
            foodItemData?.data && (
              <Stack spacing={4}>
                <Box>
                  <Stack divider={<StackDivider />} spacing={2}>
                    {foodItemData?.data.map((item, index) => (
                      <Box key={index}>
                        <Text fontSize="sm" textTransform="uppercase" color="blue.700">{item.foodname}</Text>
                        <Text fontSize="sm">Quantity: {item.quantity}</Text>
                        <Text fontSize="sm">Price: {item.price}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            )
          )}
        </CardBody>
      </Card>
    </Center>
  );
}

export default OrderById;
