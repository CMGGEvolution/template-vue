import type { IsArray, IsObject } from "@core/types";

export const GenericErrors = {
  NETWORK_ERROR: "NETWORK_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

type FormError<K> = {
  property: K;
  messages: string[];
};

type ResponseErrorOnForm<K> = {
  status: "error";
  errors: FormError<K>[];
};

export type ResponseOnError = {
  status: "error";
  message: string;
};

type ResponseOnSuccess<T> = {
  status: "success";
  data: T;
};

type ApiResponseResult<T, K = keyof T> = ResponseOnError
  | ResponseOnSuccess<T>
  | ResponseErrorOnForm<K>;

export type ApiResponse<T, K = keyof T> =
  T extends IsArray<T>
    ? ApiResponseResult<T, K>
    : T extends IsObject<T>
      ? ApiResponseResult<T, K>
      : never;
