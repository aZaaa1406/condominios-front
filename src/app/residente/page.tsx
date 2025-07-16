import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CreditCard,
  FileText,
  PawPrint,
  Car,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="border-b bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                Dashboard <span className="text-yellow-300">Residente</span>
              </h1>
              <p className="text-yellow-600">Gestiona todos tus servicios desde un solo lugar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <Card className="bg-gray-900 border-green-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 uppercase tracking-wide">Pagos</p>
                  <p className="text-2xl font-bold text-green-400 mt-1">Al día</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-blue-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 uppercase tracking-wide">Incidencias</p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">1 Activa</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-gray-900 border-yellow-400/30">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-yellow-400" />
                  <CardTitle className="text-lg font-semibold text-yellow-400">Documentos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-yellow-600 mb-4">Revisa avisos y reglamentos importantes</p>
                <Link href="/residente/documentos">
                  <Button variant="ghost" className="text-yellow-400 hover:bg-yellow-400/10 w-full justify-between">
                    Ver Documentos
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-yellow-400/30">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                  <CardTitle className="text-lg font-semibold text-yellow-400">Reportar Incidencia</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-yellow-600 mb-4">Informa sobre problemas en el condominio</p>
                <Link href="/residente/reportes">
                  <Button variant="ghost" className="text-yellow-400 hover:bg-yellow-400/10 w-full justify-between">
                    Reportar ahora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900 border-yellow-400/30">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <PawPrint className="h-6 w-6 text-yellow-400" />
                  <CardTitle className="text-lg font-semibold text-yellow-400">Registrar Mascotas</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-yellow-600 mb-4">Agrega tus mascotas al sistema</p>
                <Link href="/residente/registros">
                  <Button variant="ghost" className="text-yellow-400 hover:bg-yellow-400/10 w-full justify-between">
                    Registrar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-yellow-400/30">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Car className="h-6 w-6 text-yellow-400" />
                  <CardTitle className="text-lg font-semibold text-yellow-400">Registrar Vehículos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-yellow-600 mb-4">Mantén actualizados tus datos vehiculares</p>
                <Link href="/residente/registros">
                  <Button variant="ghost" className="text-yellow-400 hover:bg-yellow-400/10 w-full justify-between">
                    Registrar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
