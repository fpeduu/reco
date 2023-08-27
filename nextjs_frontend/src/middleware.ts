export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/proposal/:cpfDevedor",
    "/tenants",
    "/agreements",
  ],
};
