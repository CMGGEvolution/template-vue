export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export  type IsArray<T> = T extends readonly unknown [] ? T : never;
export  type IsObject<T> =
  T extends Record<string | number, unknown> ? T : never;

export type IsPrimitiveType<T> = T extends Primitive ? T : never;
