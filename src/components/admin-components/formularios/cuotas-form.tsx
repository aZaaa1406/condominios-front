"use client"
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { URL_API } from '@/config.js'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select";
import { toast } from 'sonner'

const cuotasSchema = z.object({
    monto: z.number().min(0, "El monto debe ser mayor o igual a 0"),
    fechaLimite: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Fecha inválida",
    }),
    mes: z.enum(
        [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        {
            errorMap: () => ({ message: "Mes inválido" }),
        }
    ),
})

type CuotasFormData = z.infer<typeof cuotasSchema>

function CuotasForm() {
    const form = useForm<CuotasFormData>({
        resolver: zodResolver(cuotasSchema)
    })

    const onSubmit = form.handleSubmit(async (values: CuotasFormData) => {
        try {
            const res = await axios.post(`${URL_API}/api/admin/register-cuota`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            console.log(res.data);
            if (res.status === 200) {
                form.reset()
                toast.success(res.data.message)
            }
            if (res.status === 400) {
                toast.error(res.data.message)
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

        }
    })
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return (
        <Card className="bg-[#1a1a1a] text-white border border-[#FFD700] shadow-lg w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className='text-yellow-400 text-center'>Registro de cuotas</CardTitle>
                <CardDescription className='text-white text-center'>Registra las fechas de las cuotas en esta seccion</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md mx-auto px-4 flex flex-col">
                        <FormField
                            name="mes"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#FFD700] font-semibold">Mes</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-full">
                                                <SelectValue placeholder="Seleccione el mes de la cuota" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                                            {meses.map(mes => (
                                                <SelectItem key={mes} value={mes}>{mes}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='monto'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monto</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Ingrese el monto de la cuota"
                                            value={field.value ?? ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                field.onChange(val === '' ? undefined : Number(val));
                                            }}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                            className='w-100'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='fechaLimite'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>FechaLimite</FormLabel>
                                    <FormControl>
                                        <Input type='date' placeholder='Ingrese el monto de la cuota' {...field} className='w-100' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>
                            Registrar Cuota
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CuotasForm