import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AuthRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route path="/dashboard" element={<UserDashboard />} />,
];

export default AuthRoutes;