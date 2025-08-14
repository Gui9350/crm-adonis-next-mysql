import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Campanha from '#models/campanha'
import { CampanhasValidator, CampanhasUpdateValidator } from '#validators/campanha'

export default class CampanhasController {
  /**
   * Exibe uma lista de todas as campanhas
   * Display a list of all campaigns
   */
  async index({}: HttpContext) {
    const campanhas = await Campanha.query()
    return campanhas
  }

  /**
   * Exibe formulário para criar uma nova campanha
   * Display form to create a new campaign
   */
  async create({}: HttpContext) {}

  /**
   * Salva uma nova campanha no banco de dados
   * Handle form submission for creating a new campaign
   */
  async store({ request }: HttpContext) {
    const { nomeCampanha, tipoCampanha, dataFim, orcamento, objetivo, statusCampanha } =
      await request.validateUsing(CampanhasValidator)

    const campanha = await Campanha.create({
      nomeCampanha,
      tipoCampanha,
      statusCampanha,
      orcamento,
      objetivo,
      dataFim: dataFim ? DateTime.fromJSDate(dataFim) : null,
    })
    return campanha
  }

  /**
   * Exibe uma campanha específica pelo ID
   * Show individual campaign record
   */
  async show({ params, response }: HttpContext) {
    try {
      const campanha = await Campanha.findByOrFail('id', params.id)
      return campanha
    } catch (error) {
      return response.status(404).json({
        error: 'Campanha não encontrada',
        message: 'A campanha com o ID especificado não foi encontrada',
      })
    }
  }

  /**
   * Exibe formulário para editar uma campanha
   * Edit individual campaign record
   */
  async edit({ params: _params }: HttpContext) {}

  /**
   * Atualiza uma campanha existente
   * Handle form submission for updating a campaign
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const campanha = await Campanha.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(CampanhasUpdateValidator)

      // Preparar dados para merge, convertendo dataFim se fornecida
      const dadosParaMerge: any = { ...dadosAtualizados }
      if (dadosAtualizados.dataFim) {
        dadosParaMerge.dataFim = DateTime.fromJSDate(dadosAtualizados.dataFim)
      }

      campanha.merge(dadosParaMerge)
      await campanha.save()

      return campanha
    } catch (error) {
      return response.status(404).json({
        error: 'Campanha não encontrada',
        message: 'A campanha com o ID especificado não foi encontrada',
      })
    }
  }

  /**
   * Remove uma campanha do banco de dados
   * Delete campaign record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const campanha = await Campanha.findByOrFail('id', params.id)
      await campanha.delete()

      return response.status(204).json({
        message: 'Campanha removida com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Campanha não encontrada',
        message: 'A campanha com o ID especificado não foi encontrada',
      })
    }
  }
}
