import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function BookList({ currentPage }) {
  const [books, setBooks] = useState([]);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const offset = currentPage * 10;

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetch('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch((error) => {
          console.error('Error fetching user date:', error);
        });
    }

    fetch(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [currentPage, offset]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserName(null);
  };

  return (
    <div className='container mx-auto p-4'>
      <header className='flex justify-between items-center py-4'>
        <h1 className='text-3xl font-bold text-center mb-6'>書籍レビュー一覧</h1>
        {userName ? (
          <div className='flex items-center'>
            <p className='mr-4'>ようこそ, {userName}さん</p>
            <button
              onClick={() => navigate('/profile')}
              className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mr-2'
            >
              プロフィール編集
            </button>
            <button
              onClick={() => navigate('/new')}
              className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mr-2'
            >
              新規レビュー投稿
            </button>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors'
            >
              ログアウト
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
          >
            ログイン
          </button>
        )}
      </header>
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
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
