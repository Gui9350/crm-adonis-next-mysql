import vine from '@vinejs/vine'

export const ClienteValidator = vine.compile(
  vine.object({
    nome: vine.string().maxLength(255),
    sobrenome: vine.string().maxLength(255),
    email: vine.string().email().normalizeEmail().unique({
      table: 'clientes',
      column: 'email',
    }),
    telefone: vine.string().maxLength(20).minLength(10),
    endereco: vine.string().maxLength(255),
    cidade: vine.string().maxLength(100),
    estado: vine.string().maxLength(100),
    cep: vine.string().maxLength(10).minLength(5),
    pais: vine.string().maxLength(100),
    segmento: vine.string().maxLength(100).optional(), // Ex: 'Varejo', 'Alimentação', 'Saúde'
    valorvidacliente: vine.number().min(0),
  })
)

export const ClienteUpdateValidator = vine.compile(
  vine.object({
    nome: vine.string().maxLength(255).optional(),
    sobrenome: vine.string().maxLength(255).optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique({
        table: 'clientes',
        column: 'email',
      })
      .optional(),
    telefone: vine.string().maxLength(20).minLength(10).optional(),
    endereco: vine.string().maxLength(255).optional(),
    cidade: vine.string().maxLength(100).optional(),
    estado: vine.string().maxLength(100).optional(),
    cep: vine.string().maxLength(10).minLength(5).optional(),
    pais: vine.string().maxLength(100).optional(),
    segmento: vine.string().maxLength(100).optional(), // Ex: 'Varejo', 'Alimentação', 'Saúde'
    valorvidacliente: vine.number().min(0).optional(),
  })
)
