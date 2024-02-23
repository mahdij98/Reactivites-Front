import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <Container style={isHomePage ? { width: "100%" } : { marginTop: "7em" }}>
      {isHomePage ? null : <NavBar />}
      <Outlet />
    </Container>
  );
};

export default Layout;
