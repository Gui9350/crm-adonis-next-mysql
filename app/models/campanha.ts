import { DateTime } from 'luxon'
import { BaseModel, column, beforeUpdate } from '@adonisjs/lucid/orm'

export default class Campanha extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'nome_campanha' })
  declare nomeCampanha: string

  @column({ columnName: 'tipo_campanha' })
  declare tipoCampanha: string

  @column({ columnName: 'status_campanha' })
  declare statusCampanha: string //Status da campanha (ativa, inativa, etc.)

  @column({ columnName: 'orcamento' })
  declare orcamento: number //Orçamento da campanha

  @column({ columnName: 'objetivo' })
  declare objetivo: string //Objetivo da campanha

  // colunas de timestamp conforme migrations
  @column.dateTime({ columnName: 'data_inicio' })
  declare dataInicio: DateTime | null

  @column.dateTime({ columnName: 'data_fim' })
  declare dataFim: DateTime | null //Data de término da campanha, pode ser nula se a campanha estiver ativa

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeUpdate()
  public static setEndDateClosed(campaign: Campanha) {
    if (campaign.statusCampanha === 'fechado' && !campaign.dataFim) {
      campaign.dataFim = DateTime.now()
    }
  }
}
