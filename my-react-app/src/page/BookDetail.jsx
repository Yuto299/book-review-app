import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('ログインが必要です');
      return;
    }

    fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false); //loadingやめる
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  if (!book) {
    return <p className='text-center text-red-500'>Book not found</p>;
  }

  return (
    <div className='container mx-auto p-4'>
      <Header />
      <h1 className='text-3xl font-bold mb-4'>{book.title}</h1>
      <p>
        URL:{' '}
        <a href={book.url} className='text-blue-500 underline'>
          {book.url}
        </a>
      </p>
      <p>Detail: {book.detail}</p>
      <p>Review: {book.review}</p>
      <p>Reviewer: {book.reviewer}</p>
      <button
        onClick={() => navigate('/home')}
        className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors mt-4'
      >
        ホームに戻る
      </button>
    </div>
  );
}

export default BookDetail;
