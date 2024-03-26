import React, { useEffect, useReducer, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../Type/type";
import { SiginMutation, useFetchUser } from "../../Hooks/register.hook";
import { UserInitialValues } from "../../Type/initialValues";
import { useAuth } from "../../Provider/authProvider";
interface State {
  user: IUser;
  
}
type Action =

  | { type: "SET_USER"; payload: IUser };
const initialState: State = {
  user: UserInitialValues,

};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      // Merge the new user data with the existing user state
      return { ...state, user:action.payload };
    default:
      return state;
  }
};


function SignIn() {

  const [ state, dispatch ] = useReducer(reducer,initialState);
  const {user}=state;
  const { mutate, isError, isPending } = SiginMutation();
  const navigate = useNavigate();
  const authToken=useAuth();
   const {data}=useFetchUser();
  
  
  useEffect(()=>{
    if(data)
    {
      dispatch({ type: "SET_USER", payload: data.data });
      localStorage.setItem("user_id",user.id+"");
    }
    
    
  

  },[data,dispatch])
  


  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
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
  });
  const initialValues = {
    email: "saniyachaudhari@gmail.com",
    password: "Saniya@1234",
  };
  const handleSubmit = (values: any) => {
    

    const payload = {
      email: values.email,
      password: values.password,
    };
    if (!isPending) {
      mutate(payload, {
        onSuccess: () => {
          navigate("/home", { state: { user: user } }); 
        },
      });
    }
  };


  return (
    <>
    

    <section className="text-center text-lg-start" style={{ height: "100vh" }}>
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
                  <h2 className="fw-bold mb-5">Login</h2>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="form-outline mb-4">
                          <Field
                            type="email"
                            name="email"
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                          />
                          <ErrorMessage
                            name="email"
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
                          Don't have an account?{" "}
                          <Link to={"/signup"}>SignUp</Link>
                        </p>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                          disabled={isPending}
                        >
                          Sign in
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>

          <div className="h-100 col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://wallpapers.com/images/hd/classy-butter-chicken-platter-indian-food-s8a8b9aojk6kqoz0.jpg"
              className="w-100 h-100 d-inline-block rounded-4 shadow-4"
              alt=""
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section></>
    
  );
}


export default SignIn;