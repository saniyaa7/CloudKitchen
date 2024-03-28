import { useMutation, useQuery } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios from "axios";
import { ICheckout, IOrderItem } from "../Type/type";

interface FetchCartResponse {
  data: IOrderItem[] | null;
  isLoading: boolean;
}
export const useMutationOrderItem = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["orderItem"],

    mutationFn: (payload:IOrderItem) => {
      return axios.post(`${API_END_POINT}orderitem`, payload);
    },
  });
  return { mutate, isPending };
};

export const useFetchCart = () => {
  
  const { data ,isLoading,isError} = useQuery({
    queryKey: ["orderItem"],
    queryFn: async () =>
      await axios.get<IOrderItem[]>(`${API_END_POINT}orderitem`),
    
    
  });

  return { data,isLoading ,isError};
};
export const useMutationCheckout = () => {
  const { mutate, isPending ,isSuccess} = useMutation({
    mutationKey: ["checkout"],

    mutationFn: (payload:ICheckout) => {
      return axios.post(`${API_END_POINT}order/checkout`, payload);
    },
  });
  return { mutate, isPending ,isSuccess};
};
