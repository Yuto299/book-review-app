import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from './Header';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    url: '',
    detail: '',
    review: '',
  });
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['authToken']);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.authToken;

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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
        setLoading(false);
      });
  }, [cookies, id]);

  const handleUpdate = () => {
    const token = localStorage.getItem('authToken');

    fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating book');
        }
        return response.json();
      })
      .then(() => {
        alert('書籍情報を更新しました');
        navigate(`/detail/${id}`);
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        alert('更新に失敗しました');
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem('authToken');

    fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting book');
        }
        alert('書籍レビューを削除しました');
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        alert('削除に失敗しました');
      });
  };

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  return (
    <div className='container mx-auto p-4'>
      <Header />
      <h1 className='text-3xl font-bold mb-4'>書籍情報を編集する</h1>

      <label className='block'>
        Title:
        <input
          type='text'
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          className='border border-gray-300 p-2 w-full mb-4'
        />
      </label>

      <label className='block'>
        URL:
        <input
          type='text'
          value={book.url}
          onChange={(e) => setBook({ ...book, url: e.target.value })}
          className='border border-gray-300 p-2 w-full mb-4'
        />
      </label>

      <label className='block'>
        Detail:
        <textarea
          value={book.detail}
          onChange={(e) => setBook({ ...book, detail: e.target.value })}
          className='border border-gray-300 p-2 w-full mb-4'
        />
      </label>

      <label className='block'>
        Review:
        <textarea
          value={book.review}
          onChange={(e) => setBook({ ...book, review: e.target.value })}
          className='border border-gray-300 p-2 w-full mb-4'
        />
      </label>

      <button
        onClick={handleUpdate}
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
      >
        更新する
      </button>

      <button
        onClick={handleDelete}
        className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors ml-4'
      >
        削除する
      </button>
    </div>
  );
}

export default EditBook;
