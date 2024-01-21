import { Link } from 'react-router-dom';
import Logout from './Logout';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import { Userinfo, userContext } from './UserContextProvider';

function NavigationBar() {
  const { currentUserinfo }: { currentUserinfo: Userinfo } =
    useContext(userContext);

  return (
    <Container fluid className="px-0">
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="sm"
        className="rounded-3 px-3"
      >
        <Navbar.Brand as={Link} to="/" className="flex-1">
          {currentUserinfo.name}'s Bookshelf
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav-toggle" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/">
              <Button className="col-12">Home</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/books">
              <Button className="col-12">Books</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <Logout />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavigationBar;
