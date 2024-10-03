import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({children, authentication = true}) => {
    const navigate = useNavigate();
    const authStatus = useSelector(store => store.auth.statusa)
    
    const [loader, setLoader] = useState(true);

    useEffect( () => {
        if(authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])

    return loader ? (<h1>Loading...</h1>) : <>{children}</>
}

export default AuthLayout