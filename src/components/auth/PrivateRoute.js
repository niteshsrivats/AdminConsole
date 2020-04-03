import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Login from "./Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const PrivateRoute = ({ component: RouteComponent, location, ...rest }) => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser === undefined) {
    return (
      <Container><CircularProgress/></Container>
    );
  } else if (!!currentUser) {
    return <RouteComponent user={currentUser} {...rest} />;
  } else {
    return <Login/>;
  }
};

export default PrivateRoute;
