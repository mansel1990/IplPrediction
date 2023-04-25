import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const groupDetailsClick = () => {
    navigate("/groups");
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Expense Tracker</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/stats" className="px-2">
                <Nav.Link>Statistics</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/viewexpense" className="px-2">
                <Nav.Link>Expenses</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  className="px-2"
                  title={userInfo.name}
                  id="username"
                >
                  <NavDropdown.Item onClick={groupDetailsClick}>
                    Group Details
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" className="px-2">
                  <Nav.Link>
                    <i className="fa fa-user px-1" aria-hidden="true" />
                    Log in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
