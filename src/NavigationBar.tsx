import { Link } from 'react-router-dom';
import Logout from './Logout';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
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
        <Row className="lh-lg overflow-auto d-flex flex-nowrap justify-content-between flex-grow-1">
          <Col xs={10}>
            <Navbar.Brand as={Link} to="/" className="flex-1 text-wrap">
              {currentUserinfo.name}'s Bookshelf
            </Navbar.Brand>
          </Col>
          <Col xs={2}>
            <Navbar.Toggle aria-controls="navbar-nav-toggle" />
          </Col>
        </Row>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/home">
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
