"use client"
import { useEffect, useState } from 'react'
import { URL_API } from '../../../config'
import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select";
import { toast } from 'sonner'


type Cuota = {
    id_cuota: number
    descripcion: string
    monto: number
    fecha_limite: string
}

function PagoForm() {
    const [cuota, setCuota] = useState<Cuota | null>(null)

    useEffect(() => {
        async function fetchCuota() {
            try {
                const res = await axios.get<Cuota>(`${URL_API}/api/resident/get-cuotas`, {
                    withCredentials: true,
                });

                if (res.data) {
                    setCuota(res.data); // 👈 ya no usamos res.data[0]
                }
            } catch (error) {
                console.error("Error al obtener cuota:", error);
            }
        }

        fetchCuota();
    }, []);

    const pagoSchema = z.object({
        metodoPago: z.enum(["Transferencia", "Efectivo"]),
        fecha: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Fecha inválida",
        })
    })

    type PagoType = z.infer<typeof pagoSchema>

    const form = useForm<PagoType>({
        resolver: zodResolver(pagoSchema),
    })

    const onSubmit = form.handleSubmit(async (data) => {
        console.log("Datos enviados:", {
            ...data,
            id_cuota: cuota?.id_cuota,
            monto: cuota?.monto,
        })
        const formData = {
            ...data,
            id_cuota: cuota?.id_cuota,
            monto: cuota?.monto,
        }
        const res = await axios.post(`${URL_API}/api/resident/register-payment`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        if (res.status === 200) {
            toast.success("Pago registrado exitosamente");
            form.reset({
                metodoPago: "Transferencia",
                fecha: "",
            });
            setCuota(null); // Limpiar cuota después del registro
        } else {
            toast.error("Error al registrar el pago");
        }
    })

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>Registro de pago</CardTitle>
                <CardDescription>Completa tu información para registrar el pago</CardDescription>
            </CardHeader>
            <CardContent>
                {cuota ? (
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <FormLabel>Descripción</FormLabel>
                                <Input disabled value={cuota.descripcion} />
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Monto</FormLabel>
                                <Input disabled value={cuota.monto} />
                            </div>
                            <div className="space-y-2">
                                <FormLabel>Fecha límite</FormLabel>
                                <Input disabled value={cuota.fecha_limite.slice(0, 10)} />
                            </div>

                            <FormField
                                name="metodoPago"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#FFD700] font-semibold">
                                            Metodo de Pago
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500">
                                                    <SelectValue placeholder="Seleccione el metodo de pago" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                                                <SelectItem value="Transferencia">Transferencia</SelectItem>
                                                <SelectItem value="Efectivo">Efectivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="fecha"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de pago</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Registrar pago
                            </Button>
                        </form>
                    </Form>
                ) : (
                    <p className="text-center text-muted-foreground">No hay cuotas pendientes.</p>
                )}
            </CardContent>
        </Card>
    )
}

export default PagoForm
