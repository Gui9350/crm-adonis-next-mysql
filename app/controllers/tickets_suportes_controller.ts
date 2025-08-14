import type { HttpContext } from '@adonisjs/core/http'
import TicketsSuporte from '#models/tickets_suporte'
import { TicketsSuporteValidator, TicketsSuporteUpdateValidator } from '#validators/tickets_suporte'
import { DateTime } from 'luxon'
export default class TicketsSuportesController {
  async index({}: HttpContext) {
    const ticketsSuporte = await TicketsSuporte.query().preload('cliente').preload('user')
    return ticketsSuporte
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(TicketsSuporteValidator)
    const tickets = await TicketsSuporte.create({
      clienteId: payload.cliente_id[0],
      userId: payload.funcionario_id[0],
      assunto: payload.assunto,
      descricao: payload.descricao,
      statusTicket: payload.status_ticket,
      createdAt: DateTime.fromJSDate(payload.data_abertura),
      dataFechamento: payload.data_fechamento ? DateTime.fromJSDate(payload.data_fechamento) : null,
    })
    if (!tickets) {
      return response.status(400).json({
        error: 'Erro ao criar ticket de suporte',
        message: 'Não foi possível criar o ticket de suporte com os dados fornecidos.',
      })
    }
    if (!payload.cliente_id || !payload.funcionario_id) {
      return response.status(400).json({
        error: 'Dados incompletos',
        message:
          'É necessário fornecer pelo menos um cliente e um funcionário para criar o ticket.',
      })
    }
    if (!payload.cliente_id[0] || !payload.funcionario_id[0]) {
      return response.status(400).json({
        error: 'IDs inválidos',
        message: 'Os IDs fornecidos para cliente ou funcionário são inválidos.',
      })
    }
    return response.status(201).json(tickets)
  }

  async show({ params, response }: HttpContext) {
    try {
      const ticket = await TicketsSuporte.query()
        .where('id', params.id)
        .preload('cliente')
        .preload('user')
        .firstOrFail()

      return ticket
    } catch (error) {
      return response.status(404).json({
        error: 'Ticket não encontrado',
        message: 'O ticket com o ID especificado não foi encontrado.',
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const ticket = await TicketsSuporte.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(TicketsSuporteUpdateValidator)

      // Preparar dados para merge, convertendo data_abertura e data_fechamento se fornecidas
      const dadosParaMerge: any = { ...dadosAtualizados }
      if (dadosAtualizados.data_abertura) {
        dadosParaMerge.createdAt = DateTime.fromJSDate(dadosAtualizados.data_abertura)
      }
      if (dadosAtualizados.data_fechamento) {
        dadosParaMerge.dataFechamento = DateTime.fromJSDate(dadosAtualizados.data_fechamento)
      }

      ticket.merge(dadosParaMerge)
      await ticket.save()

      await ticket.load('cliente')
      await ticket.load('user')

      return ticket
    } catch (error) {
      return response.status(404).json({
        error: 'Ticket não encontrado',
        message: 'O ticket com o ID especificado não foi encontrado.',
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const ticket = await TicketsSuporte.findByOrFail('id', params.id)
      await ticket.delete()
      return response.status(204).json({
        meassage: 'Ticket removido com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Ticket não encontrado',
        message: 'O ticket com o ID especificado não foi encontrado.',
      })
    }
  }
}
