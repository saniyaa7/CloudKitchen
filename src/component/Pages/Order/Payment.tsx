import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  FormErrorMessage,
  Center,
  Box,
  IconButton,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons"; // Import ArrowBackIcon
import { useGetCart, usePostCheckout } from "../../../Hooks/order.hook";
import { useNavigate } from "react-router-dom";
import { ICheckout } from "../../../Type/type";

function Payment(): JSX.Element {
  const { mutate, isPending, isSuccess } = usePostCheckout();
  const [formData, setFormData] = useState<ICheckout>({
    payment_method: "",
    location: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  let totalPrice = 0;
  const { data: orderItemData } = useGetCart();
  const navigate = useNavigate(); // Access navigate function from React Router
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowAlert(true); // Show alert when data is successfully fetched
    }
  }, [isSuccess]);

  if (orderItemData) {
    orderItemData.data.map((item, index) => {
      if (item.price) {
        totalPrice += item.price;
      }
    });
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.payment_method) {
      errors.payment_method = "Please select a payment method";
    }
    if (!formData.location) {
      errors.location = "Please enter a location";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission or payment processing
      mutate(formData);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when the user starts typing after an error
    setFormErrors({ ...formErrors, [name]: "" });
  };

  return (
    <Center h="100vh">
      {showAlert && (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="160px"
          position="absolute"
          top="0"
          left="50%"
          width="50%"
          mt={20}
          transform="translateX(-50%)"
          zIndex="1"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Order Placed!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Thanks for purchasing
          </AlertDescription>
        </Alert>
      )}
      {!showAlert && (
        <Box
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          maxW="md"
          w="100%"
          position="relative"
        >
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back"
            alignSelf="flex-start"
            onClick={() => navigate(-1)}
            mb={4}
          />
          <VStack spacing={6} align="stretch">
            <FormControl isRequired isInvalid={!!formErrors.payment_method}>
              <div>
                <FormLabel>Total Price:</FormLabel>
                <FormLabel fontWeight="bold">{totalPrice}</FormLabel>
              </div>
              <FormLabel>Payment method</FormLabel>
              <Select
                placeholder="Select payment method"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              >
                <option value="creditcard">Credit Card</option>
                <option value="debitcard">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="visa">Visa</option>
              </Select>
              <FormErrorMessage>{formErrors.payment_method}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formErrors.location}>
              <FormLabel>Location</FormLabel>
              <Input
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <FormErrorMessage>{formErrors.location}</FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Place Order
            </Button>
          </VStack>
        </Box>
      )}
    </Center>
  );
}

export default Payment;
