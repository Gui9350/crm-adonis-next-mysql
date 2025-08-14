import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Campanha from '#models/campanha'

export default class extends BaseSeeder {
  async run() {
    await Campanha.truncate(true)
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
  }
}
