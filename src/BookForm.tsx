import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface Highlights {
  pageNumber: string;
  pageText: string;
}

interface Summary {
  oneLiner: string;
  threeLiner: string;
  detailed: string;
}
export interface BookFormProps {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  image_url: string;
  amazon_product_url: string;
  summary: Summary;
  highlights: Highlights[];
}

const defaultHighlightRow = {
  pageNumber: '',
  pageText: '',
};

function BookForm(props: BookFormProps) {
  const [highlightRows, setHighlightRows] = useState([]);

  function addBook() {
    console.log('addbook');
  }

  function removeHightlight(e) {
    const id = e.target.closest('button').id;
    const newHighlightRows = highlightRows.filter(
      (_highlightRow, index) => index.toString() !== id
    );

    console.log(newHighlightRows);

    setHighlightRows(newHighlightRows);
  }

  function HighlightRow({ id }) {
    return (
      <Form.Group as={Row} className="mb-4" controlId={id}>
        <Form.Label column sm={2}>
          Page highlight
        </Form.Label>
        <Col sm={10} className="d-flex align-items-start ">
          <div className="flex-grow-1 pe-2">
            <div className="mb-2 d-inline-flex justify-content-between">
              <Form.Control type="number" placeholder="Page number" />
            </div>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter highlight text here"
            />
          </div>
          <Button onClick={removeHightlight} id={id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              id={id}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </Button>
        </Col>
      </Form.Group>
    );
  }

  return (
    <Container fluid className="py-4 my-4 border border-2 rounded-3">
      <div className="mb-4 text-center">
        <h1 className="">Add a new Book Notes</h1>
      </div>

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Book Title" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={2} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formStartDate">
          <Form.Label column sm={2}>
            Start date
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEndDate">
          <Form.Label column sm={2}>
            End date
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEndDate">
          <Form.Label column sm={2}>
            Image url
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="url" placeholder="https://example.com" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEndDate">
          <Form.Label column sm={2}>
            Amazon product url
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="url" placeholder="https://example.com" />
          </Col>
        </Form.Group>

        <h3 className="mb-3">Book Summary</h3>
        <Form.Group as={Row} className="mb-3" controlId="oneLinerSummary">
          <Form.Label column sm={2}>
            One line Summary
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="threeLinerSummary">
          <Form.Label column sm={2}>
            Three line Summary
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="detailedSummary">
          <Form.Label column sm={2}>
            Detailed Summary
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={5} />
          </Col>
        </Form.Group>

        <h3 className="mb-3">Book Hightlights</h3>
        {highlightRows.map((_highlightRow, index) => (
          <HighlightRow id={index.toString()} />
        ))}

        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            <Button
              className="mb-5"
              onClick={() =>
                setHighlightRows(highlightRows.concat(defaultHighlightRow))
              }
            >
              Add new Hightlight
            </Button>
          </Col>
        </Row>

        <Form.Group
          as={Row}
          className="mx-4 justify-content-center"
          controlId="formSubmit"
        >
          <Col className="col-6 align-self-center">
            <Button className="w-100" onClick={addBook}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default BookForm;
