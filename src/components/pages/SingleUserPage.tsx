/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearCurrentUser, getUserById } from '../../redux/features/userSlice';
import UserForm from '../users/UserForm';

const SingleUserPage = () => {
  const { userID } = useParams();
  const { currentUser } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Searching user by id, then put it to currentUser
    dispatch(getUserById(userID as string));
    return () => {
      // Clear currentUser for next currentUser request
      dispatch(clearCurrentUser());
    };
  }, [dispatch, userID]);
  if (!currentUser) {
    return <p>загрущка...</p>;
  }
  return (
    <div>
      <UserForm user={currentUser} />
    </div>
  );
};

export default SingleUserPage;
