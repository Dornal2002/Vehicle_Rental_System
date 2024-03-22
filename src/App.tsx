import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import Error from "./pages/Error";
import Vehicle from "./pages/Vehicle";
import GetVehicles from "./pages/GetVehicles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/vehicle" element={<Vehicle/>} />
          <Route path="/getvehicles" element={<GetVehicles/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
