import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const getAuthToken = (): string | null => {
  return null;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const CallApi = async <T = unknown>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: unknown = {},
  customHeaders: Record<string, string> = {}
) => {
  try {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      // ...(token ? { Authorization: `Bearer ${token}` } : {}), 
      ...customHeaders,
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      data,
    };

    const res: AxiosResponse<T> = await axios(config);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        throw new Error(
          `Error: ${error.response?.status} - ${JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        throw new Error("No response received from server.");
      }
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};