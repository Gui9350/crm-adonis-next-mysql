import vine from '@vinejs/vine'

export const CampanhasValidator = vine.compile(
  vine.object({
    nomeCampanha: vine.string().maxLength(255),
    tipoCampanha: vine.string().maxLength(100), // Ex: E-mail Marketing, Redes Sociais, Evento
    dataFim: vine.date({ formats: ['iso8601'] }),
    orcamento: vine.number().min(0),
    objetivo: vine.string().maxLength(500).optional(), // Descrição do objetivo da campanha
    statusCampanha: vine.string().maxLength(50).optional(), // Ex: Ativa, Concluída, Planejada
  })
)
export const CampanhasUpdateValidator = vine.compile(
  vine.object({
    nomeCampanha: vine.string().maxLength(255).optional(),
    tipoCampanha: vine.string().maxLength(100).optional(), // Ex: E-mail Marketing, Redes Sociais, Evento
    dataInicio: vine.date({ formats: ['iso8601'] }).optional(),
    dataFim: vine.date({ formats: ['iso8601'] }).optional(),
    orcamento: vine.number().min(0).optional(),
    objetivo: vine.string().maxLength(500).optional(), // Descrição do objetivo da campanha
    statusCampanha: vine.string().maxLength(50).optional(), // Ex: Ativa, Concluída, Planejada
  })
)
