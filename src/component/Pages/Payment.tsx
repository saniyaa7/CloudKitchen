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
import { useFetchCart, useMutationCheckout } from "../../Hooks/order.hook";
import { useNavigate } from "react-router-dom";
import { ICheckout } from "../../Type/type";




function Payment(): JSX.Element {
  const {mutate,isPending,isSuccess}=useMutationCheckout();
  const [formData, setFormData] = useState<ICheckout>({
    payment_method: "",
    location: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  let totalPrice = 0;
  const { data: orderItemData } = useFetchCart();
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
      <Box p={8} borderWidth="1px" borderRadius="lg">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Back"
          alignSelf="flex-start"
          onClick={() => navigate(-1)} // Navigate back when the back button is clicked
          mb={4}
        />
        <VStack spacing={6} align="stretch">
          <FormControl isRequired isInvalid={!!formErrors.payment_method}>
            <div>
              <FormLabel>Total Price:</FormLabel>
              <FormLabel>{totalPrice}</FormLabel>
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
          <Button colorScheme="blue" onClick={handleSubmit} disabled={isPending}>
      Place Order
          </Button>
        </VStack>
        {showAlert && (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Application submitted!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Thanks for submitting your application. Our team will get back to you soon.
              </AlertDescription>
            </Alert>
          )}
      </Box>
    </Center>
  );
}

export default Payment;
