import vine from '@vinejs/vine'

export const VendaValidator = vine.compile(
  vine.object({
    cliente_id: vine.array(vine.number().exists({ table: 'clientes', column: 'id' })).distinct(),
    funcionario_id: vine
      .array(vine.number().exists({ table: 'funcionarios', column: 'id' }))
      .distinct(),
    valor_total: vine.number().min(0),
    status_venda: vine.string().maxLength(255),
    canal_venda: vine.string().maxLength(255).optional(),
    data_venda: vine.date({ formats: ['iso8601'] }),
  })
)
export const VendaUpdateValidator = vine.compile(
  vine.object({
    cliente_id: vine.array(vine.number().exists({ table: 'clientes', column: 'id' })).distinct(),
    funcionario_id: vine
      .array(vine.number().exists({ table: 'funcionarios', column: 'id' }))
      .distinct(),
    valor_total: vine.number().min(0).optional(),
    status_venda: vine.string().maxLength(255).optional(),
    canal_venda: vine.string().maxLength(255).optional(),
    data_venda: vine.date({ formats: ['iso8601'] }).optional(),
  })
)
