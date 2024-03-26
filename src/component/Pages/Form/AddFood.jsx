import React, { useState } from "react";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Alert, AlertIcon, AlertDialogOverlay, AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogBody, AlertDialogHeader, useToast, Select, NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import axios from "axios"; // Import axios for HTTP requests
import { useMutationCategory, useMutationFood } from "../../../Hooks/food.hook";
import { useNavigate, useParams } from "react-router-dom";
// import { FoodInitialValues } from "../../../Type/initialValues";
// import { useMutation, useQuery } from "@tanstack/react-query";





function AddFood({ isOpen, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isConflict, setIsConflict] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { mutate } = useMutationFood();
  const [values, setValues] = useState({
    category_id: parseInt(id),
    price: 0,
    name: "",
    is_veg: 0,
    is_avail: 0,
    description: "",
    img_url: ""
  });
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'is_avail' || name === 'price' ? parseInt(value) : value;
    setValues({
      ...values,
      [name]: parsedValue
    });
  };



  const handleSubmit = async () => {
    try {
      // Check if any required field is empty
      if (!values.name || !values.description) {
        toast({
          title: "All fields are required.",
          position: "top",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        return;
      }

      const response = await mutate(values, {
        onSuccess: () => {
          onClose(); // Close the modal after successful submission
          // Navigate to a specific route upon successful submission
        },
        onError: (error) => {
          if (error.response.status === 409) {
            setIsConflict(true);
          } else {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form. Please try again.");
          }
        }
      });

      // Handle other responses if needed
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Food Dishes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Food Name</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                placeholder="Enter food name"
                value={values.name}
                onChange={handleChange}
              />

            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
              />

            </FormControl>



            <FormControl isRequired mt={4}>
              <FormLabel>Price</FormLabel>
              <NumberInput defaultValue={0} max={500}>
                <NumberInputField name="price"
                  placeholder="Enter price"
                  value={values.price}
                  onChange={handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Food Type</FormLabel>
              <Select
                name="is_veg"
                value={values.is_veg ? 1 : 0}
                onChange={handleChange}
              >
                <option value={true}>Veg</option>
                <option value={false}>Non-Veg</option>
              </Select>
            </FormControl>






            <FormControl isRequired mt={4}>
              <FormLabel>Available</FormLabel>
              <NumberInput defaultValue={0} >
                <NumberInputField name="is_avail"
                  placeholder="Enter availability"
                  value={values.is_avail}
                  onChange={handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="img_url"
                placeholder="Enter image URL"
                value={values.img_url}
                onChange={handleChange}
              />

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isConflict && (
        <AlertDialog
          isOpen={isConflict}
          leastDestructiveRef={finalRef}
          onClose={() => setIsConflict(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="medium" fontWeight="bold">
                Food Already Exists
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={finalRef} onClick={() => setIsConflict(false)}>
                  OK
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}

    </>
  );
}

export default AddFood;
