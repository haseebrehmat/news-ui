import { Navigate } from 'react-router-dom'
import { getToken } from '../lib/helpers'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) =>
  getToken() ? children : <Navigate to='/login' />
