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
  const user = await getUserFromToken((ctx as DabContextType).token);

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      cause: "No user for token found",
      message: "Can not continue with payment because, No valid user logged in",
    });
  }

  if (user.membershipEndDate && user.membershipEndDate > new Date()) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      cause: "User already has a membership ",
      message: "Can not continue because use already has a membership",
    });
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "dkk",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userId: user.id,
      oauthSub: user.oauthSub,
    },
    receipt_email: user.email,
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
});
