import car3 from "../images/car3.png";
import "../stylesheet/Vehicle.css";
import { useFormik } from "formik";
import imp_loc from "../images/img_loc.jpg"
import imp_car from "../images/imp_car.png"
import { Car, Bike } from "lucide-react";
import React, { useState } from "react";
export default function Vehicle() {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedVehicle(event.target.value);
  };
  return (
    <div className="vehicle-page-img">
      <div
        style={{
          height: "70vh",
          width: "100%",
          backgroundImage: `url(${car3})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="form">        
        <div className="card container card1 shadow-2xl">
          <div className="card-header mt-2">Trip</div>
          <div className="card-body">
            <div className="mb-3 mt-3">
              <label>FROM</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Username"
                className="form-control"
                //   onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
                //   value={formik.values.name}
              />
            </div>
            <div className="mb-3 mt-3">
              <label>TO</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Username"
                className="form-control"
                //   onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
                //   value={formik.values.name}
              />
            </div>
            <div className="mb-3 mt-3">
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
            </div>
            <div className="d-flex">
                <div>

                <label>PICKUP DATE</label>
                <br/>
                <input 
                type="date"
                />
                </div>
                <div className="ms-5">

<label>PICKUP TIME</label>
<br/>
<input 
type="date"
/>
</div>
            </div>
            <div>
                <button className="btn btn-primary mt-3">SELECT VEHICLE</button>
          </div>
        </div>
        </div>
        </div>
      </div>
      <div>
        <div>
        <img src={imp_loc} alt="Location"/>
        </div>
        <div className="profile-car-image">
        <img src={imp_car} alt="car"/>
        </div>
        
      </div>
    </div>
  );
}
