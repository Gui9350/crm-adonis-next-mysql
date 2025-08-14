import Funcionarios from '#models/funcionarios'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Funcionarios.truncate(true) // Limpa todos os registros e reseta o ID
    // Write your database queries inside the run method
    await Funcionarios.createMany([
      {
        nome: 'João',
        sobrenome: 'da Silva',
        email: 'joaosilv@hotmail.com',
        senha: '123456',
        cargo: 'Gerente',
      },
      {
        nome: 'Maria',
        sobrenome: 'Oliveira',
        email: 'mariaOliveria@outlook.com',
        senha: 'mariamaria',
        cargo: 'Analista',
      },
    ])
  }
}
