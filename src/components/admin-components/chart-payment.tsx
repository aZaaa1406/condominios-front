"use client"

import * as React from "react"
import axios from "axios"
import {
  Pie,
  PieChart,
  Sector,
  Label,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { URL_API } from "@/config"

const chartConfig = {
  pendiente: { label: "Pendiente", color: "#facc15" },
  pagado: { label: "Pagado", color: "#22c55e" },
  vencido: { label: "Vencido", color: "#ef4444" },
}

interface PagoEstado {
  estado: string
  valor: number
  fill: string
}

interface PagoMes {
  mes: string
  año?: number
  data: PagoEstado[]
}

export function ChartPieInteractive() {
  const id = "pie-interactive"
  const [pagosData, setPagosData] = React.useState<PagoMes[]>([])
  const [activeMonth, setActiveMonth] = React.useState<string>("")
  const [activeYear, setActiveYear] = React.useState<string>("")

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL_API}/api/admin/data-pie-chart`)
        const data = res.data
        setPagosData(data)

        if (data.length > 0) {
          setActiveYear(data[0].año?.toString() ?? "")
          setActiveMonth(data[0].mes)
        }
      } catch (error) {
        console.error("Error al obtener datos de pagos:", error)
      }
    }

    fetchData()
  }, [])

  const yearOptions = React.useMemo(() => {
    const yearsSet = new Set<number>()
    pagosData.forEach(item => {
      if (item.año) yearsSet.add(item.año)
    })
    return Array.from(yearsSet).sort((a, b) => b - a)
  }, [pagosData])

  const activeYearNum = Number(activeYear)

  const filteredMonths = React.useMemo(() => {
    return pagosData
      .filter(item => Number(item.año) === activeYearNum)
      .map(item => item.mes)
  }, [pagosData, activeYearNum])

  const currentMonthData = React.useMemo(() => {
    return pagosData.find(item => item.mes === activeMonth && Number(item.año) === activeYearNum)?.data || []
  }, [pagosData, activeMonth, activeYearNum])

  const total = currentMonthData.reduce((sum, item) => sum + item.valor, 0)

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0 justify-between">
        <div className="grid gap-1">
          <CardTitle>Gráfica de Pagos</CardTitle>
          <CardDescription>
            Estado de pagos por mes · Total: {total}
          </CardDescription>
        </div>

        {/* Select de Año */}
        <Select value={activeYear} onValueChange={setActiveYear}>
          <SelectTrigger
            className="h-8 w-[90px] rounded-lg pl-2.5"
            aria-label="Selecciona un año"
          >
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {yearOptions.map((año) => (
              <SelectItem key={año} value={año.toString()}>
                {año}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select de Mes */}
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="h-8 w-[130px] rounded-lg pl-2.5"
            aria-label="Selecciona un mes"
          >
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {filteredMonths.map((mes) => (
              <SelectItem key={mes} value={mes}>
                {mes}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-4">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={currentMonthData}
              dataKey="valor"
              nameKey="estado"
              innerRadius={60}
              strokeWidth={5}
              outerRadius={100}
              activeIndex={-1}
              activeShape={({ outerRadius = 0, ...props }: any) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          Total de Pagos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
