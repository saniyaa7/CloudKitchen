
import axios from "axios";
import { API_END_POINT } from "../constant/constant";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../Type/type";


const api_url = `${API_END_POINT}/user`;

export const useGetUser = () => {
  
  const { data ,isLoading} = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await axios.get(`${API_END_POINT}/user/me`),
    
    
  });

  return { data,isLoading };
};

export const useGetUsers = () => {
  
  const { data ,isLoading} = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get<IUser[]>(`${API_END_POINT}/users`),
    
    
  });

  return { data,isLoading };
};

