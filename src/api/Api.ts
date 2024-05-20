import config from '../constants/config.ts';
import {FieldValues, UseFormSetError} from 'react-hook-form';

export const apiRequest = async <T>(
  endpoint: string | URL | Request,
  options?: RequestInit | undefined,
): Promise<T> => {
  const response = await fetch(config.API_URL + endpoint, options);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      console.error(e);
      throw new Error(
        'Network response was not ok and error data could not be parsed',
      );
    }

    switch (errorData?.error_type) {
      case 'validation':
        throw new ApiValidationError(response.status, errorData);
      case 'common':
        throw new ApiCommonError(response.status, errorData);
      default:
        throw new ApiError(response.status, errorData);
    }
  }

  const data = await response.json();

  return data as T;
};

export const apiGet = async <T>(endpoint: string): Promise<T> => {
  return await apiRequest<T>(endpoint);
};

export const apiPost = async <T>(
  endpoint: string,
  data: object | [],
): Promise<T> => {
  return await apiRequest<T>(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

type ApiErrorResponse = {
  error_type: string;
  message: string;
  errors: Record<string, string[]>;
};

export class ApiError extends Error {
  status: number;
  data: ApiErrorResponse;

  constructor(status: number, data: any) {
    super(data.message || 'API Error');
    this.status = status;
    this.data = data;
  }
}

export class ApiValidationError extends ApiError {
  fillFormErrors(setError: UseFormSetError<FieldValues>) {
    Object.keys(this.data.errors).forEach(field => {
      setError(field as keyof FieldValues, {
        type: 'server',
        message: this.data.errors[field][0],
      });
    });
  }
}

export class ApiCommonError extends ApiError {}
