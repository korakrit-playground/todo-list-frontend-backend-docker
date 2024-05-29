import React from 'react';
import ConfigRoutes from '../../config/routes';
import { Routes, Route, Navigate } from 'react-router-dom';

function PrivateRoutes(props) {
    const role = props.role || "guest";

    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoute = ConfigRoutes[role].redirectRoutes;

    return (
        <div>
            <Routes>
                {allowedRoutes.map(route => (
                    <Route 
                        path={route.url}
                        key={route.url}
                        element={<route.component setRole={props.setRole} />}
                    />
                ))}
                <Route path="*" element={<Navigate replace to={redirectRoute} />} />
            </Routes>
        </div>
    );
}

export default PrivateRoutes;
