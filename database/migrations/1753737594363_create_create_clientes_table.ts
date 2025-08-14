import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome', 255).notNullable()
      table.string('sobrenome', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('telefone', 20).nullable()
      table.string('endereco', 255).nullable()
      table.string('cidade', 100).nullable()
      table.string('estado', 100).nullable()
      table.string('cep', 10).nullable()
      table.string('pais', 100).nullable()
      table.string('segmento', 100).nullable() //Ex: Varejo, Corporativo, B2B, B2C
      table.decimal('valor_vida_cliente', 10, 2).defaultTo(0.0)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
