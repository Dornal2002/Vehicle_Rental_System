import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import "../stylesheet/SignUp.css";
import Home_page from "../images/Home_page.jpg";

export const initialValues = {
  user_id: "",
  name: "",
  email: "",
  password: "",
  contact_no: "",
  address: "",
  role: "",
  driving_license_no: "",
  isSignUp: false,
};

export const SignUp = () => {
  const unique_id = uuidv4;
  const validationSchema = yup.object({
    name: yup.string().required("Please provide Username"),
    contact_no: yup
      .string()
      .required("Please provide Contact no")
      .length(10, "Invalid Conatct No"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Please provide password"),
    address: yup.string().required("Please Enter the address"),
    role: yup.string().required("Please select the role"),
    driving_license_no: yup.string().required("Please Provide the license no"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async ({}) => {
      alert("Form Submitted");
    },
  });
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-4 left-side">
            <h2 className="mt-4">
              {formik.values.isSignUp ? "Sign Up" : "Sign In"}
            </h2>
            <form onSubmit={formik.handleSubmit} className="signup-form">
              {formik.values.isSignUp && (
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
                      id="contact_no"
                      name="contact_no"
                      placeholder="Contact_no"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contact_no}
                    />

                    {formik.touched.contact_no && formik.errors.contact_no && (
                      <div className="text-danger">
                        {formik.errors.contact_no}
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
                      id="driving_license_no"
                      name="driving_license_no"
                      placeholder=" Driving License No"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.driving_license_no}
                    />

                    {formik.touched.driving_license_no &&
                      formik.errors.driving_license_no && (
                        <div className="text-danger">
                          {formik.errors.driving_license_no}
                        </div>
                      )}
                  </div>
                  <button type="submit" className="btn btn-primary mb-3">
                    Submit
                  </button>
                </>
              )}
              {!formik.values.isSignUp && (
                <>
                  <div className="mb-2 mt-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="mb-2 mt-3">
                    <input
                      type="password"
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={formik.isSubmitting}
                  >
                    {formik.values.isSignUp ? "Sign Up" : "Sign In"}
                  </button>
                </>
              )}
            </form>
            <p className="mt-2">
              {formik.values.isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() =>
                  formik.setFieldValue("isSignUp", !formik.values.isSignUp)
                }
              >
                {formik.values.isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
          <div className="col-md-8 d-flex justify-content-center align-items-center">
            <img src={Home_page} className="h-screen" alt="Home-page" />
          </div>
        </div>
      </div>
    </>
  );
};
