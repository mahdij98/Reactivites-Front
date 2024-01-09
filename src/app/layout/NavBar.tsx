import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivites
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities"></Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/creatActivity"
            positive
            content="Creat Activitie"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
