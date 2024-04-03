import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../Type/type";
import { useSignupUser } from "../../Hooks/authentication.hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpForm() {
  const { mutate, isError, isPending } = useSignupUser();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.number()
      .typeError("Phone Number must be a number")
      .required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
        "Password must contain at least 4 alphabet"
      )
      .matches(
        /^((?=.*[!@#$%^&*()-_+=?]))/,
        "Password must contain at least 1 special character"
      )
      .matches(
        /^((?=.*[0-9].*[0-9].*[0-9]))/,
        "Password must contain at least 3 Number"
      ),
    role: Yup.string().required("Role is required"),
  });
  const initialValues = {
    firstName: "Saniya",
    lastName: "Chaudhari",
    email: "saniyachaudhari07@gmail.com",
    phoneNumber: "8237939131",
    password: "Saniya@123",
    role: "admin",
  };
  const handleSubmit = (values: any) => {
    const payload: IUser = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      phone: values.phoneNumber,
      password: values.password,
      role: values.role,
    };
    if (!isPending) {
      mutate(payload, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  };

  const roles = ["admin", "client", "delivery boy"];
  return (
    <>
      <ToastContainer position="top-left" />
      <section
        className="text-center text-lg-start"
        style={{ height: "100vh" }}
      >
        <style>
          {`
          .cascading-right {
            margin-right: -50px;
          }

          @media (max-width: 991.98px) {
            .cascading-right {
              margin-right: 0;
            }
          }
        `}
        </style>

        <div className="container py-4 h-100">
          <div className="row g-0 align-items-center h-100">
            <div className="col-lg-6 mb-5 mb-lg-0 h-100">
              <div
                className="card cascading-right h-100"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <div className="card-body p-5 shadow-5 text-center h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="fw-bold mb-5">Sign up now</h2>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <Field
                                  type="text"
                                  name="firstName"
                                  className={`form-control ${
                                    errors.firstName && touched.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="First Name"
                                />
                                <ErrorMessage
                                  name="firstName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <Field
                                  type="text"
                                  name="lastName"
                                  className={`form-control ${
                                    errors.lastName && touched.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Last Name"
                                />
                                <ErrorMessage
                                  name="lastName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              {" "}
                              <div className="form-outline mb-4">
                                <Field
                                  as="select" // Use "as" prop to render select element
                                  name="role"
                                  className={`form-control ${
                                    errors.role && touched.role
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select Role</option>
                                  {roles.map((role) => (
                                    <option key={role} value={role}>
                                      {role}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="role"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            <div className="col-md-6 mb-4">
                              <div className="form-outline mb-4">
                                <Field
                                  type="email"
                                  name="email"
                                  className={`form-control ${
                                    errors.email && touched.email
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Email"
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <Field
                              type="text"
                              name="phoneNumber"
                              className={`form-control ${
                                errors.phoneNumber && touched.phoneNumber
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Phone Number"
                            />
                            <ErrorMessage
                              name="phoneNumber"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <Field
                              type="password"
                              name="password"
                              className={`form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <p>
                            Have an Account? <Link to={"/signin"}>SignIn</Link>
                          </p>

                          <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                            disabled={isPending}
                          >
                            Sign up
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-100 col-lg-6 mb-5 mb-lg-0 ">
              <img
                src="https://wallpapers.com/images/hd/classy-butter-chicken-platter-indian-food-s8a8b9aojk6kqoz0.jpg"
                className="w-100 h-100 d-inline-block rounded-4 shadow-4"
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpForm;
