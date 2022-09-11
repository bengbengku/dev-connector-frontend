import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      {}
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
