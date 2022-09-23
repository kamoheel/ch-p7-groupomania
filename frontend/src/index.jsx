import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import { ThemeProvider } from './utils/context';
import GlobalStyle from './utils/style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
       <ThemeProvider>
        {/*<SurveyProvider>*/}
          <GlobalStyle /> 
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
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
      </ThemeProvider> 
     </BrowserRouter>
  </React.StrictMode>
);

