import { NavLink } from "react-router-dom";
import useBooks from "./useBooks";
import { useState } from "react";

function Books() {
  const { fileId, accessToken, books, loading, error } = useBooks();
  const [bookName, setBookName] = useState('');

  if (error) {
    return <h1>Error</h1>;
  }

  async function addBook(e) {
    e.preventDefault();
    console.log('addBook', bookName);

    const bookInfo = {
      name: bookName,
      description: "test ",
    };

    const metadata = {
      title: process.env.MY_BOOK_SHELF_FILE_NAME,
      name: process.env.MY_BOOK_SHELF_FILE_NAME,
      mimeType: 'application/json',
    };
    const fileContent = {
      books: books.concat([bookInfo])
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([JSON.stringify(fileContent)], {type: "application/json"}));
    const data = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: 'multipart/form-data',
        },
        body: form,
    }).then(res => res.json());

    console.log('Successfully updated file', fileId, data);
  }

  return (
    <>
      <h1>
        Books {loading ? <span>loading...</span> : <></>}
      </h1>
      {
        books.map(book => {
          return <h1>{book.name}</h1>
        })
      }
      <div>
        <label>Name</label>
        <input onBlur={(e) => setBookName(e.target.value)} />
        <button onClick={addBook}>Add book</button>
      </div>
      <nav id="recipes">
        <NavLink to="/">Home</NavLink>
      </nav>
    </>
  );
}

export default Books;
