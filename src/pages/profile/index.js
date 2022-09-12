import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileReducer } from '../../functions/reducers';
import axios from 'axios';
import Navbar from '../../components/navbar';
import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';

import Cover from './Cover';
import ProfilePictureInfos from './ProfilePictureInfos';

const Profile = () => {
  const { user } = useSelector(state => ({ ...state }));
  const { username } = useParams();
  const navigate = useNavigate();
  let userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
  }, [username]);

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate('/profile');
      } else {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data.profile,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    // profile
    <Flex direction="column" color="gray.400">
      <Navbar page="profile" />
      {/* profile-top */}
      <Flex boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)" bg="white">
        {/* profile-container */}
        <Flex maxWidth="945px" width="100%" margin="0 auto" direction="column">
          <Cover cover={profile.cover} />
          <ProfilePictureInfos profile={profile} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
