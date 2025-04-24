import { Navigate } from "react-router-dom";
import { useAuth } from "../../pages/Context/AuthContext";
//stranky se zobrazi pouze pokud je prihlaseny spravce, jinak presmeruje na login
export default function PrivateRoute({ children }) {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" />;
}
