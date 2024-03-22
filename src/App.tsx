import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./component/SignUp-SignIn/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./component/SignUp-SignIn/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import MyNavBar from "./component/Header/MyNavBar";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<LoginPage />}>
            {" "}
          </Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
