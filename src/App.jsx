import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHomePage from './components/Admin';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import SignUp from './components/SignUp';
import Lesson from './components/Lesson';
import ChallengeCTF from './components/ChallengeCTF';
import Quiz from './components/Quiz';
import CreateLesson from './components/Admin/Lesson/createLesson';
import Ranking from './components/Discuss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/admin/create-lesson' element={<CreateLesson />} />
        <Route element={<HomePage />}>
          <Route path='/lesson' element={<Lesson />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/challenge-ctf' element={<ChallengeCTF />} />
          <Route path='/ranking' element={<Ranking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
