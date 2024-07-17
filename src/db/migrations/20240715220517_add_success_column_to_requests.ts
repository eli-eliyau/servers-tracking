import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('requests', (table) => {
        table.boolean('success').notNullable().defaultTo('unknown');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('requests', (table) => {
        table.dropColumn('success');
    });
}
