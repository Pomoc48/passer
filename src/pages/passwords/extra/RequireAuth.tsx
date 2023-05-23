import { Navigate } from 'react-router-dom';
import { useGoogleUser } from '../../../context/userProvider';

export function RequireAuth({ children, redirectTo } : any) {
    const user = useGoogleUser();
    return user.user === null ? <Navigate to={redirectTo} /> : children;
}
