import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from './Header';

function NewBookReview() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const [cookies] = useCookies(['authToken']);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.authToken;
    if (!token) {
      alert('ログインが必要です');
      navigate('/login');
    }
  }, [cookies, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = cookies.authToken;

    if (token) {
      fetch('https://railway.bookreview.techtrain.dev/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          url,
          detail,
          review,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          alert('書籍レビューが投稿されました！');
          navigate('/home');
        })
        .catch((error) => {
          console.error('Error posting review:', error);
          alert('書籍レビューの投稿に失敗しました。');
        });
    } else {
      alert('ログインが必要です。');
      navigate('/login');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <Header />
      <h1 className='text-3xl font-bold mb-6'>新規書籍レビュー投稿</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-gray-700'>タイトル</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>URL</label>
          <input
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>詳細</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>レビュー</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors'
        >
          投稿する
        </button>
      </form>
    </div>
  );
}

export default NewBookReview;
