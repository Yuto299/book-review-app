import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import Header from './Header';

function ProfileEdit() {
  const [userName, setUserName] = useState('');
  const [cookies] = useCookies(['authToken']);
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
    } else {
      navigate('/home');
    }
  }, [cookies, navigate]);

  const handleUpdate = () => {
    const token = cookies.authToken;

    if (token) {
      fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userName,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          alert('ユーザー名が更新されました。');
          navigate('/home');
        })
        .catch((error) => {
          console.error('Error updating user name:', error);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>プロフィールを編集</title>
        <meta name='description' content='プロフィールを編集するページです。' />
      </Helmet>
      <div className='container mx-auto p-4'>
        <Header />
        <h1 className='text-2xl font-bold mb-4'>ユーザー名編集</h1>
        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>名前</label>
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <button
            type='button'
            onClick={handleUpdate}
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
          >
            更新
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileEdit;
