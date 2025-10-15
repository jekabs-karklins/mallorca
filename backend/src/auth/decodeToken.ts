import { JwtPayload } from "./getUserFromToken";

export const decodeToken = (token: string): JwtPayload => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
  return payload;
};
