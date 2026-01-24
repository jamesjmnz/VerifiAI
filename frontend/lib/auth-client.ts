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

/**
 * Force clear all session data from browser
 */
export function clearAllSessionData() {
  if (typeof window === 'undefined') return;
  
  // Clear localStorage
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('auth') || key.includes('session') || key.includes('better-auth'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  // Clear all cookies related to auth
  document.cookie.split(";").forEach((c) => {
    const cookieName = c.trim().split("=")[0];
    if (cookieName.includes('better-auth') || cookieName.includes('session') || cookieName.includes('auth')) {
      // Clear for current path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      // Clear for root path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    }
  });
}

export async function logout() {
  try {
    // Clear the session on server
    await authClient.signOut()
    
    // Force clear all cached session data
    clearAllSessionData()
    
    // Small delay to ensure cookies are cleared
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Redirect to home page with cache busting
    window.location.href = "/?logout=true&t=" + Date.now()
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, clear local data and redirect
    clearAllSessionData()
    window.location.href = "/?logout=true&t=" + Date.now()
  }
}