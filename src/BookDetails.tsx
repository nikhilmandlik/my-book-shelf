import {
  Accordion,
  Card,
  Col,
  Container,
  FigureImage,
  Row,
} from 'react-bootstrap';
import { Book, bookContext } from './BookContextProvider';
import { useContext } from 'react';
import { auto } from '@popperjs/core';

function BookDetails() {
  const bookInfo = useContext(bookContext);
  const book: Book = bookInfo.currentBook;

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xs={12} sm={auto} className="p-0">
          <FigureImage
            className="book-thumbnail"
            alt="book-cover"
            src={book.image_url}
            rounded
            thumbnail
          />
        </Col>
        <Col>
          <Card className="border-0">
            <Card.Body className="p-0">
              <Card.Title>
                <a href={book.amazon_product_url} target="_blank">
                  <h1>{book.title}</h1>
                </a>
              </Card.Title>
              <Card.Text className="pre-wrap">{book.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="py-2"></Row>

      <Row>
        <Card.Title className="py-3">Summary</Card.Title>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="oneLiner">
            <Accordion.Header>One liner</Accordion.Header>
            <Accordion.Body>{book.summary.oneLiner}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="threeLiner">
            <Accordion.Header>Three liner</Accordion.Header>
            <Accordion.Body className="pre-wrap">
              {book.summary.threeLiner}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="detailed">
            <Accordion.Header>Detailed</Accordion.Header>
            <Accordion.Body className="pre-wrap">
              {book.summary.detailed}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>

      <Row className="py-2"></Row>

      <Row>
        <Card className="border-0">
          <Card.Title className="py-3">Highlights</Card.Title>
          <Accordion alwaysOpen>
            {book.highlights.map((highlight, index) => {
              return (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>
                    Page Number: {highlight.pageNumber}
                  </Accordion.Header>
                  <Accordion.Body className="pre-wrap">
                    {highlight.pageText}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Card>
      </Row>
    </Container>
  );
}

export default BookDetails;
