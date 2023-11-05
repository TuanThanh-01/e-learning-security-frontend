import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHomePage from './components/Admin';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import Lesson from './components/Lesson';
import ChallengeCTF from './components/ChallengeCTF';
import Discuss from './components/Discuss';
import Quiz from './components/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route element={<HomePage />}>
          <Route path='/lesson' element={<Lesson />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/challenge-ctf' element={<ChallengeCTF />} />
          <Route path='/discuss' element={<Discuss />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
