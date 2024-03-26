import axios from "axios";
import { useEffect, useState } from "react";
import v1 from "../images/v1.jpg";
import { VehicleData } from "../types/UserDetails";
import bike from "../images/bike.jpg";
import Jeep from "../images/Jeep.jpg";

export default function SelectVehicles() {
  const [users, setUsers] = useState<VehicleData[]>([]);

 
     const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/vehicles", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const extractedData = response.data.map((vehicle: VehicleData) => ({
            id: vehicle.id,
            v_type: vehicle.v_type,
            vehicle_no: vehicle.vehicle_no,
            make: vehicle.make,
            model: vehicle.model,
            yaer: vehicle.year,
            fuel_type: vehicle.fuel_type,
            mileage: vehicle.mileage,
            price_per_hrs: vehicle.price_per_hrs,
            status: vehicle.status,
          }));
          setUsers(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
  useEffect(() => {
    fetchData();
  }, []);

  const handleBook = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const bookingData = {
        start_date: "29-03-2024",
        expected_end_date: "30-03-2024",
        vehicle_id: id,
        pickup_point: "Solapur",
        destination: "pune",
        payment_mode: "cash",
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/rentals",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Booking Done Successsfully");
        fetchData();  
      } else {
        console.error("Failed to book the vehicle");
      }
    } catch (error) {
      console.error("Error booking the vehicle:", error);
    }
  };

  return (
    <>
      <div className="container bg-yellow-200">
        <div className="row h-100vh">
          {users.length==0 && <h1>No vehicles Available for booking</h1>}
          {users.map((vehicle, index) => (
            <div className="col-md-3 mt-3" key={index}>
              <div className="card car-card shadow-2xl">
                <div className="card-header">
                  {vehicle.v_type == "car" ? (
                    <img src={v1} alt={`Image ${index + 1}`} />
                  ) : (
                    ""
                  )}
                  {vehicle.v_type == "bike" ? (
                    <img src={bike} alt={`Image ${index + 1}`} />
                  ) : (
                    ""
                  )}
                  {vehicle.v_type == "jeep" ? (
                    <img src={Jeep} alt={`Image ${index + 1}`} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="card-body">
                  <h3>Vehicle Details</h3>
                  <span>Vehicle: {vehicle.v_type}</span>
                  <br />
                  <span>Vehicle Number: {vehicle.vehicle_no}</span>
                  <br />
                  <span>Manufacturer: {vehicle.make}</span>
                  <br />
                  <span>Model: {vehicle.model}</span>
                  <br />
                  <span>Year of Manufacturer:{vehicle.year}</span>
                  <br />
                  <span>Mileage:{vehicle.mileage}</span>
                  <br />
                  <span>Price per hour:{vehicle.price_per_hrs}</span>
                  <br />
                  <span>
                    Status:
                    {vehicle.status === "available" ? (
                      <span className="text-success">{vehicle.status}</span>
                    ) : (
                      <span className="text-danger">{vehicle.status}</span>
                    )}
                  </span>
                  <br />
                  <div className="d-flex justify-content-end mb-0 pb-0">
                    <button
                      className="btn btn-success"
                      onClick={() => handleBook(vehicle.id)}
                    >
                      Book
                    </button>
                    {/* <button className="mr-2" onClick={() => handleEdit(vehicle.id)}><Pencil/></button>
                  <button className="mr-3" onClick={() => handleDelete(vehicle.id)}><Trash2/></button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
