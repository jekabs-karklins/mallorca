import { TRPCError } from "@trpc/server";
import { getUserFromToken } from "../../auth/getUserFromToken";
import { DabContextType, t } from "../../dap-trps";
import { stripe } from "../../stripe";

const calculateOrderAmount = () => {
  if (!process.env.PRODUCT_PRICE) {
    throw new Error("PRODUCT_PRICE is not defined");
  }
  return parseInt(process.env.PRODUCT_PRICE);
};

export const createPaymentIntent = t.procedure.mutation(async ({ ctx }) => {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userId: null,
      oauthSub: null,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
});
