import { Navigate, Route } from "react-router-dom";


const ProtectedRoute = ({element: Component, ...props}) => {
  return (
      props.loggedIn ? <Route element={Component} {...props} /> : <Navigate to="/login" replace />  )
}

export default ProtectedRoute