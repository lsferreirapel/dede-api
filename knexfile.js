// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: "sqlite3",
  connection: {
    filename: "./src/data/dede.db",
  },
  useNullAsDefault: true
}

