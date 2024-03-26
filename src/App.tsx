import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./Provider/authProvider";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./component/Header/MyNavBar";

function App() {
  return (
    <ChakraProvider>
    
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </ChakraProvider>
  );
}

export default App;