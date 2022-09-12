import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { postsReducer } from './functions/reducers';
import Home from './pages/home';
import CreatePost from './pages/post';
import Profile from './pages/profile';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

function App() {
  const { user } = useSelector(state => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {}
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route
          path="/cuy/:user/submit"
          element={<CreatePost posts={posts} dispatch={dispatch} />}
          exact
        />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/profile/:username" element={<Profile />} exact />
      </Route>

      <Route
        path="/"
        element={<Home posts={posts} getAllPosts={getAllPosts} />}
        exact
      />
    </Routes>
  );
}

export default App;
