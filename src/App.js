import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/App/DashBoard";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <Home /> : <DashBoard />}
      ></Route>
    </Routes>
  );
}

export default App;
