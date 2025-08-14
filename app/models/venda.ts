import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import ItensVenda from './itens_venda.js'

import Cliente from './cliente.js'
import Funcionarios from './funcionarios.js'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'cliente_id' })
  declare clienteId: number

  @column({ columnName: 'funcionario_id' })
  declare funcionarioId: number

  // itens_venda é tabela relacionada; não existe coluna itensVendaId na migration de vendas

  @belongsTo(() => Cliente, { foreignKey: 'clienteId' })
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Funcionarios, { foreignKey: 'funcionarioId' })
  declare funcionario: BelongsTo<typeof Funcionarios>

  @hasMany(() => ItensVenda, { foreignKey: 'vendaId' })
  declare itensVendas: HasMany<typeof ItensVenda>

  @column({ columnName: 'valor_total' })
  declare valorTotal: number

  @column({ columnName: 'status_venda' })
  declare statusVenda: string

  @column({ columnName: 'canal_venda' })
  declare canalVenda: string | null

  @column.dateTime({ columnName: 'data_venda' })
  declare dataVenda: DateTime

  // vendas migration não define created_at/updated_at
}
