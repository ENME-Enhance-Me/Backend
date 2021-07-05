/* eslint-disable prettier/prettier */
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
