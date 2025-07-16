"use client"
import { useState, useEffect } from "react"
import { ChartPieInteractive } from "@/components/admin-components/chart-payment"
import { DataTable } from "./data-table"
import { columns, Users } from "./columns"
import axios from "axios"
import { URL_API } from "@/config"
import { Button } from "@/components/ui/button"

function ReportesPagos() {
  const [data, setData] = useState<Users[]>([])
  const [showChart, setShowChart] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${URL_API}/api/admin/data-table-cuotas`)
        console.log(res.data)
        setData(res.data)
      } catch (error) {
        console.error("Error al obtener los usuarios:", error)
      }
    }
    getData()
  }, [])

  const handleNotification = async (correo: string) => {
    console.log("Se eliminó el usuario", correo)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Button
        onClick={() => setShowChart(!showChart)}
        variant="outline"
        className="self-start"
      >
        {showChart ? "Ocultar gráfica" : "Mostrar gráfica"}
      </Button>

      {showChart && <ChartPieInteractive />}

      <DataTable columns={columns(handleNotification)} data={data} />
    </div>
  )
}

export default ReportesPagos
