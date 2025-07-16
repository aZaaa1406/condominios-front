// AccionesIncidencia.tsx
import { useState } from "react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import AsignacionProveedor from "@/components/admin-components/formularios/asignar-proveedor"

export function AccionesIncidencia({ incidencia }: { incidencia: any }) {
  const [showProveedorModal, setShowProveedorModal] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowProveedorModal(true)}>
            Asignar Proveedor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showProveedorModal} onOpenChange={setShowProveedorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asignar Proveedor</DialogTitle>
          </DialogHeader>
          <AsignacionProveedor
            idIncidencia={incidencia.id_incidencia}
            onClose={() => setShowProveedorModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Prioridad modal lo dejas como ya lo tienes 👇 */}
    </>
  )
}
