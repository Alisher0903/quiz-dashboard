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
        else toast.error('Нимадир хато кетди, қайта уриниб кўринг');
      })
      .catch(() => {
        setLoading(false);
        toast.error('Серверда хатолик юз берди!!!');
      });
  } else {
    setLoading(false);
    toast.error('Ҳеч қандай телефон рақами ёки парол киритилмаган!!!');
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
      } else toast.error('Серверда хатолик юз берди!!!');
    } else {
      toast.error('Кодда хатолик бор, қайта киритинг');
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    toast.error('Серверда хатолик юз берди!!!');
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
          const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
          localStorage.setItem('tokenExpiry', expiryTime.toString());
          localStorage.setItem('ROLE', res.data.role);
          localStorage.setItem('token', `Bearer ${res.data.token}`);
          setResData(true);
        } else toast.error('Нимадир хато кетди, қайта уриниб кўринг');
      })
      .catch(() => {
        setLoading(false);
        toast.error('Нимадир хато кетди, қайта уриниб кўринг');
      });
  } else {
    setLoading(false);
    toast.error('Ҳеч қандай телефон рақами ёки парол киритилмаган!!!');
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
      } else toast.error('Серверда хатолик юз берди!!!');
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    toast.error('Серверда хатолик юз берди!!!');
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
      } else toast.error('Серверда хатолик юз берди!!!');
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    toast.error('Серверда хатолик юз берди!!!');
  }
};