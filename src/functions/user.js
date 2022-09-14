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

export const updateprofilePicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
      {
        url,
      },
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
