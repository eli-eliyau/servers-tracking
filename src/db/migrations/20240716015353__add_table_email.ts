import type { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.createTable('email', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export const down = async (knex: Knex): Promise<void> => {
    await knex.schema.dropTableIfExists('email');
}
