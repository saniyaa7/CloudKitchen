import { useMutation } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
const api_url = `${API_END_POINT}user/`;

export const SignupMutation = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["signup"],

    mutationFn: async (payload: any) => {
      return await axios.post(`${api_url}signup`, payload);
    },
    onError: (err: AxiosError) => {
      toast.error(`${err.response?.data}`);
    },
  });
  return { mutate, isError, isPending };
};

export const SiginMutation = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["login"],

    mutationFn: (payload: any) => {
      return axios.post(`${api_url}login`, payload);
    },
    onSuccess: (data) => {
      const authToken = data.data.Token; // Accessing the Token from the response data
      localStorage.setItem("token", authToken);
      console.log("Token:", authToken);
    },
    onError: (err: AxiosError) => {
      console.log(err?.response?.data);
      alert(err?.response?.data);
      toast.error(`${err?.response?.data}`);
    },
  });
  return { mutate, isError, isPending };
};
