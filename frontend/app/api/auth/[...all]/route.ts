import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

// Ensure Node.js runtime for Vercel
export const runtime = "nodejs";

export const { POST, GET } = toNextJsHandler(auth);