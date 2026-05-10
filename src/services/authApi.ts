import axios from "axios";

const API = "http://localhost:3002/dev/auth";

export const signupApi = async (data: any) => {
  const response = await axios.post(`${API}/signup`, data);

  return response.data;
};

export const verifyOtpApi = async (data: any) => {
  const response = await axios.post(`${API}/verify`, data);

  return response.data;
};

export const loginApi = async (data: any) => {
  const response = await axios.post(`${API}/login`, data);

  return response.data;
};

export const forgotPasswordApi = async (data: any) => {
  const response = await axios.post(`${API}/forgot-password`, data);

  return response.data;
};

export const resetPasswordApi = async (data: any) => {
  const response = await axios.post(`${API}/reset-password`, data);

  return response.data;
};

export const resendOtpApi = async (data: any) => {
  const response = await axios.post(`${API}/resend-otp`, data);

  return response.data;
};
