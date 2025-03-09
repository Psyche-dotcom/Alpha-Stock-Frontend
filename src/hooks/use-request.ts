"use client";

import Storage from "@/utils/storage";
/* eslint-disable style/quote-props */
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export type AxiosConfig = Partial<AxiosRequestConfig> & {
  url?: string;
  method: string;
  data?: any;
  params?: Record<string, unknown>;
  error?: (error?: any) => void;
  success?: (data?: any) => void;
};

export function useRequest(): AxiosInstance {
  const token = getCookie("token");

  const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 25000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token as string}`,
      }),
    },
  });

  request.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = await Storage.get("token-refresh");
      alert(originalRequest);
      console.log("Original Request:", originalRequest); // Check config object
      console.log("Refresh Token:", refreshToken); // Check if token exists
      console.log("Response Status:", error.response?.status); // Check response status
      console.log("Is Retry:", originalRequest?._isRetry);
      if (
        error.response &&
        error.response.status === 401 &&
        refreshToken &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true;
        alert("Unauthorized bro!!!");

        try {
          const refreshedResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
            { refresh: await Storage.get("token-refresh") },
            {
              headers: {
                Authorization: `Bearer ${await Storage.get("token-refresh")}`,
              },
            }
          );

          await Storage.set("token", refreshedResponse.data?.access);
          await Storage.set("token-refresh", refreshedResponse.data?.refresh);

          return await request.request(originalRequest);
        } catch (err) {
          console.error(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return request;
}
