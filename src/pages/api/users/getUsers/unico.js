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
    documento,
    tipo
  } = JSON.parse(body)

  switch (method) {
    case 'POST':
      try {
        let query1

        switch (tipo) {
          case 'Asociado':
            query1 = `SELECT nombres_usuario, apellidos_usuario, telefono_usuario, activo_usuario, ocupacion_asociado, direccion_asociado, ciudad_asociado, correo_asociado
                      FROM usuarios JOIN asociados 
                      ON usuarios.documento_usuario = asociados.documento_asociado
                      WHERE documento_usuario = '${documento}';`
            break
          case 'Cliente':
            query1 = `SELECT nombres_usuario, apellidos_usuario, telefono_usuario, activo_usuario
                      FROM usuarios JOIN clientes 
                      ON usuarios.documento_usuario = clientes.documento_cliente
                      WHERE documento_usuario = '${documento}';`
            break
          case 'Admin':
            query1 = `SELECT nombres_usuario, apellidos_usuario, telefono_usuario, activo_usuario
                      FROM usuarios
                      WHERE documento_usuario = '${documento}';`
            break
          default:
            return res.status(400).json({ estado: 401, mensaje: 'Tipo de usuario no válido.' })
        }

        const res1 = await conn.query(query1)

        if (!res1.rowCount) {
          return res.status(400).json({ estado: 404, mensaje: 'Usuario no encontrado.' })
        }

        return res.status(200).json({
          estado: 200,
          mensaje: 'Usuario obtenido exitosamente.',
          usuario: res1.rows[0]
        })

      } catch ({ message }) {
        console.log(message)
        res.status(408).json({ estado: 408, mensaje: message })

      } finally {
        break
      }

    default:
      res.status(405).json('Método inválido.')
      break
  }
}