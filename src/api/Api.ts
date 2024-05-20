import config from '../constants/config.ts';

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

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    super(data.message || 'API Error');
    this.status = status;
    this.data = data;
  }
}

export class ApiValidationError extends ApiError {}

export class ApiCommonError extends ApiError {}
