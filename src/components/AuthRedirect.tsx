import { Navigate } from 'react-router-dom'
import { getToken } from '../lib/helpers'

export const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const token = getToken()

  return token ? <Navigate to='/feed' replace /> : children
}
