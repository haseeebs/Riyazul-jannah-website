import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

    const userStatus = useSelector(store => store.auth.status);

    return (userStatus ? <Outlet /> : <Navigate to='/login' replace />)
}

export default PrivateRoute