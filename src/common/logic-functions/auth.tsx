//login or register logic full
import axios from 'axios';
import { auth_activate, auth_forgot_password, auth_login, auth_register, auth_reset_password } from '../api/api.tsx';
import toast from 'react-hot-toast';
import React from 'react';

// register
export const authRegister = (
  event: React.FormEvent<HTMLFormElement>,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmPassword: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void
): void => {
  event.preventDefault();
  const data = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword
  };

  if (firstname && lastname && email && password && confirmPassword) {
    setLoading(true);
    axios.post(auth_register, data)
      .then(res => {
        setLoading(false);
        if (res.data.success) setResData(true);
        else toast.error('Something went wrong, please try again');
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

// register qilingan userni tekshirish
export const registerClientActive = async (
  event: React.FormEvent<HTMLFormElement>,
  code: string,
  setLoading: (val: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);
  try {
    if (code) {
      const { data } = await axios.put(`${auth_activate}?code=${code}`, '');
      if (data.success) {
        setResData(true);
        setLoading(false);
      } else toast.error('An error occurred on the server!!!');
    } else {
      toast.error('There is an error in the code, please re-enter');
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    toast.error('An error occurred on the server!!!');
  }
};

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
        toast.error('Something went wrong, please try again');
      });
  } else {
    setLoading(false);
    toast.error('No phone number or password entered!!!');
  }
};

//forgot password
export const forgotPasswordEmail = async (
  event: React.FormEvent<HTMLFormElement>,
  setLoading: (val: boolean) => void,
  email: string,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);
  const forgotData = { email };

  try {
    if (email) {
      const { data } = await axios.put(auth_forgot_password, forgotData);
      if (data.success) {
        setResData(true);
        setLoading(false);
      } else toast.error('An error occurred on the server!!!');
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    toast.error('An error occurred on the server!!!');
  }
};

//reset password
export const resetPassword = async (
  event: React.FormEvent<HTMLFormElement>,
  passwordToken: string,
  newPassword: string,
  confirmPassword: string,
  setLoading: (val: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);
  const resetData = { passwordToken, newPassword, confirmPassword };

  try {
    if (passwordToken && newPassword && confirmPassword) {
      const { data } = await axios.put(auth_reset_password, resetData);
      if (data.success) {
        setResData(true);
        setLoading(false);
      } else toast.error('An error occurred on the server!!!');
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    toast.error('An error occurred on the server!!!');
  }
};