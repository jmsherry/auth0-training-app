// Catch all route. Wil get /api/auth/login, /api/auth/login, etc.
import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth();