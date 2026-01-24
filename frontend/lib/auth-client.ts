import { createAuthClient } from "better-auth/client";

// For client-side, use NEXT_PUBLIC_BETTER_AUTH_URL or auto-detect from current origin
// This ensures it works in both localhost and production
const getBaseURL = () => {
  // Client-side only - this file is only imported in client components
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || window.location.origin;
  }
  // Fallback for server-side (shouldn't happen, but just in case)
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || 'http://localhost:3000';
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const signInWithGoogle = async () => {
  try {
    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || window.location.origin;
      console.log('Attempting Google sign-in with baseURL:', baseURL);
    }
    
    const result = await authClient.signIn.social({
      provider: "google",
    });
    
    if (result.error) {
      const errorMessage = result.error.message || "Failed to sign in with Google";
      console.error("Google sign-in error:", result.error);
      throw new Error(errorMessage);
    }
    
    return result;
  } catch (error: any) {
    console.error("Google sign-in error:", error);
    
    // Provide more helpful error messages
    if (error?.message?.includes('redirect_uri_mismatch') || error?.message?.includes('redirect')) {
      throw new Error("OAuth redirect URI mismatch. Please check your Google OAuth configuration and ensure the redirect URI matches your deployment URL.");
    }
    
    if (error?.message?.includes('client_id') || error?.message?.includes('client')) {
      throw new Error("Google OAuth client ID not configured. Please set GOOGLE_CLIENT_ID in your environment variables.");
    }
    
    throw error;
  }
};

export async function logout() {
  await authClient.signOut()
  window.location.href = "/"
}