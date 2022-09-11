import axios from 'axios';

export const createPost = async (title, text, images, links, user, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      { title, text, images, links, user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'ok', data };
  } catch (error) {
    return error.response.data.message;
  }
};
export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      { postId, react },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return 'ok';
  } catch (error) {
    return error.response.data.message;
  }
};
export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getReactsNoUserAuth = async postId => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReactsNoUserAuth/${postId}`,
      {}
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
