"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Upload, AlertTriangle, DollarSign, PieChart } from "lucide-react"
import { ChartPieInteractive } from "@/components/admin-components/chart-payment"
import axios from "axios"
import { URL_API } from "@/config"
import Link from "next/link"

interface DashboardData {
  totalUsuarios: number;
  totalPagos: number;
  incidenciasActivas: number;
}
export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    totalUsuarios: 0,
    totalPagos: 0,
    incidenciasActivas: 0,
  });

  useEffect(() => {
    async function fetchDataDashboard() {
      const res = await axios.get<DashboardData>(`${URL_API}/api/admin/get-data-dashoboard`)
      console.log(res.data);
      setData(res.data) // Asumiendo que la API devuelve un array con
    }
    fetchDataDashboard()
  }, [])

  return (
    <div className="min-h-screen p-6 space-y-6 text-white">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        <p className="text-gray-400">Resumen general y accesos rápidos</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-sm text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              Usuarios registrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.totalUsuarios}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-sm text-gray-300">
              <DollarSign className="w-4 h-4 mr-2" />
              Total recaudado este mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${data.totalPagos.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-sm text-gray-300">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Incidencias activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.incidenciasActivas}</p>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href={"/admin/usuarios/registro-usuarios"}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                Registrar usuario
              </Button>
            </Link>

            <Link href={"/admin/usuarios/cargar-documento"}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Subir documento
              </Button>
            </Link>

            <Link href={"/admin/incidencias/asignar"}>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Asignar incidencia
              </Button>
            </Link>

            <Link href={"/admin/financiero/reportes"}>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <DollarSign className="w-4 h-4 mr-2" />
                Ver pagos del mes
              </Button>
            </Link>

          </div>
        </CardContent>
      </Card>

      {/* Gráfica de pastel */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Resumen de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartPieInteractive />
        </CardContent>
      </Card>
    </div>
  )
}
