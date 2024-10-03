import useAuthCheck from "./hooks/useAuthCheck";

const AuthWrapper = ({ children }) => {
    useAuthCheck();
    return children;
};

export default AuthWrapper;