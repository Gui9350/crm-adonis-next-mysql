import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'
import Campanha from './campanha.js'

export default class ClienteCampanha extends BaseModel {
  public static table = 'clientes_campanhas'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'cliente_id' })
  declare clienteId: number

  @column({ columnName: 'campanha_id' })
  declare campanhaId: number

  @column({ columnName: 'status_participacao' })
  declare status_participacao: string

  @column.dateTime({ columnName: 'data_participacao' })
  declare data_participacao: DateTime

  @belongsTo(() => Cliente, { foreignKey: 'clienteId' })
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Campanha, { foreignKey: 'campanhaId' })
  declare campanha: BelongsTo<typeof Campanha>
}
