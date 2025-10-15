import express from "express";
import Stripe from "stripe";
import { db } from "../../db";
import { stripe } from "../../stripe";
import { logger } from "../../log/Logger";

const stripeRouter = express.Router();

const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;

const addMonths = (date: Date, months: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

async function fulfillOrder(intent: Stripe.Charge) {
  try {
    const userId = parseInt(intent.metadata.userId);
    const membershipEndDate = addMonths(new Date(), 6);

    if (!userId) {
      logger.error(
        "Critical error. User ID not specified in callback",
        intent.id,
        intent.amount
      );
      throw new Error("User ID not specified in callback");
    }

    logger.log("Payment WebHook", {
      metadata: intent.metadata,
      membershipEndDate: membershipEndDate,
      intentId: intent.id,
    });

    const user = await db("users")
      .update({ membershipEndDate: membershipEndDate })
      .where({ id: userId })
      .returning("*");

    logger.log("User Updated", user);

    await db("payments").insert({
      userId: userId,
      createdAt: new Date(),
      amount: intent.amount,
      stripePaymentId: intent.id,
      paymentMethod: intent.payment_method_details?.type || null,
      receiptEmail: intent.receipt_email || null,
      metadata: intent.metadata,
    });
  } catch (e) {
    console.log(e, intent.metadata);
  }
}

stripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"]!;

    console.log("Headers:", request.headers);
    console.log("Body:", payload.toString());

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret!);
    } catch (err) {
      return response
        .status(400)
        .send(`Webhook Error: ${(err as Error).message}`);
    }
    if (event.type === "charge.succeeded") {
      const charge = event.data.object;

      // Fulfill the purchase...
      await fulfillOrder(charge);
    }

    response.status(200).end();
  }
);

export default stripeRouter;
