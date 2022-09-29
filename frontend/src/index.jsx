import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Profile from './pages/Profile'
import './utils/style/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        {/*<SurveyProvider>*/}
          {/* <GlobalStyle />  */}
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
        {/* </SurveyProvider>*/}
     </BrowserRouter>
  </React.StrictMode>
);

