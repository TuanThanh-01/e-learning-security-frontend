import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import AdminHomePage from './components/Admin';
import CategoryLesson from './components/Admin/CategoryLesson';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/admin/category-lesson' element={<CategoryLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
