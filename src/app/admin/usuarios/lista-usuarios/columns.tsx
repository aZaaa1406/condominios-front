"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, TriangleAlert } from "lucide-react"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    id_usuario: number
    nombre: string
    appat: string
    apmat: string
    correo: string
    telefono: string
    lote: string
    descripcion_rol: string

}

export const columns= (handleDelete: (id: number) => void): ColumnDef<Users>[] => [
    {
        accessorKey: "id_usuario",
        header: "ID",
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
        accessorKey: "correo",
        header: "Correo"
    },
    {
        accessorKey: "telefono",
        header: "Telefono",
    },
    {
        accessorKey: "lote",
        header: "Domicilio",
    },
    {
        accessorKey: "descripcion_rol",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    },
    {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const usuario = row.original

      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Eliminar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-center justify-center">
                <DialogTitle>Eliminar usuario</DialogTitle>
                <TriangleAlert className="text-red-700" size={40} />
                <DialogDescription>¿Desea eliminar a {usuario.nombre}?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={() => handleDelete(usuario.id_usuario)}
                    variant="destructive"
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )
    }
  }

]