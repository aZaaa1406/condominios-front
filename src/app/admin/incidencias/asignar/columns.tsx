"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AccionesIncidencia } from "./acciones-incidencia"

export type Incidencias = {
  id_incidencia: number
  nombre: string
  categoria_inc: string
  descripcion: string
  fechaRegistro: string
  prioridad: string
}

export const columns = (): ColumnDef<Incidencias>[] => [
  {
    accessorKey: "id_incidencia",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Área",
  },
  {
    accessorKey: "categoria_inc",
    header: "Categoría",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "fechaRegistro",
    header: "Fecha de Registro",
  },
  {
    accessorKey: "prioridad",
    header: "Prioridad",
  },
  {
  id: "actions",
  header: "Acciones",
  cell: ({ row }) => {
    return <AccionesIncidencia incidencia={row.original} />
  },
}
]
