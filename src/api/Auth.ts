import {apiPost} from './Api.ts';
import {ApiToken} from '../types/types.ts';

export type RegUserData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree: boolean;
};

export const registerUser = (data: RegUserData): Promise<ApiToken> => {
  return apiPost<ApiToken>('/auth/register', data);
};

export type LoginData = {
  email: string;
  password: string;
};

export const loginUser = (data: LoginData): Promise<ApiToken> => {
  return apiPost<ApiToken>('/auth/login', data);
};
