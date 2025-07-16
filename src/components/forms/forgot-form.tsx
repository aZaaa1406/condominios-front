"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { URL_API } from '@/config'
import { toast } from 'sonner'

const forgotSchema = z.object({
    email: z.string().email({ message: "Email inválido" })
})
type ForgotType = z.infer<typeof forgotSchema>


function ForgotForm() {
    const form = useForm<ForgotType>({
        resolver: zodResolver(forgotSchema)
    })
    const onSubmit = form.handleSubmit(async (data: ForgotType) => {
        console.log(data);
        try {
            const response = await axios.post(`${URL_API}/api/user/forgot-password`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response.status === 200) {
                toast.success("Correo enviado correctamente, revisa tu bandeja de entrada")
                form.reset()
            } else {
                toast.error("Error al enviar el correo, por favor intente nuevamente")
            }
        } catch (error) {
            throw error
            
        }
    })
    return (
        <Card className='w-[400px]'>
            <CardHeader>
                <CardTitle>
                    Formulario de Recuperación de Contraseña
                </CardTitle>
                <CardDescription>
                    Ingresa tu correo electrónico para recibir instrucciones de recuperación.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className='space-y-4 p-4 flex flex-col'>
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder='Ingrese su correo electronico' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button>
                            Recuperar contraseña
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default ForgotForm