import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'interacoes'

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
      table.string('tipo_interacao', 50).notNullable() // Ex:Chamada, Reunião, Chat
      table.string('assunto', 255).nullable()
      table.text('detalhes').nullable()

      table.timestamp('data_interacao', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
