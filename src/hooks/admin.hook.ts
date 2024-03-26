import { useMutation } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const api_url = `${API_END_POINT}`;

export const AddVehicle = () => {
    // const navigate=useNavigate()
    const token = localStorage.getItem("token");
    console.log(token);
    
    const { mutate, isError, isPending } = useMutation({
      mutationKey: ["vehicles"],
  
      mutationFn: async (payload: any) => {
        return await axios.post(`${api_url}/vehicles`, payload);
      },
      onSuccess:(data)=>{
        const authToken = data.data.token; 
        localStorage.setItem("token", authToken);
        console.log("Vehicle Token:", authToken);
  
      },
      onError: (err: AxiosError) => {
        toast.error(`${err.response?.data}`);
      },
    });
    return { mutate, isError, isPending };
  };