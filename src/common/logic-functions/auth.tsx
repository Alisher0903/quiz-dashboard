//login or register logic full
import axios from 'axios';
import { auth_login } from '../api/api.tsx';
import toast from 'react-hot-toast';
import React from 'react';

// auth login
export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void
): void => {
  event.preventDefault();
  const data = { email, password };

  if (email && password) {
    setLoading(true);
    axios.post(auth_login, data)
      .then(res => {
        setLoading(false);
        if (res.data.success) {
          localStorage.setItem('ROLE', res.data.role);
          localStorage.setItem('token', `Bearer ${res.data.token}`);
          setResData(true);
        } else toast.error('Something went wrong, please try again');
      })
      .catch(() => {
        setLoading(false);
        toast.error('An error occurred on the server!!!');
      });
  } else {
    setLoading(false);
    toast.error('No phone number or password entered!!!');
  }
};