import { initTRPC } from "@trpc/server";
import { Request, Response } from "express";

export type DecodedJwt = {
  sub: string;
};

export type DabContextType = {
  req: Request;
  res: Response;
  token?: string;
};

export const t = initTRPC.create();

export const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<DabContextType> => {
  const cookies = req.cookies;
  const authToken = cookies.authToken;

  return { req, res, token: authToken };
};
