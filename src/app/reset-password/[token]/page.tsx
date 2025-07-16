"use client"

import React from 'react'
import ResetForm from '@/components/forms/reset-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'

function ResetPassword() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Botón de regreso */}
      <Link href={"/"} className="absolute top-4 left-4">
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-200">
          <HomeIcon className="mr-2" />
          Inicio
        </Button>
      </Link>

      {/* Contenido centrado */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-6 bg-[#1a1a1a] border border-yellow-500 rounded-xl shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-yellow-500 mb-6">
            Restablecer Contraseña
          </h1>

          <ResetForm />

          {/* Enlace adicional */}
          <div className="text-center mt-6 text-sm text-gray-400">
            ¿Recordaste tu contraseña?{" "}
            <Link href="/login" className="text-yellow-500 hover:underline">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
