import {
  SimpleGrid,
  Card,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { useFetch } from "../Hooks/food.hook";
import { useEffect, useReducer } from "react";
import { ICategory } from "../Type/type";

interface State {
  categories: ICategory[];
}

type Action = { type: "SET_CATEGORIES"; payload: ICategory[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const initialState = {
  categories: [],
};

const Home = () => {
  const { data } = useFetch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categories } = state;

  useEffect(() => {
    if (data) dispatch({ type: "SET_CATEGORIES", payload: data.data });
  }, [data]);

  console.log(categories);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {categories.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <Heading size="md">{category.name}</Heading>{" "}
            {/* Assuming category has a name property */}
          </CardHeader>
          <CardBody>
            <Text>{category.description}</Text>
          </CardBody>
          <CardFooter>
            <Button disabled={category.is_active == 0 ? true : false}>
              View here
            </Button>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Home;
