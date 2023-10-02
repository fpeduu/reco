const isProduction = process.env.NODE_ENV === 'production';

export const serverURL = isProduction ?
  process.env.NEXT_PUBLIC_SERVER_URL :
  'http://localhost:3000';

export const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!apiURL) {
  console.error(
    'Please define the NEXT_PUBLIC_BACKEND_URL environment variable inside .env.local'
  );
}