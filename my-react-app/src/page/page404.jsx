import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <>
      <h1>404 NOT FOUND</h1>
      <p>お探しのページが見つかりませんでした。</p>
      <Link to='/'>Topに戻る</Link>
    </>
  );
};
