/* eslint-disable prettier/prettier */
module.exports = {
  type: process.env.BANCO,
  host: process.env.HOST_BANCO,
  port: process.env.PORTA_BANCO,
  username: process.env.USUARIO_BANCO,
  password: process.env.SENHA_BANCO,
  database: process.env.DATABASE,
  logging: true,
  syncronize: true,
  entities: ["dist/**/entities/*.entity.{ts,js}"],
  migrations: ["./dist/shared/migration/*.{ts,js}"],
  cli: {
    "migrationsDir": "./src/shared/migration"
  }
};
