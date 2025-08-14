import vine from '@vinejs/vine'

export const ClientesCampanhasValidator = vine.compile(
  vine.object({
    clienteIds: vine.array(vine.number().exists({ table: 'clientes', column: 'id' })).distinct(),
    campanhaIds: vine.array(vine.number().exists({ table: 'campanhas', column: 'id' })).distinct(),
    status_participacao: vine.string().maxLength(50).optional(), // Ex: Engajado, Clicou, Abriu, Não Abriu
    data_participacao: vine.date({ formats: ['iso8601'] }).optional(),
  })
)

export const ClientesCampanhasUpdateValidator = vine.compile(
  vine.object({
    clienteId: vine.number().exists({ table: 'clientes', column: 'id' }).optional(),
    campanhaId: vine.number().exists({ table: 'campanhas', column: 'id' }).optional(),
    status_participacao: vine.string().maxLength(50).optional(), // Ex: Engajado, Clicou, Abriu, Não Abriu
    data_participacao: vine.date({ formats: ['iso8601'] }).optional(),
  })
)
