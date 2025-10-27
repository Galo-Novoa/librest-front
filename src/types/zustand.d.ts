declare module 'zustand' {
  export function create<T>(fn: (set: any, get: any) => T): T;
}