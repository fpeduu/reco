const isProduction = process.env.NODE_ENV === 'production';

export const serverURL = isProduction ?
  process.env.NEXT_PUBLIC_SERVER_URL :
  'http://localhost:3000';

export const apiURL = isProduction ?
  process.env.BACKEND_SERVER_URL as string :
  'http://localhost:8080';