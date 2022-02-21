import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../contexts/userContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [{ isLogin, userData }] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && userData.role === 'admin' ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AdminRoute;
