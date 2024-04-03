import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_END_POINT } from "../constant/constant";
import { ICategory, GetFoodItemRequest, PatchFoodItemRequest, PostFoodItemRequest } from "../Type/type";





export const useGetFoods = (id: string) => {
  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["foods"],
    queryFn: async () => await axios.get(`${API_END_POINT}/foods/${id}`),
  });

  return { data, isLoading,refetch };
};

export const usePostFood = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["food"],

    mutationFn: (payload:PostFoodItemRequest) => {
      return axios.post(`${API_END_POINT}/food`, payload);
    },
  });
  return { mutate, isPending };
};

export const usePatchFood = () => {
  const client=useQueryClient();
  const { mutate ,isPending,isSuccess} = useMutation({
    mutationFn: (payload:PatchFoodItemRequest) => {
      return axios.patch(`${API_END_POINT}/food`, payload);
    },
    onSuccess: () => {    client.invalidateQueries({ queryKey: ['foods']})},
    onError: (err) => {
      alert(err);
    },
  });
  return {
    mutate,
    isPending,
    isSuccess
  };
};


