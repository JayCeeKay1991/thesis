import { apiClient } from './ApiClient';
import { User } from '@/types/User';
import { FormValuesUser } from '@/components/SignupForm/SignupForm';
import { FormValuesUserLogin } from '@/components/LoginForm/LoginForm';

// Sign up new user
export async function signup(body: FormValuesUser) {
  try {
    return await apiClient<User>('users', 'POST', body);
  } catch (error) {
    console.error(error);
  }
}

// log in existing user
export async function login(body: FormValuesUserLogin) {
  try {
    return await apiClient<User>('users/login', 'POST', body);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get all users
export const getAllUsers = async () => {
  return await apiClient<User[]>('users');
};

export async function updateUser(
  body: Omit<User, 'channels' | 'mixTapes' | 'password'>
) {
  try {
    return await apiClient<User>(`users/${body._id}`, 'PUT', body);
  } catch (error) {
    console.error(error);
  }
}

export const getUserById = async (id: string) => {
  try {
    return await apiClient<User>(`users/${id}`, 'GET');
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch('http://localhost:3001/' + 'logout', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getProfile = async (id: string) => {
//   try {
//     return await apiClient<User>(`users/${id}`);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getProfile = async (): Promise<User> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER || 'http://localhost:3001' + '/me',

      {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
