"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        yield knex.schema.createTable('web_servers', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('name').notNullable();
            table.string('url').notNullable();
            table.string('status').notNullable().defaultTo('unknown');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
        yield knex.schema.createTable('requests', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.uuid('server_id').references('id').inTable('web_servers').onDelete('CASCADE');
            table.integer('response_time').notNullable();
            table.integer('status_code').notNullable();
            table.boolean('success').notNullable().defaultTo('unknown');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists('requests');
        yield knex.schema.dropTableIfExists('web_servers');
    });
}
