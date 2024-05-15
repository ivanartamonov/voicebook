import config from '../constants/config.ts';

export const apiRequest = async <T>(
  endpoint: string | URL | Request,
  options?: RequestInit | undefined,
): Promise<T> => {
  const response = await fetch(config.API_URL + endpoint, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
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
