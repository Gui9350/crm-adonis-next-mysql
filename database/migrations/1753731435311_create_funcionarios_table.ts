import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'funcionarios' // Funcionarios no mySQL

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome', 255).notNullable()
      table.string('sobrenome', 255).nullable()
      table.string('email', 254).notNullable().unique()
      table.string('senha').notNullable()
      table.string('cargo', 100).nullable()
      table.date('data_contratacao').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
