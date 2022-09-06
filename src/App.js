import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreatePost from './pages/post';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

function App() {
  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/cuy/:user/submit" element={<CreatePost />} />
      </Route>

      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
