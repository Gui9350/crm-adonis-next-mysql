import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import Funcionarios from './funcionarios.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class TicketsSuporte extends BaseModel {
  public static table = 'tickets_suporte'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'cliente_id' })
  declare clienteId: number

  @belongsTo(() => Cliente, { foreignKey: 'clienteId' })
  declare cliente: BelongsTo<typeof Cliente>

  @column({ columnName: 'funcionarios' })
  declare userId: number

  @hasMany(() => Funcionarios, { foreignKey: 'id' })
  declare user: HasMany<typeof Funcionarios>

  @column({ columnName: 'assunto' })
  declare assunto: string

  @column({ columnName: 'descricao' })
  declare descricao: string

  @column({ columnName: 'status_ticket' })
  declare statusTicket: string

  @column.dateTime({ columnName: 'data_abertura' })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'data_fechamento' })
  declare dataFechamento: DateTime | null

  // sem updated_at na migration
}
