import { useForm, useFieldArray, FieldArrayWithId } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { Book } from './useBooks';
import { v4 as uuid } from 'uuid';
import useAddBook from './useAddBook';

interface HighlightsProps {
  field: FieldArrayWithId<Book, 'highlights', 'id'>;
  index: number;
}

const defaultHighlightRow = {
  pageNumber: '',
  pageText: '',
};

interface BookFormProps {
  bookProps?: Book;
  isUpdateBook?: boolean;
}

function BookForm({ bookProps, isUpdateBook = false }: BookFormProps) {
  const { error, loading, addBook, updateBook } = useAddBook();
  const { control, register, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    defaultValues: bookProps,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'highlights',
  });
  const submitButtonText = isUpdateBook ? 'Update' : 'Submit';

  function addBookInfo(data) {
    console.log(data);
    if (isUpdateBook) {
      updateBook(data);
    } else {
      addBook({
        id: uuid(),
        ...data,
      });
    }
  }

  function HighlightRow(highlightsProps: HighlightsProps) {
    const { field, index } = highlightsProps;

    return (
      <Form.Group as={Row} className="mb-4" controlId={field.id}>
        <Form.Label column sm={2}>
          Page highlight
        </Form.Label>
        <Col sm={10} className="d-flex align-items-start ">
          <div className="flex-grow-1 pe-2">
            <div className="mb-2 d-inline-flex justify-content-between">
              <Form.Control
                type="text"
                placeholder="Page number"
                {...register(`highlights.${index}.pageNumber`, {
                  required: true,
                })}
              />
            </div>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter highlight text here"
              {...register(`highlights.${index}.pageText`, { required: true })}
            />
          </div>
          <Button onClick={() => remove(index)} id={field.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              id={field.id}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </Button>
        </Col>
      </Form.Group>
    );
  }

  useEffect(() => {
    reset(bookProps);
  }, [bookProps, reset]);

  return (
    <Container fluid className="py-4 my-4 border border-2 rounded-3">
      <div className="mb-4 text-center">
        <h1 className="">Add a new book notes</h1>
      </div>

      <Form onSubmit={handleSubmit(addBookInfo)}>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Book Title"
              {...register('title', { required: true })}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="add book description"
              rows={2}
              {...register('description', { required: true })}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formStartDate">
          <Form.Label column sm={2}>
            Start date
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" {...register('start_date')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEndDate">
          <Form.Label column sm={2}>
            End date
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" {...register('end_date')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formImageUrl">
          <Form.Label column sm={2}>
            Image url
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              {...register('image_url')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formAmazonProductUrl">
          <Form.Label column sm={2}>
            Amazon product url
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              {...register('amazon_product_url')}
            />
          </Col>
        </Form.Group>

        <h3 className="mb-3">Book Summary</h3>
        <Form.Group as={Row} className="mb-3" controlId="oneLinerSummary">
          <Form.Label column sm={2}>
            One line Summary
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" {...register('summary.oneLiner')} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="threeLinerSummary">
          <Form.Label column sm={2}>
            Three line Summary
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('summary.threeLiner')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="detailedSummary">
          <Form.Label column sm={2}>
            Detailed Summary
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={5}
              {...register('summary.detailed')}
            />
          </Col>
        </Form.Group>

        <h3 className="mb-3">Book Hightlights</h3>
        {fields.map((field, index) => (
          <HighlightRow key={field.id} field={field} index={index} />
        ))}

        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            <Button
              className="mb-5"
              onClick={() => append(defaultHighlightRow, { shouldFocus: true })}
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
            <Button className="w-100" type="submit">
              {submitButtonText}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default BookForm;
