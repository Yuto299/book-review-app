import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Home from './page/Home';
import BookList from './page/BookList';
import Pagination from './page/Pagination';
import ProfileEdit from './page/ProfileEdit';
import NewBookReview from './page/NewBookReview';
import BookDetail from './page/BookDetail';
import EditBook from './page/EditBook';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to='/login' />} />
        <Route path='/booklist' element={isAuthenticated ? <BookList /> : <Navigate to='/login' />} />
        <Route path='/pagination' element={isAuthenticated ? <Pagination /> : <Navigate to='/login' />} />
        <Route path='/profile' element={isAuthenticated ? <ProfileEdit /> : <Navigate to='/login' />} />
        <Route path='/new' element={isAuthenticated ? <NewBookReview /> : <Navigate to='/login' />} />
        <Route path='/detail/:id' element={isAuthenticated ? <BookDetail /> : <Navigate to='/login' />} />
        <Route path='/edit/:id' element={<EditBook />} />
      </Routes>
    </Router>
  );
};

export default App;
