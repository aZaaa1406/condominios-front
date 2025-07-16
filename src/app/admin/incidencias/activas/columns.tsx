"use client"

import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Incidencias = {
    categoria_inc: string
    nombre: string
    appat: string
    apmat: string
    descripcion: string
    fechaRegistro: string
    fechaFormateada?: string // opcional, ya que se añade en el procesamiento de datos
    prioridad: string

}

export const columns= (): ColumnDef<Incidencias>[] => [
    {
        accessorKey: "categoria_inc",
        header: "categoria",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "appat",
        header: "Appellido Paterno",
    },
    {
        accessorKey: "apmat",
        header: "Appellido Materno",
    },
    {
        accessorKey: "descripcion",
        header: "Descripcion",
    },
    {
        accessorKey: "fechaFormateada",
        header: "Fecha de Registro",
    },
    {
        accessorKey: "prioridad",
        header: "Prioridad",
    },

]