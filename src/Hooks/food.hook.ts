import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_END_POINT } from "../constant/constant";



const api_url = API_END_POINT;
export const useFetchCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await axios.get(`${api_url}/categories`),
  });

  return { data, isLoading };
};

export const useMutationCategory = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["category"],

    mutationFn: (payload) => {
      return axios.post(`http://localhost:8080/category`, payload);
    },
  });
  return { mutate, isPending };
};
export const useFetchFoods = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => await axios.get(`${api_url}/foods/${id}`),
  });

  return { data, isLoading };
};

export const useMutationFood = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["food"],

    mutationFn: (payload) => {
      return axios.post(`http://localhost:8080/food`, payload);
    },
  });
  return { mutate, isPending };
};

export const usePatchFood = () => {
  const { mutate } = useMutation({
    mutationFn: (payload) => {
      return axios.patch(`http://localhost:8080/food`, payload);
    },
    onSuccess: () => {},
    onError: (err) => {
      alert(err);
    },
  });
  return {
    mutate,
  };
};
