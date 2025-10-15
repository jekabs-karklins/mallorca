import Knex from "knex";

export const db = Knex({
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 0,
    afterCreate: function (connection: any, done: any) {
      const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      connection.query(
        `SET timezone = "${process.env.TZ || defaultTimezone}";`,
        function (err: any) {
          done(err, connection);
        }
      );
    },
  },
});

db.on("query-error", function (error: any, obj: any) {
  console.error("QUERY ERROR", {
    message: error?.message,
    error,
    obj,
    QueryName: obj?.sql,
  });
});
