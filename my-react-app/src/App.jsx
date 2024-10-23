import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Home from './page/Home';
import BookList from './page/BookList';
import Pagination from './page/Pagination';
import ProfileEdit from './page/ProfileEdit';

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
        <Route path='/profileedit' element={isAuthenticated ? <ProfileEdit /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
};

export default App;
