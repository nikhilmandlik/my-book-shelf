import useBooks, { Book } from './useBooks';

async function updateFileContents(
  fileId: string,
  accessToken: string,
  books: Book[]
) {
  const metadata = {
    title: process.env.MY_BOOK_SHELF_FILE_NAME,
    name: process.env.MY_BOOK_SHELF_FILE_NAME,
    mimeType: 'application/json',
  };
  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append(
    'file',
    new Blob([JSON.stringify({ books })], { type: 'application/json' })
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

function updateBookInfo(allBooks: Book[], bookInfo: Book): Book[] {
  return allBooks.map((book) => {
    return book.id !== bookInfo.id ? book : bookInfo;
  });
}

function useAddBook() {
  const { fileId, accessToken, books, loading, error } = useBooks();

  return {
    error,
    loading,
    addBook: (bookInfo: Book) => {
      updateFileContents(fileId, accessToken, books.concat(bookInfo));
    },
    updateBook: (bookInfo: Book) => {
      updateFileContents(fileId, accessToken, updateBookInfo(books, bookInfo));
    },
  };
}

export default useAddBook;
