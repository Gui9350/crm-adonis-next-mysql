import type { HttpContext } from '@adonisjs/core/http'
import ItensVenda from '#models/itens_venda'
import { ItensVendaValidator, ItensVendaUpdateValidator } from '#validators/itens_venda'

export default class ItensVendasController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const itensVenda = await ItensVenda.query()
    return itensVenda
  }

  async store({ request }: HttpContext) {
    const { vendaId, produtoId, quantidade, precoUnitario } =
      await request.validateUsing(ItensVendaValidator)

    const itens = vendaId.map((vId, index) => ({
      vendaId: vId,
      produtoId: produtoId[index],
      quantidade: quantidade,
      precoUnitario: precoUnitario,
    }))
    const itensVenda = await ItensVenda.createMany(itens)
    return itensVenda
  }

  async show({ params, response }: HttpContext) {
    try {
      const itensVenda = await ItensVenda.query()
        .where('id', params.id)
        .preload('venda')
        .preload('produto')
        .firstOrFail()
      return itensVenda
    } catch (error) {
      return response.status(404).json({
        error: 'Item de venda não encontrado',
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const itensVenda = await ItensVenda.findByOrFail(params.id)
      const dadosAtualizados = await request.validateUsing(ItensVendaUpdateValidator)
      itensVenda.merge(dadosAtualizados)
      await itensVenda.save()

      return dadosAtualizados
    } catch (error) {
      return response.status(404).json({
        error: 'Item de venda não encontrado',
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const itensVenda = await ItensVenda.findByOrFail(params.id)
      await itensVenda.delete()

      return response.status(204).json({
        message: 'Item de venda deletado com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Item de venda não encontrado',
        message: 'O item de venda com o ID especificado não foi encontrado',
      })
    }
  }
}
