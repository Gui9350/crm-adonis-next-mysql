import vine from '@vinejs/vine'

export const InteracaoValidator = vine.compile(
  vine.object({
    clienteId: vine.number().exists({ table: 'clientes', column: 'id' }),
    funcionarioId: vine.number().exists({ table: 'funcionarios', column: 'id' }),
    tipoInteracao: vine.string().maxLength(50), // Ex: E-mail, Telefone, Reunião
    dataInteracao: vine.date({ formats: ['iso8601'] }).optional(),
    assunto: vine.string().maxLength(255).optional(),
    detalhes: vine.string().optional(),
  })
)

export const InteracaoUpdateValidator = vine.compile(
  vine.object({
    clienteId: vine.number().exists({ table: 'clientes', column: 'id' }).optional(),
    funcionarioId: vine.number().exists({ table: 'funcionarios', column: 'id' }).optional(),
    tipoInteracao: vine.string().maxLength(50).optional(), // Ex: E-mail, Telefone, Reunião
    dataInteracao: vine.date({ formats: ['iso8601'] }).optional(),
    assunto: vine.string().maxLength(255).optional(),
    detalhes: vine.string().optional(),
  })
)
