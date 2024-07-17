import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await knex.schema.createTable('web_servers', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').notNullable();
        table.string('url').notNullable();
        table.string('status').notNullable().defaultTo('unknown');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('requests', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('server_id').references('id').inTable('web_servers').onDelete('CASCADE');
        table.integer('response_time').notNullable();
        table.integer('status_code').notNullable();
        table.boolean('success').notNullable().defaultTo('unknown');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('requests');
    await knex.schema.dropTableIfExists('web_servers');
}
