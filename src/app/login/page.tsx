import LoginForm from "@/components/forms/login-form"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 flex flex-col relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-yellow-400/4 rounded-full blur-3xl"></div>

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent"></div>

        {/* Patrones geométricos */}
        <div className="absolute top-32 right-10 w-4 h-4 border border-yellow-500/20 rotate-45"></div>
        <div className="absolute top-48 right-16 w-2 h-2 bg-yellow-500/30 rotate-45"></div>
        <div className="absolute bottom-40 left-16 w-6 h-6 border border-yellow-400/15 rotate-12"></div>
        <div className="absolute bottom-60 left-20 w-3 h-3 bg-yellow-400/20 rounded-full"></div>

        {/* Grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Efectos de luz */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent blur-sm"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[1px] bg-gradient-to-l from-transparent via-yellow-400/15 to-transparent blur-sm"></div>
      </div>

      {/* Header con botón de inicio */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800/50 backdrop-blur-sm relative z-10">
        <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-yellow-500" />
          <span className="font-bold text-white">Urbanite</span>
        </div>
      </header>

      {/* Contenido principal centrado */}
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 p-6 md:p-10 relative z-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          {/* Efecto de resplandor detrás del formulario */}
          <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl blur-3xl scale-150 pointer-events-none"></div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
