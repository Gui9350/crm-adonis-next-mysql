import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ItensVenda from '#models/itens_venda'
import Venda from '#models/venda'
import Produto from '#models/produtos'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Garantir que as tabelas dependentes existem e têm dados
    await Venda.truncate(true) // Limpa todos os registros e reseta o ID
    await Produto.truncate(true) // Limpa todos os registros e reseta o ID
    await ItensVenda.truncate(true) // Limpa todos os registros e reseta o ID

    // Recriar dados das tabelas dependentes
    await Venda.createMany([
      {
        clienteId: 1,
        funcionarioId: 1,
        valorTotal: 3620.0,
        statusVenda: 'concluída',
        canalVenda: 'Online',
        dataVenda: DateTime.now(),
      },
      {
        clienteId: 2,
        funcionarioId: 2,
        valorTotal: 120.0,
        statusVenda: 'pendente',
        canalVenda: 'Loja Física',
        dataVenda: DateTime.now(),
      },
    ])

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

    await ItensVenda.createMany([
      {
        vendaId: 1,
        produtoId: 1,
        quantidade: 1,
        precoUnitario: 3500.0,
      },
      {
        vendaId: 1,
        produtoId: 2,
        quantidade: 1,
        precoUnitario: 120.0,
      },
      {
        vendaId: 2,
        produtoId: 2,
        quantidade: 1,
        precoUnitario: 120.0,
      },
    ])
  }
}
