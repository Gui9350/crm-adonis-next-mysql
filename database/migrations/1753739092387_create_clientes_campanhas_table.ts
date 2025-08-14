import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes_campanhas'

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
        .integer('campanha_id')
        .unsigned()
        .references('id')
        .inTable('campanhas')
        .onDelete('CASCADE')
      table.string('status_participacao', 50).nullable() //Ex: Engajado, Clicou, Abriu, Não Abriu

      table.timestamp('data_participacao', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
