import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';
import { AppContext } from './contexts/app.context';
import MainLayout from './layouts/MainLayout/MainLayout';
import RegisterLayout from './layouts/RegisterLayout';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Profile from './pages/Profile';
import Register from './pages/Register';

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />;
}

export default function useRouteElement() {
    const routeElements = useRoutes([
        {
            path: path.home,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            ),
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.profile,
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    ),
                },
            ],
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: path.login,
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    ),
                },
                {
                    path: path.register,
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    ),
                },
            ],
        },
    ]);
    return routeElements;
}
