"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle } from "lucide-react"
import axios from "axios"
import { URL_API } from "../../../config"
import { toast } from "sonner"




type Casa = {
  id_casa: number,
  lote: string
}
type Proveedor = {
  nombre: string
}

function RegisterForm() {
  const [isSubmitting, setSubmitting] = useState(false)
  const [casas, setCasas] = useState<string[]>([])
  const [proveedores, setProveedores] = useState<string[]>([])

  useEffect(() => {
    async function fetchCasas() {
      try {
        const res = await axios.get<Casa[]>(`${URL_API}/api/admin/get-houses`)
        const lotes = res.data.map(casas => casas.lote)
        setCasas(lotes)
      } catch (error) {
        console.error("Error al obtener casas:", error)

      }
    }
    fetchCasas()
    async function fetchProveedores(){
      try {
        const res = await axios.get<Proveedor[]>(`${URL_API}/api/admin/get-proveedores`)
        const nombres = res.data.map(casas => casas.nombre)
        setProveedores(nombres)
      } catch (error) {
        console.error("Error al obtener proveedores:", error)
      }
    }
    fetchProveedores()
  }, [])
  type RegisterType = z.infer<typeof registerSchema>

  const registerSchema = z.object({
    nombre: z.string().min(2, { message: "Requiere al menos 2 caracteres" }),
    appat: z.string().min(2, { message: "Requiere al menos 2 caracteres" }),
    apmat: z.string().min(2, { message: "Requiere al menos 2 caracteres" }),
    email: z.string().email({ message: "Correo inválido" }),
    telefono: z
      .string()
      .min(10, { message: "Debe tener 10 dígitos" })
      .max(10, { message: "Debe tener 10 dígitos" })
      .regex(/^\d{10}$/, { message: "Solo se permiten números" }),
    rol: z.enum(["residente", "proveedor", "admin"]),
    casa: z.string().refine((val) => casas.includes(val), { message: "Area no válida" }).optional(),
    proveedor: z.string().refine((val) => proveedores.includes(val), { message: "Proveedor no válido" }).optional()
  })

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      appat: "",
      apmat: "",
      email: "",
      telefono: "",
      rol: undefined,
      casa: undefined
    },
  })

  const handleSubmit = async (values: RegisterType) => {
    console.log("Formulario enviado correctamente")
    console.log("Datos:", values)
    try {
      setSubmitting(true)
      const { data } = await axios.post(`${URL_API}/api/admin/register`, values, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      })
      console.log(data);
      if (data.status === 200) {
        toast.success(data.message)
        form.reset()
      }
      if (data.status === 400) {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);

      // Detectar si es un error de Axios con respuesta del backend
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message || "Ocurrió un error al registrar";
        toast.error(message); // Mostrar error devuelto por el backend
      } else {
        toast.error("Error desconocido");
      }


    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit = form.handleSubmit(handleSubmit)
  const rolSeleccionado = form.watch("rol")
  useEffect(() => {
    if (rolSeleccionado !== "residente") {
      form.setValue("casa", undefined) // Limpia el valor si cambia el rol
    }
  }, [rolSeleccionado, form])

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto bg-[#0f0f0f] border border-[#FFD700] rounded-2xl shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-white">Registro de Usuario</CardTitle>
          <CardDescription className="text-[#d3d3d3]">
            Complete todos los campos para registrar un nuevo usuario en el sistema.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Nombre completo */}
              <div className="space-y-4">
                <FormField
                  name="nombre"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FFD700] font-semibold">Nombre *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu nombre"
                          className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="appat"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FFD700] font-semibold">Apellido Paterno *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apellido paterno"
                            className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="apmat"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#FFD700] font-semibold">Apellido Materno *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apellido materno"
                            className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FFD700] font-semibold">Email *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="correo@ejemplo.com"
                          type="email"
                          className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="telefono"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#FFD700] font-semibold">Teléfono *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10 dígitos"
                          type="text"
                          className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-yellow-500 focus:border-yellow-500"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            if (value.length <= 10) {
                              field.onChange(value)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contraseña */}
              {/* Rol */}
              <FormField
                name="rol"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#FFD700] font-semibold">Rol *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-full">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                        <SelectItem value="residente">Residente</SelectItem>
                        <SelectItem value="proveedor">Proveedor</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                name="casa"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#FFD700] font-semibold">
                      Casa
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={rolSeleccionado !== "residente"}>
                      <FormControl>
                        <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-full">
                          <SelectValue placeholder="Seleccione el lugar de residencia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                        {casas.map((nombre) => (
                          <SelectItem key={nombre} value={nombre}>
                            {nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                name="proveedor"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#FFD700] font-semibold">
                      Proveedor
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={rolSeleccionado !== "proveedor"}>
                      <FormControl>
                        <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-full">
                          <SelectValue placeholder="Seleccione el rol del proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                        {proveedores.map((nombre) => (
                          <SelectItem key={nombre} value={nombre}>
                            {nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Botón de envío */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Registrar Usuario
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterForm
