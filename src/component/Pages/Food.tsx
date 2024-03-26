import React, { useEffect, useReducer } from "react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { ICategory, IFood } from "../../Type/type";
import { useFetchFoods, usePatchFood } from "../../Hooks/food.hook"; // Assuming you have useFetchFoods properly implemented
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import MySpinner from "./MySpinner";

interface State {
  food: IFood[];
}

type Action = { type: "SET_FOODS"; payload: IFood[] };

const initialState: State = {
  food: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FOODS":
      return { ...state, food: action.payload };
    default:
      return state;
  }
};

function Food() {
  const { id } = useParams<string>(); // Correct destructuring of id
  const { data, isLoading } = useFetchFoods(id || ""); // Assuming useFetchFoods accepts a string argument
  useEffect(() => {
    if (data) dispatch({ type: "SET_FOODS", payload: data.data });
  }, [data]);
  // Handle potential errors
  const [state, dispatch] = useReducer(reducer, initialState);
  const { food } = state;
  const { mutate } = usePatchFood();

  const handleAvailability = (foodItemId: number, isAvailable: boolean) => {
    let temp;
    const updatedFood = food.map((foodItem) => {
      if (foodItem.id === foodItemId) {
        temp = { ...foodItem, is_avail: isAvailable ? 0 : 1 };
        return temp;
      }

      return foodItem;
    });
    dispatch({ type: "SET_FOODS", payload: updatedFood });
    console.log(temp);
    mutate(temp);
  };
  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {food.map((foodItem: IFood, index: number) => (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          _hover={{ transform: "scale(1.05)" }}
        >
          <img
            src={foodItem.img_url}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          {/* Assuming description is the URL of the image */}
          <Box p="4">
            <Heading as="h3" size="md" fontWeight="bold" mb="2">
              {foodItem.name}
            </Heading>
            <Text fontSize="md" mb="2">
              {foodItem.description}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Price: {foodItem.price}
            </Text>
            <Button
              color={foodItem.is_avail === 1 ? "gray.400" : "green.400"}
              onClick={() =>
                handleAvailability(foodItem.id, foodItem.is_avail === 1)
              }
            >
              {foodItem.is_avail === 1
                ? "Mark as Unavailable"
                : "Mark as Available"}
            </Button>
          </Box>
          <Box
            position="absolute"
            top="2"
            right="2"
            bg={foodItem.is_veg ? "green.400" : "red.400"}
            color="white"
            p="1"
            borderRadius="md"
          >
            {foodItem.is_veg ? "Veg" : "Non-Veg"}
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default Food;
