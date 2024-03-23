import { useMutation } from "@tanstack/react-query";
import { API_END_POINT } from "../constant/constant";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const api_url = `${API_END_POINT}`;

export const SignupMutation = () => {
  const navigate=useNavigate()
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["signup"],

    mutationFn: async (payload: any) => {
      return await axios.post(`${api_url}/signup`, payload);
    },
    onSuccess:(data)=>{
      const authToken = data.data.token; 
      console.log("Signup Token:", authToken);

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
      return axios.post(`${api_url}/login`, payload);
    },
    onSuccess: (data) => {

      const authToken = data.data.token; 
      localStorage.setItem("token", authToken);
      console.log("Sign in Token:", authToken);
    },
    onError: (err: AxiosError) => {
      console.log(err?.response?.data);
      alert(err?.response?.data);
      toast.error(`${err?.response?.data}`);
    },
  });
  return { mutate, isError, isPending };
};