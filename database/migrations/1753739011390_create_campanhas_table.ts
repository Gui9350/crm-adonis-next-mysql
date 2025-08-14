//gerenciar campanhas de marketing

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'campanhas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome_campanha', 255).notNullable()
      table.string('tipo_campanha', 100).nullable() // Ex: E-mail Marketing, Redes Sociais, Evento
      table.dateTime('data_inicio').nullable()
      table.dateTime('data_fim').nullable()
      table.decimal('orcamento', 10, 2).nullable()
      table.text('objetivo').nullable()
      table.string('status_campanha', 50).nullable() // Ex: Ativa, Concluída, Planejada

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
