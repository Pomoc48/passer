import { Navigate } from 'react-router-dom';
import { useEmailUser } from '../../../context/userProvider';

export function RequireAuth({ children, redirectTo }: any) {
    const user = useEmailUser();
    return user.user === null ? <Navigate to={redirectTo} /> : children;
}
