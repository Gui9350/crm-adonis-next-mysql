import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import ClienteCampanha from '#models/clientes_campanhas'
import {
  ClientesCampanhasValidator,
  ClientesCampanhasUpdateValidator,
} from '#validators/cliente_campanha'

export default class ClienteCampanhasController {
  /**
   * Exibe uma lista de todas as relações cliente-campanha
   * Display a list of all client-campaign relationships
   */
  async index({}: HttpContext) {
    const clientesCampanhas = await ClienteCampanha.query().preload('cliente').preload('campanha')
    return clientesCampanhas
  }

  /**
   * Exibe formulário para criar uma nova relação cliente-campanha
   * Display form to create a new client-campaign relationship
   */
  async create({}: HttpContext) {}

  /**
   * Salva múltiplas relações cliente-campanha no banco de dados
   * Handle form submission for creating multiple client-campaign relationships
   */
  async store({ request }: HttpContext) {
    const {
      clienteIds,
      campanhaIds,
      status_participacao: statusParticipacao,
      data_participacao: dataParticipacao,
    } = await request.validateUsing(ClientesCampanhasValidator)

    const relacoesCriadas = []
    const dataParticipacaoFinal = dataParticipacao
      ? DateTime.fromJSDate(dataParticipacao)
      : DateTime.now()

    // Criar relações para cada combinação cliente-campanha
    for (const clienteId of clienteIds) {
      for (const campanhaId of campanhaIds) {
        // Verificar se a relação já existe para evitar duplicatas
        const relacaoExistente = await ClienteCampanha.query()
          .where('clienteId', clienteId)
          .where('campanhaId', campanhaId)
          .first()

        if (!relacaoExistente) {
          const clienteCampanha = await ClienteCampanha.create({
            clienteId,
            campanhaId,
            status_participacao: statusParticipacao || 'Ativo',
            data_participacao: dataParticipacaoFinal,
          })

          await clienteCampanha.load('cliente')
          await clienteCampanha.load('campanha')
          relacoesCriadas.push(clienteCampanha)
        }
      }
    }

    return {
      message: `${relacoesCriadas.length} relações cliente-campanha criadas com sucesso`,
      relacoes: relacoesCriadas,
      totalClientes: clienteIds.length,
      totalCampanhas: campanhaIds.length,
    }
  }

  /**
   * Exibe uma relação cliente-campanha específica pelo ID
   * Show individual client-campaign relationship record
   */
  async show({ params, response }: HttpContext) {
    try {
      const clienteCampanha = await ClienteCampanha.query()
        .where('id', params.id)
        .preload('cliente')
        .preload('campanha')
        .firstOrFail()

      return clienteCampanha
    } catch (error) {
      return response.status(404).json({
        error: 'Relação cliente-campanha não encontrada',
        message: 'A relação cliente-campanha com o ID especificado não foi encontrada',
      })
    }
  }

  /**
   * Exibe formulário para editar uma relação cliente-campanha
   * Edit individual client-campaign relationship record
   */
  async edit({ params: _params }: HttpContext) {}

  /**
   * Atualiza uma relação cliente-campanha existente
   * Handle form submission for updating a client-campaign relationship
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const clienteCampanha = await ClienteCampanha.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(ClientesCampanhasUpdateValidator)

      // Preparar dados para merge, convertendo data_participacao se fornecida
      const dadosParaMerge: any = { ...dadosAtualizados }
      if (dadosAtualizados.data_participacao) {
        dadosParaMerge.data_participacao = DateTime.fromJSDate(dadosAtualizados.data_participacao)
      }

      clienteCampanha.merge(dadosParaMerge)
      await clienteCampanha.save()

      await clienteCampanha.load('cliente')
      await clienteCampanha.load('campanha')

      return clienteCampanha
    } catch (error) {
      return response.status(404).json({
        error: 'Relação cliente-campanha não encontrada',
        message: 'A relação cliente-campanha com o ID especificado não foi encontrada',
      })
    }
  }

  /**
   * Remove uma relação cliente-campanha do banco de dados
   * Delete client-campaign relationship record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const clienteCampanha = await ClienteCampanha.findByOrFail('id', params.id)
      await clienteCampanha.delete()

      return response.status(204).json({
        message: 'Relação cliente-campanha removida com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Relação cliente-campanha não encontrada',
        message: 'A relação cliente-campanha com o ID especificado não foi encontrada',
      })
    }
  }
}
