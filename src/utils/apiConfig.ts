import { OpenAPI } from "@/services/apis/user";

export const setApiBaseUrl = () => {
  OpenAPI.BASE = import.meta.env.VITE_API_URL;
};
