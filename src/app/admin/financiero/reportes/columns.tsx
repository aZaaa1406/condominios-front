"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    id_usuario: number
    nombre: string
    appat: string
    apmat: string,
    estado: string,
    correo: string
}

export const columns = (handleNotification: (correo: string) => void): ColumnDef<Users>[] => [
    {
        accessorKey: "mes",
        header: "Mes",
    },
    {
        accessorKey: "año",
        header: "Año",
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
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.getValue("estado") as string;
            return <span className="capitalize">{estado}</span>;
        },
        enableColumnFilter: true,
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
                            <Button className="bg-yellow-300 text-black">Notificar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="items-center justify-center">
                                <DialogTitle>Notificar al usuario</DialogTitle>
                                <Bell className="text-yellow-300" size={40} />
                                <DialogDescription>¿Desea notificar a {usuario.nombre} sobre el vencimiento del pago?</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        onClick={() => handleNotification(usuario.correo)}
                                        className="bg-yellow-500 text-black hover"
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