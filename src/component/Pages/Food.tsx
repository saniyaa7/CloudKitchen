import React, { useEffect, useReducer, useState } from "react";
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
  Checkbox,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ICategory, IFood } from "../../Type/type";
import { useFetchFoods, usePatchFood } from "../../Hooks/food.hook"; // Assuming you have useFetchFoods properly implemented
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import MySpinner from "./MySpinner";
import { boolean } from "yup";

interface State {
  food: IFood[],
  isPureVeg:boolean,
  isPureNonVeg:boolean,
  priceRange: string | null
}

type Action = { type: "SET_FOODS"; payload: IFood[] }|
{ type: "SET_VEG"; payload: boolean }|
{ type: "SET_NON_VEG"; payload:boolean }|
 { type: "SET_PRICE"; payload: string | null };

const initialState: State = {
  food: [],
  isPureVeg:false,
  isPureNonVeg:false,
  priceRange: null,


};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FOODS":
      return { ...state, food: action.payload };
      case "SET_VEG":
      return { ...state, isPureVeg: action.payload };
      case "SET_NON_VEG":
        return { ...state, isPureNonVeg: action.payload };
        case "SET_PRICE":
          return { ...state, priceRange: action.payload };
    default:
      return state;
  }
};

function Food() {
  const { id } = useParams<string>(); 
  const { data, isLoading } = useFetchFoods(id || ""); 
  useEffect(() => {
    if (data) dispatch({ type: "SET_FOODS", payload: data.data });
  }, [data]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { food,isPureNonVeg,isPureVeg,priceRange } = state;
  const { mutate } = usePatchFood();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const isCustomer=localStorage.getItem("role")==="customer"?true:false;
  


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
  const searchFilter = food.filter((item) => {
    if (searchQuery === '') {
      return true; // Include all items when search query is empty
    } else {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
  const filteredFood = food.filter((item) => {
    if (isPureVeg && !item.is_veg) return false;
    if (isPureNonVeg && item.is_veg) return false;
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      const price = item.price;
      if (min && max) {
        if (price < parseInt(min) || price > parseInt(max)) return false;
      }
    }
  
  
    if (searchQuery === '') {
      return true; // Include all items when search query is empty
    } else {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
  const handlePriceRange = (range: string | null) => {
    dispatch({ type: "SET_PRICE", payload: range });
  };

  return (<>
     {/* Filter Controls */}
     <Box mb={4} mt={4} display="flex" justifyContent="left">
  <Button
    colorScheme={isPureVeg ? "teal" : "gray"}
    variant={isPureVeg ? "outline" : "outline"}
    onClick={() =>   dispatch({ type: "SET_VEG", payload: !isPureVeg })}
    mr={4}
  >
    Pure Veg
  </Button>
  <Button
    colorScheme={isPureNonVeg ? "red" : "gray"}
    variant={isPureNonVeg ? "outline" : "outline"}
    disabled={isPureVeg} // Disable when Pure Veg is selected
    onClick={() => dispatch({ type: "SET_NON_VEG", payload: !isPureNonVeg })}
  >
    Pure Non-Veg
  </Button>

        <Button
          colorScheme={priceRange === "50-100" ? "green" : "gray"}
          variant={priceRange === "50-100" ? "solid" : "outline"}
          onClick={() => handlePriceRange("50-100")}
          mr={4} ml={4}
        >
          $50 - $100
        </Button>
        <Button
          colorScheme={priceRange === "100-200" ? "green" : "gray"}
          variant={priceRange === "100-200" ? "solid" : "outline"}
          onClick={() => handlePriceRange("100-200")}
        >
          $100 - $200
        </Button>
      </Box>

    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      p={4} // Add padding to the container
    >
      {filteredFood.map((foodItem: IFood, index: number) => (
    (isCustomer && Boolean(foodItem.is_avail != 0) ) || !isCustomer && (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          _hover={{ transform: "scale(1.07)" }}
          boxShadow="md" // Add shadow effect
          key={foodItem.id}
          p={5} // Add padding to each food item
          mt={5} // Add top margin to each food item
          mb={5} // Add bottom margin to ch food item
        >
          <Image
            src={foodItem.img_url}
        
            w="100%"
            h="200px"
            objectFit="cover"
          />
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
            {!isCustomer &&
            <Button
              colorScheme={foodItem.is_avail === 1 ? "gray" : "green"}
              onClick={() =>
                handleAvailability(foodItem.id, foodItem.is_avail === 1)

              }
              
            
               // Add top margin
            >
              {foodItem.is_avail === 1 ? "Mark as Unavailable" : "Mark as Available"}
            </Button>}
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
        </Box>)
      ))}
    </SimpleGrid></>
  );
}

export default Food;
