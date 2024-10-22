import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevPage } from '../../redux/pageSlice';

function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.page.currentPage);
  const totalPages = useSelector((state) => state.page.totalPages);

  return (
    <div className='flex justify-center mt-4'>
      <button
        onClick={() => dispatch(prevPage())}
        className='px-4 py-2 bg-gray-200 rounded-lg mr-2'
        disabled={currentPage === 0}
      >
        前へ
      </button>
      <button
        onClick={() => dispatch(nextPage())}
        className='px-4 py-2 bg-gray-200 rounded-lg'
        disabled={currentPage >= totalPages - 1}
      >
        次へ
      </button>
    </div>
  );
}

export default Pagination;
