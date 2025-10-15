import { Client, Issuer } from "openid-client";

let client: Client | undefined;

export const getOAuthClient = async () => {
  if (client) {
    return client;
  }

  const auth0Issuer = await Issuer.discover(process.env.OAUTH_ISSUER_BASE_URL!);
  console.log(
    "Discovered issuer %s %O",
    auth0Issuer.issuer,
    auth0Issuer.metadata
  );

  client = new auth0Issuer.Client({
    client_id: process.env.OAUTH_CLIENT_ID!,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    redirect_uris: [process.env.OAUTH_CLIENT_REDIRECT_URI!],
    response_types: ["code"],
  });

  return client;
};
