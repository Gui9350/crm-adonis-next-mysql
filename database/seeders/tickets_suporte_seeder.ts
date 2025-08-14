import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TicketsSuporte from '#models/tickets_suporte'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await TicketsSuporte.truncate(true) // Limpa todos os registros e reseta o ID
    await TicketsSuporte.createMany([
      {
        clienteId: 1,
        userId: 1,
        assunto: 'Problema no pedido',
        descricao: 'Pedido não chegou no prazo',
        statusTicket: 'aberto',
        createdAt: DateTime.now(),
        dataFechamento: null,
      },
      {
        clienteId: 2,
        userId: 2,
        assunto: 'Produto com defeito',
        descricao: 'Notebook apresentou defeito',
        statusTicket: 'fechado',
        createdAt: DateTime.now(),
        dataFechamento: DateTime.now(),
      },
    ])
  }
}
