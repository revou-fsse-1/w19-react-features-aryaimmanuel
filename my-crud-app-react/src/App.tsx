import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { Route, Routes } from 'react-router-dom';
import PrivateLayout from './layout/PrivateLayout';
import Homepage from './pages/Homepage';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/add' element={<AddCategory />} />
          <Route path='/edit/:id' element={<EditCategory />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}


export default App;