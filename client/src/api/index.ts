import axios, { AxiosInstance, AxiosResponse } from "axios";
import "dotenv/config";

const API: AxiosInstance = axios.create({ baseURL: process.env.REACT_APP_API });

export const signIn = (formData: object): Promise<AxiosResponse> =>
  API.post("/users/signin", formData);
export const signUp = (formData: object): Promise<AxiosResponse> =>
  API.post("/users/signup", formData);
