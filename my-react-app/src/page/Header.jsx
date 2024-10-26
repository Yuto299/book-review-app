import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';

function Header() {
  const [userName, setUserName] = useState(null);
  const [cookies, , removeCookie] = useCookies(['authToken']);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.authToken;

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
          console.error('Error fetching user data:', error);
        });
    }
  }, [cookies]);

  const handleLogout = () => {
    removeCookie('authToken', { path: '/' });
    setUserName(null);
  };

  return (
    <>
      <Helmet>
        <title>ヘッダー</title>
        <meta name='description' content='ヘッダーを表示するページです。' />
      </Helmet>
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
    </>
  );
}

export default Header;
