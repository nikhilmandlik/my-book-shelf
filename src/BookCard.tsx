import { Button, Card } from 'react-bootstrap';
import { Book } from './useBooks';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { bookContext } from './BookContextProvider';

function BookCard({ book }: { book: Book }) {
  const bookInfo = useContext(bookContext);
  const { title, description } = book;
  const navigate = useNavigate();

  function showDetails() {
    bookInfo.setCurrentBook(book);
    navigate(`/books/id=${book.id}`);
  }

  return (
    <Button
      className="book-card border-0 d-flex"
      variant="outline-light"
      onClick={showDetails}
    >
      <Card className="align-self-stretch">
        <Card.Img className="p-2" variant="top" src={book.image_url} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description.length > 120
              ? `${description.substring(0, 100)}...`
              : description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Button>
  );
}

export default BookCard;
