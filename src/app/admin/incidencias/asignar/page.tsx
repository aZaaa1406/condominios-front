"use client"
import { useEffect, useState } from "react";
import { columns, Incidencias } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios";
import { URL_API } from "@/config";



function AsignacionPage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Incidencias[]>([])
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`${URL_API}/api/admin/get-incidencias-table`)
                console.log(res.data);
                setData(res.data)
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            } finally {
                setLoading(false)
            }

        }
        getData();
    }, [])

    return (
        <div className='p-10'>
            {loading ? (
                <h1 className='text-2xl font-bold text-center'>Cargando Incidencias...</h1>
            ) : (
                <div className="">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">Tabla de Incidencias</h1>
                    <DataTable columns={columns()} data={data} />
                </div>
                
            )}
        </div>
    )
}

export default AsignacionPage