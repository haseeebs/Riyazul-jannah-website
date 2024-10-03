import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { toast } from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      toast.success("You have successfully logged out!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-lime-400 rounded hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 transition-all"
    >
      Logout
    </button>
  );
};

export default Logout;