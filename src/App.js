// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Articlelistpage from './pages/ArticleListpage';
import Articlepage from './pages/Articlespage';
import Notfoundpage from './pages/NotFoundpage';
import LoginPage from './pages/LoginPge';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App"> 
        <Navbar/>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<Articlelistpage />} />
            <Route path="/articles/:articleId" element={<Articlepage />} />
            <Route path= "/login" element={<LoginPage/>} />
            <Route path='/create-account' element={<CreateAccountPage/>}/>
            <Route path='*' element={<Notfoundpage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;


