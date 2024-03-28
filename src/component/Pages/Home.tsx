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
} from "@chakra-ui/react";
import { useFetchCategories } from "../../Hooks/food.hook";
import { useEffect, useReducer } from "react";
import { ICategory } from "../../Type/type";
import { useLocation, Link } from "react-router-dom";
import Food from "./Food";
import MySpinner from "./MySpinner";
import { useFetchUser } from "../../Hooks/register.hook";

interface State {
  categories: ICategory[];
}
type Action = { type: "SET_CATEGORIES"; payload: ICategory[] };

const initialState: State = {
  categories: [],
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  console.log("user",user);
  const { data, isLoading } = useFetchCategories(); // Handle potential errors
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categories } = state;
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  
  
    


  


  useEffect(() => {
    if (data) dispatch({ type: "SET_CATEGORIES", payload: data.data });
  }, [data]);

  
  const serachFilter = categories.filter((item) => {
    if (searchQuery === '') {
      return true; // Include all items when search query is empty
    } else {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {serachFilter.map((category: ICategory, index: number) => (
        <Link key={index} to={`/food/${category.id}`}>
          <Card mt={4}>
            <CardHeader>
              <Heading size="md">{category.name}</Heading>
            </CardHeader>
          
          </Card>
        </Link>
      ))}
    </SimpleGrid>
  );
};
export default Home;
