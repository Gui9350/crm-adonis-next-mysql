import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

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
        .integer('funcionario_id')
        .unsigned()
        .references('id')
        .inTable('funcionarios')
        .onDelete('SET NULL')
      table.decimal('valor_total', 10, 2).notNullable()
      table.string('status_venda', 50).notNullable()
      table.string('canal_venda', 100).nullable()

      table.timestamp('data_venda', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
