import vine from '@vinejs/vine'

export const TicketsSuporteValidator = vine.compile(
  vine.object({
    cliente_id: vine.array(vine.number().exists({ table: 'clientes', column: 'id' })).distinct(),
    funcionario_id: vine
      .array(vine.number().exists({ table: 'funcionarios', column: 'id' }))
      .distinct(),
    assunto: vine.string().maxLength(255),
    descricao: vine.string().maxLength(255),
    data_abertura: vine.date({ formats: ['iso8601'] }),
    data_fechamento: vine.date({ formats: ['iso8601'] }).optional(),
    status_ticket: vine.string().maxLength(255),
    prioridade: vine.string().maxLength(255),
  })
)

export const TicketsSuporteUpdateValidator = vine.compile(
  vine.object({
    cliente_id: vine
      .array(vine.number().exists({ table: 'clientes', column: 'id' }))
      .distinct()
      .optional(),
    funcionario_id: vine
      .array(vine.number().exists({ table: 'funcionarios', column: 'id' }))
      .distinct()
      .optional(),
    assunto: vine.string().maxLength(255).optional(),
    descricao: vine.string().maxLength(255).optional(),
    data_abertura: vine.date({ formats: ['iso8601'] }).optional(),
    data_fechamento: vine.date({ formats: ['iso8601'] }).optional(),
    status_ticket: vine.string().maxLength(255).optional(),
    prioridade: vine.string().maxLength(255).optional(),
  })
)
