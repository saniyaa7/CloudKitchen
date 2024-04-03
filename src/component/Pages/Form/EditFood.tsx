import React, { ChangeEvent, useEffect, useState } from "react";
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
import { usePatchFood } from "../../../Hooks/food.hook";
import { GetFoodItemRequest } from "../../../Type/type";

interface EditFoodProps {
  isOpen: boolean;
  onClose: () => void;
  formData: GetFoodItemRequest;
}

function EditFood({ isOpen, onClose, formData }: EditFoodProps) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { mutate, isPending,isSuccess } = usePatchFood();
  const [values, setValues] = useState<GetFoodItemRequest>(formData);
  const toast = useToast();
  useEffect(() => {
    setValues(formData);
  }, [formData]);
console.log(formData,values)
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
    if(values===formData)
    toast({
      title: "NO Change in Values",
      position: "top",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
    try {
      // Check if any required field is empty
      if (!values.name || !values.description) {
        toast({
          title: "All fields are required.",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const response = await mutate(values);
      if(isSuccess)
      {
        onClose();
        toast({
          title: 'Data Updated Successfully.',
          status: 'success',
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      }
    

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
          <ModalHeader>Edit Food Dishes</ModalHeader>
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
              <NumberInput  defaultValue={values.price} max={500} >
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
            Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
  );
}

export default EditFood;
