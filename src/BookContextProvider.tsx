import { createContext, useState } from 'react';
import { Book } from './useBooks';

const bookContext = createContext({
  currentBook: undefined,
  setCurrentBook: null,
});

function BookContextProvider(props) {
  const [currentBook, setCurrentBook] = useState<Book | undefined>(null);

  return (
    <bookContext.Provider value={{ currentBook, setCurrentBook }}>
      {props.children}
    </bookContext.Provider>
  );
}

export default BookContextProvider;
export { bookContext };
export type { Book };
