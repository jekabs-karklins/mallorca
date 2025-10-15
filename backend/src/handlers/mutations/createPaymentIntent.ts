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
    currency: "dkk",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userId: null,
      oauthSub: null,
    },
    receipt_email: 'someemail@gmail.mail',
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
});
