import { db } from "../db";
import { User } from "../types";
import { decodeToken } from "./decodeToken";

export interface JwtPayload {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
}

export const getUserFromToken = async (jwtToken: string | undefined) => {
  if (!jwtToken) {
    return undefined;
  }

  try {
    const payload = decodeToken(jwtToken);
    const user = (await db
      .from("users")
      .select("*")
      .where({ oauthSub: payload.sub })
      .first()) as User;

    if (!user) {
      return undefined;
    }

    return user;
  } catch (error) {
    return undefined;
  }
};
