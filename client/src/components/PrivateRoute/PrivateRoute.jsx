import { Navigate } from "react-router-dom";
import { useAuth } from "../../pages/Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" />;
}
