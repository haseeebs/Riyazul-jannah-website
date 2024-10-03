import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import HeroSkeleton from '../components/skeleton/HeroSkeleton';
import UmrahPackageSkeleton from '../components/skeleton/UmrahPackageSkeleton';
import UmrahPackageCustomizationSkeleton from '../components/skeleton/UmrahPackageCustomizationSkeleton';
import HajjUmrahPackageSkeleton from '../components/skeleton/HajjUmrahPackageSkeleton';
import NotFoundPage from '../pages/NotFoundPage';
import LazyWrapper from '../components/LazyWrapper';
import PrivateRoute from '../pages/PrivateRoute';

// Lazy imports
const Layout = lazy(() => import('../pages/Layout'));
const HomePage = lazy(() => import('../pages/HomePage'));
const Packages = lazy(() => import('../pages/Packages'));
const CustomizePackage = lazy(() => import('../pages/Customize/CustomizePackage'));
const PackageDetail = lazy(() => import('../pages/PackageDetail'));
const LoginPage = lazy(() => import('../pages/Admin/LoginPage'));
const PackageForm = lazy(() => import('../pages/Admin/PackageForm'));
const HotelForm = lazy(() => import('../pages/Admin/HotelForm'));
const HotelList = lazy(() => import('../pages/Admin/HotelList'));
const ExtraDataFormPage = lazy(() => import('../pages/Admin/ExtraDataFormPage'));
const ImageList = lazy(() => import('../pages/Admin/ImageList'));
const AdminNotifications = lazy(() => import('../pages/Admin/AdminNotifications'));
const CustomizePackageRequests = lazy(() => import('../pages/Customize/CustomizePackageRequests'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<HeroSkeleton />}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<HeroSkeleton />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'packages',
                element: (
                    <Suspense fallback={<UmrahPackageSkeleton />}>
                        <Packages />
                    </Suspense>
                ),
            },
            {
                path: 'customize-package',
                element: (
                    <Suspense fallback={<UmrahPackageCustomizationSkeleton />}>
                        <CustomizePackage />
                    </Suspense>
                ),
            },
            {
                path: 'packages/:id',
                element: (
                    <Suspense fallback={<HajjUmrahPackageSkeleton />}>
                        <PackageDetail />
                    </Suspense>
                ),
            },
            {
                path: 'login',
                element: <LazyWrapper><LoginPage /></LazyWrapper>
            },
            {
                path: '',
                element: <PrivateRoute />,
                children: [
                    {
                        path: 'create-package',
                        element: <LazyWrapper><PackageForm /></LazyWrapper>
                    },
                    {
                        path: 'edit-package/:id',
                        element: <LazyWrapper><PackageForm /></LazyWrapper>
                    },
                    {
                        path: 'create-hotel',
                        element: <LazyWrapper><HotelForm /></LazyWrapper>
                    },
                    {
                        path: 'edit-hotel/:id',
                        element: <LazyWrapper><HotelForm /></LazyWrapper>
                    },
                    {
                        path: 'hotel-lists',
                        element: <LazyWrapper><HotelList /></LazyWrapper>
                    },
                    {
                        path: 'add-extra-details',
                        element: <LazyWrapper><ExtraDataFormPage /></LazyWrapper>
                    },
                    {
                        path: 'image-lists',
                        element: <LazyWrapper><ImageList /></LazyWrapper>
                    },
                    {
                        path: 'customize-package-requests',
                        element: <LazyWrapper><CustomizePackageRequests /></LazyWrapper>
                    },
                    {
                        path: 'add-notification',
                        element: <LazyWrapper><AdminNotifications /></LazyWrapper>
                    },
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);

export default router;