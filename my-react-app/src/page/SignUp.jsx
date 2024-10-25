import { useState } from 'react';
import Compressor from 'compressorjs';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

export const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [, setCookie] = useCookies(['authToken']);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [iconUrl, setIconUrl] = useState('');

  const onSignUp = (data) => {
    const { email, name, password, avatar } = data;

    fetch('https://railway.bookreview.techtrain.dev/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    })
      .then((userResponse) => {
        if (!userResponse.ok) {
          return userResponse.json().then((errorData) => {
            throw new Error(errorData.message || 'サインアップに失敗しました');
          });
        }
        return userResponse.json();
      })
      .then((userData) => {
        const token = userData.token; //写真のところでtokenを使用するから
        setCookie('authToken', token, { path: '/' });

        if (!avatar || avatar.length === 0) {
          reset();
          navigate('/home');
        } else {
          new Compressor(avatar[0], {
            quality: 0.6,
            success: (compressedResult) => {
              const formData = new FormData();
              formData.append('icon', compressedResult);

              if (!token) {
                setErrorMessage('認証トークンが見つかりません');
                return;
              }

              fetch('https://railway.bookreview.techtrain.dev/uploads', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              })
                .then((uploadResponse) => {
                  if (!uploadResponse.ok) {
                    return uploadResponse.json().then((errorData) => {
                      throw new Error(errorData.message || '画像のアップロードに失敗しました');
                    });
                  }
                  return uploadResponse.json();
                })
                .then((uploadData) => {
                  setIconUrl(uploadData.iconUrl);
                  reset();
                  navigate('/home');
                })
                .catch((error) => {
                  setErrorMessage(`画像のアップロードに失敗しました: ${error.message}`);
                });
            },
            error: (err) => {
              setErrorMessage(`画像の圧縮に失敗しました: ${err.message}`);
            },
          });
        }
      })
      .catch((error) => {
        setErrorMessage(`サインアップに失敗しました: ${error.message}`);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl font-bold mb-6 text-center'>ユーザー新規登録</h1>
        <form onSubmit={handleSubmit(onSignUp)}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              名前:
            </label>
            <input
              id='name'
              type='text'
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('name', { required: '名前は必須です' })}
            />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              メールアドレス:
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
              パスワード:
            </label>
            <input
              id='password'
              type='password'
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', {
                required: 'パスワードは必須です',
                minLength: {
                  value: 6,
                  message: 'パスワードは6文字以上でなければなりません',
                },
              })}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
          </div>

          <div className='mb-4'>
            <label htmlFor='avatar' className='block text-sm font-medium text-gray-700'>
              アイコン画像:
            </label>
            <input id='avatar' type='file' accept='image/*' {...register('avatar')} />
          </div>

          {iconUrl && (
            <div className='mb-4'>
              <p>アップロードされた画像:</p>
              <img src={iconUrl} alt='Uploaded Icon' className='max-w-xs' />
            </div>
          )}

          {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors'
          >
            サインアップ
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
