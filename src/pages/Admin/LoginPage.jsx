import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login as authLogin } from '../../store/authSlice';
import authService from '../../services/authService';
import { Logo } from '../../assets/images';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      
      const loginPromise = async () => {
        const session = await authService.login(data);
        if (session) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            dispatch(authLogin(userData));
            navigate(redirect);
            return userData;
          }
        }
        throw new Error('Login failed');
      };

      // Use toast.promise
      toast.promise(loginPromise(), {
        loading: 'Signing in...',
        success: (userData) => {
          setIsLoading(false);
          return `Welcome back, ${userData.name}!`;
        },
        error: (err) => {
          setIsLoading(false);
          setErrorMessage(err?.response?.message || 'Login failed. Please try again.');
          return err?.response?.message || 'Login failed. Please try again.';
        }
      });

    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      setErrorMessage(error?.response?.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      if (user) {
        navigate(redirect)
      }
    })
  }, [redirect, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src={Logo}
            alt="Riyazul Jannah"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-lime-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="appearance-none rounded-t-xl relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="appearance-none rounded-b-xl relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center p-4 border border-transparent text-sm font-medium rounded-xl text-white 
              ${isLoading 
                ? 'bg-lime-400 cursor-not-allowed' 
                : 'bg-lime-600 hover:bg-lime-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;