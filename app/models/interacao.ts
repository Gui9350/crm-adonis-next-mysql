import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'
import Funcionarios from './funcionarios.js'

export default class Interacao extends BaseModel {
  public static table = 'interacoes'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'cliente_id' })
  declare clienteId: number

  @column({ columnName: 'funcionario_id' })
  declare funcionarioId: number

  @column({ columnName: 'tipo_interacao' })
  declare tipoInteracao: string

  @column.dateTime({ columnName: 'data_interacao' })
  declare dataInteracao: DateTime

  @column({ columnName: 'assunto' })
  declare assunto: string

  @column({ columnName: 'detalhes' })
  declare detalhes: string

  @belongsTo(() => Cliente, { foreignKey: 'clienteId' })
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Funcionarios, { foreignKey: 'funcionarioId' })
  declare funcionario: BelongsTo<typeof Funcionarios>

  // timestamps não definidos na migration
}
