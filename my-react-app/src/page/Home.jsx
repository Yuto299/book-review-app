import { Provider } from 'react-redux';
import { store } from '../../redux/store.js';
import BookList from './BookList';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import './Home.css';

function Home() {
  const currentPage = useSelector((state) => state.page.currentPage);

  return (
    <Provider store={store}>
      <div className='container mx-auto p-4'>
        <BookList currentPage={currentPage} />
        <Pagination />
      </div>
    </Provider>
  );
}

export default Home;
