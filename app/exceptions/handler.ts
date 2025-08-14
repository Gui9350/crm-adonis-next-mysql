import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   *
   * No modo debug, o manipulador de exceções exibirá erros detalhados
   * com rastreamentos de pilha formatados.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   *
   * O método é usado para tratar erros e retornar
   * resposta ao cliente
   */
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   *
   * O método é usado para reportar erro ao serviço de log ou
   * ao serviço de monitoramento de erro de terceiros.
   *
   * @note Você não deve tentar enviar uma resposta deste método.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
