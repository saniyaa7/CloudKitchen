import {
  SimpleGrid,
  Card,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Stack,
  Flex,
  Center,
  Checkbox,
  Switch,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { ICategory } from "../../../Type/type";
import { useLocation, Link } from "react-router-dom";
import Food from "../Food/Food";
import MySpinner from "../MySpinner";
import { CheckCircleIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useGetCategories, usePatchCategory } from "../../../Hooks/category.hook";
import { useGetUser } from "../../../Hooks/user.hook";

interface State {
  categories: ICategory[];
  isActive: number;
}
type Action = { type: "SET_CATEGORIES"; payload: ICategory[] }|{ type: "SET_ISACTIVE"; payload:number };

const initialState: State = {
  categories: [],
  isActive:0
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
      case "SET_ISACTIVE":
      return { ...state, isActive: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  console.log("user", user);
  const { data, isLoading, refetch } = useGetCategories(); // Handle potential errors
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categories,isActive } = state;
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const { mutate,isSuccess } = usePatchCategory();
  const { data: userData } = useGetUser();
  const isAdmin = userData?.data.role == "admin" ? true : false;
  const isCustomer = userData?.data.role == "customer" ? true : false;

  useEffect(() => {
    if (data) {
dispatch({ type: "SET_CATEGORIES", payload: data.data });
    
    }
  }, [data]);

  useEffect(()=>{
    refetch();
  },[isSuccess])

  const serachFilter = categories.filter((item) => {
    if (searchQuery === "") {
      return true; // Include all items when search query is empty
    } else {
      return item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const handleSwitchToggle = (category_id: number, is_active: any) => {
    
    if (is_active == 1) is_active = 0;
    else is_active = 1;
    dispatch({type:"SET_ISACTIVE",payload:is_active})
    const payload: ICategory = { id: category_id, is_active: is_active };

    mutate(payload);
  };


  const disabled = false;
  const available = true;
  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {serachFilter.map((category: ICategory, index: number) => (
          ((isCustomer && category.is_active!=0)||(isAdmin))&&(
          <Card>
            <>
              <Link key={index} to={`/food/${category.id}`}>
                <Flex overflowX="auto">
                  <Card
                    opacity={disabled ? 0.5 : 1}
                    pointerEvents={disabled ? "none" : "auto"}
                    boxShadow={disabled ? "none" : "md"}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    borderRadius="full" // Adding rounded corners to the card
                    mx="4"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={category.description}
                      alt="Caffe Latte"
                      height={200}
                      borderRadius="lg" // Making the image rounded
                    />
                  </Card>
                </Flex>
              </Link>
              
              <CardHeader>
              
                <Heading size="sm">{category.name}</Heading>
                {isAdmin&&
                <Switch
                  size="md"
                
                  isChecked={category.is_active == 1}
                  onChange={() =>
                    handleSwitchToggle(category.id, category.is_active)
                  }
                />}

                
              </CardHeader>
            </>
          </Card>)
        ))}
      </SimpleGrid>
    </>
  );
};
export default Home;
