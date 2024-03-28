import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const api_url = `${API_END_POINT}user/`;



export const setTokenInHeader = (token:string) => {
  axios.defaults.headers.common["Authorization"] =  token;

}

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
  const navigate = useNavigate();
  const { mutate, isError, isPending ,isSuccess} = useMutation({
    mutationKey: ["login"],

    mutationFn: (payload: any) => {
      return axios.post(`${api_url}login`, payload);
    },
    onSuccess: (data) => {
      const authToken = data.data.Token;
      localStorage.setItem('token',authToken)
      // setToken(authToken);
      setTokenInHeader(authToken)
      console.log(authToken);
      navigate("/home", { replace: true });
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
      alert(err?.response?.data);
      toast.error(`${err?.response?.data}`);
    },
  });
  return { mutate, isError, isPending,isSuccess };
};

export const useFetchUser = () => {
  
  const { data ,isLoading} = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await axios.get(`${api_url}me`),
    
    
  });

  return { data,isLoading };
};
