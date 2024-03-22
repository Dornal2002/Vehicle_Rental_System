import axios from "axios";
import { useEffect, useState } from "react"
import v1 from "../images/v1.jpg";

export default function GetUsers(){
    const [data,setData]=useState(null);

    // const fetchData=async()=>{
    //     const resp=await axios.get("http://127.0.0.1:8000/vehicles")
    //     setData(resp.data)
    //     console.log(resp.data);
    // }

    // useEffect(() => {
    //     fetchData();
    //   }, []);

    return(
        <>
        <div>
            <div className="container d-flex"> 
            <div className="card mt-3 car-card shadow-2xl">
                <div className="card-header">
                    <img src={v1} alt="Image 1"/>
                </div>
                <div className="card-body">
                    <p>Total Bill:100 R</p>
                    <p>Payment Status :Paid</p>
                    
                </div>
            </div>
            <div className="card mt-3 ms-3 car-card shadow-2xl">
                <div className="card-header">
                    <img src={v1} alt="Image 1"/>
                </div>
                <div className="card-body">
                    <p>Total Bill:100 R</p>
                    <p>Payment Status :Paid</p>
                    
                </div>
            </div>
            <div className="card mt-3 ms-3 car-card shadow-2xl">
                <div className="card-header">
                    <img src={v1} alt="Image 1"/>
                </div>
                <div className="card-body">
                    <p>Total Bill:100 R</p>
                    <p>Payment Status :Paid</p>
                    
                </div>
            </div>
            <div className="card mt-3 ms-3 car-card shadow-2xl">
                <div className="card-header">
                    <img src={v1} alt="Image 1"/>
                </div>
                <div className="card-body">
                    <p>Total Bill:100 R</p>
                    <p>Payment Status :Paid</p>
                    
                </div>
            </div>
            <div className="card mt-3 ms-3 car-card shadow-2xl">
                <div className="card-header">
                    <img src={v1} alt="Image 1"/>
                </div>
                <div className="card-body">
                    <p>Total Bill:100 R</p>
                    <p>Payment Status :Paid</p>
                    
                </div>
            </div>
            </div>
        </div>
        </>
    )
}