/* eslint-disable prettier/prettier */
if (!process.env.LOCAL) {
  module.exports = {
    type: process.env.BANCO,
    url: process.env.DATABASE_URL,
    logging: true,
    syncronize: true,
    ssl: false,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    entities: ["dist/**/entities/*.entity.{ts,js}"],
    migrations: ["./dist/shared/migration/*.{ts,js}"],
    cli: {
      "migrationsDir": "./src/shared/migration"
    }
  };
}
else {
  module.exports = {
    type: process.env.BANCO,
    url: process.env.DATABASE_URL,
    logging: true,
    syncronize: true,
    entities: ["dist/**/entities/*.entity.{ts,js}"],
    migrations: ["./dist/shared/migration/*.{ts,js}"],
    cli: {
      "migrationsDir": "./src/shared/migration"
    }
  };
}