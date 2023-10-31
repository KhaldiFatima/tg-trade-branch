import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_APP_BACKEND_URL': JSON.stringify(
      process.env.VITE_APP_BACKEND_URL
    ),
    'process.env.VITE_APP_CLOUD_NAME': JSON.stringify(
      process.env.VITE_APP_CLOUD_NAME
    ),
    'process.env.VITE_APP_UPLOAD_PRESET': JSON.stringify(
      process.env.VITE_APP_UPLOAD_PRESET
    ),
    //'process.env.': JSON.stringify(process.env.),
  },
});
