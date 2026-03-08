declare module 'cors';

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_GEN_API_KEY: string; // required
    VITE_FIREBASE_API_KEY: string; // required
    VITE_PORT: string;
    VITE_CLOUDINARY_API_SECRET: string
    VITE_CLOUDINARY_API_KEY: string
    VITE_CLOUDINARY_CLOUD_NAME: string // required
  }
}