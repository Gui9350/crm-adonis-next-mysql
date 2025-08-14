import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickets_suporte'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('cliente_id')
        .unsigned()
        .references('id')
        .inTable('clientes')
        .onDelete('CASCADE')
      table
        .integer('funcionarios')
        .unsigned()
        .references('id')
        .inTable('funcionarios')
        .onDelete('SET NULL')
      table.string('assunto', 255).notNullable()
      table.text('descricao').nullable()
      table.dateTime('data_fechamento').nullable()
      table.string('status_ticket', 50).nullable()
      table.string('prioridade', 50).nullable()

      table.timestamp('data_abertura', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
