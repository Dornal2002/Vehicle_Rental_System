import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_END_POINT } from "../constant/constant";

const api_url = API_END_POINT;
export const useFetch = () => {
  const authToken = localStorage.getItem("token");
  
  const { data } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () =>
      await axios.get(`${api_url}/vehicles`, {
        headers: {
          Authorization: authToken,
        },
      }),
      
  });
  console.log(authToken);
  return { data };
};