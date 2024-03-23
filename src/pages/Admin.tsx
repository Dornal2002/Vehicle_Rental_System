import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage ,FormikHelpers} from "formik";
import v1 from "../images/v1.jpg";
import { Pencil, Trash2 } from "lucide-react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { VehicleData } from "../types/UserDetails";
import { AddVehicle } from "../hooks/admin.hook";
import GetVehicles from "./GetVehicles";

export default function Admin() {
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate()
  // const { mutate, isError, isPending } = AddVehicle();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const initialValues = {
    v_type: "",
    vehicle_no: "",
    make: "",
    model: "",
    year: 2000,
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
    year: Yup.string().required("Year of Manufacture is required"),
    fuel_type: Yup.string().required("fueltype is required"),
    mileage: Yup.string().required("Mileage is required"),
    price_per_hrs: Yup.string().required("Price Per Hours is required"),
  });

  const handleSubmit = async (
    values: VehicleData, // Replace 'VehicleData' with your actual type for form values
    { setSubmitting }: FormikHelpers<VehicleData> // FormikHelpers type provides the correct type for setSubmitting
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/vehicles', values, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Data posted successfully:', response.data);
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary justify-content-center">
        <form className="form-inline text-center">
          <button
            className="btn btn-outline-success btn-hover text-light bg-success my-2 text-center"
            type="button"
            style={{ marginRight: "10px" }}
            onClick={openModal}
          >
            Add Vehicles
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
                      <label htmlFor="vehiclv_typeeType">Vehicle Type</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="v_type"
                        name="v_type"
                      />
                      <ErrorMessage
                        name="v_type"
                        component="div"
                        className="text-danger"
                      />
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

                      <label htmlFor="mileage" className="mt-1">Mileage</label>
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
                    </div>

                    {/* Add more form fields as needed */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
      {/* <div className="card mt-3 car-card shadow-2xl">
                 <div className="card-header">
                     <img src={v1} alt="Image 1"/>
                 </div>
                 <div className="card-body d-flex">
                     <p>Total Bill:100</p>
                     <br/>
                     <p>Payment Status :Paid</p>
                     <p>{<Pencil/>}</p>
                     <p>{<Trash2/>}</p>
                    
                 </div>
             </div> */}
             <div>
              <GetVehicles/>
             </div>

      </div>

    </>
  );
}
