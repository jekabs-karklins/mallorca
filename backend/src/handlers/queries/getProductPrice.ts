import { t } from "../../dap-trps";

export const getProductPrice = t.procedure.query(async () => {
  if (!process.env.PRODUCT_PRICE) {
    throw new Error("PRODUCT_PRICE is not defined");
  }
  const productPrice = parseInt(process.env.PRODUCT_PRICE);
  return productPrice;
});
