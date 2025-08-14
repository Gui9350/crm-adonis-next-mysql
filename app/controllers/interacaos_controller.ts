import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Interacao from '#models/interacao'
import { InteracaoValidator, InteracaoUpdateValidator } from '#validators/interacao'

export default class InteracaosController {
  /**
   * Exibe uma lista de todas as interações
   * Display a list of all interactions
   */
  async index({}: HttpContext) {
    const interacoes = await Interacao.query()
      .preload('cliente')
      .preload('funcionario')
      .orderBy('dataInteracao', 'desc')

    return interacoes
  }

  /**
   * Exibe formulário para criar uma nova interação
   * Display form to create a new interaction
   */
  async create({}: HttpContext) {
    // Retorna dados necessários para o formulário (clientes, funcionários, etc.)
    return {
      message: 'Endpoint para exibir formulário de criação de interação',
    }
  }

  /**
   * Salva uma nova interação no banco de dados
   * Handle form submission for creating a new interaction
   */
  async store({ request, response }: HttpContext) {
    try {
      const { clienteId, funcionarioId, tipoInteracao, dataInteracao, assunto, detalhes } =
        await request.validateUsing(InteracaoValidator)

      const interacao = await Interacao.create({
        clienteId,
        funcionarioId,
        tipoInteracao,
        dataInteracao: dataInteracao ? DateTime.fromJSDate(dataInteracao) : DateTime.now(),
        assunto,
        detalhes,
      })

      // Carrega os relacionamentos para retornar dados completos
      await interacao.load('cliente')
      await interacao.load('funcionario')

      return response.status(201).json({
        message: 'Interação criada com sucesso',
        data: interacao,
      })
    } catch (error) {
      return response.status(400).json({
        error: 'Erro ao criar interação',
        message: error.message,
      })
    }
  }

  /**
   * Exibe uma interação específica pelo ID
   * Show individual interaction record
   */
  async show({ params, response }: HttpContext) {
    try {
      const interacao = await Interacao.query()
        .where('id', params.id)
        .preload('cliente')
        .preload('funcionario')
        .firstOrFail()

      return interacao
    } catch (error) {
      return response.status(404).json({
        error: 'Interação não encontrada',
        message: 'A interação com o ID especificado não foi encontrada',
      })
    }
  }

  /**
   * Exibe formulário para editar uma interação
   * Edit individual interaction record
   */
  async edit({ params, response }: HttpContext) {
    try {
      const interacao = await Interacao.findOrFail(params.id)
      return {
        message: 'Endpoint para exibir formulário de edição',
        interacao,
      }
    } catch (error) {
      return response.status(404).json({
        error: 'Interação não encontrada',
        message: 'A interação com o ID especificado não foi encontrada',
      })
    }
  }

  /**
   * Atualiza uma interação existente
   * Handle form submission for updating an interaction
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const interacao = await Interacao.findOrFail(params.id)
      const dadosAtualizados = await request.validateUsing(InteracaoUpdateValidator)

      // Preparar dados para merge, convertendo dataInteracao se fornecida
      const dadosParaMerge: any = { ...dadosAtualizados }
      if (dadosAtualizados.dataInteracao) {
        dadosParaMerge.dataInteracao = DateTime.fromJSDate(dadosAtualizados.dataInteracao)
      }

      interacao.merge(dadosParaMerge)
      await interacao.save()

      // Carrega os relacionamentos para retornar dados completos
      await interacao.load('cliente')
      await interacao.load('funcionario')

      return {
        message: 'Interação atualizada com sucesso',
        data: interacao,
      }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          error: 'Interação não encontrada',
          message: 'A interação com o ID especificado não foi encontrada',
        })
      }

      return response.status(400).json({
        error: 'Erro ao atualizar interação',
        message: error.message,
      })
    }
  }

  /**
   * Remove uma interação do banco de dados
   * Delete interaction record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const interacao = await Interacao.findOrFail(params.id)
      await interacao.delete()

      return response.status(204).json({
        message: 'Interação removida com sucesso',
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          error: 'Interação não encontrada',
          message: 'A interação com o ID especificado não foi encontrada',
        })
      }

      return response.status(400).json({
        error: 'Erro ao remover interação',
        message: error.message,
      })
    }
  }
}
