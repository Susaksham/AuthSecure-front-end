import { Navigate } from 'react-router-dom'
// import { useAuthStore } from '../../store/store'
import { useSelector } from 'react-redux'

export const AuthorizerUser = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to={'/'} replace={true}></Navigate>
  }
  return <>{children}</>
}

export const ProtectRoute = ({ children }) => {
  const username = useSelector((state) => {
    return state.auth.username
  })
  if (!username) {
    return <Navigate to={'/'} replace={true}></Navigate>
  }
  return <> {children}</>
}
