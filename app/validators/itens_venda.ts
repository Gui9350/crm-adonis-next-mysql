import vine from '@vinejs/vine'

export const ItensVendaValidator = vine.compile(
  vine.object({
    vendaId: vine.array(vine.number().exists({ table: 'vendas', column: 'id' })).distinct(),
    produtoId: vine.array(vine.number().exists({ table: 'produtos', column: 'id' })).distinct(),
    quantidade: vine.number().min(1),
    precoUnitario: vine.number().min(0),
  })
)

export const ItensVendaUpdateValidator = vine.compile(
  vine.object({
    venda_id: vine.array(vine.number().exists({ table: 'vendas', column: 'id' })).distinct(),
    produto_id: vine.array(vine.number().exists({ table: 'produtos', column: 'id' })).distinct(),
    quantidade: vine.number().min(1).optional(),
    precoUnitario: vine.number().min(0).optional(),
  })
)
