import vine from '@vinejs/vine'

export const FuncionarioValidator = vine.compile(
  vine.object({
    nome: vine.string().maxLength(255),
    sobrenome: vine.string().maxLength(255),
    email: vine.string().email().normalizeEmail().unique({
      table: 'funcionarios',
      column: 'email',
    }),
    senha: vine.string().minLength(6).maxLength(255),
    cargo: vine.string().maxLength(255),
  })
)

export const FuncionarioUpdateValidator = vine.compile(
  vine.object({
    nome: vine.string().maxLength(255).optional(),
    sobrenome: vine.string().maxLength(255).optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique({
        table: 'funcionarios',
        column: 'email',
      })
      .optional(),
    senha: vine.string().minLength(6).maxLength(255).optional(),
    cargo: vine.string().maxLength(255).optional(),
  })
)
