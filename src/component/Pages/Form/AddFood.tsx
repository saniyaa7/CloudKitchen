import React, { ChangeEvent, useState } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  useToast,
  Select,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios"; // Import axios for HTTP requests
import {  usePostFood } from "../../../Hooks/food.hook";
import { useNavigate, useParams } from "react-router-dom";
import { PostFoodItemRequest } from "../../../Type/type";
// import { FoodInitialValues } from "../../../Type/initialValues";
// import { useMutation, useQuery } from "@tanstack/react-query";

interface AddFoodProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddFood({ isOpen, onClose }: AddFoodProps) {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [isConflict, setIsConflict] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { mutate, isPending } = usePostFood();
  const [values, setValues] = useState<PostFoodItemRequest>({
    category_id : id ? parseInt(id) : 0,
    price: 0,
    name: "",
    is_veg: 0,
    is_avail: 0,
    description: "",
    img_url: "",
  });
  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "is_avail" || name === "price" || name === "is_veg"
        ? parseInt(value)
        : value;
    setValues({
      ...values,
      [name]: parsedValue,
    });
  };
  const handleFoodTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "is_avail" || name === "price" || name === "is_veg"
        ? parseInt(value)
        : value;
    setValues({
      ...values,
      [name]: parsedValue,
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

      const response = mutate(values, {
        onSuccess: () => {
          onClose(); // Close the modal after successful submission

          // Navigate to a specific route upon successful submission
        },
        onError: (error) => {
          console.log(error);
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setIsConflict(true);
          } else {
            console.error("Error submitting form:", error);
            alert(
              "An error occurred while submitting the form. Please try again."
            );
          }
        },
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
          <ModalBody pb={6} maxH="80vh" overflowY="auto">
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
                <NumberInputField
                  name="price"
                  placeholder="Enter price"
                  value={values.price}
                  onChange={handleChange}
                />
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
                value={values.is_veg}
                onChange={handleFoodTypeChange}
              >
                <option value={1}>Veg</option>
                <option value={0}>Non-Veg</option>
              </Select>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Available</FormLabel>
              <NumberInput defaultValue={0}>
                <NumberInputField
                  name="is_avail"
                  placeholder="Enter availability"
                  value={values.is_avail ? 1 : 0}
                  onChange={handleChange}
                />
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              disabled={isPending}
            >
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
