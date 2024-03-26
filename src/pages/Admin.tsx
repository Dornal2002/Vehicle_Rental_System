import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import {  VehicleData } from "../types/UserDetails";
import GetVehicles from "./GetVehicles";

export default function Admin() {
  const [showModal, setShowModal] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const navigate = useNavigate();
  // const { mutate, isError, isPending } = AddVehicle();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedVehicle(event.target.value);
  };

  const initialValues = {
    id: 0,
    v_type: "",
    vehicle_no: "",
    make: "",
    model: "",
    year: 2015,
    fuel_type: "",
    mileage: 0,
    price_per_hrs: 0.0,
    status: "booked",
  };

  const validationSchema = Yup.object({
    v_type: Yup.string().required("Vehicle type is required"),
    vehicle_no: Yup.string().required("Vehicle Number is required"),
    make: Yup.string().required("Vehicle Make is required"),
    model: Yup.string().required("Vehicle Model is required"),
    year: Yup.number()
      .min(2015)
      .max(2024)
      .required("Year of Manufacture is required"),
    fuel_type: Yup.string().required("fueltype is required"),
    mileage: Yup.string().required("Mileage is required"),
    price_per_hrs: Yup.string().required("Price Per Hours is required"),
  });

  const handleSubmit = async (
    values: VehicleData,
    { setSubmitting }: FormikHelpers<VehicleData>
  ) => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://127.0.0.1:8000/vehicles";
      const response = await axios.post(
        "http://127.0.0.1:8000/vehicles",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data posted successfully:", response.data);
      // setVehicles(response.data);
      closeModal(); 
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setSubmitting(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // const handleSubmit=async({ v_type,vehicle_no,make, model,year,fuel_type,mileage,price_per_hrs,status}:VehicleData)=>{
  //   const payload: VehicleData = {
  //     v_type:v_type,
  //     vehicle_no:vehicle_no,
  //     make:make,
  //     model:model,
  //     year:year,
  //     fuel_type:fuel_type,
  //     mileage:mileage,
  //     price_per_hrs:price_per_hrs,
  //     status:status

  //   };
  //   if (!isPending) {
  //     mutate(payload, {
  //       onSuccess: () => {
  //         alert("Data Added Successfully")
  //         // navigate("/login");
  //         closeModal();
  //       },
  //     })
  //   }
  // }

  return (
    <>
      <div className="admin-portal">
        <nav className="navbar navbar-expand-lg bg-warning justify-content-center">
          <form className="form-inline text-center">
            <button
              className="btn btn-outline-success btn-hover text-light bg-success my-2 text-center"
              type="button"
              style={{ marginRight: "10px" }}
              onClick={openModal}
            >
              Add Vehicles
            </button>
            <button
              className="btn btn-outline-danger btn-hover text-light bg-danger my-2 text-center"
              type="button"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </form>
        </nav>

        {showModal && (
          <div
            className="modal"
            role="dialog"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Vehicle</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="form-group">
                        <div className="mb-3">
                          <label htmlFor="v_type">Vehicle Type</label>
                          <Field
                            as="select"
                            className="form-control"
                            id="v_type"
                            name="v_type"
                          >
                            <option value="">Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="jeep">Jeep</option>
                          </Field>
                          <ErrorMessage
                            name="v_type"
                            component="div"
                            className="text-danger"
                          />
                          {/* <div className="d-flex">
                  <label className="mr-5">
                    <input
                      type="radio"
                      value="car"
                      id="car"
                      name="car"
                      checked={selectedVehicle === "car"}
                      onChange={handleSelectionChange}
                    />
                    <Car size={32} />
                    Car{" "}
                  </label>

                  <label className="ms-5 mr-5">
                    <input
                      type="radio"
                      value="bike"
                      id="bike"
                      name="bike"
                      checked={selectedVehicle === "bike"}
                      onChange={handleSelectionChange}
                    />
                    <Bike size={32} />
                    Bike{" "}
                  </label>
                  <label className="ms-5">
                    <input
                      type="radio"
                      value="jeep"
                      checked={selectedVehicle === "jeep"}
                      onChange={handleSelectionChange}
                    />
                    <CarTaxiFront size={32} />
                    Jeep{" "}
                  </label>
                </div> */}
                        </div>
                        <label htmlFor="vehicle_no">Vehicle Number</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="vehicle_no"
                          name="vehicle_no"
                        />
                        <ErrorMessage
                          name="vehicle_no"
                          component="div"
                          className="text-danger"
                        />
                        <label htmlFor="make">Vehicle Make</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="make"
                          name="make"
                        />
                        <ErrorMessage
                          name="make"
                          component="div"
                          className="text-danger"
                        />
                        <label htmlFor="model">Vehicle Model</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="model"
                          name="model"
                        />
                        <ErrorMessage
                          name="model"
                          component="div"
                          className="text-danger"
                        />
                        <label htmlFor="year">Year of Manufacture</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="year"
                          name="year"
                        />
                        <ErrorMessage
                          name="year"
                          component="div"
                          className="text-danger"
                        />
                        <label htmlFor="fuel_type">Fuel Type</label>
                        <Field
                          as="select"
                          className="form-control"
                          id="fuel_type"
                          name="fuel_type"
                        >
                          <option value="">Select Fuel Type</option>
                          <option value="petrol">Petrol</option>
                          <option value="diesel">Diesel</option>
                          <option value="electric">Electric</option>
                          <option value="CNG">CNG</option>
                        </Field>
                        <ErrorMessage
                          name="fuel_type"
                          component="div"
                          className="text-danger"
                        />

                        <label htmlFor="mileage" className="mt-1">
                          Mileage
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="mileage"
                          name="mileage"
                        />
                        <ErrorMessage
                          name="mileage"
                          component="div"
                          className="text-danger"
                        />
                        <label htmlFor="price_per_hrs">Price Per Hours</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="price_per_hrs"
                          name="price_per_hrs"
                        />
                        <ErrorMessage
                          name="price_per_hrs"
                          component="div"
                          className="text-danger"
                        />
                        <label htmlFor="price_per_hrs">Status</label>
                        <Field
                          as="select"
                          className="form-control"
                          id="status"
                          name="status"
                        >
                          <option value="">Select Fuel Type</option>
                          <option value="available">Available</option>
                          <option value="booked">Booked</option>
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          Add Vehicle
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="">
          <h2 className="text-center">Welcome to Admin Portal</h2>
        </div>

        <div className="container">
            <GetVehicles />
        </div>
      </div>
    </>
  );
}
