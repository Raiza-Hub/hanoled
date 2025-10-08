import { env } from "@/env";
import { multiSessionClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },

  plugins: [organizationClient(), multiSessionClient()],
});
