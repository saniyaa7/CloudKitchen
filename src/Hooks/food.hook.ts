import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_END_POINT } from "../constant/constant";
import { useAuth } from "../Provider/authProvider";

const api_url = API_END_POINT;
export const useFetchCategories = () => {
  
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await axios.get(`${api_url}/categories`),
    
  });

  return { data };
};

export const useMutationCategory = () => {

  
  const { mutate } = useMutation({
    mutationKey: ["category"],
    

    mutationFn: (payload) => {
      return axios.post(`http://localhost:8080/category`, payload);
    },
  
  
  });
  return { mutate };
};
export const useFetchFoods = (id:string) =>{
  
  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: async () =>
      await axios.get(`${api_url}/foods/${id}`),
    
  });

  return { data };
};

export const useMutationFood = () => {


  const { mutate } = useMutation({
    mutationKey: ["food"],

    mutationFn: (payload) => {
      return axios.post(`http://localhost:8080/food`, payload);
    },


  });
  return { mutate };
};

// export const usePatchFood = () => {
//   const { mutate } = useMutation({
//     mutationFn: (payload) => {
//       return axios.patch(`${api_url}/food`, payload);
//     },
//     onSuccess: () => {
      
//     },
//     onError: (err) => {
//       alert(err);
//     },
//   });
//   return {
//   mutate
//   };
// };