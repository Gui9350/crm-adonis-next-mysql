import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'nome' })
  declare nome: string

  @column({ columnName: 'descricao' })
  declare descricao: string

  @column({ columnName: 'preco' })
  declare preco: number

  @column({ columnName: 'categoria' })
  declare categoria: string

  @column({ columnName: 'ativo' })
  declare ativo: boolean

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime
}
