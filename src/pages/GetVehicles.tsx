import axios from "axios";
import { useEffect, useState } from "react";
import v1 from "../images/v1.jpg";
import { VehicleData } from "../types/UserDetails";
import { Pencil, Trash2 } from "lucide-react";
import bike from "../images/bike.jpg";
import Jeep from "../images/Jeep.jpg";

export default function GetVehicles() {
  const [users, setUsers] = useState<VehicleData[]>([]);
  useEffect(() => {
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

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/vehicles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUsers(
          users.filter(
            (vehicle) => (console.log(vehicle, id), vehicle.id !== id)
          )
        );
        console.log("Data deleted successfully");
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = async (vehicleId: number) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.patch(
        `http://127.0.0.1:8000/vehicle/${vehicleId}`,
        // Pass the updated data for the vehicle to the backend
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Handle successful update, e.g., refetch the data from the backend
        // fetchData(); // Assuming fetchData function exists to refetch the data
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      {/* <div>
        <div className="container d-flex">
          <div className="card mt-3 car-card shadow-2xl">
            <div className="card-header">
              <img src={v1} alt="Image 1" />
            </div>
            <div className="card-body">
              <p>Total Bill:100 R</p>
              <p>Payment Status :Paid</p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container d-flex get-vehicles">
        {users.map((vehicle, index) => (
          <div className="card ms-3 mb-3 mt-3 car-card shadow-2xl" key={index}>
            <div className="card-header">
              <img src={v1} alt={`Image ${index + 1}`} />
            </div>
            <div className="card-body"> 
            <h3>Vehicle Details</h3>
            <span>id:{vehicle.id}</span><br/>
              <span>Vehicle: {vehicle.v_type} </span><br/>
              <span>Manufacturer: {vehicle.make}</span><br/>
              <span>Model: {vehicle.model}</span><br/>
              <span>Year of Manufacturer:{vehicle.year}</span><br/>
              <span>Mileage:{vehicle.mileage}</span><br/>
              <span>Price per hour:{vehicle.price_per_hrs}</span><br/>
              <span>Status:
                {vehicle.status=="available"?<span className="text-success">{vehicle.status}</span>:<span className="text-danger">{vehicle.status}</span>}</span><br/>
                <div className="d-flex justify-content-end mb-0 pb-0">
            <button className="mr-2"  onClick={()=>handleEdit(vehicle.id)}>{<Pencil/>}</button>
            <button className="mr-3" onClick={()=>handleDelete(vehicle.id)}>{<Trash2/>}</button>
            </div>
            </div> 
          </div>
        ))}
      </div> */}
      <div className="container get-vehicles">
        <div className="row">
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
                    {/* <button className="mr-2" onClick={() => handleEdit(vehicle.id)}><Pencil/></button> */}
                    <button
                      className="mr-3"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      <Trash2 />
                    </button>
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
