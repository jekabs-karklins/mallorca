import { getOAuthClient } from "../../oAuthClient";
import { t } from "../../dap-trps";
import { z } from "zod";

const getAuthUrlInputSchema = z.object({
  internalRedirectUri: z.string(),
});

export const getAuthUrl = t.procedure
  .input(getAuthUrlInputSchema)
  .query(async ({ input }) => {
    const client = await getOAuthClient();
    const state = encodeURIComponent(
      JSON.stringify({ internal_redirect_url: input.internalRedirectUri })
    );

    const authUrl = client.authorizationUrl({
      scope: "openid email profile",
      state: state,
    });
    return authUrl;
  });
