import { config } from "dotenv";
config();

import cors from "cors";
import express from "express";
import { getAuthUrl } from "./handlers/queries/getAuthUrl";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import { createContext, t } from "./dap-trps";
import stripeRouter from "./handlers/custom/stripe";
import { createPaymentIntent } from "./handlers/mutations/createPaymentIntent";
import { login } from "./handlers/mutations/login";
import { logout } from "./handlers/mutations/logout";
import { getCurrentUser } from "./handlers/queries/getCurrentUser";
import { getProductPrice } from "./handlers/queries/getProductPrice";

const appRouter = t.router({
  createPaymentIntent: createPaymentIntent,
  getAuthUrl: getAuthUrl,
  login: login,
  logout: logout,
  getCurrentUser: getCurrentUser,
  getProductPrice: getProductPrice,

});

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(process.env.STRIPE_PATH!, stripeRouter);
app.use(express.json());
app.use(
  process.env.BACKEND_PATH!,
  createExpressMiddleware({ router: appRouter, createContext: createContext })
);

app.listen(4000, () => console.log("Node server listening on port 4000!"));

export type AppRouter = typeof appRouter;
