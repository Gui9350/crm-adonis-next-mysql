/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { CRM: 'PROJETO' }
})
router.resource('funcionarios', () => import('#controllers/funcionarios_controller')).apiOnly()
router.resource('clientes', () => import('#controllers/clientes_controller')).apiOnly()
router.resource('campanhas', () => import('#controllers/campanhas_controller')).apiOnly()
router
  .resource('clientes_campanhas', () => import('#controllers/cliente_campanhas_controller'))
  .apiOnly()
router.resource('produtos', () => import('#controllers/produtos_controller')).apiOnly()
router.resource('interacoes', () => import('#controllers/interacaos_controller')).apiOnly()
router.resource('itens_vendas', () => import('#controllers/itens_vendas_controller')).apiOnly()
router.resource('vendas', () => import('#controllers/vendas_controller')).apiOnly()
router
  .resource('tickets_suportes', () => import('#controllers/tickets_suportes_controller'))
  .apiOnly()
