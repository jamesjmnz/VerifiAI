import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};