import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import "../stylesheet/SignUp.css";
import car from "../images/car.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { SignupMutation } from "../hooks/signIn.hook";
import { SignUp_Data } from "../types/UserDetails";

export const initialValues = {
  name: "",
  email: "",
  password: "",
  phone_no: "",
  address: "",
  role: "",
  d_license_no: ""
};

export const SignUp = () => {
  const { mutate, isError, isPending } = SignupMutation();

  const navigate=useNavigate()


  const validationSchema = yup.object({
    name: yup.string().required("Please provide Username"),
    phone_no: yup
      .string()
      .required("Please provide Contact no")
      .length(10, "Invalid Conatct No"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Please provide password"),
    address: yup.string().required("Please Enter the address"),
    role: yup.string().required("Please select the role"),
    d_license_no: yup.string().required("Please Provide the license no"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    
    onSubmit: async ({name, email, password, phone_no, address,role,d_license_no }) => {
      const payload: SignUp_Data = {
        name: name,
        email: email,
        password: password,
        phone_no: phone_no,
        address:address,
        role:role,
        d_license_no:d_license_no
      };
      if (!isPending) {
        mutate(payload, {
          onSuccess: () => {
            alert("sign up Successfull")
            navigate("/login");
          },
        });
      }
      // try {
      //   const res=await axios.post("http://127.0.0.1:8000/signup", {
      //     name: name,
      //     email: email,
      //     password: password,
      //     phone_no: phone_no,
      //     address: address,
      //     role: role,
      //     d_license_no : d_license_no 
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },        
          
      //   });
      //   console.log(res)
      //   // localStorage.setItem("token",res.data.token)
      //   alert("Successfully registered")
      //   navigate("/login");
      // } catch (error) {
      //   console.error("Error:", error);
      //   alert("Failed to add task. Please try again.");
      // }
  }
  });
  return (
    <>
      <div>
        <div 
          style={{
            height: "100vh",
            width: '100%',
            backgroundImage:`url(${car})`,
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
          }}>
       
        <div className="form">
          <div className="left-side container shadow-2xl">
          <h2 className="pt-5 font-weight-bold text-center">
             SignUp
            </h2>
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <>
                  <div className="mb-3 mt-3">
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Username"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      id="phone_no"
                      name="phone_no"
                      placeholder="Contact_no"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone_no}
                    />

                    {formik.touched.phone_no && formik.errors.phone_no && (
                      <div className="text-danger">
                        {formik.errors.phone_no}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />

                    {formik.touched.address && formik.errors.address && (
                      <div className="text-danger">{formik.errors.address}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <select
                      className="form-control"
                      {...formik.getFieldProps("role")}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    {formik.touched.role && formik.errors.role && (
                      <div className="text-danger">{formik.errors.role}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      id="d_license_no"
                      name="d_license_no"
                      placeholder=" Driving License No"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.d_license_no}
                    />

                    {formik.touched.d_license_no &&
                      formik.errors.d_license_no && (
                        <div className="text-danger">
                          {formik.errors.d_license_no}
                        </div>
                      )}
                  </div>
                  <button type="submit" className="btn btn-color mb-3">
                    Sign Up
                  </button>
                </>
            <p>
             Do you have an Account? <Link to={"/login"}>SignIn</Link>
            </p>  
            </form>
          </div>
           
           
          </div>
          </div>

      </div>
    </>
  );
};
