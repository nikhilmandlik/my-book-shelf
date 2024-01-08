import Spinner from 'react-bootstrap/Spinner';
import useBooks from './useBooks';
import { useContext, useState } from 'react';
import { Userinfo, userContext } from './UserContextProvider';
import { Button, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Books() {
  const { currentUserinfo }: { currentUserinfo: Userinfo } =
    useContext(userContext);

  const { fileId, accessToken, books, loading, error } = useBooks();
  const [bookName, setBookName] = useState('');

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
    return <h1>Error</h1>;
  }

  async function addBook(e) {
    e.preventDefault();

    const bookInfo = {
      name: bookName,
      description: 'test ',
    };

    const metadata = {
      title: process.env.MY_BOOK_SHELF_FILE_NAME,
      name: process.env.MY_BOOK_SHELF_FILE_NAME,
      mimeType: 'application/json',
    };
    const fileContent = {
      books: books.concat([bookInfo]),
    };
    const form = new FormData();
    form.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    form.append(
      'file',
      new Blob([JSON.stringify(fileContent)], { type: 'application/json' })
    );
    const data = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'multipart/form-data',
        },
        body: form,
      }
    ).then((res) => res.json());

    console.log('Successfully updated file', fileId, data);
  }

  return (
    <Container fluid>
      {loading ? (
        <Container className="text-center m-4">
          <h1 className="mb-4">Loading your books ...</h1>
          <Spinner animation="border" role="status" className="">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <Container fluid className="py-4 my-4 border border-2 rounded-3">
          <div className="d-flex justify-content-between">
            <h1 className="">Your Books</h1>
            <Button>Add new Book</Button>
          </div>
          <hr></hr>
          {books.map((book) => {
            return <h1>{book.name}</h1>;
          })}
          <div>
            <label>Name</label>
            <input onBlur={(e) => setBookName(e.target.value)} />
            <button onClick={addBook}>Add book</button>
          </div>
        </Container>
      )}
    </Container>
  );
}

export default Books;
