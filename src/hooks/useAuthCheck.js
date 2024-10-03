import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import authService from "../services/authService";

const useAuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        };

        init();
    }, [dispatch]);
};

export default useAuthCheck;