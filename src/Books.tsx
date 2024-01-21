import Spinner from 'react-bootstrap/Spinner';
import useBooks from './useBooks';
import { useContext } from 'react';
import { Userinfo, userContext } from './UserContextProvider';
import { Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function Books() {
  const { currentUserinfo }: { currentUserinfo: Userinfo } =
    useContext(userContext);

  const { books, loading, error } = useBooks();

  if (!currentUserinfo) {
    return (
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button className="col-12">Home</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <Container fluid className="py-4 my-4 border border-2 rounded-3">
      {loading ? (
        <Container className="text-center">
          <h1 className="mb-4">Loading your books ...</h1>
          <Spinner animation="border" role="status" className="">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h1 className="">Your Books</h1>
            <Link to="/books/create">
              <Button>Add new Book</Button>
            </Link>
          </div>
          <hr></hr>
          <div className="book-cards">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

export default Books;
