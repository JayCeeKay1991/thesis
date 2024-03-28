import { apiClient } from "./ApiClient";
import { User } from "@/types/User";
import { FormValuesUser } from "@/components/SignupForm/SignupForm";
import { FormValuesUserLogin } from "@/components/LoginForm/LoginForm";

// Sign up new user
export const signup = async (body: FormValuesUser) => {
  try {
    return await apiClient<User>("users", "POST", body);
  } catch (error) {
    console.error(error);
  }
};

// log in existing user
export const login = async (body: FormValuesUserLogin) => {
  try {
    const resUser = await apiClient<User>("users/login", "POST", body);
    console.log({ resUser });
    return resUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get all users
export const getAllUsers = async () => {
  return await apiClient<User[]>("users");
};


export const updateUser = async (
  body: Omit<User, 'channels' | 'mixTapes' | 'password'>
) => {

  try {
    return await apiClient<User>(`users/${body._id}`, "PUT", body);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    return await apiClient<User>(`users/${id}`, "GET");
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    return await apiClient('logout', 'POST');
  } catch (error) {
    console.error(error);
  }
};

// Get profile from the session
export const getProfile = async () => {
  try {
    return await apiClient<User>(`me`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
