import type { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produtos'
import { ProdutoValidator, ProdutoUpdateValidator } from '#validators/produto'

export default class ProdutosController {
  /**
   * Exibe uma lista de todos os produtos
   * Display a list of all products
   */
  async index({}: HttpContext) {
    const produtos = await Produto.query()
    return produtos
  }

  /**
   * Exibe formulário para criar um novo produto
   * Display form to create a new product
   */
  async create({}: HttpContext) {}

  /**
   * Salva um novo produto no banco de dados
   * Handle form submission for creating a new product
   */
  async store({ request }: HttpContext) {
    const { nome, descricao, preco, categoria, ativo } =
      await request.validateUsing(ProdutoValidator)

    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      categoria,
      ativo,
    })
    return produto
  }

  /**
   * Exibe um produto específico pelo ID
   * Show individual product record
   */
  async show({ params, response }: HttpContext) {
    try {
      const produto = await Produto.findByOrFail('id', params.id)
      return produto
    } catch (error) {
      return response.status(404).json({
        error: 'Produto não encontrado',
        message: 'O produto com o ID especificado não foi encontrado',
      })
    }
  }

  /**
   * Exibe formulário para editar um produto
   * Edit individual product record
   */
  async edit({ params: _params }: HttpContext) {}

  /**
   * Atualiza um produto existente
   * Handle form submission for updating a product
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const produto = await Produto.findByOrFail('id', params.id)
      const dadosAtualizados = await request.validateUsing(ProdutoUpdateValidator)

      produto.merge(dadosAtualizados)
      await produto.save()

      return produto
    } catch (error) {
      return response.status(404).json({
        error: 'Produto não encontrado',
        message: 'O produto com o ID especificado não foi encontrado',
      })
    }
  }

  /**
   * Remove um produto do banco de dados
   * Delete product record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const produto = await Produto.findByOrFail('id', params.id)
      await produto.delete()

      return response.status(204).json({
        message: 'Produto removido com sucesso',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Produto não encontrado',
        message: 'O produto com o ID especificado não foi encontrado',
      })
    }
  }
}
