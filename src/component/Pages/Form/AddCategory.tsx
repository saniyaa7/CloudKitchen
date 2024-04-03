import React, { ChangeEvent, useState } from "react";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Alert, AlertIcon, AlertDialogOverlay, AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogBody, AlertDialogHeader, useToast } from "@chakra-ui/react";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePostCategory } from "../../../Hooks/category.hook";
import { ICategory, usePostCategoryRequest } from "../../../Type/type";

const initialValue:usePostCategoryRequest = {
  name: "",
  description: "",
  is_active: 0
};
interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  
}


function AddCategory({ isOpen, onClose }:AddCategoryProps) {
  const [isConflict, setIsConflict] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = usePostCategory(); // Ensure you import and define useMutation properly
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [values, setValues] = useState<usePostCategoryRequest>(initialValue); // State to store form values
  const toast = useToast()

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
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
          navigate('/home'); // Navigate to a specific route upon successful submission
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.status === 409)  {
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
          <ModalHeader>Create Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Category Name</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />

            </FormControl>
            <FormControl isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="description"
                value={values.description}
                onChange={handleChange}
                required
              />

            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit} disabled={isPending}>
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
                Category Already Exists
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

export default AddCategory;
