import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signUp: '/signup',
    signIn: '/signin',
    signOut: '/signin',
  }
});