import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Venda from '#models/venda'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Venda.truncate(true) // Limpa todos os registros e reseta o ID
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
  }
}
