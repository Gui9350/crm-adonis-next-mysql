import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ClienteCampanha from '#models/clientes_campanhas'
import Cliente from '#models/cliente'
import Campanha from '#models/campanha'

export default class extends BaseSeeder {
  async run() {
    await Cliente.truncate(true) // Limpa todos os registros e reseta o ID
    await Campanha.truncate(true) // Limpa todos os registros e reseta o ID
    await ClienteCampanha.truncate(true)
    // Popula clientes
    await Cliente.createMany([
      {
        nome: 'Fulano',
        sobrenome: 'da Silva',
        email: 'fulanolocal@gmail.com',
        telefone: '123456789',
        endereco: 'Rua Exemplo, 123',
        cidade: 'Cidade Exemplo',
        estado: 'Estado Exemplo',
        cep: '12345-678',
        pais: 'País Exemplo',
        segmento: 'Varejo',
        valorvidacliente: 1000.0,
      },
      {
        nome: 'Fulano2',
        sobrenome: 'da Guerra',
        email: 'fulanoGuerral@gmail.com',
        telefone: '1234567898',
        endereco: 'Rua Exemplo, 124',
        cidade: 'Cidade Exemplo4',
        estado: 'Estado Exemplo3',
        cep: '12345-670',
        pais: 'País Exemplo2',
        segmento: 'Alimentação',
        valorvidacliente: 2000.0,
      },
    ])
    // Popula campanhas
    await Campanha.createMany([
      {
        nomeCampanha: 'Campanha Verão',
        tipoCampanha: 'Desconto',
        statusCampanha: 'ativa',
        orcamento: 5000,
        objetivo: 'Aumentar vendas no verão',
        dataFim: null,
      },
      {
        nomeCampanha: 'Campanha Inverno',
        tipoCampanha: 'Brinde',
        statusCampanha: 'inativa',
        orcamento: 3000,
        objetivo: 'Fidelizar clientes',
        dataFim: null,
      },
    ])
    // Popula clientes_campanhas
    await ClienteCampanha.createMany([
      {
        clienteId: 1,
        campanhaId: 1,
        status_participacao: 'ativo',
      },
      {
        clienteId: 2,
        campanhaId: 2,
        status_participacao: 'Ativo',
      },
    ])
  }
}
