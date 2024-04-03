import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios from "axios";
import {
  ICheckout,
  IInvoiceOrder,
  IOrder,
  IOrderItem,
  IOrderItemByUserId,
} from "../Type/type";

interface FetchCartResponse {
  data: IOrderItem[] | null;
  isLoading: boolean;
}
export const usePostOrderItem = () => {
  const client= useQueryClient();


  const { mutate, isPending ,isSuccess} = useMutation({
    mutationKey: ["orderItem"],

    mutationFn: (payload: IOrderItem) => {
      return axios.post(`${API_END_POINT}/orderitem`, payload);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['foods']})
      client.invalidateQueries({ queryKey: ["orderItem"]})
    },
  });
  return { mutate, isPending,isSuccess };
};

export const useGetCart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderItem"],
    queryFn: async () =>
      await axios.get<IOrderItem[]>(`${API_END_POINT}/orderitem`),
  });

  return { data, isLoading, isError };
};
export const usePostCheckout = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["checkout"],

    mutationFn: (payload: ICheckout) => {
      return axios.post(`${API_END_POINT}/order/checkout`, payload);
    },
  });
  return { mutate, isPending, isSuccess };
};
export const useGetOrder = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderItem"],
    queryFn: async () => await axios.get<IOrder[]>(`${API_END_POINT}/orders`),
  });

  return { data, isLoading, isError };
};
export const useGetOrderFood = (id: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderItem"],
    queryFn: async () =>
      await axios.get<IOrderItemByUserId[]>(
        `${API_END_POINT}/order/orderitem/${id}`
      ),
  });

  return { data, isLoading, isError };
};
export const useFetchInvoice = (id: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderItem"],
    queryFn: async () =>
      await axios.get<IInvoiceOrder>(`${API_END_POINT}/order/invoice/${id}`),
  });

  return { data, isLoading, isError };
};
