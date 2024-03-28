const BASEURL = import.meta.env.VITE_SERVER || "http://localhost:3001";

export async function apiClient<T>(
  endpoint: string,
  method: string = "GET", // Defaults to GET method
  body?: Record<string, string | number> | { [key: string]: any }
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-type": "application/json",
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASEURL}/${endpoint}`, options); // calls specified endpoint with given options

  if (response.ok) {
    return response.json(); // success, return
  }
  return Promise.reject(new Error("Something went wrong"));
}
