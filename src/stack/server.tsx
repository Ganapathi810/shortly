import "server-only";

import { StackServerApp } from "@stackframe/stack";
import { stackClientApp } from "./client";

export const stackServerApp = new StackServerApp({
  inheritsFrom: stackClientApp,
  urls: {
    signUp: '/',
    signIn: '/signin',
    signOut: '/signin',
  }
});
