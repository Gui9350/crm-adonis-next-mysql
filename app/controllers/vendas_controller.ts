import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Venda from '#models/venda'
import { VendaValidator, VendaUpdateValidator } from '#validators/venda'
export default class VendasController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const venda = await Venda.query()
      .preload('cliente')
      .preload('funcionario')
      .preload('itensVendas')

    return venda
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(VendaValidator)
    const venda = await Venda.create({
      clienteId: payload.cliente_id[0],
      funcionarioId: payload.funcionario_id[0],
      valorTotal: payload.valor_total,
      statusVenda: payload.status_venda,
      canalVenda: payload.canal_venda || null,
      dataVenda: DateTime.fromJSDate(payload.data_venda),
    })
    if (!venda) {
      throw new Error('Erro ao criar venda')
    }
    if (!payload.cliente_id || !payload.funcionario_id) {
      throw new Error(
        'É necessário fornecer pelo menos um cliente e um funcionário para criar a venda.'
      )
    }
    if (!payload.cliente_id[0] || !payload.funcionario_id[0]) {
      throw new Error('Os IDs fornecidos para cliente ou funcionário são inválidos.')
    }
    return response.status(201).json(venda)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const venda = await Venda.query()
        .where('id', params.id)
        .preload('cliente')
        .preload('funcionario')
        .preload('itensVendas')
        .firstOrFail()

      return venda
    } catch (error) {
      return response.status(404).json({
        error: 'Venda não encontrada',
        message: 'A venda com o ID especificado não foi encontrada.',
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const venda = await Venda.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(VendaUpdateValidator)

      venda.merge({
        clienteId: dadosAtualizados.cliente_id[0],
        funcionarioId: dadosAtualizados.funcionario_id[0],
        valorTotal: dadosAtualizados.valor_total,
        statusVenda: dadosAtualizados.status_venda,
        canalVenda: dadosAtualizados.canal_venda || null,
      })

      await venda.save()
      return venda
    } catch (error) {
      return response.status(404).json({
        error: 'Venda não encontrada',
        message: 'A venda com o ID especificado não foi encontrada.',
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const venda = await Venda.findByOrFail('id', params.id)
    await venda.delete()
    return { message: 'Venda removida com sucesso' }
  }
}
