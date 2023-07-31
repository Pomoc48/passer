import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export function RequireAuth({ children, redirectTo }: any) {
    let token = localStorage.getItem('keyToken');

    if (token === null) {
        return <Navigate to={redirectTo} />;
    }

    const auth = getAuth();

    if (auth.currentUser === null) {
        return <Navigate to={redirectTo} />;
    }

    return children;
}
