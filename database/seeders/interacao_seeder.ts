import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Interacao from '#models/interacao'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Interacao.truncate(true) // Limpa todos os registros e reseta o ID
    await Interacao.createMany([
      {
        clienteId: 1,
        funcionarioId: 1,
        tipoInteracao: 'Telefone',
        dataInteracao: DateTime.now(),
        assunto: 'Dúvida sobre produto',
        detalhes: 'Cliente ligou perguntando sobre o notebook',
      },
      {
        clienteId: 2,
        funcionarioId: 2,
        tipoInteracao: 'Email',
        dataInteracao: DateTime.now(),
        assunto: 'Solicitação de orçamento',
        detalhes: 'Cliente solicitou orçamento para compra em grande quantidade',
      },
    ])
  }
}
