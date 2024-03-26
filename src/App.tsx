import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import Error from "./pages/Error";
import Vehicle from "./pages/Vehicle";
import { VehicleData } from "./types/UserDetails";
import GetVehicles from "./pages/GetVehicles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import Admin from "./pages/Admin";
import SelectVehicles from "./pages/SelectVehicles";


const queryClient =new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>   
      <BrowserRouter>
        <Routes>
         <Route path="/login" element={<SignIn />}/>
          <Route path="/" element={<SignUp />} />
          <Route path="/vehicle" element={<Vehicle/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/getvehicles" element={<GetVehicles />}/>
          <Route path="/selectvehicles" element={<SelectVehicles/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    
  );
}

export default App;
