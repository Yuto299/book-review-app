import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch('https://railway.bookreview.techtrain.dev/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'ログインに失敗しました');
          });
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('authToken', data.token);
        navigate('/home');
      })
      .catch((error) => {
        setErrorMessage(error.message || 'ログイン中にエラーが発生しました');
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl font-bold mb-6 text-center'>ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              メール：
            </label>
            <input
              id='email'
              type='email'
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'メールアドレスは必須です',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '無効なメールアドレスです',
                },
              })}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              パスワード：
            </label>
            <input
              id='password'
              type='password'
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'パスワードは必須です',
              })}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
          </div>

          {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors'
          >
            ログイン
          </button>
        </form>

        <p className='mt-4 text-center'>
          アカウントをお持ちではないですか？{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            サインアップはこちら
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
