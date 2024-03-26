import "../stylesheet/Vehicle.css";
import imp_car from "../images/imp_car.png";
import location1 from "../images/location1.jpg";
import axios from "axios";
import { Rental } from "../types/UserDetails";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export const initialValues = {
  start_date: "",
  expected_end_date: "",
  vehicle_id: 0,
  pickup_point: "",
  destination: "",
  payment_mode: "",
};
export default function Vehicle() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Rental[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedVehicle(event.target.value);
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const data = {
      pickup_point: initialValues.pickup_point,
      destination: initialValues.destination,
      start_date: initialValues.start_date,
      expected_end_date: initialValues.expected_end_date,
      vehicle_id: initialValues.vehicle_id,
      payment_mode: initialValues.payment_mode,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/rentals", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Data posted successfully:", response.data);
      navigate("/getVehicles");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="vehicle-page-img">
      <div
        style={{
          height: "90vh",
          width: "100%",
          backgroundImage: `url(${location1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="form1">
          <div className="card container card1 shadow-2xl">
            <div className="card-header mt-2">Trip</div>
            <div className="card-body">
              <div className="mb-3 mt-2">
                <label>FROM</label>
                <input
                  type="text"
                  id="pickup_point"
                  name="pickup_point"
                  placeholder="Enter Source"
                  className="form-control"
                />
              </div>
              <div className="mb-3 mt-3">
                <label>TO</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Enter Destination"
                  className="form-control"
                />
              </div>
              {/* <div className="mb-3 mt-3">
                <label>Select Vahicle</label>
                <div className="d-flex">
                  <label className="mr-5">
                    <input
                      type="radio"
                      value="car"
                      checked={selectedVehicle === "car"}
                      onChange={handleSelectionChange}
                    />
                    <Car size={32} />
                    Car{" "}
                  </label>

                  <label className="ms-5">
                    <input
                      type="radio"
                      value="bike"
                      checked={selectedVehicle === "bike"}
                      onChange={handleSelectionChange}
                    />
                    <Bike size={32} />
                    Bike{" "}
                  </label>
                </div>
              </div> */}
              <div className="d-flex">
                <div>
                  <label>PICKUP DATE</label>
                  <br />
                  <input type="date" id="start_date" name="start_date" />
                </div>
                <div className="ms-5">
                  <label>DROP DATE</label>
                  <br />
                  <input
                    type="date"
                    id="expected_end_date"
                    name="expected_end_date"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label>Payment Mode</label>
                <select className="form-control">
                  <option value="" disabled>
                    Select Payment Status
                  </option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/selectvehicles")}
                >
                  SELECT VEHICLE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-car-image">
          <img className="h-100" src={imp_car} alt="car" />
        </div>
      </div>

      {/* <div>
        <div>
        <img src={imp_loc} alt="Location"/>
        </div>
        <div className="profile-car-image">
        <img src={imp_car} alt="car"/>
        </div>
        
      </div> */}
    </div>
  );
}
