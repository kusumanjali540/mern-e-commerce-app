import { Navigate } from 'react-router-dom';
import { useCurrentAdminQuery } from '../../features';

const ProtectedRouteAdmin = ({ children }) => {
  const { data: admin, isLoading, isError } = useCurrentAdminQuery();

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  console.log("Is there any admin? ", admin);

  if (isError || !admin.currentAdmin) {
    return <Navigate to="/admin_auth" />;
  }

  return children;
};

export default ProtectedRouteAdmin;