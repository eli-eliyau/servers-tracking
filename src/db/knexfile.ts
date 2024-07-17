import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: '207564758',
      host: 'localhost',
      port: 5432,
      database: 'server tracking',
      connectionTimeoutMillis: 0,
      ssl: false,
    },
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '\\migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
};

export default config;
