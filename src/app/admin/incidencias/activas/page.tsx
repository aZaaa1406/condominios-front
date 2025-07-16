"use client"
import { useEffect, useState } from "react";
import { columns, Incidencias } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios";
import { URL_API } from "@/config";



function UsersPage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Incidencias[]>([])
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`${URL_API}/api/admin/get-incidencias-activas`)
                console.log("Original:", res.data)

                const dataConFormato = res.data.map((element: any) => {
                    const fechaOriginal = new Date(element.fechaRegistro)

                    return {
                        ...element,
                        fechaRegistro: fechaOriginal, // mantiene el objeto Date
                        fechaFormateada: fechaOriginal.toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        }),
                    }
                })

                // Ordenar por la fecha original (objeto Date)
                dataConFormato.sort((a: any, b: any) => {
                    return b.fechaRegistro.getTime() - a.fechaRegistro.getTime()
                })

                console.log("Con formato:", dataConFormato)
                setData(dataConFormato)
            } catch (error) {
                console.error("Error al obtener los usuarios:", error)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [])


    return (
        <div className='p-10'>
            {loading ? (
                <h1 className='text-2xl font-bold text-center'>Cargando Clientes...</h1>
            ) : (
                <div className="">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">Tabla de Usuarios</h1>
                    <DataTable columns={columns()} data={data} />
                </div>

            )}
        </div>
    )
}

export default UsersPage