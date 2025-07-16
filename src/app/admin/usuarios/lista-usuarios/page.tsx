"use client"
import { useEffect, useState } from "react";
import { columns, Users } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios";
import { URL_API } from "@/config";



function UsersPage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Users[]>([])
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`${URL_API}/api/admin/get-users`)
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
    const handleDelete = async (id_usuario: number) => {
        console.log("Se eliminio el usuario", id_usuario);
    };

    return (
        <div className='p-10'>
            {loading ? (
                <h1 className='text-2xl font-bold text-center'>Cargando Clientes...</h1>
            ) : (
                <div className="">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">Tabla de Usuarios</h1>
                    <DataTable columns={columns(handleDelete)} data={data} />
                </div>
                
            )}
        </div>
    )
}

export default UsersPage