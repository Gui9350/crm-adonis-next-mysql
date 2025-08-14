import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '#models/cliente'
import { ClienteValidator, ClienteUpdateValidator } from '#validators/cliente'

export default class ClientesController {
  /**
   * Exibe uma lista de todos os clientes
   * Display a list of all clients
   */
  async index({}: HttpContext) {
    const clientes = await Cliente.query()
    return clientes
  }

  /**
   * Exibe formulário para criar um novo cliente
   * Display form to create a new client
   */
  async create({}: HttpContext) {}

  /**
   * Salva um novo cliente no banco de dados
   * Handle form submission for creating a new client
   */
  async store({ request }: HttpContext) {
    const {
      nome,
      sobrenome,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
      pais,
      segmento,
      valorvidacliente,
    } = await request.validateUsing(ClienteValidator)

    const cliente = await Cliente.create({
      nome,
      sobrenome,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
      pais,
      segmento,
      valorvidacliente,
    })
    return cliente
  }

  /**
   * Exibe um cliente específico pelo ID
   * Show individual client record
   */
  async show({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.findByOrFail('id', params.id)
      return cliente
    } catch (error) {
      return response.status(404).json({
        error: 'Cliente não encontrado',
        message: 'O cliente com o ID especificado não foi encontrado',
      })
    }
  }

  /**
   * Exibe formulário para editar um cliente
   * Edit individual client record
   */
  async edit({ params: _params }: HttpContext) {}

  /**
   * Atualiza um cliente existente
   * Handle form submission for updating a client
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const cliente = await Cliente.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(ClienteUpdateValidator)

      cliente.merge(dadosAtualizados)
      await cliente.save()

      return cliente
    } catch (error) {
      return response.status(404).json({
        error: 'Cliente não encontrado',
        message: 'O cliente com o ID especificado não foi encontrado',
      })
    }
  }

  /**
   * Remove um cliente do banco de dados
   * Delete client record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.findByOrFail('id', params.id)
      await cliente.delete()

      return response.status(204).json({
        message: 'Cliente removido com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Cliente não encontrado',
        message: 'O cliente com o ID especificado não foi encontrado',
      })
    }
  }
}
