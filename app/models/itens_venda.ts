import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Venda from './venda.js'
import Produto from './produtos.js'

export default class ItensVenda extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'venda_id' })
  declare vendaId: number

  @column({ columnName: 'produto_id' })
  declare produtoId: number

  @column()
  declare quantidade: number

  @column({ columnName: 'preco_unitario' })
  declare precoUnitario: number

  @belongsTo(() => Venda, { foreignKey: 'vendaId' })
  declare venda: BelongsTo<typeof Venda>

  @belongsTo(() => Produto, { foreignKey: 'produtoId' })
  declare produto: BelongsTo<typeof Produto>

  // itens_vendas não tem timestamps na migration
}
