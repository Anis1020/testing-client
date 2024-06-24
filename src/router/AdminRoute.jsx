import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../CustomHooks/useAdmin";
import useAuth from "../CustomHooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <h2>Loading....</h2>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={{ from: location }} to={"/login"}></Navigate>;
};

export default AdminRoute;
