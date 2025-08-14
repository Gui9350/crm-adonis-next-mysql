import vine from '@vinejs/vine'

export const ProdutoValidator = vine.compile(
  vine.object({
    nome: vine.string().maxLength(255),
    descricao: vine.string().maxLength(255),
    preco: vine.number().min(0),
    categoria: vine.string().maxLength(255),
    ativo: vine.boolean({ strict: true }),
  })
)

export const ProdutoUpdateValidator = vine.compile(
  vine.object({
    nome: vine.string().maxLength(255).optional(),
    descricao: vine.string().maxLength(255).optional(),
    preco: vine.number().min(0).optional(),
    categoria: vine.string().maxLength(255).optional(),
    ativo: vine.boolean({ strict: true }).optional(),
  })
)
