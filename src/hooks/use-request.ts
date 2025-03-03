"use client";

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
  const token = getCookie("revpay-token");
  const adminToken = getCookie("revpay-admin-token");

  const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 25000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...((adminToken || token) && {
        Authorization: `Bearer ${(adminToken || token) as string}`,
      }),
    },
  });

  request.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      const refreshToken = await getCookie("revpay-refresh");

      if (
        error.response &&
        error.response.status === 401 &&
        refreshToken &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true;

        try {
          const refreshedResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
            { refresh: await getCookie("revpay-refresh") },
            {
              headers: {
                Authorization: `Bearer ${await getCookie("revpay-refresh")}`,
              },
            }
          );

          // router.push('/dashboard')

          await setCookie("revpay-token", refreshedResponse.data?.access);
          await setCookie("revpay-refresh", refreshedResponse.data?.refresh);

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
