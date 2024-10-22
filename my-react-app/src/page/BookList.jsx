import { useEffect, useState } from 'react';

function BookList({ currentPage }) {
  const [books, setBooks] = useState([]);
  const offset = currentPage * 1;

  useEffect(() => {
    fetch(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [currentPage, offset]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>Books List</h1>
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            className='border border-gray-300 rounded-lg p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300'
          >
            <p>ID: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>
              URL:{' '}
              <a href={book.url} className='text-blue-500 underline'>
                {book.url}
              </a>
            </p>
            <p>Detail: {book.detail}</p>
            <p>Review: {book.review}</p>
            <p>Reviewer: {book.reviewer}</p>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>Loading...</p>
      )}
    </div>
  );
}

export default BookList;
