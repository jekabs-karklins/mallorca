import { getUserFromToken } from "../../auth/getUserFromToken";
import { DabContextType, t } from "../../dap-trps";
import { db } from "../../db";

export const getCurrentUser = t.procedure.query(async ({ ctx }) => {
  const jwtToken = (ctx as DabContextType).token;
  const user = await getUserFromToken(jwtToken);

  return user;
});
