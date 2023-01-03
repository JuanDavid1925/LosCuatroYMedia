import { useState, useEffect } from 'react'

import Modificacion_asociados from "/src/componentes/dashboard/admin/usuarios/modales/modificacion_asociados"
import Modificacion_cliente from "/src/componentes/dashboard/admin/usuarios/modales/modificacion_cliente"
import useUser from "/src/hooks/useUser"

export default function TabUsuarios() {
  const { getAllUsers } = useUser()

  const [documentoUsuario, setDocumentoUsuario] = useState()
  const [usuarios, setUsuarios] = useState()
  const [estado, setEstado] = useState()

  const [showModal, setShowModal] = useState(false)
  const [showModal1, setShowModal1] = useState(false)

  const handleClose = () => { setShowModal(false) }

  const handleClose1 = () => { setShowModal1(false) }

  useEffect(() => {
    if (!usuarios)
      getAllUsers(setEstado, setUsuarios)
  }, [getAllUsers, usuarios])

  return <>
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Modificar
                  </th>
                </tr>
              </thead>
              <tbody>
                {!!usuarios && usuarios.map(usuario => (
                  <>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {usuario.nombres_usuario + " " + usuario.apellidos_usuario}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{usuario.documento_usuario}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {usuario.telefono_usuario}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {(usuario.tipo_usuario === "Asociado") ? <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                          <span aria-hidden className="absolute inset-0 bg-blue-500 opacity-50 rounded-full" />
                          <span className="relative">{usuario.tipo_usuario}</span>
                        </span> : (usuario.tipo_usuario === "Cliente") ? <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                          <span aria-hidden className="absolute inset-0 bg-green-500 opacity-50 rounded-full" />
                          <span className="relative">{usuario.tipo_usuario}</span>
                        </span> : (usuario.tipo_usuario === "Admin") ? <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                          <span aria-hidden className="absolute inset-0 bg-yellow-500 opacity-50 rounded-full" />
                          <span className="relative">{usuario.tipo_usuario}</span>
                        </span> : <></>}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <a
                          onClick={
                            (usuario.tipo_usuario === "Asociado")
                              ? () => { setShowModal(true); setDocumentoUsuario(usuario.documento_usuario) }
                              : () => { setShowModal1(true); setDocumentoUsuario(usuario.documento_usuario) }
                          }
                          className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline cursor-pointer">Editar
                        </a>
                      </td>
                    </tr>
                  </>
                ))
                }
                {showModal && <Modificacion_asociados onClose={() => handleClose()} documento1={documentoUsuario}></Modificacion_asociados>}
                {showModal1 && <Modificacion_cliente onClose={() => handleClose1()} documento={documentoUsuario}></Modificacion_cliente>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
}