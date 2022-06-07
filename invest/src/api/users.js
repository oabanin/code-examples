import { axiosInstance } from 'src/api/instance';

export const getUsersMe = async () => await axiosInstance.get('/users/me');

export const postUsersMe = async (body) =>
  axiosInstance.post(`/users/me/update`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getAboutMe = async () => await axiosInstance.get('/users/me/profile/about-me');

export const patchAboutMe = async (body) => axiosInstance.patch(`/users/me/profile/about-me`, body);

export const getExperienceAndStatus = async () =>
  await axiosInstance.get('/users/me/profile/experience-and-status');

export const patchExperienceAndStatus = async (body) =>
  axiosInstance.patch(`/users/me/profile/experience-and-status`, body);

export const getRiskAndRange = async () =>
  await axiosInstance.get('/users/me/profile/risk-and-range');

export const patchRiskAndRange = async (body) =>
  axiosInstance.patch(`/users/me/profile/risk-and-range`, body);

export const getInvestmentInterests = async () =>
  await axiosInstance.get('/users/me/profile/investment-interests');

export const patchInvestmentInterests = async (body) =>
  axiosInstance.patch(`/users/me/profile/investment-interests`, body);

export const getNewsInterests = async () =>
  await axiosInstance.get('/users/me/profile/news-interests');

export const patchNewsInterests = async (body) =>
  axiosInstance.patch(`/users/me/profile/news-interests`, body);

export const getNotifications = async () =>
  await axiosInstance.get('/users/me/profile/subscriptions');

export const patchNotifications = async (body) =>
  axiosInstance.patch(`/users/me/profile/subscriptions`, body);

export const emailChangeInit = async (data) =>
  await axiosInstance.post('/users/me/change-access/email/init', data, {});

export const emailChangeConfirm = async (data) =>
  await axiosInstance.post('/users/me/change-access/email/confirm', data, {});

export const phoneChangeInit = async (data) =>
  await axiosInstance.post('/users/me/change-access/sms/init', data, {});

export const phoneChangeConfirm = async (data) =>
  await axiosInstance.post('/users/me/change-access/sms/confirm', data, {});

export const deleteUser = async () => axiosInstance.delete(`/users/me`);

export const updatePassword = async (body) => axiosInstance.patch(`/users/me/password`, body);

export const linkSocial = async (body) => axiosInstance.patch(`/users/me/socials/link`, body);

export const unlinkSocial = async (body) => axiosInstance.patch(`/users/me/socials/unlink`, body);
