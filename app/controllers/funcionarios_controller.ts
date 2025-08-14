import type { HttpContext } from '@adonisjs/core/http'
import Funcionarios from '#models/funcionarios'
import { FuncionarioValidator, FuncionarioUpdateValidator } from '#validators/funcionario'

export default class FuncionariosController {
  /**
   * Exibe uma lista de todos os funcionários
   * Display a list of all employees
   */
  async index({}: HttpContext) {
    const funcionarios = await Funcionarios.query()
    return funcionarios
  }

  /**
   * Exibe formulário para criar um novo funcionário
   * Display form to create a new employee
   */
  async create({}: HttpContext) {}

  /**
   * Salva um novo funcionário no banco de dados
   * Handle form submission for creating a new employee
   */
  async store({ request }: HttpContext) {
    const { nome, sobrenome, email, senha, cargo } =
      await request.validateUsing(FuncionarioValidator)

    const funcionario = await Funcionarios.create({
      nome,
      sobrenome,
      email,
      senha,
      cargo,
    })
    return funcionario
  }

  /**
   * Exibe um funcionário específico pelo ID
   * Show individual employee record
   */
  async show({ params, response }: HttpContext) {
    try {
      const funcionario = await Funcionarios.findByOrFail('id', params.id)
      return funcionario
    } catch (error) {
      return response.status(404).json({
        error: 'Funcionário não encontrado',
        message: 'O funcionário com o ID especificado não foi encontrado',
      })
    }
  }

  /**
   * Exibe formulário para editar um funcionário
   * Edit individual employee record
   */
  async edit({ params: _params }: HttpContext) {}

  /**
   * Atualiza um funcionário existente
   * Handle form submission for updating an employee
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const funcionario = await Funcionarios.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(FuncionarioUpdateValidator)

      funcionario.merge(dadosAtualizados)
      await funcionario.save()

      return funcionario
    } catch (error) {
      return response.status(404).json({
        error: 'Funcionário não encontrado',
        message: 'O funcionário com o ID especificado não foi encontrado',
      })
    }
  }

  /**
   * Remove um funcionário do banco de dados
   * Delete employee record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const funcionario = await Funcionarios.findByOrFail('id', params.id)
      await funcionario.delete()

      return response.status(204).json({
        message: 'Funcionário removido com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Funcionário não encontrado',
        message: 'O funcionário com o ID especificado não foi encontrado',
      })
    }
  }
}
