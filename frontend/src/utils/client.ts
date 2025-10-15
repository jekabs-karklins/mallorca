// @ts-nocheck

import { AppRouter } from "@backend/index";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.REACT_APP_TRCP_URL,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include", // Ensures cookies are included with requests
        });
      },
    }),
  ],
  transformer: {
    output: {
      serialize: (v: any) => v,
      deserialize: (v: any) => v,
    },
    input: {
      serialize: (v: any) => v,
      deserialize: (v: any) => v,
    },
  },
});
