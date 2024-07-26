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
    if (password === confirmPassword) {
      axios.post(auth_register, data)
        .then(res => {
          console.clear();
          setLoading(false);
          if (res.data.success) setResData(true);
          else toast.error('Нимадир хато кетди, қайта уриниб кўринг');
        })
        .catch((err) => {
          console.clear();
          setLoading(false);
          if (err.response.data.message === 'This email exist') toast.error('Бу эмаил билан руйхатдан утилган!!!');
          else toast.error('Нимадир хато кетди, қайта уриниб кўринг!!!');
        });
    } else {
      setLoading(false);
      toast.error('Парол ва такрорий парол мослигини текшириб қайтадан уриниб куринг');
    }
  } else {
    setLoading(false);
    toast.error('Малумотлар тулиқлигини текшириб куринг!!!');
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
        console.clear();
        setResData(true);
        setLoading(false);
      } else toast.error('Нимадир хато кетди, қайта уриниб кўринг!!!');
    } else {
      toast.error('Кодда хатолик бор, қайта киритинг');
      setLoading(false);
    }
  } catch {
    console.clear();
    setLoading(false);
    toast.error('Нимадир хато кетди, қайта уриниб кўринг!!!');
  }
};

// auth login
export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  const authData = { email, password };
  setLoading(true);

  if (email && password) {
    try {
      const { data } = await axios.post(auth_login, authData);
      if (data.success) {
        console.clear();
        setLoading(false);
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        localStorage.setItem('ROLE', data.role);
        localStorage.setItem('token', `Bearer ${data.token}`);
        setResData(true);
      } else {
        console.clear();
        setLoading(false);
        toast.error('Сиз хали руйхатдан утмагансиз');
      }
    } catch {
      console.clear();
      setLoading(false);
      toast.error('Логин ёки паролни хато киритдингиз');
    }
  } else {
    setLoading(false);
    toast.error('Малумотлар тулиқлигини текшириб куринг!!!');
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
        console.clear();
        setResData(true);
        setLoading(false);
      } else {
        console.clear();
        setLoading(false);
        toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
      }
    } else {
      console.clear();
      setLoading(false);
    }
  } catch {
    console.clear();
    setLoading(false);
    toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
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
    if (newPassword === confirmPassword) {
      if (passwordToken && newPassword && confirmPassword) {
        const { data } = await axios.put(auth_reset_password, resetData);
        if (data.success) {
          console.clear();
          setResData(true);
          setLoading(false);
        } else {
          console.clear();
          setLoading(false);
          toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
        }
      } else {
        console.clear();
        setLoading(false);
        toast.error('Малумотлар тулиқ эмас қайтадан уриниб куринг!!!');
      }
    } else {
      console.clear();
      setLoading(false);
      toast.error('Пароллар мослиги туғри келмади, текшириб қайтадан уриниб куринг!!!');
    }
  } catch {
    console.clear();
    setLoading(false);
    toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
  }
};