import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import "../stylesheet/SignUp.css";
import car from "../images/car.jpg";
import axios from "axios";
import { SiginMutation } from "../hooks/signIn.hook";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { error } from "console";
import { useEffect } from "react";

export const initialValues = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const authToken=  localStorage.getItem("token");
  const { mutate, isError, isPending } = SiginMutation();
  const navigate = useNavigate();


  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Please rovide password"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      // try {
      //   const response = await axios.post(
      //     "http://127.0.0.1:8000/login", // Replace with your API endpoint
      //     { email, password },
      //     {
      //       headers: {
      //         Authorization: authToken, // Set authorization token in headers
      //       },
      //     }
      //   );
      //   console.log(response.data)
      //   // Assuming your server responds with a token upon successful login
      //   const { token } = response.data;
      //   console.log(response.data)
      //   localStorage.setItem("token", token);

      //   navigate("/vehicle");
      // } catch (error) {
      //   alert("Invalid Credentials")
      //   console.error("Error signing in:", error);
      // }
      const payload = {
        email: email,
        password: password,
      };
      if (!isPending) {
        mutate(payload, {
          onSuccess: (resp) => {
            // console.log(resp.data.user.role);
            if(resp.data.user.role=="admin")
            navigate("/admin");
            else
            navigate("/vehicle");
          },
        });
      }
    },
  });

  return (
    <>
      <div>
        <div
          style={{
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${car})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="form">
            <div className="left-side container shadow-2xl">
              <h2 className="pt-5 font-weight-bold text-center">Sign In</h2>
              <form onSubmit={formik.handleSubmit} className="signup-form">
                <>
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
                      <div className="text-danger">
                        {formik.errors.email}
                      </div>
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
                  <button type="submit" className="btn btn-color mb-3">
                    Sign In
                  </button>
                  <p>
                    Don't have an account? <Link to={"/"}>SignUp</Link>
                  </p>
                </>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
