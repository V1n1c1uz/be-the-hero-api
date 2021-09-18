import { Request, Response } from 'express'

import { Controller } from '../../shared/protocols/controller'
import { CreateOngService } from '../../services/ong/CreateOngService'

export default class CreateOngController implements Controller {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { ong, email, phone, city, state } = request.body

      const createOngService = new CreateOngService()
      const createOng = await createOngService.execute({ ong, email, phone, city, state })

      return response.send(createOng)
    } catch (error) {
      return response.status(error.statusCode || 500).send({
        statusCode: error.statusCode,
        message: error.errorMessage || 'Internal server error'
      })
    }
  }
}