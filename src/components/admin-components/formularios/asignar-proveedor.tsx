// components/admin-components/formularios/asignar-proveedor.tsx
"use client"
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { URL_API } from '@/config'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { Button } from '@/components/ui/button'

type Proveedores = {
  id_proveedor: number
  categoria: string
  nombre: string
  appat: string
}

type Props = {
  idIncidencia: number
  onClose: () => void
}

const proveedorSchema = z.object({
  id_proveedor: z.string().min(1, "Selecciona un proveedor"),
})

type ProveedorForm = z.infer<typeof proveedorSchema>

function AsignacionProveedor({ idIncidencia, onClose }: Props) {
  const [proveedores, setProveedores] = useState<Proveedores[]>([])

  const form = useForm<ProveedorForm>({
    resolver: zodResolver(proveedorSchema),
  })

  useEffect(() => {
    async function fetchProveedores() {
      try {
        const res = await axios.get<Proveedores[]>(`${URL_API}/api/admin/get-proveedores-asignacion`)
        setProveedores(res.data)
      } catch (error: any) {
        toast.error(error.message || "Error al obtener proveedores")
      }
    }
    fetchProveedores()
  }, [])

  const onSubmit = async (values: ProveedorForm) => {
    const proveedorId = parseInt(values.id_proveedor)
    const incidenciaId = idIncidencia
    try {
        const res = await axios.post(`${URL_API}/api/admin/asignar-proveedor`, {
            id_proveedor: proveedorId,
            id_incidencia: incidenciaId,
        })
        if (res.status === 200) {
            toast.success("Proveedor asignado correctamente")
            window.location.reload() // Recargar la página para ver los cambios
            onClose()
        } else {
            toast.error("Error al asignar proveedor")
        }
    } catch (error : any) {
        toast.error(error.message || "Error al asignar proveedor")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id_proveedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-yellow-500 font-semibold">Proveedor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black text-white border-yellow-500">
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black text-white border-yellow-500">
                  {proveedores.map((p) => (
                    <SelectItem key={p.id_proveedor} value={String(p.id_proveedor)}>
                      {p.nombre} {p.appat} — {p.categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">Asignar</Button>
      </form>
    </Form>
  )
}

export default AsignacionProveedor
