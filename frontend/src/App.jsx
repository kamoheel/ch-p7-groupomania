import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './utils/style/index.scss';

function App() {

    return ( 
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
     </BrowserRouter>
     );
}

export default App;