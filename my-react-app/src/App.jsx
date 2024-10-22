import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Home from './page/Home';
import BookList from './page/BookList';
import Pagination from './page/Pagination';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/booklist' element={<BookList />} />
        <Route path='/pagenation' element={<Pagination />} />
      </Routes>
    </Router>
  );
};

export default App;
