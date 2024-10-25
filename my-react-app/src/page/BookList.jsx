import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from './Header';

// eslint-disable-next-line react/prop-types
function BookList({ currentPage }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(['authToken']);
  const offset = currentPage * 10;

  useEffect(() => {
    const token = cookies.authToken;

    if (!token) {
      alert('ログインが必要です');
      return;
    }
    fetch(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [cookies, currentPage, offset]);

  const handleBookClick = (bookId) => {
    const token = cookies.authToken;

    if (!token) {
      alert('ログインが必要です');
      return;
    }

    fetch('https://railway.bookreview.techtrain.dev/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        selectBookId: bookId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Log sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error sending log:', error);
      });
    navigate(`/detail/${bookId}`);
  };

  return (
    <div className='container mx-auto p-4'>
      <Header />
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            onClick={() => handleBookClick(book.id)}
            className='border border-gray-300 rounded-lg p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300'
          >
            <p>Title: {book.title}</p>
            <p>
              URL:{' '}
              <a href={book.url} className='text-blue-500 underline'>
                {book.url}
              </a>
            </p>
            <p>Detail: {book.detail}</p>
            <p>Review: {book.review}</p>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>Loading...</p>
      )}
    </div>
  );
}

export default BookList;
