import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Produto from '#models/produtos'

export default class extends BaseSeeder {
  async run() {
    await Produto.truncate(true) // Limpa todos os registros e reseta o ID
    await Produto.createMany([
      {
        nome: 'Notebook',
        descricao: 'Notebook 15 polegadas',
        preco: 3500.0,
        categoria: 'Eletrônicos',
        ativo: true,
      },
      {
        nome: 'Mouse',
        descricao: 'Mouse sem fio',
        preco: 120.0,
        categoria: 'Acessórios',
        ativo: true,
      },
    ])
  }
}
