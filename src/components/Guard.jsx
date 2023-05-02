import Cookies from "js-cookie";
import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Guard = ({children}) => {
  const token = Cookies.get('token');
    if (token) {
      return children
    } else {
      return <Navigate to={'/login'}/>
    }
  
}

export default Guard