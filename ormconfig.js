/* eslint-disable prettier/prettier */
module.exports = [{
  type: 'mysql',
  host: 'localhost',
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
},
{
  URL: process.env.DATABASE_URL,
  syncronize: true,
  entities: ["dist/**/entities/*.entity.{ts,js}"],
  migrations: ["./dist/shared/migration/*.{ts,js}"],
  cli: {
    "migrationsDir": "./src/shared/migration"
  }
}
];
