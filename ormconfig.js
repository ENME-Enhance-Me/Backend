/* eslint-disable prettier/prettier */
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
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
