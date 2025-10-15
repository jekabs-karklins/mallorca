import { db } from "./../../db";
import { getOAuthClient } from "../../oAuthClient";
import { DabContextType, t } from "../../dap-trps";
import { z } from "zod";
import { TokenSet } from "openid-client";
import { decodeToken } from "../../auth/decodeToken";

const verifyCodeSchema = z.object({
  code: z.string(),
});

const upsertUserFromToken = async ({ access_token, id_token }: TokenSet) => {
  if (id_token === undefined) {
    return;
  }

  const payload = decodeToken(id_token);

  const result = await db("users")
    .insert({
      name: payload.name,
      email: payload.email,
      oauthSub: payload.sub,
      lastLogin: new Date(),
    })
    .onConflict("oauthSub")
    .merge({
      name: payload.name,
      email: payload.email,
      lastLogin: new Date(),
    })
    .returning("*");

  return result;
};
export const login = t.procedure
  .input(verifyCodeSchema)
  .mutation(async ({ input, ctx }) => {
    const context = ctx as DabContextType;

    const callbackParams = new URLSearchParams();
    callbackParams.append("code", input.code);

    const client = await getOAuthClient();

    const params = client.callbackParams(`?${callbackParams.toString()}`);

    const tokenSet = await client.callback(
      process.env.OAUTH_CLIENT_REDIRECT_URI,
      params
    );

    upsertUserFromToken(tokenSet);

    if (!context.res) {
      throw new Error("tRCP context not properly setup");
    }
    context.res.cookie("authToken", tokenSet.id_token);

    return true;
  });
