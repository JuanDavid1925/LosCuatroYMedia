import { NextApiRequest, NextApiResponse } from 'next'

import { conn } from '/src/utils/database'

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
*/
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method, body } = req

  const {
    documento_asociado,
    estado
  } = body

  switch (method) {
    case 'POST':
      try {
        const query1 = `SELECT * FROM solicitudes WHERE documento_asociado_retiro = ${documento_asociado} 
          ${(!estado) ? '' : `, AND estado_retiro = ${estado}`}
        ;`

        const res1 = await conn.query(query1)

        if (res1.rows.length === 0) {
          res.status(404).json(`No se encontraron solicitudes.`)
        }
        else {
          res.status(200).json({ estado: 200, solicitudes: res1.rows })
        }

      } catch (error) {
        console.error(error.message)
        res.status(504).json(`La base de datos no responde.`)

      } finally {
        break
      }

    default:
      res.status(405).json('Método inválido.')
      break
  }
}