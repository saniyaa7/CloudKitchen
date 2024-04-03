import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./Provider/authProvider";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./component/Header/MyNavBar";
import { useEffect } from "react";
import { setTokenInHeader } from "./Hooks/authentication.hook";

function App() {
  const token = localStorage.getItem('token')

  useEffect(()=>{
    token && setTokenInHeader(token)
  },[token])

  return (
    <ChakraProvider>
    
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </ChakraProvider>
  );
}

export default App;