import { useCallback, useEffect, useState } from "react"
import $ from "jquery"

import Header_asociado from "./header_asociado"
import Retiro_exitoso from "./retiro_exitoso"
import useSaves from '/src/hooks/useSaves'

export default function Formulario_retiro() {
  const { realizarRetiro, cargarDatosRetiro } = useSaves()
  const [showModal, setShowModal] = useState(false)
  const [estado, setEstado] = useState()
  const [datos, setDatos] = useState()

  const handleClose = () => { setShowModal(false) }

  useEffect(() => {
    if (!datos) {
      cargarDatosRetiro(setDatos)
      return
    }

    $("#id_solicitud").val(datos.idSolicitud)
    $("#correo").val(datos.correo)
    $("#cantidad_retiro").val(datos.saldo)
  }, [cargarDatosRetiro, setDatos, datos])

  useEffect(() => {
    if (estado == 1) {
      setShowModal(true)
    }
  }, [estado])

  const handleSubmit = useCallback(() => {
    realizarRetiro(datos, setEstado)
  }, [datos, realizarRetiro])

  return (
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <Header_asociado nombre_seccion="Retiros" />
      <div className="px-6 pt-6 2xl:container">
        <div>
          <div className="grid sm:px-10 lg:grid-cols-1 ">
            <div className="mt-10 bg-white px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Detalles del retiro</p>
              <p className="text-gray-400">Complete su solicitud rellenando la siguiente información.</p>
              <div className>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Número de la solicitud de retiro</label>
                <div className="relative">
                  <input
                    type="text"
                    id="id_solicitud"
                    name="id_solicitud"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Solicitud de retiro"
                    disabled
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Correo electrónico</label>
                <div className="relative">
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your.email@gmail.com"
                    disabled
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Titular de la tarjeta</label>
                <div className="relative">
                  <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Nombre completo" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Detalles de la tarjeta</label>
                <div className="flex">
                  <div className="relative w-7/12 flex-shrink-0">
                    <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    id="fecha de expiración"
                    name="fecha de expiración"
                    type="date"
                    placeholder=""
                    className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Dirección</label>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                    <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Dirección de residencia" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img className="h-4 w-4 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg" alt="" />
                    </div>
                  </div>
                  <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                    <option value="State">Ciudad</option>
                    <option value="State">Cali</option>
                    <option value="State">Palmira</option>
                  </select>
                </div>
                <label htmlFor="cantidad_retirar" className="mt-4 mb-2 block text-sm font-medium">Cantidad a retirar</label>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                    <input
                      type="text"
                      id="cantidad_retiro"
                      name="cantidad_retiro"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=" "
                      disabled
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 mb-8 w-full rounded-md bg-gradient-to-r from-sky-600 to-cyan-400 px-6 py-3 font-medium text-white">Realizar retiro</button>
            </div>
            {showModal && <Retiro_exitoso onClose={() => handleClose()}></Retiro_exitoso>}
          </div>
        </div>
      </div>
    </div>
  )
}