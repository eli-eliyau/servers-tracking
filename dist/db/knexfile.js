"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
