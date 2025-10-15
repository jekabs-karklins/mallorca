import { DabContextType, t } from "../../dap-trps";

export const logout = t.procedure.mutation(async ({ ctx }) => {
  const context = ctx as DabContextType;

  context.res.cookie("authToken", "", {
    expires: new Date(0),
    path: "/",
  });

  return true;
});
