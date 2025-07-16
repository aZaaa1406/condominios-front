"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { URL_API } from '../../config'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo electrónico es obligatorio'
  }).email({
    message: 'El correo electrónico no es válido'
  }),
  password: z.string({
    required_error: 'La contraseña es obligatoria'
  })
})

type LoginType = z.infer<typeof loginSchema>


function LoginForm() {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = form.handleSubmit(async (values: LoginType) => {
    setIsLoading(true);
    try {
      console.log("datos enviados", values);
      const { data } = await axios.post(`${URL_API}/api/user/login`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if (data.status === 200) {
        toast.success("Inicio de sesión exitoso")
        console.log("respuesta del servidor", data.status, data.rol);
        switch (data.rol) {
          case "admin":
            router.push('/admin')
            break;
          case "residente":
            router.push('/residente')
            break;
          default:
            router.push('/unauthorized')
            break;
        }
      }
    } catch (error: any) {
      console.log("Error", error.response.data.error);
      toast.error("Ha ocurrido un error", {
        description: error.response.data.error
      })

    }
    finally {
      setIsLoading(false);
    }
  })

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>Bienvenido Residente</CardTitle>
        <CardDescription>Inicia sesión para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <CardContent >
        <Form {...form} >
          <form onSubmit={onSubmit} className='space-y-4'>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electronico</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder='a@ejemplo.com'></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-right mt-2">
              <a href="/forgot-password" className="text-yellow-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
            <Button type="submit" className='bg-yellow-400 text-white max-w-sm'>
              {isLoading ? (
                <>
                  <Loader2 className='animate-spin' size={20} />
                  Iniciando Sesión
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm;

