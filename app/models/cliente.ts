import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { hasMany } from '@adonisjs/lucid/orm'
import Interacao from './interacao.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare sobrenome: string

  @column()
  declare email: string

  @column()
  declare telefone: string

  @column()
  declare endereco: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare cep: string

  @column()
  declare pais: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare segmento: string //Ex: 'Varejo', 'Alimentação', 'Saúde'

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ columnName: 'valor_vida_cliente' })
  declare valorvidacliente: number // Valor do cliente ao longo da vida útil dele

  @hasMany(() => Interacao, { foreignKey: 'clienteId' })
  declare interacoes: HasMany<typeof Interacao>
}
