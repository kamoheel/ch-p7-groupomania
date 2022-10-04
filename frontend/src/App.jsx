import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Posts from './pages/Posts';
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
            <Route path="/posts" element={<Posts />} />
            {/* <Route path="/survey/:questionNumber" element={<Survey />} />
            <Route path="/results" element={<Results />} />
            <Route path="/freelances" element={<Freelances />} />
            <Route
              path="/profile/:id"
              element={(props) => <Profile {...props} />}
              //render={(props) => <Profile {...props} />}
            /> */}
            {/* <Route path="/profile/:id" element={<Profile />} /> */}
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
     </BrowserRouter>
     );
}

export default App;