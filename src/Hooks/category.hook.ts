import { useMutation, useQuery } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios from "axios";
import { ICategory, usePostCategoryRequest } from "../Type/type";

export const useGetCategories = () => {
  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await axios.get(`${API_END_POINT}/categories`),
  });

  return { data, isLoading,refetch };
};

export const usePostCategory = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["category"],

    mutationFn: (payload:usePostCategoryRequest) => {
      return axios.post<usePostCategoryRequest>(`${API_END_POINT}/category`, payload);
    },
  });
  return { mutate, isPending };
};
export const usePatchCategory= () => {
  const { mutate ,isSuccess} = useMutation({
    mutationFn: (payload:ICategory) => {
      return axios.patch(`http://localhost:8080/category`, payload);
    },
    onSuccess: () => {},
    onError: (err) => {
      alert(err);
    },
  });
  return {
    mutate,
    isSuccess
  };
}
