import { axiosInstance } from 'src/api/instance';

export const register = async (data) => await axiosInstance.post('/auth/register', data, {});

export const socialsAuth = async (data) => await axiosInstance.post('/auth/socials', data, {});

export const login = async (data) => await axiosInstance.post('/auth/login', data, {});

export const passwordChangeRequest = async (data) =>
  await axiosInstance.post('/auth/password-change/request', data, {});

export const passwordChangeConfirm = async (data, config) =>
  await axiosInstance.post('/auth/password-change/confirm', data, config);
